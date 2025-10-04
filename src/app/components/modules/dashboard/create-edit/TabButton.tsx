import { dashboardCreateCapsuleTab } from '@/lib/types';

type TabButtonProps = {
  id: dashboardCreateCapsuleTab;
  currentTab: dashboardCreateCapsuleTab;
  setTab: React.Dispatch<React.SetStateAction<dashboardCreateCapsuleTab>>;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

/**
 * TabButton
 *  - Visual/interactive tab selector used in the create/edit capsule flow.
 *  - Receives:
 *      • id: the tab this button represents
 *      • currentTab: the active tab, to determine selected styles
 *      • setTab: state setter passed down to update the active tab
 *      • icon: an icon component rendered inside the tab
 *      • children: the label/content of the tab
 *  - Behavior:
 *      • On click, sets the current tab to this tab's id.
 *  - Accessibility note:
 *      • This is a clickable <div>; if keyboard navigation/ARIA is needed later,
 *        consider adding role="button" and keyboard handlers (without changing styles).
 */
export function TabButton({ id, currentTab, setTab, icon: Icon, children }: TabButtonProps) {
  // Determine whether this tab is currently active to toggle styles.
  const isActive = currentTab === id;

  return (
    // Clickable container for the tab item; updates the selected tab on click.
    <div
      onClick={() => setTab(id)}
      className={`group flex items-center gap-2 border-2 rounded-xl text-lg p-4 cursor-pointer duration-300 ${
        isActive ? 'bg-white dark:bg-slate-900 border-primary text-primary' : 'bg-white dark:bg-slate-900 border-white dark:border-slate-900 text-foreground/50 hover:border-primary hover:text-primary/70 dark:hover:border-primary'
      }`}
    >
      {/* Icon wrapper; switches background/text color based on active state */}
      <div className={`p-1 rounded-md duration-300 ${isActive ? 'bg-primary text-background group-hover:bg-primary/70' : 'bg-foreground/50 text-background group-hover:bg-primary/70'}`}>
        {/* Render the provided icon component at a consistent size */}
        <Icon className="text-2xl" />
      </div>

      {/* Tab label/content (children) with emphasized typography */}
      <span className="text-lg font-bold">{children}</span>
    </div>
  );
}
