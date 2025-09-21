'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { toJalaali } from 'jalaali-js';
import { UserSafe } from '@/lib/types';
import { useMemo } from 'react';

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
          month: monthNames[jm - 1],
          desktop: count.length,
        };
      })
      .reverse();
  }, [users]);

  const chartConfig = {
    desktop: {
      label: 'کاربر',
      color: '#7F55B1',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-full h-full border-none shadow-none bg-white dark:bg-slate-900">
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
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis dataKey="month" type="category" tickLine={false} tickMargin={50} axisLine={false} tickFormatter={(value) => value} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center text-sm">
        <div className="text-muted-foreground leading-none">نمایش کاربران ثبت نام کرده در 6 ماه اخیر</div>
      </CardFooter>
    </Card>
  );
}
