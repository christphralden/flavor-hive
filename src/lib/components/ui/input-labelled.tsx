"use client"
import * as React from "react"

import { cn } from "@utils/utils"

export interface InputLabelledProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string
}

const InputLabelled = React.forwardRef<HTMLInputElement, InputLabelledProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
     <div className="flex flex-col gap-1">
     <p className="font-medium">{label}</p>
     <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
     </div>
    )
  }
)
InputLabelled.displayName = "InputLabelled"

export { InputLabelled }
