import { put } from "@vercel/blob"

export async function savePostsToBlob(posts: any) {
  const json = JSON.stringify(posts, null, 2)

  const { url } = await put("posts.json", Buffer.from(json), {
    contentType: "application/json",
    access: "public", // atau "private"
  })

  return url // link permanen
}

export async function loadPostsFromBlob() {
  try {
    const res = await fetch(process.env.BLOB_BASE_URL + "/posts.json")

    if (!res.ok) {
      return []
    }

    return await res.json()
  } catch (err) {
    return []
  }
}
