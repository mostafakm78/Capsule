'use client';

import callApi from '@/app/services/callApi';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { RiNotification4Line } from 'react-icons/ri';
import { toJalaali } from 'jalaali-js';
import { NotificationType } from '@/lib/types';

const toPersianNumber = (num: string | number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[Number(d)]);
};

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary">
        <RiNotification4Line />
      </PopoverTrigger>
      <PopoverContent sideOffset={30} className="z-50 lg:w-[500px] md:w-[350px] w-[260px] lg:ml-20 md:ml-10 ml-5 h-[400px] overflow-y-auto">
        {loading && <div className="py-4">در حال بارگذاری...</div>}

        {!loading && notifications.length === 0 && <div className="py-4 text-foreground/70">اعلانی وجود ندارد.</div>}

        {!loading && notifications.length > 0 && (
          <div className="flex flex-col gap-3">
            {notifications.map((item, i) => {
              const lastIndex = i === notifications.length - 1;
              return (
                <div key={item._id} className="flex flex-col">
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
                  <span className={`text-foreground/50 text-xs uppercase ${item.type === 'alert' ? 'text-yellow-600' : item.type === 'message' ? 'text-green-600' : item.type === 'news' ? 'text-primary' : ''}`}>نوع پیام : {item.type === 'alert' ? 'هشدار' : item.type === 'message' ? 'پیام' : item.type === 'news' ? 'اخبار' : item.type === 'system' ? 'سیستم' : 'پیام'}</span>
                  <Separator className={`w-full bg-foreground/20 my-2 ${lastIndex ? 'hidden' : ''}`} />
                </div>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
