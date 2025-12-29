import { SkeletonCard } from './skeleton-card'

export function Loading() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {'abcdefghi'.split('').map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
