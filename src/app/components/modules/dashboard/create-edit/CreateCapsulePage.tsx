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
import { Button } from '@/components/ui/button';
import callApi from '@/app/services/callApi';

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
  const editOrcreate = useSelector((state: RootState) => state.editOrcreate);

  const color = editOrcreate.capsule?.color;
  let colorCode;

  if (!color || color === 'default') {
    colorCode = 'bg-white dark:bg-slate-900';
  } else if (color === 'blue') {
    colorCode = 'bg-blue-600/15 dark:bg-blue-800/50';
  } else if (color === 'green') {
    colorCode = 'bg-green-600/15 dark:bg-green-800/50';
  } else if (color === 'red') {
    colorCode = 'bg-red-600/15 dark:bg-red-800/50';
  } else if (color === 'yellow') {
    colorCode = 'bg-yellow-500/15 dark:bg-yellow-700/50';
  }

  console.log(editOrcreate.capsule);

  const handleSubmit = async () => {
    if (editOrcreate.mode === 'edit') {
      const capsuleId = editOrcreate.capsule?._id;
      try {
        const res = await callApi().patch(`/capsules/${capsuleId}`, {});
      } catch (error) {}
    }
  };

  return (
    <section key={editOrcreate.mode} className="flex flex-col h-full gap-10">
      <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>{editOrcreate.mode === 'create' ? 'ساخت کپسول' : 'ویرایش کپسول'}</span>
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
            <SelectTrigger size="sm" className="w-full">
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

      <div className="w-full flex justify-center mt-8">
        <Button onClick={handleSubmit} className="cursor-pointer w-1/3 py-6 text-lg">
          ساخت کپسول
        </Button>
      </div>
    </section>
  );
}
