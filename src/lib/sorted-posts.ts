import { allPosts } from "content-collections";

export const postsSortedByDate = allPosts.toSorted(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
);
