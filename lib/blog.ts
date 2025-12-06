import { BlogPost } from "./blog-data"
import { loadPostsFromBlob } from "./storage"

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await loadPostsFromBlob()
}
