import React from "react";
import { cn } from "../utils/cn";

const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const buttonVariants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
}
type Variants = keyof typeof buttonVariants.variant;
type Sizes = keyof typeof buttonVariants.size;


const defaultVariants = {
  variant: "default" as Variants,
  size: "default" as Sizes,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variants,
  size?: Sizes,
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = defaultVariants.variant, size = defaultVariants.size, ...props }, ref) => {
    return <button className={cn(baseStyle, buttonVariants.variant[variant], buttonVariants.size[size])} ref={ref} {...props} />
  },
)
Button.displayName = "Button"
