import { Skeleton as ShadSkeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { title } from 'process'
import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'

export function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row gap-4 items-center">
        <ShadSkeleton className="w-12 h-12 rounded-full" />
        <ShadSkeleton className="grow h-6 rounded-full" />
      </CardHeader>
      <CardContent>
        <ShadSkeleton className="h-4 w-1/2 mt-4" />
        <ShadSkeleton className="h-4 w-1/2 mt-4" />
        <ShadSkeleton className="h-4 w-1/2 mt-4" />
      </CardContent>
      <CardFooter>
        <ShadSkeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  )
}
