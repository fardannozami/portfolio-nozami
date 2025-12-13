import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getAllBlogPostsFromBlob, getBlogPostFromBlob } from "@/lib/blog"
import { formatDate } from "@/lib/date"

type BlogPostParams = { slug: string }

interface BlogPostPageProps {
  params: BlogPostParams | Promise<BlogPostParams>
}

export const revalidate = 3600

const defaultOgImage = "/ajitama.png"

async function resolveParams(params: BlogPostPageProps["params"]): Promise<BlogPostParams> {
  if (typeof (params as Promise<BlogPostParams>).then === "function") {
    return params as Promise<BlogPostParams>
  }
  return params as BlogPostParams
}

export async function generateStaticParams() {
  const posts = await getAllBlogPostsFromBlob()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params)
  const normalizedSlug = slug?.startsWith("blog/") ? slug.replace(/^blog\//, "") : slug
  const post = await getBlogPostFromBlob(normalizedSlug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "Artikel yang kamu cari tidak ditemukan.",
      openGraph: {
        title: "Post Not Found",
        description: "Artikel yang kamu cari tidak ditemukan.",
        url: "/blog",
        siteName: "Fardan Nozami Ajitama",
        images: [
          {
            url: defaultOgImage,
            width: 1200,
            height: 630,
            alt: "Fardan Nozami Ajitama",
          },
        ],
      },
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${normalizedSlug}`,
    },
    openGraph: {
      title: `${post.title} - ajitama.dev`,
      description: post.excerpt,
      url: `/${normalizedSlug}`,
      type: "article",
      siteName: "Fardan Nozami Ajitama",
      publishedTime: post.date,
      authors: ["Fardan Nozami Ajitama"],
      tags: post.tags,
      images: [
        {
          url: post.image ?? defaultOgImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params)

  // Keep old /blog/:slug links working by redirecting to the new root-level path
  if (slug?.startsWith("blog/")) {
    const cleanSlug = slug.replace(/^blog\//, "")
    redirect(`/${cleanSlug}`)
  }

  const post = await getBlogPostFromBlob(slug)

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
                {formatDate(post.date, {
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
                className="w-full h-80 object-cover"
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
