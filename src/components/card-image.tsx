import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const CardImage = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn('h-60 w-full object-cover', className)}
    {...props}
  />
))
CardImage.displayName = 'CardImage'
