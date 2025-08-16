import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function UserPassChange() {
  return (
    <>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">تغییر رمز عبور</h4>
      </div>
      <div className="flex lg:flex-row flex-col w-full lg:gap-10 gap-6">
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد فعلی
          <Input type="text" placeholder="google@gmail.com" className="md:text-sm md:placeholder:text-sm" />
          <Link className="text-sm font-light text-foreground/90" href="">
            رمز عبور فعلی رو فراموش کردی؟
          </Link>
        </Label>
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد جدید
          <Input type="text" placeholder="google@gmail.com" className="md:text-sm md:placeholder:text-sm" />
        </Label>
      </div>
      <div className='self-center'>
        <Button className='cursor-pointer'>ثبت تغییرات</Button>
      </div>
    </>
  );
}
