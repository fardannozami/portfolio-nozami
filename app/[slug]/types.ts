export type BlogPostParams = { slug: string }

export interface BlogPostPageProps {
  params: BlogPostParams | Promise<BlogPostParams>
}
