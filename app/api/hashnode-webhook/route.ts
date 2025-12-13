import { createHmac, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { getAllBlogPosts } from "@/lib/blog-data"
import { savePostsToBlob } from "@/lib/storage"

type SignatureParts = {
  timestamp: string
  signature: string
}

function parseSignatureHeader(headerValue: string): SignatureParts | null {
  const parts = headerValue
    .split(",")
    .map((part) => part.split("=", 2))

  const timestamp = parts.find(([key]) => key.trim() === "t")?.[1]
  const signature = parts.find(([key]) => key.trim() === "v1")?.[1]

  if (!timestamp || !signature) return null

  return { timestamp, signature }
}

function verifyHashnodeSignature(headerValue: string, body: string, secret: string) {
  const parsed = parseSignatureHeader(headerValue)
  if (!parsed) return false

  const signedPayload = `${parsed.timestamp}.${body}`
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex")

  const expectedBuffer = Buffer.from(expected, "hex")
  const receivedBuffer = Buffer.from(parsed.signature, "hex")

  if (expectedBuffer.length !== receivedBuffer.length) return false

  return timingSafeEqual(expectedBuffer, receivedBuffer)
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const secret = process.env.HASHNODE_WEBHOOK_SECRET

    if (!secret) {
      console.error("❌ HASHNODE_WEBHOOK_SECRET is not set")
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const signatureHeader = req.headers.get("x-hashnode-signature")
    const legacySecretHeader = req.headers.get("x-hashnode-secret")

    const signatureValid =
      (!!signatureHeader && verifyHashnodeSignature(signatureHeader, rawBody, secret)) ||
      (!!legacySecretHeader && legacySecretHeader === secret)

    if (!signatureValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let eventType: string | undefined
    try {
      const parsedBody = rawBody ? JSON.parse(rawBody) : null
      eventType = parsedBody?.data?.eventType
    } catch {
      // Ignore body parse errors; verification already succeeded.
    }

    console.log(
      `🔥 Webhook received${eventType ? ` (${eventType})` : ""}, refreshing posts...`
    )

    // Raw posts dari Hashnode
    const rawPosts = await getAllBlogPosts()

    // Simpan versi CLEAN ke local file
    await savePostsToBlob(rawPosts)

    console.log("✅ Posts updated locally")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Webhook failed", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
