import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-primary placeholder:text-foreground/50 focus-visible:ring-primary/50 aria-invalid:ring-red-500 dark:aria-invalid:ring-red-500 aria-invalid:border-red-500 dark:bg-input/30 flex min-h-22 rounded-md border bg-transparent px-3 py-2 text-base resize-none shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-lg overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
