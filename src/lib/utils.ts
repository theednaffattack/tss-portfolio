import { clsx, type ClassValue } from 'clsx'
import { createContext, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { allPosts } from 'content-collections'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function createContextFactory<ContextData>(options?: {
  defaultValue?: ContextData | null
  errorMessage?: string
}) {
  const opts = {
    defaultValue: null,
    errorMessage: 'useContext must be used within a Provider',
    ...options,
  }

  const context = createContext<ContextData | null>(opts.defaultValue)

  function useContextFactory(): ContextData {
    const contextValue = useContext(context)
    if (contextValue === null) {
      throw new Error(opts.errorMessage)
    }
    return contextValue
  }

  return [context.Provider, useContextFactory] as const
}

export const postsSortedByDate = allPosts.toSorted(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
)
