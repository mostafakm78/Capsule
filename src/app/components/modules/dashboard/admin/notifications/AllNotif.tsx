'use client';

import callApi from '@/app/services/callApi';
import { NotificationType } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { toJalaali } from 'jalaali-js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DeleteNotifModal } from './DeleteNotifModal';

// Utility: convert English digits to Persian digits for display
const toPersianNumber = (num: string | number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[Number(d)]);
};

export default function AllNotif() {
  // State: list of notifications fetched from the server
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // State: loading flag during fetch
  const [loading, setLoading] = useState<boolean>(true);
  // State: currently selected notification id (for delete modal)
  const [selected, setSelected] = useState<string>('');

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Ref: container to detect outside clicks for clearing selection
  const containerRef = useRef<HTMLDivElement>(null);
  const deleteTriggerRef = useRef<HTMLButtonElement>(null);

  // Fetch notifications on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // GET user notifications
        const res = await callApi().get('/me/notifications');
        if (!mounted) return;

        // Normalize and set notifications list safely
        const notifs = Array.isArray(res.data.AllNotif) ? res.data.AllNotif : [];
        setNotifications(notifs as NotificationType[]);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        // On error, fall back to empty list
        setNotifications([]);
      } finally {
        // Stop loading if component still mounted
        if (mounted) setLoading(false);
      }
    })();

    // Cleanup: mark as unmounted to avoid state updates
    return () => {
      mounted = false;
    };
  }, []);

  // UX: clear selected item when clicking outside the list or pressing Escape
  useEffect(() => {
    if (!selected) return;

    // Clear selection if pointer is outside container
    const handlePointerDown = (e: PointerEvent) => {
      if (dialogOpen) return;

      const el = containerRef.current;
      const triggerEl = deleteTriggerRef.current;
      if (!el) return;
      const target = e.target as Node;
      const clickOutsideList = !el.contains(target);
      const clickOnTrigger = !!(triggerEl && triggerEl.contains(target));
      if (!clickOnTrigger && clickOutsideList) {
        setSelected('');
      }
    };
    // Clear selection on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (dialogOpen) return;
      if (e.key === 'Escape') setSelected('');
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected , dialogOpen]);

  return (
    // Root section of the notifications list UI
    <section className="flex flex-col gap-4 w-full">
      {/* Page/Section heading (semantic) */}
      <h2 className='text-foreground text-xl pr-4 self-start relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>اعلان های موجود در سایت</h2>

      {/* Scrollable notifications list container */}
      <section ref={containerRef} className="border shadow-inner shadow-foreground/30 h-[500px] w-full border-foreground/50 rounded-md overflow-y-auto md:p-4 p-2">
        {/* Loading state */}
        {loading && <div className="py-4">در حال بارگذاری...</div>}

        {/* Empty state */}
        {!loading && notifications.length === 0 && <div className="py-4 text-foreground/70">اعلانی وجود ندارد.</div>}

        {/* Notifications list */}
        {!loading && notifications.length > 0 && (
          // RadioGroup used only for visual selection; value comes from local state
          <RadioGroup dir="rtl" className="flex flex-col gap-5">
            {notifications.map((item) => {
              return (
                // Single notification card (click to select)
                <article
                  onClick={() => setSelected(item._id)}
                  key={item._id}
                  className={`flex flex-col border border-foreground/30 rounded p-4 bg-transparent cursor-pointer hover:bg-foreground/30 duration-300 ${selected === item._id ? 'border-primary scale-[101%] duration-300 ring-2 ring-primary' : ''}`}
                >
                  {/* Hidden radio item to keep semantics with RadioGroup */}
                  <RadioGroupItem className="sr-only" value={item._id}></RadioGroupItem>

                  {/* Header row: title + created date (converted to Jalaali + Persian digits) */}
                  <header className="flex justify-between items-center">
                    <span className="text-foreground/90 font-semibold">{item.title}</span>
                    <time className="text-foreground/50 text-xs" dateTime={new Date(item.createdAt).toISOString()}>
                      {(() => {
                        const d = new Date(item.createdAt);
                        const j = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const persianDate = `${toPersianNumber(j.jy)}/${toPersianNumber(j.jm.toString().padStart(2, '0'))}/${toPersianNumber(j.jd.toString().padStart(2, '0'))} ${toPersianNumber(hours)}:${toPersianNumber(minutes)}`;
                        return persianDate;
                      })()}
                    </time>
                  </header>

                  {/* Notification text content */}
                  <p className="text-foreground/70 break-words">{item.text}</p>

                  {/* Notification type badge (styled by type) */}
                  <footer className={`text-foreground/50 text-xs uppercase ${item.type === 'alert' ? 'text-yellow-600' : item.type === 'message' ? 'text-green-600' : item.type === 'news' ? 'text-primary' : ''}`}>
                    نوع پیام : {item.type === 'alert' ? 'هشدار' : item.type === 'message' ? 'پیام' : item.type === 'news' ? 'اخبار' : item.type === 'system' ? 'سیستم' : 'پیام'}
                  </footer>
                </article>
              );
            })}
          </RadioGroup>
        )}
      </section>

      {/* Delete notification modal, bound to currently selected notification */}
      <DeleteNotifModal notifId={selected} triggerRef={deleteTriggerRef} onOpenChange={setDialogOpen}/>
    </section>
  );
}
