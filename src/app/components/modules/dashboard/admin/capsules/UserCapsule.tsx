'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CapsuleInfo from './CapsuleInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import callApi from '@/app/services/callApi';
import { Capsule } from '@/lib/types';
import { PulseLoader } from 'react-spinners';

export default function SingleUserCapsuleAdminIndex() {
  const paramsId = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [singleCapsule, setSingleCapsule] = useState<Capsule | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get(`/admin/users/${paramsId.id}/${paramsId.capsuleId}`);
        if (res.status === 200) {
          setSingleCapsule(res.data.singleCapsule);
          setLoading(false);
        } else {
          setSingleCapsule(undefined);
          setLoading(false);
        }
      } catch {
        setSingleCapsule(undefined);
        setLoading(false);
      }
    })();
  }, [paramsId]);

  return (
    <section className="flex flex-col h-full gap-10">
      {loading ? (
        <div className="flex items-center justify-center gap-2 h-80">
          <span>درحال بارگزاری</span>
          <PulseLoader size={7} />
        </div>
      ) : (
        <div className="flex flex-col h-full justify-start gap-10">
          <div className="w-full px-4 flex items-center justify-between">
            <span className='text-foreground pr-4 text-xl relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربر : {singleCapsule?.owner?.name ?? singleCapsule?.owner?.email}</span>
            <div>
              <Avatar className="md:h-20 md:w-20 w-15 h-15 ring-2 ring-secondary">
                <AvatarImage className="object-cover" src={singleCapsule?.owner?.avatar ? `http://localhost:8080/images/${singleCapsule?.owner.avatar}` : '/images/default.png'} />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className={`flex flex-col gap-6 md:p-8 p-3  rounded-lg justify-center w-full`}>
            <CapsuleInfo singleCapsule={singleCapsule} />
          </div>
        </div>
      )}
    </section>
  );
}
