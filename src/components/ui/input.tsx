import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-foreground/50 selection:bg-primary selection:text-primary-foreground md:placeholder:text-sm sm:placeholder:text-sm placeholder:text-xs border-primary flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[1px]",
        "aria-invalid:ring-red-500 dark:aria-invalid:ring-red-500 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
