'use client';

import { Label, Pie, PieChart } from 'recharts';
import { toJalaali } from 'jalaali-js';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Capsule } from '@/lib/types';
import { useMemo } from 'react';

// Chart legend/config used by the shared <ChartContainer> (labels and colors for series)
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
  // Full list of capsules (all time) received from the parent
  capsules: Capsule[];
};

export function CapsulesChart({ capsules }: Props) {
  // Filter only capsules created in the current Jalaali month (computed once per render)
  const thisMonthCapsules = useMemo(() => {
    const now = new Date();
    const { jy: thisJy, jm: thisJm } = toJalaali(now);

    return capsules.filter((cap) => {
      const d = new Date(cap.createdAt as string);
      if (isNaN(d.getTime())) return false; // skip invalid dates safely
      const { jy, jm } = toJalaali(d);
      return jy === thisJy && jm === thisJm; // same Jalaali year & month as now
    });
  }, [capsules]);

  // Total count for current month (used in the donut's center label and empty state)
  const totalThisMonth = useMemo(() => thisMonthCapsules.length, [thisMonthCapsules]);

  // Partition current-month capsules by access visibility/lock state
  const totalPublicThisMonth = useMemo(() => thisMonthCapsules.filter((capsule) => capsule.access?.visibility === 'public'), [thisMonthCapsules]);

  const totalPrivateThisMonth = useMemo(() => thisMonthCapsules.filter((capsule) => capsule.access?.visibility === 'private' && capsule.access.lock === 'none'), [thisMonthCapsules]);

  const totalTimedThisMonth = useMemo(() => thisMonthCapsules.filter((capsule) => capsule.access?.visibility === 'private' && capsule.access.lock === 'timed'), [thisMonthCapsules]);

  // Data series for the Pie chart (each slice represents one visibility/lock group)
  const chartData = [
    { browser: 'کپسول عمومی', visitors: totalPublicThisMonth.length, fill: '#7F55B1' },
    { browser: 'کپسول خصوصی', visitors: totalPrivateThisMonth.length, fill: '#F49BAB' },
    { browser: 'کپسول خصوصی زمان‌دار', visitors: totalTimedThisMonth.length, fill: '#FFE1E0' },
  ];

  return (
    // Card container for the chart (visual grouping only)
    <Card className="flex flex-col w-full h-full border-none shadow-none bg-white dark:bg-slate-900">
      {/* Header: title + current Jalaali month/year */}
      <CardHeader className="items-center pb-0">
        <CardTitle>کپسول‌های این ماه</CardTitle>
        <CardDescription>
          {(() => {
            // Compute the current Jalaali month label (e.g., "مهر ۱۴۰۳")
            const gDate = new Date();
            const jDate = toJalaali(gDate);
            const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            return `${months[jDate.jm - 1]} ${jDate.jy}`;
          })()}
        </CardDescription>
      </CardHeader>

      {/* Main content: renders either the donut chart or the empty state */}
      <CardContent className="flex-1 pb-0">
        {totalThisMonth > 0 ? (
          // Chart wrapper: provides responsive container, color tokens, and tooltip wiring
          <ChartContainer config={chartConfig} className="mx-auto max-h-[300px]">
            <PieChart>
              {/* Custom tooltip for slice hover; content provided by shared UI util */}
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              {/* Donut chart with three slices (public/private/timed) */}
              <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={85} strokeWidth={5}>
                {/* Center label inside the donut: total number + caption */}
                <Label
                  content={({ viewBox }) => {
                    // Guard against unexpected viewBox shape (Recharts API)
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
          // Empty state: shown when no capsules exist for current month
          <section className="flex items-center justify-center h-[300px]" aria-label="Monthly capsules empty state">
            <div className="text-center">
              <div className="text-3xl font-bold">0</div>
              <p className="lg:text-lg text-base mt-1">هنوز کپسولی در این ماه ساخته نشده</p>
            </div>
          </section>
        )}
      </CardContent>

      {/* Footer: brief legend/context for the timeframe */}
      <CardFooter className="flex-col gap-2 text-sm">
        <p className="leading-none">نمایش کپسول های ساخته شده در 1 ماه اخیر</p>
      </CardFooter>
    </Card>
  );
}
