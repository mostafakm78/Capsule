'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import callApi from '@/app/services/callApi';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetCapsulesResponse, UserSafe } from '@/lib/types';
import { PulseLoader } from 'react-spinners';
import { UserBannedModal } from '../UserBannedModal';
import { UserTypeModal } from '../UserTypeModal';
import { UserFlagModal } from '../UserFlagModal';
import SingleUserCapsulesAdmin from './SingleUserCapsulesAdmin';

export default function SingleUserAdminIndex() {
  const paramId = useParams();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserSafe | undefined>(undefined);
  const [capsules, setCapsules] = useState<GetCapsulesResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());
        if (!params.get('page')) params.set('page', '1');
        const res = await callApi().get(`/admin/users/${paramId.id}?${params.toString()}`);
        if (res.status === 200) {
          setUser(res.data.user);
          setCapsules(res.data.capsules);
          setLoading(false);
        } else {
          setUser(undefined);
          setCapsules(undefined);
          setLoading(false);
        }
      } catch {
        setUser(undefined);
        setCapsules(undefined);
        setLoading(false);
      }
    })();
  }, [paramId, searchParams]);

  return (
    <section className="flex flex-col min-h-screen h-full gap-10">
      {loading ? (
        <div className="flex items-center justify-center gap-2 h-80">
          <span>درحال بارگزاری</span>
          <PulseLoader size={7} />
        </div>
      ) : (
        <div className="flex overflow-y-hidden flex-col h-full justify-start gap-10">
          <div className="w-full px-4 mt-2 flex items-center justify-between">
            <span className='text-foreground pr-4 text-xl relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربر : {user?.name ?? user?.email}</span>
            <div>
              <Avatar className="md:h-20 md:w-20 w-15 h-15 ring-2 ring-secondary">
                <AvatarImage className="object-cover" src={user?.avatar ? `http://localhost:8080/images/${user.avatar}` : '/images/default.png'} />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col  md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg justify-center w-full">
            <div className="grid lg:grid-cols-2 items-center place-items-center w-full p-2.5 group/email">
              <span className="block border border-l-0 p-4 rounded-r-md w-full text-center transition-transform duration-300 group-hover/email:scale-105">ایمیل کاربر :</span>
              <span className="block p-4 rounded-l-md border border-r-0 border-t-0 lg:border-t text-center w-full transition-transform duration-300 group-hover/email:scale-105">{user?.email}</span>
            </div>

            <div className="grid lg:grid-cols-2 items-center place-items-center w-full p-2.5 group/status">
              <span className="block border border-l-0 p-4 rounded-r-md w-full text-center transition-transform duration-300 group-hover/status:scale-105">وضعیت کاربر :</span>
              <div className="p-4 rounded-l-md border border-r-0 border-t-0 lg:border-t text-center w-full transition-transform duration-300 group-hover/status:scale-105">
                <UserBannedModal user={user} />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 items-center place-items-center w-full p-2.5 group/role">
              <span className="block border border-l-0 p-4 rounded-r-md w-full text-center transition-transform duration-300 group-hover/role:scale-105">نقش کاربر :</span>
              <div className="p-4 rounded-l-md border border-r-0 border-t-0 lg:border-t text-center w-full transition-transform duration-300 group-hover/role:scale-105">
                <UserTypeModal user={user} />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 items-center place-items-center w-full p-2.5 group/flag">
              <span className="block border border-l-0 p-4 rounded-r-md w-full text-center transition-transform duration-300 group-hover/flag:scale-105">بن کاربر :</span>
              <div className="p-4 rounded-l-md border border-r-0 border-t-0 lg:border-t text-center w-full transition-transform duration-300 group-hover/flag:scale-105">
                <UserFlagModal user={user} />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">کپسول‌های کاربر : {user?.name ?? user?.email}</h4>
              <p className="text-foreground/80">تمامی کپسول های ساخته شده توسط کاربر</p>
            </div>
            <SingleUserCapsulesAdmin userId={user?._id} capsules={capsules} />
          </div>
        </div>
      )}
    </section>
  );
}
