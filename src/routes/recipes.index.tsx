import { allRecipes } from 'content-collections'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/not-found-page'
import { RecipeTable } from '@/components/recipe-table'

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
})

function RouteComponent() {
  return (
    <div>
      <RecipeTable recipes={allRecipes} />
      <ul>
        {allRecipes.map((recipe) => (
          <li key={recipe._meta.fileName}>
            <a href={`/recipes/${recipe._meta.path}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </a>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}
