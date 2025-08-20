import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { RiNotification4Line } from 'react-icons/ri';

export default function Notification() {

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary">
        <RiNotification4Line />
      </PopoverTrigger>
      <PopoverContent sideOffset={30} className="z-50 lg:w-[500px] md:w-[350px] w-[260px] lg:ml-20 md:ml-10 ml-5">
        <span className="text-foreground/70 font-medium break-words">امروز سایت بروزرسانی شدهadsdasdasdasdasasasasasasasasasasasasasasasasasasdasdsadasd است.</span>
        <Separator className="w-full bg-foreground/20 my-4" />
        <span className="text-foreground/70 font-medium">امروز سایت بروزرسانی شدهadsdasdasdasdsadasd است.</span>
      </PopoverContent>
    </Popover>
  );
}
