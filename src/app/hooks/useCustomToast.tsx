import { Separator } from '@/components/ui/separator';
import { ReactNode, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';

type ToastArg = string | { message: ReactNode; bg?: string };

export default function useCustomToast() {
  // Shows a custom toast; keeps original styling/logic intact
  const show = useCallback((arg: ToastArg) => {
    const { message, bg } = typeof arg === 'string' ? { message: arg, bg: undefined } : arg;

    return toast.custom((t) => (
      //   Toast root as a polite live region (localized Persian label)
      <section className={`${bg ? bg : 'bg-accent'} max-w-[360px] md:max-w-none font-vazirmatn font-medium text-foreground/80 dark:text-primary text-sm h-[60px] py-3 px-4 rounded-lg shadow-lg border-[1px] border-primary/50`} role="status" aria-live="polite" aria-atomic="true" aria-label="اعلان">
        {/* Layout row: close button, decorative separator, message */}
        <div className="flex h-full w-full items-center gap-2">
          {/* Close button with Persian label; icon is decorative */}
          <button onClick={() => toast.dismiss(t)} className="rounded text-foreground/80 text-xl hover:text-foreground/50 dark:text-primary duration-300 focus:text-foreground/50 cursor-pointer" aria-label="بستن اعلان" title="بستن اعلان">
            <IoMdClose aria-hidden="true" />
          </button>

          {/* Decorative vertical separator; hidden from assistive tech */}
          <Separator className="h-full w-full bg-foreground/30 dark:bg-primary mx-2" orientation="vertical" aria-hidden="true" />

          {/* Message container; announced via the live region */}
          <div className="font-semibold w-full">{message}</div>
        </div>
      </section>
    ));
  }, []);

  return show;
}
