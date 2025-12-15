import type { BlogPost } from "@/lib/blog-data"

import type { BlogPostPageProps, BlogPostParams } from "./types"

export async function resolveParams(params: BlogPostPageProps["params"]): Promise<BlogPostParams> {
  if (typeof (params as Promise<BlogPostParams>).then === "function") {
    return params as Promise<BlogPostParams>
  }
  return params as BlogPostParams
}

export function getSeriesPosts(current: BlogPost, otherPosts: BlogPost[]): BlogPost[] {
  const currentSeries = current.series
  if (!currentSeries) return []

  const sameSeries = otherPosts.filter((post) => {
    if (!post.series) return false
    if (currentSeries.slug && post.series.slug) {
      return post.series.slug === currentSeries.slug
    }
    return post.series.name === currentSeries.name
  })

  const uniquePosts = [...sameSeries, current].filter(
    (post, index, arr) => arr.findIndex((item) => item.slug === post.slug) === index
  )

  return uniquePosts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export function pickRandomPosts(posts: BlogPost[], count: number): BlogPost[] {
  if (posts.length <= count) return posts

  const copy = [...posts]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}
