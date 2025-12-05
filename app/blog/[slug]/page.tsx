import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"

type BlogPostParams = { slug: string }

interface BlogPostPageProps {
  params: BlogPostParams | Promise<BlogPostParams>
}

export const revalidate = 3600

async function resolveParams(params: BlogPostPageProps["params"]): Promise<BlogPostParams> {
  if (typeof (params as Promise<BlogPostParams>).then === "function") {
    return params as Promise<BlogPostParams>
  }
  return params as BlogPostParams
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params)
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} - Fardan Nozami Ajitama`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params)
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <article className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {post.image && (
            <div className="mb-10 overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-[320px] object-cover"
              />
            </div>
          )}

          <div className="prose-custom">
            <MarkdownRenderer content={post.content} />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
