import { writeFile, mkdir, readFile } from "fs/promises"
import path from "path"

const POSTS_PATH = path.join("/tmp", "posts.json")

export async function savePostsToLocal(posts: any) {
  try {
    const dir = path.dirname(POSTS_PATH)

    // Create folder kalau belum ada
    await mkdir(dir, { recursive: true })

    await writeFile(POSTS_PATH, JSON.stringify(posts, null, 2), "utf8")

    return POSTS_PATH
  } catch (error) {
    console.error("❌ Failed to save file:", error)
    throw error
  }
}

export async function loadLocalPosts() {
  try {
    const raw = await readFile(POSTS_PATH, "utf8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}
