'use client';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayButton, getDefaultClassNames } from 'react-day-picker';
import { DayPicker } from 'react-day-picker/persian';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setCapsule } from '@/app/store/editOrcreateSlice';
import { useAppSelector } from '@/app/hooks/hook';
import { useEffect, useRef, useState } from 'react';

/**
 * CalendarHijri
 * - High-level wrapper that renders a single-date Persian (Jalali) calendar.
 * - Keeps local selected date state and syncs the selection into Redux:
 *   • On selection, writes the ISO string to `capsule.access.unlockAt`.
 * - Disables past days (cannot pick a date earlier than today).
 * - Uses the styled <Calendar> wrapper below for consistent UI/theming.
 */
export function CalendarHijri() {
  // Local state for currently selected date (defaults to today)
  const [date, setDate] = useState<Date | undefined>(new Date());
  // Access current capsule slice (to merge on update)
  const capsule = useAppSelector((state) => state.editOrcreate);
  const dispatch = useDispatch();

  // Normalize "today" to midnight to simplify "past date" comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Calendar
      // Single date selection mode
      mode="single"
      // Initial month to show when mounted
      defaultMonth={date}
      // Controlled selected date
      selected={date}
      // When a date is selected:
      //  - update local state
      //  - dispatch to Redux to set `unlockAt` as ISO string
      onSelect={(selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
          dispatch(
            setCapsule({
              ...capsule.capsule,
              access: { ...capsule.capsule?.access, unlockAt: selectedDate.toISOString() },
            })
          );
        }
      }}
      // Base calendar styling
      className="rounded-lg border shadow-sm"
      // Disable all dates before today (no past selections)
      disabled={(day) => day < today}
    />
  );
}

/**
 * Calendar
 * - A styled wrapper around `react-day-picker` with:
 *   • Default outside days visibility.
 *   • Custom caption layout (label).
 *   • Unified button variants for nav controls.
 *   • Overridden classNames for layout + Tailwind integration.
 *   • Custom Chevron icons compatible with RTL/LTR.
 * - Accepts an optional `disabled(day)` predicate to disable specific dates.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  disabled,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  disabled?: (day: Date) => boolean;
}) {
  // Base DayPicker class names (library defaults) for extension
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        // Overall container styling w/ CSS variables for cell size
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        // Flip chevrons for RTL where needed
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      disabled={disabled}
      // Month formatter override; keep others unchanged if provided
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      // Tailwind-friendly className map for DayPicker internals
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), 'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none', defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), 'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none', defaultClassNames.button_next),
        month_caption: cn('flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)', defaultClassNames.month_caption),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn('text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none', defaultClassNames.weekday),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        day: cn('relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none', defaultClassNames.day),
        ...classNames,
      }}
      // Component overrides:
      //  • Custom DayButton uses our Button component to unify styles/behaviors
      //  • Chevron icon chooses left/right/down glyph based on orientation
      components={{
        DayButton: CalendarDayButton,
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
          if (orientation === 'right') return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
          return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}

/**
 * CalendarDayButton
 * - Replaces the default day cell button with the app's <Button/> component.
 * - Preserves DayPicker semantics via props + data-attributes:
 *   • data-selected-single / data-range-* enable fine-grained styling states.
 *   • Uses a ref to auto-focus the "focused" day for keyboard navigation.
 * - For accessibility/styling, all state comes from DayPicker `modifiers`.
 */
function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  // Base DayPicker day class names (for merging)
  const defaultClassNames = getDefaultClassNames();
  // Ref to programmatically focus the button when DayPicker marks it "focused"
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      // Useful for debugging/testing: human-readable date on the node
      data-day={day.date.toLocaleDateString()}
      // Flags for different selection states (single vs. range)
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      // Disable interaction when the date is disabled by DayPicker
      disabled={modifiers.disabled}
      // Tailwind classes for selected/range/focus visuals; merged with defaults
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}
