'use client';

import callApi from '@/app/services/callApi';
import { NotificationType } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { toJalaali } from 'jalaali-js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DeleteNotifModal } from './DeleteNotifModal';

const toPersianNumber = (num: string | number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[Number(d)]);
};

export default function AllNotif() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

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

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const handlePointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const target = e.target as Node;
      if (!el.contains(target)) {
        setSelected('');
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected('');
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <>
      <span className='text-foreground text-xl pr-4 self-start relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>اعلان های موجود در سایت</span>
      <div ref={containerRef} className="border shadow-inner shadow-foreground/30 h-[500px] w-full border-foreground/50 rounded-md overflow-y-auto md:p-4 p-2">
        {loading && <div className="py-4">در حال بارگذاری...</div>}

        {!loading && notifications.length === 0 && <div className="py-4 text-foreground/70">اعلانی وجود ندارد.</div>}

        {!loading && notifications.length > 0 && (
          <RadioGroup dir="rtl" className="flex flex-col gap-5">
            {notifications.map((item) => {
              return (
                <div
                  onClick={() => setSelected(item._id)}
                  key={item._id}
                  className={`flex flex-col border border-foreground/30 rounded p-4 bg-transparent cursor-pointer hover:bg-foreground/30 duration-300 ${selected === item._id ? 'border-primary scale-[101%] duration-300 ring-2 ring-primary' : ''}`}
                >
                  <RadioGroupItem className="sr-only" value={item._id}></RadioGroupItem>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/90 font-semibold">{item.title}</span>
                    <span className="text-foreground/50 text-xs">
                      {(() => {
                        const d = new Date(item.createdAt);
                        const j = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
                        const hours = String(d.getHours()).padStart(2, '0');
                        const minutes = String(d.getMinutes()).padStart(2, '0');
                        const persianDate = `${toPersianNumber(j.jy)}/${toPersianNumber(j.jm.toString().padStart(2, '0'))}/${toPersianNumber(j.jd.toString().padStart(2, '0'))} ${toPersianNumber(hours)}:${toPersianNumber(minutes)}`;
                        return persianDate;
                      })()}
                    </span>
                  </div>
                  <span className="text-foreground/70 break-words">{item.text}</span>
                  <span className={`text-foreground/50 text-xs uppercase ${item.type === 'alert' ? 'text-yellow-600' : item.type === 'message' ? 'text-green-600' : item.type === 'news' ? 'text-primary' : ''}`}>
                    نوع پیام : {item.type === 'alert' ? 'هشدار' : item.type === 'message' ? 'پیام' : item.type === 'news' ? 'اخبار' : item.type === 'system' ? 'سیستم' : 'پیام'}
                  </span>
                </div>
              );
            })}
          </RadioGroup>
        )}
      </div>
      <DeleteNotifModal notifId={selected} />
    </>
  );
}
