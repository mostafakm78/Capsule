import { dashboardCreateCapsuleTab } from "@/lib/types";

type TabButtonProps = {
  id: dashboardCreateCapsuleTab
  currentTab: dashboardCreateCapsuleTab
  setTab: React.Dispatch<React.SetStateAction<dashboardCreateCapsuleTab>>;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

export function TabButton({ id, currentTab, setTab, icon: Icon, children } : TabButtonProps) {
  const isActive = currentTab === id;
  return (
    <div
      onClick={() => setTab(id)}
      className={`group flex items-center gap-2 border-2 rounded-xl text-lg p-4 cursor-pointer duration-300 ${
        isActive
          ? 'bg-white dark:bg-slate-900 border-primary text-primary'
          : 'bg-white dark:bg-slate-900 border-white dark:border-slate-900 text-foreground/50 hover:border-primary hover:text-primary/70 dark:hover:border-primary'
      }`}
    >
      <div
        className={`p-1 rounded-md duration-300 ${
          isActive ? 'bg-primary text-background group-hover:bg-primary/70' : 'bg-foreground/50 text-background group-hover:bg-primary/70'
        }`}
      >
        <Icon className="text-2xl" />
      </div>
      <span className="text-lg font-bold">{children}</span>
    </div>
  );
}
