'use client';

import { Label, Pie, PieChart } from 'recharts';
import { toJalaali } from 'jalaali-js';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Capsule } from '@/lib/types';
import { useMemo } from 'react';

const chartConfig = {
  visitors: {
    label: 'تعداد',
  },
  public: {
    label: 'کپسول عمومی',
    color: '#7F55B1',
  },
  private: {
    label: 'کپسول خصوصی',
    color: '#F49BAB',
  },
  timed: {
    label: 'کپسول خصوصی زمان‌دار',
    color: '#FFE1E0',
  },
} satisfies ChartConfig;

type Props = {
  capsules: Capsule[];
};

export function CapsulesChart({ capsules }: Props) {
  const thisMonthCapsules = useMemo(() => {
    const now = new Date();
    const { jy: thisJy, jm: thisJm } = toJalaali(now);

    return capsules.filter((cap) => {
      const d = new Date(cap.createdAt as string);
      if (isNaN(d.getTime())) return false;
      const { jy, jm } = toJalaali(d);
      return jy === thisJy && jm === thisJm;
    });
  }, [capsules]);

  const totalThisMonth = useMemo(() => thisMonthCapsules.length, [thisMonthCapsules]);

  const totalPublicThisMonth = useMemo(
    () =>
      thisMonthCapsules.filter((capsule) => {
        return capsule.access?.visibility === 'public';
      }),
    [thisMonthCapsules]
  );

  const totalPrivateThisMonth = useMemo(
    () =>
      thisMonthCapsules.filter((capsule) => {
        return capsule.access?.visibility === 'private' && capsule.access.lock === 'none';
      }),
    [thisMonthCapsules]
  );

  const totalTimedThisMonth = useMemo(
    () =>
      thisMonthCapsules.filter((capsule) => {
        return capsule.access?.visibility === 'private' && capsule.access.lock === 'timed';
      }),
    [thisMonthCapsules]
  );

  const chartData = [
    { browser: 'کپسول عمومی', visitors: totalPublicThisMonth.length, fill: '#7F55B1' },
    { browser: 'کپسول خصوصی', visitors: totalPrivateThisMonth.length, fill: '#F49BAB' },
    { browser: 'کپسول خصوصی زمان‌دار', visitors: totalTimedThisMonth.length, fill: '#FFE1E0' },
  ];

  return (
    <Card className="flex flex-col w-full h-full border-none shadow-none bg-white dark:bg-slate-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>کپسول‌های این ماه</CardTitle>
        <CardDescription>
          {(() => {
            const gDate = new Date();
            const jDate = toJalaali(gDate);
            const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            return `${months[jDate.jm - 1]} ${jDate.jy}`;
          })()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalThisMonth > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto max-h-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={85} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalThisMonth.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-foreground lg:text-lg text-base">
                            کپسول‌های این ماه
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="lg:text-lg text-base mt-1">هنوز کپسولی در این ماه ساخته نشده</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text- leading-none">نمایش کپسول های ساخته شده در 1 ماه اخیر</div>
      </CardFooter>
    </Card>
  );
}
