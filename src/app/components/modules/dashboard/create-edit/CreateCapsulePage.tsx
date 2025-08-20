'use client';

import { PiSubtitlesFill } from 'react-icons/pi';
import { FaImage } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import { ComponentType, JSX, useState } from 'react';
import { TabButton } from './TabButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboardCreateCapsuleTab } from '@/lib/types';

const CapsuleInfo = dynamic(() => import('./CapsuleInfo'));
const CapsuleTags = dynamic(() => import('./CapsuleTags'));
const CapsuleStatus = dynamic(() => import('./CapsuleStatus'));

const tabs: { id: dashboardCreateCapsuleTab; label: string; icon: ComponentType<{ className?: string }>; component: JSX.Element }[] = [
  { id: 'info', label: 'اطلاعات کپسول', icon: PiSubtitlesFill, component: <CapsuleInfo /> },
  { id: 'tags', label: 'تگ‌ها و دسته‌بندی محصول', icon: FaImage, component: <CapsuleTags /> },
  { id: 'status', label: 'وضعیت انتشار کپسول', icon: GrStatusInfo, component: <CapsuleStatus /> },
];


export default function CreateCapsulePage() {
  const [tab, setTab] = useState<dashboardCreateCapsuleTab>('info');
  const colorCode = useSelector((state: RootState) => state.capsuleSetting.colorCode);
  const mode = useSelector((state: RootState) => state.editOrcreate.mode);

  return (
    <section className="flex flex-col h-full gap-10">
      <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>{mode === 'create' ? 'ساخت کپسول' : 'ویرایش کپسول'}</span>
      <div className="flex lg:flex-row flex-col h-full justify-start gap-10">
        {/* Desktop Tabs */}
        <div className="lg:flex hidden w-3/12 flex-col gap-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <TabButton key={id} id={id} currentTab={tab} setTab={setTab} icon={Icon}>
              {label}
            </TabButton>
          ))}
        </div>

        {/* Mobile Select */}
        <div className="lg:hidden flex w-full flex-col gap-4">
          <Select value={tab} onValueChange={(value: dashboardCreateCapsuleTab) => setTab(value)} dir="rtl">
            <SelectTrigger size='sm' className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabs.map(({ id, label, icon: Icon }) => (
                <SelectItem key={id} value={id}>
                  <div className="flex items-center text-base font-medium gap-2">
                    <div className="bg-primary p-1 rounded-md">
                      <Icon />
                    </div>
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tab Content */}
        <div className={`h-full lg:w-9/12 w-full ${colorCode} rounded-lg shadow-md shadow-black/5`}>{tabs.find((t) => t.id === tab)?.component}</div>
      </div>
    </section>
  );
}
