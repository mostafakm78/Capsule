import UserAccInfo from './UserAccInfo';
import { Separator } from '@/components/ui/separator';
import UserPassChange from './PassChange';

export default function DashboardSettingIndex() {
  return (
    /* Page-level settings section (semantic landmark for the settings area) */
    <section className="flex flex-col h-full gap-10">
      {/* Content wrapper: page heading + settings card container */}
      <div className="flex flex-col h-full justify-start gap-10">
        {/* Page heading: "Account Settings" with decorative dot via ::after */}
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>تنظیمات حساب کاربری</span>

        {/* Settings card: contains account info form and password change form */}
        <div className="flex flex-col gap-8 bg-white h-full w-full rounded-lg p-6 dark:bg-slate-900">
          {/* User account information form (name, email, avatar, etc.) */}
          <UserAccInfo />

          {/* Visual separator between account info and password change modules */}
          <Separator className="w-full bg-foreground/20" />

          {/* Password change form (current/new/confirm) */}
          <UserPassChange />
        </div>
      </div>
    </section>
  );
}
