import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useReducer, useState } from 'react'
import type { Recipe } from 'content-collections'
import { useNavigate } from '@tanstack/react-router'

// type Recipe = typeof allRecipes
// type Recipe = {
//   pubDate: string
//   title: string
//   description: string
//   heroImage: string
// }
const defaultData: Recipe = [
  {
    title: 'Default Title 1',
    description: 'default description 1',
    heroImage: '',
    pubDate: 'Feb 1 2025',
  },
  {
    title: 'Default Title 2',
    description: 'default description 2',
    heroImage: '',
    pubDate: 'Feb 1 2025',
  },
  {
    title: 'Default Title 3',
    description: 'default description 3',
    heroImage: '',
    mdx: '',
    content: '',
    pubDate: undefined,
    _meta: undefined,
  },
]

const columnHelper = createColumnHelper<Recipe>()

const columns = [
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('pubDate', {
    header: () => 'Pub. Date',
    cell: (info) => info.renderValue()?.toDateString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('heroImage', {
    header: () => <span>Image</span>,
    footer: (info) => info.column.id,
  }),
]

export function RecipeTable({ recipes }: { recipes: Array<Recipe> }) {
  const [data, _setData] = useState(() => [...recipes])
  const rerender = useReducer(() => ({}), {})[1]
  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleRowClick = (linkPath: string) => {
    // Perform logic here
    console.log('Button clicked, navigating now...')

    // Imperative navigation
    navigate({ to: `${linkPath}` })
  }

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original._meta.path)}
              style={{ cursor: 'pointer' }} // Add a pointer cursor for usability
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.id == 'heroImage' ? (
                    <img src={cell.row.original.heroImage} width="100px" />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}
