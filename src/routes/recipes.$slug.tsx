/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { allRecipes } from 'content-collections'

import { Mdx } from '@/components/mdx-components'
import { buttonVariants } from '@/components/ui/button'
import { seo } from '@/lib/seo'
import { cn, formatDate } from '@/lib/utils'

export const Route = createFileRoute('/recipes/$slug')({
  beforeLoad: () => ({
    allRecipes,
  }),
  loader: async ({ params, context: { allRecipes } }) => {
    const slug = params.slug
    const recipe = allRecipes.find((recipe) => recipe._meta.path === slug)
    if (!recipe) {
      throw redirect({
        to: '/recipes',
      })
    }

    return { crumb: `${recipe.title}`, recipe }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          ...seo({
            title: `${loaderData.recipe.title} | Eddie Naff Recipes`,
            description: loaderData.recipe.description,
          }),
        ]
      : [],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { recipe } = Route.useLoaderData()
  return (
    <section className="">
      <article className="container relative max-w-3xl">
        <Link
          to="/recipes"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-[-200px] top-30 hidden xl:inline-flex',
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all recipes
        </Link>
        {/* TODO:  */}
        {/* <div className="hidden text-sm xl:block"> */}
        {/*   <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10"> */}
        {/*     <TableOfContents toc={toc} /> */}
        {/*   </div> */}
        {/* </div> */}
        <div>
          <img src={recipe.heroImage} width="350px" height="200px" alt="" />
        </div>
        <h1 className="my-4 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {recipe.title}
        </h1>{' '}
        <div>
          {recipe.pubDate && (
            <time
              dateTime={recipe.pubDate.toString()}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(recipe.pubDate.toString())}
            </time>
          )}
        </div>
        <Mdx code={recipe.mdx} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            to="/recipes"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all recipes
          </Link>
        </div>
      </article>
    </section>
  )
}
