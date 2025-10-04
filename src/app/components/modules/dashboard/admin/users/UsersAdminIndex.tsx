import Users from './Users';

export default function UsersAdminIndex() {
  return (
    // Page-level section wrapping the admin "Users" area
    <section className="flex flex-col h-full gap-10">
      {/* Content column: page header + users table area */}
      <div className="flex flex-col h-full justify-start gap-10">
        {/* Page title with decorative bullet */}
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربرای سایت</span>

        {/* Main content block that renders the Users list component */}
        <div className="flex flex-col h-full justify-start gap-2">
          {/* Users table + filters (delegated to the Users component) */}
          <Users />
        </div>
      </div>
    </section>
  );
}
