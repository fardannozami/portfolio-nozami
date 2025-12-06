import { NextResponse } from "next/server"
import { savePostsToLocal } from "@/lib/storage"
import { BlogPost, getAllBlogPosts } from "@/lib/blog-data"

export async function POST(req: Request) {
  try {
    const secret = req.headers.get("x-hashnode-secret")
    if (secret !== process.env.HASHNODE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("🔥 Webhook received, refreshing posts...")

    // Raw posts dari Hashnode
    const rawPosts = await getAllBlogPosts()

    // Simpan versi CLEAN ke local file
    await savePostsToLocal(rawPosts)

    console.log("✅ Posts updated locally")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Webhook failed", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
