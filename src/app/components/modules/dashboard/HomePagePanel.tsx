import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoPeopleSharp } from "react-icons/io5";
import { GrFormView } from "react-icons/gr";
import { IoWarningOutline } from "react-icons/io5";

export default function HomePagePanel() {
  return (
    <section className="flex flex-col">
      <div className="grid grid-cols-12 p-4 gap-2">
        <div className="border-emerald-500 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className='bg-emerald-500 p-2 rounded-full'>
            <BsCapsule className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation='vertical' className='bg-foreground/20'/>
          <div className="flex flex-col items-start text-foreground lg:text-xl text-lg justify-around">
            <span>کپسول های ساخته شده</span>
            <span>52</span>
          </div>
        </div>
        <div className="border-purple-500 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className='bg-purple-500 p-2 rounded-full'>
            <IoPeopleSharp className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation='vertical' className='bg-foreground/20'/>
          <div className="flex flex-col items-start text-foreground lg:text-xl text-lg justify-around">
            <span>کپسول های عمومی شما</span>
            <span>15</span>
          </div>
        </div>
        <div className="border-rose-500 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className='bg-rose-500 p-2 rounded-full'>
            <IoWarningOutline className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation='vertical' className='bg-foreground/20'/>
          <div className="flex flex-col items-start text-foreground lg:text-xl text-lg justify-around">
            <span>کپسول های بن شده</span>
            <span>1</span>
          </div>
        </div>
        <div className="border-yellow-500 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className='bg-yellow-500 p-2 rounded-full'>
            <GrFormView className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation='vertical' className='bg-foreground/20'/>
          <div className="flex flex-col items-start text-foreground lg:text-xl text-lg justify-around">
            <span>آخرین بازدید</span>
            <span>دیروز</span>
          </div>
        </div>
      </div>
    </section>
  );
}
