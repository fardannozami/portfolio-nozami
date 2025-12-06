import { BlogPost } from "./blog-data"
import { loadPostsFromBlob } from "./storage"

export async function getAllBlogPostsFromBlob(): Promise<BlogPost[]> {
  return await loadPostsFromBlob()
}

export async function getBlogPostFromBlob(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPostsFromBlob()
  return posts.find((p) => p.slug === slug)
}
