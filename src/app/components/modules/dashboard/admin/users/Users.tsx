import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Users() {
  return (
    <div className="flex flex-col gap-6 lg:p-8 p-1 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full min-h-screen">
      <Table dir="rtl">
        <TableCaption>لیست کاربران سایت کپسول</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>کاربر</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead className='hidden md:inline-block'>وضعیت کاربر</TableHead>
            <TableHead className='hidden md:inline-block'>بن کردن</TableHead>
            <TableHead className='hidden md:inline-block'>نقش کاربر</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 50 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium w-[20px]">{i + 1}</TableCell>
              <TableCell className="font-medium">مصطفی کمری</TableCell>
              <TableCell>mostafamf555@gmail.com</TableCell>
              <TableCell>
                <Button className="bg-emerald-800 text-white hover:text-background/80 cursor-pointer hover:bg-emerald-600">طبیعی</Button>
              </TableCell>
              <TableCell>
                <Button className="bg-red-800 text-white hover:text-background/80 cursor-pointer hover:bg-red-600">بن</Button>
              </TableCell>
              <TableCell>
                <Button className="cursor-pointer bg-sky-800 hover:bg-sky-600 text-white hover:text-background/80">ادمین</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
