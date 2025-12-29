import { Outlet, createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/recipes')({
  component: RouteComponent,
  loader: () => {
    return {
      crumb: 'Recipes',
    }
  },
})
