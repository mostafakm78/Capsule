'use client';


import Users from './Users';

export default function UsersAdminIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربرای سایت</span>
        <div className="flex flex-col h-full justify-start gap-2">
          <Users />
        </div>
      </div>
    </section>
  );
}
