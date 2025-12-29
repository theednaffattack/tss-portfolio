import { useMemo, useState } from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { allRecipes } from 'content-collections'
import { Loading } from '@/components/loading'
import { NotFoundPage } from '@/components/not-found-page'
import RecipeCardLink from '@/components/recipe-card-link'
import FilterComponent from '@/components/filter-component'

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
  pendingComponent: Loading,
})

function RouteComponent() {
  const [filters, setFilters] = useState({ search: '', category: 'All' })

  interface Filter {
    search: string
    category: string
  }

  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters)
  }

  // Use useMemo to re-calculate filtered products only when filters or data change
  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const searchMatch = recipe.title
        .toLowerCase()
        .includes(filters.search.toLowerCase())
      const categoryMatch =
        filters.category === 'All' || recipe.title === filters.category
      return searchMatch && categoryMatch
    })
  }, [filters]) // Dependencies: only recalculate if 'filters' changes
  return (
    <div>
      <div>
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <li key={recipe._meta.fileName}>
            <Link to={`/recipes/${recipe._meta.path}`}>
              <RecipeCardLink
                {...recipe}
                title={recipe.title}
                description={recipe.description}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}
