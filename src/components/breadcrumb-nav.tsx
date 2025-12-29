import { Link, isMatch, useLocation, useMatches } from '@tanstack/react-router'
import { House } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react/jsx-runtime'

export const BreadcrumbNav = () => {
  const location = useLocation()
  const matches = useMatches()
  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, 'loaderData.crumb'),
  )

  const items = matchesWithCrumbs.map(({ pathname, loaderData }) => {
    return {
      href: pathname,
      label: loaderData?.crumb,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <Link to={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
