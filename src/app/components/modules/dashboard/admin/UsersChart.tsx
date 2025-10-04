'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { toJalaali } from 'jalaali-js';
import { UserSafe } from '@/lib/types';
import { useMemo } from 'react';

/* --------------------------------------------
 * Utility: Build a list of the last 6 Jalaali months (jy/jm pairs),
 * starting from the current month and going backward.
 * -------------------------------------------- */
function getLastSixMonths() {
  const now = new Date();
  const { jy: thisJy, jm: thisJm } = toJalaali(now);

  const months = [];
  let year = thisJy;
  let month = thisJm;

  for (let i = 0; i < 6; i++) {
    months.push({ jy: year, jm: month });

    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
  }

  return months;
}

type Props = {
  users: UserSafe[];
};

export function UsersChart({ users }: Props) {
  /* --------------------------------------------
   * Memoized: Aggregate user counts per month for the last 6 Jalaali months.
   * Converts each user's createdAt to Jalaali and matches on (jy, jm).
   * The result is reversed to go from oldest -> newest for charting.
   * -------------------------------------------- */
  const chartData = useMemo(() => {
    const months = getLastSixMonths();
    const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

    return months
      .map(({ jy, jm }) => {
        const count = users.filter((user) => {
          const d = new Date(user.createdAt as string);
          if (isNaN(d.getTime())) return false;
          const { jy: uJy, jm: uJm } = toJalaali(d);
          return uJy === jy && uJm === jm;
        });

        return {
          month: monthNames[jm - 1], // X-axis category label
          desktop: count.length, // Y value for the bar (number of users)
        };
      })
      .reverse();
  }, [users]);

  /* --------------------------------------------
   * Chart configuration: map data keys to labels/colors
   * -------------------------------------------- */
  const chartConfig = {
    desktop: {
      label: 'کاربر',
      color: '#7F55B1',
    },
  } satisfies ChartConfig;

  return (
    // Card wrapper of the whole chart block
    <Card className="flex flex-col w-full h-full border-none shadow-none bg-white dark:bg-slate-900">
      {/* Header: Title + current Jalaali month/year */}
      <CardHeader>
        <CardTitle>تعداد کاربران ثبت نام کرده</CardTitle>
        <CardDescription>
          {(() => {
            const gDate = new Date();
            const jDate = toJalaali(gDate);
            const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            return `${months[jDate.jm - 1]} ${jDate.jy}`;
          })()}
        </CardDescription>
      </CardHeader>

      {/* Content: Responsive container + Recharts BarChart */}
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto max-h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            {/* X axis is numeric (counts) and hidden for a cleaner look */}
            <XAxis type="number" dataKey="desktop" hide />
            {/* Y axis lists localized month names (categories) */}
            <YAxis dataKey="month" type="category" tickLine={false} tickMargin={50} axisLine={false} tickFormatter={(value) => value} />
            {/* Tooltip with shared UI wrapper */}
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            {/* Single series bar using CSS variable injected by ChartContainer */}
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      {/* Footer: supplementary note under the chart */}
      <CardFooter className="flex-col items-center text-sm">
        <p className="text-muted-foreground leading-none">نمایش کاربران ثبت نام کرده در 6 ماه اخیر</p>
      </CardFooter>
    </Card>
  );
}
