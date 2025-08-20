import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UsersModal } from './UsersModal';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function Users() {
  return (
    <div className="flex flex-col gap-6 lg:p-8 p-1 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full min-h-screen pb-4">
      <Table dir="rtl">
        <TableCaption>لیست کاربران سایت کپسول</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>کاربر</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead className="hidden md:table-cell">وضعیت کاربر</TableHead>
            <TableHead className="hidden md:table-cell">بن کردن</TableHead>
            <TableHead className="hidden md:table-cell">نقش کاربر</TableHead>
            <TableHead className="hidden md:table-cell">کپسول‌های کاربر</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 50 }).map((_, i) => (
            <TableRow className={i === 1 ? 'bg-red-100' : i === 6 ? 'bg-green-100' : ''} key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="md:font-medium">
                <span className="md:hidden">
                  <UsersModal />
                </span>
                <span className="hidden md:block">مصطفی کمری</span>
              </TableCell>
              <TableCell className="whitespace-normal break-all">mostafamf555@gmail.com</TableCell>
              <TableCell className="hidden md:table-cell">
                <Button className="bg-emerald-800 text-white hover:text-background/80 cursor-pointer hover:bg-emerald-600">طبیعی</Button>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Button className="bg-red-800 text-white hover:text-background/80 cursor-pointer hover:bg-red-600">بن</Button>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Button className="cursor-pointer bg-sky-800 hover:bg-sky-600 text-white hover:text-background/80">ادمین</Button>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Link className="flex items-center gap-2 font-light text-base text-primary hover:text-foreground/80 duration-300" href="/dashboard/admin/users/1">
                  دیدن
                  <FaLongArrowAltLeft className="text-lg" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
