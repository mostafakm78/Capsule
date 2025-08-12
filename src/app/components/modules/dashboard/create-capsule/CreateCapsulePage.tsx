'use client';

import { PiSubtitlesFill } from 'react-icons/pi';
import { FaImage } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { TabButton } from './TabButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CapsuleInfo = dynamic(() => import('./CapsuleInfo'));
const CapsuleTags = dynamic(() => import('./CapsuleTags'));
const CapsuleStatus = dynamic(() => import('./CapsuleStatus'));

type Tab = 'info' | 'tags' | 'status';

export default function CreateCapsulePage() {
  const [tab, setTab] = useState<Tab>('info');
  const colorCode = useSelector((state: RootState) => state.capsuleColor.colorCode);

  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex lg:flex-row flex-col h-full justify-start gap-10">
        <div className="lg:flex hidden w-3/12 flex-col gap-4">
          <TabButton id="info" currentTab={tab} setTab={setTab} icon={PiSubtitlesFill}>
            اطلاعات کپسول
          </TabButton>
          <TabButton id="tags" currentTab={tab} setTab={setTab} icon={FaImage}>
            تگ‌ها و دسته‌بندی محصول
          </TabButton>
          <TabButton id="status" currentTab={tab} setTab={setTab} icon={GrStatusInfo}>
            وضعیت انتشار کپسول
          </TabButton>
        </div>
        <div className="lg:hidden flex lg:w-3/12 w-full flex-col gap-4">
          <Select defaultValue="info" value={tab} onValueChange={(value : Tab) => setTab(value)} dir="rtl">
            <SelectTrigger className="w-full">
              <SelectValue defaultValue="info"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">
                <div className="flex items-center text-base font-medium gap-2">
                  <div className="bg-primary p-1 rounded-md">
                    <PiSubtitlesFill />
                  </div>
                  اطلاعات کپسول
                </div>
              </SelectItem>
              <SelectItem value="tags">
                <div className="flex items-center text-base font-medium gap-2">
                  <div className="bg-primary p-1 rounded-md">
                    <FaImage />
                  </div>
                  تگ‌ها و دسته‌بندی محصول
                </div>
              </SelectItem>
              <SelectItem value="status">
                <div className="flex items-center text-base font-medium gap-2">
                  <div className="bg-primary p-1 rounded-md">
                    <GrStatusInfo />
                  </div>
                  وضعیت انتشار کپسول
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={`h-full lg:w-9/12 w-full ${colorCode} rounded-lg shadow-md shadow-black/5`}>{tab === 'info' ? <CapsuleInfo /> : tab === 'tags' ? <CapsuleTags /> : <CapsuleStatus />}</div>
      </div>
    </section>
  );
}
