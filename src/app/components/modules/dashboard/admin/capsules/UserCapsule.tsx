'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CapsuleInfo from './CapsuleInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import callApi from '@/app/services/callApi';
import { Capsule } from '@/lib/types';
import { PulseLoader } from 'react-spinners';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function SingleUserCapsuleAdminIndex() {
  // Read dynamic route params (admin user id & capsule id)
  const paramsId = useParams();

  // Local loading flag while fetching capsule details
  const [loading, setLoading] = useState<boolean>(true);
  // Fetched capsule data to render in the editor
  const [singleCapsule, setSingleCapsule] = useState<Capsule | undefined>(undefined);

  // Side effect: fetch the single capsule details on mount or when params change
  useEffect(() => {
    (async () => {
      try {
        // Request capsule by owner id and capsule id from admin endpoint
        const res = await callApi().get(`/admin/users/${paramsId.id}/${paramsId.capsuleId}`);
        if (res.status === 200) {
          // Success: hydrate local state with returned capsule
          setSingleCapsule(res.data.singleCapsule);
          setLoading(false);
        } else {
          // Non-200: treat as not found / empty state
          setSingleCapsule(undefined);
          setLoading(false);
        }
      } catch {
        // Network/error: fallback to empty state
        setSingleCapsule(undefined);
        setLoading(false);
      }
    })();
  }, [paramsId]);

  return (
    // Page section: holds the whole "single user capsule (admin)" screen
    <section className="flex flex-col h-full gap-10">
      {loading ? (
        // Loading state: centered spinner + label
        <div className="flex items-center justify-center gap-2 h-80">
          <span>درحال بارگزاری</span>
          <PulseLoader size={7} />
        </div>
      ) : (
        // Content state: user header + capsule editor block
        <article className="flex flex-col h-full justify-start gap-10">
          {/* Header area: shows capsule owner name/email and avatar */}
          <header className="w-full px-4 flex items-center justify-between">
            <span className='text-foreground pr-4 text-xl relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربر : {singleCapsule?.owner?.name ?? singleCapsule?.owner?.email}</span>
            <div>
              <Avatar className="md:h-20 md:w-20 w-15 h-15 ring-2 ring-secondary">
                {/* If user has avatar render it from server, else fallback image */}
                <AvatarImage className="object-cover" src={singleCapsule?.owner?.avatar ? `${baseURL}/images/${singleCapsule?.owner.avatar}` : '/images/default.png'} />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Capsule editor container: passes fetched capsule down to child editor component */}
          <section className={`flex flex-col gap-6 md:p-8 p-3  rounded-lg justify-center w-full`}>
            <CapsuleInfo singleCapsule={singleCapsule} />
          </section>
        </article>
      )}
    </section>
  );
}
