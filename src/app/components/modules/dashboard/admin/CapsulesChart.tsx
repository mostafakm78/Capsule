'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A multiple line chart';

const chartData = [
  { month: 'فروردین', desktop: 686, mobile: 80 },
  { month: 'اردیبهشت', desktop: 305, mobile: 200 },
  { month: 'خرداد', desktop: 237, mobile: 120 },
  { month: 'تیر', desktop: 73, mobile: 590 },
  { month: 'مرداد', desktop: 509, mobile: 130 },
  { month: 'شهریور', desktop: 214, mobile: 340 },
];

const chartConfig = {
  desktop: {
    label: 'دسکتاپ',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'موبایل',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function CapsulesChart() {
  return (
    <Card className="w-full h-full border-none shadow-none bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle>نمودار کاربرای سایت</CardTitle>
        <CardDescription>مرداد - شهریور 1404</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid stroke="color-mix(in oklch, var(--foreground) 20%, transparent)" vertical={false} />
            <XAxis dataKey="month" tickLine={true} axisLine={true} tickMargin={10} tickFormatter={(value) => value.slice(0 , 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={true} />
            <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={true} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center justify-center gap-2 leading-none font-medium">
              <TrendingUp className="h-4 w-4" />
              5 درصد افزایش کاربران
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">Showing تمام کاربران در 1 ماه گذشته</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
