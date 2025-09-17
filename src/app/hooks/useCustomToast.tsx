import { Separator } from '@/components/ui/separator';
import { ReactNode, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';

type ToastArg = string | { message: ReactNode; bg?: string };

export default function useCustomToast() {
  const show = useCallback((arg: ToastArg) => {
    const { message, bg } = typeof arg === 'string' ? { message: arg, bg: undefined } : arg;
    return toast.custom((t) => (
      <div className={`${bg ? bg : 'bg-accent'} max-w-[360px] md:max-w-none font-vazirmatn font-medium text-foreground/80 dark:text-background/80 text-sm h-[60px] py-3 px-4 rounded-lg shadow-lg border-[1px] border-primary/50`}>
        <div className="flex h-full w-full items-center gap-2">
          <button onClick={() => toast.dismiss(t)} className="rounded text-foreground text-xl hover:text-foreground/50 dark:text-background/80 duration-300 focus:text-foreground/50 cursor-pointer">
            <IoMdClose />
          </button>
          <Separator className="h-full w-full bg-foreground/30 mx-2" orientation="vertical" />
          <div className="font-semibold w-full">{message}</div>
        </div>
      </div>
    ));
  }, []);

  return show;
}
