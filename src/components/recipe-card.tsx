import { AvatarImage } from '@radix-ui/react-avatar'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { CardImage } from './card-image'
import type { Recipe } from 'content-collections'

export function RecipeCard({ heroImage, title, description }: Recipe) {
  return (
    <Card className="flex flex-col justify-between pt-0 overflow-hidden">
      <CardImage src={`${heroImage}`} />

      <CardHeader className="flex-row gap-4 items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>00 mins to cook</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>View recipe</Button>
      </CardFooter>
    </Card>
  )
}
