import Link from 'next/link';
import { CiLogin } from 'react-icons/ci';
import { BsFillPeopleFill } from 'react-icons/bs';

export default function LoginButton() {
  return (
    <Link href="/login" className="flex text-base items-center lg:bg-transparent bg-primary/70 text-foreground py-1 lg:py-0 px-4 lg:px-0 rounded-md cursor-pointer active:bg-primary active:text-background duration-300">
      <CiLogin className="text-3xl lg:hidden block" />
      <div className="lg:inline hidden bg-primary/60 hover:bg-primary text-foreground hover:text-background py-2 px-4 rounded-r-md duration-300">
        <span>ورود</span>
        <CiLogin className="inline mr-2" />
      </div>
      <div className="lg:inline hidden bg-primary hover:bg-primary text-foreground hover:text-background py-2 px-4 rounded-l-md duration-300">
        <span>ثبت نام</span>
        <BsFillPeopleFill className="inline mr-2" />
      </div>
    </Link>
  );
}
