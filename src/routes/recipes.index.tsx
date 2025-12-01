import { createFileRoute } from '@tanstack/react-router'
import { allRecipes } from 'content-collections'

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
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
    </div>
  )
}
