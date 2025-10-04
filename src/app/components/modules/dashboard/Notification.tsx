'use client';

import callApi from '@/app/services/callApi';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { RiNotification4Line } from 'react-icons/ri';
import { toJalaali } from 'jalaali-js';
import { NotificationType } from '@/lib/types';

// Helper: convert English digits to Persian digits for UI display
const toPersianNumber = (num: string | number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[Number(d)]);
};

export default function Notification() {
  // Local state: fetched notifications list
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // Loading flag for fetch lifecycle
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch notifications on mount; guard state updates with "mounted"
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await callApi().get('/me/notifications');
        if (!mounted) return;

        const notifs = Array.isArray(res.data.AllNotif) ? res.data.AllNotif : [];
        setNotifications(notifs as NotificationType[]);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setNotifications([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // Cleanup: prevent state updates after unmount
    return () => {
      mounted = false;
    };
  }, []);

  return (
    // Popover root (headless UI container)
    <Popover>
      {/* Trigger button: bell icon toggles the notifications popover */}
      <PopoverTrigger className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary" aria-label="Notifications">
        <RiNotification4Line />
      </PopoverTrigger>

      {/* Popover panel: scrollable notifications list container */}
      <PopoverContent sideOffset={30} className="z-50 lg:w-[500px] md:w-[350px] w-[260px] lg:ml-20 md:ml-10 ml-5 h-[400px] overflow-y-auto" aria-live="polite" aria-busy={loading}>
        {/* Loading state (kept minimal, non-intrusive) */}
        {loading && <div className="py-4">در حال بارگذاری...</div>}

        {/* Empty state when there are no notifications */}
        {!loading && notifications.length === 0 && <div className="py-4 text-foreground/70">اعلانی وجود ندارد.</div>}

        {/* Notifications list */}
        {!loading && notifications.length > 0 && (
          // Semantic wrapper for a list of notifications (keeps classes intact)
          <section className="flex flex-col gap-3" role="list" aria-label="Notifications list">
            {notifications.map((item, i) => {
              const lastIndex = i === notifications.length - 1;
              return (
                // Each notification rendered as an article (list item)
                <article key={item._id} className="flex flex-col" role="listitem" aria-label={`Notification: ${item.title}`}>
                  {/* Header row: title (left) + timestamp (right) */}
                  <header className="flex justify-between items-center">
                    <span className="text-foreground/90 font-semibold">{item.title}</span>

                    {/* Localized Jalaali date/time in a semantic <time> element */}
                    <span className="text-foreground/50 text-xs">
                      {(() => {
                        const d = new Date(item.createdAt);
                        const j = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const persianDate = `${toPersianNumber(j.jy)}/${toPersianNumber(j.jm.toString().padStart(2, '0'))}/${toPersianNumber(j.jd.toString().padStart(2, '0'))} ${toPersianNumber(hours)}:${toPersianNumber(minutes)}`;
                        // Use <time> with machine-readable datetime for accessibility/SEO
                        return <time dateTime={d.toISOString()}>{persianDate}</time>;
                      })()}
                    </span>
                  </header>

                  {/* Body: notification text (wrap long content) */}
                  <p className="text-foreground/70 break-words">{item.text}</p>

                  {/* Type badge: colored by type (alert/message/news/system) */}
                  <small className={`text-foreground/50 text-xs uppercase ${item.type === 'alert' ? 'text-yellow-600' : item.type === 'message' ? 'text-green-600' : item.type === 'news' ? 'text-primary' : ''}`} aria-label={`نوع پیام: ${item.type}`}>
                    نوع پیام : {item.type === 'alert' ? 'هشدار' : item.type === 'message' ? 'پیام' : item.type === 'news' ? 'اخبار' : item.type === 'system' ? 'سیستم' : 'پیام'}
                  </small>

                  {/* Divider between items (hidden on the last item) */}
                  <Separator className={`w-full bg-foreground/20 my-2 ${lastIndex ? 'hidden' : ''}`} />
                </article>
              );
            })}
          </section>
        )}
      </PopoverContent>
    </Popover>
  );
}
