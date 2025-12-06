import { BlogPost } from "./blog-data"
import { loadLocalPosts } from "./storage"

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await loadLocalPosts()
}
