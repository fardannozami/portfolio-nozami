import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { getAllBlogPostsFromBlob, getBlogPostFromBlob } from "@/lib/blog"
import { formatDate } from "@/lib/date"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { getSeriesPosts, pickRandomPosts, resolveParams } from "./post-helpers"
import { MoreArticlesSection, SeriesSection } from "./post-sections"
import type { BlogPostPageProps } from "./types"

export const revalidate = 3600
export { generateMetadata, generateStaticParams } from "./post-metadata"

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await resolveParams(params)

  // Keep old /blog/:slug links working by redirecting to the new root-level path
  if (slug?.startsWith("blog/")) {
    const cleanSlug = slug.replace(/^blog\//, "")
    redirect(`/${cleanSlug}`)
  }

  const [post, allPosts] = await Promise.all([
    getBlogPostFromBlob(slug),
    getAllBlogPostsFromBlob(),
  ])

  if (!post) {
    notFound()
  }

  const otherPosts = allPosts.filter((item) => item.slug !== post.slug)
  const seriesItems = getSeriesPosts(post, otherPosts)
  const hasSeries = seriesItems.length > 0
  const moreArticles = hasSeries ? [] : pickRandomPosts(otherPosts, 3)

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

          <div className="mt-12">
            {hasSeries ? (
              <SeriesSection
                seriesName={post.series?.name ?? "Article Series"}
                currentSlug={post.slug}
                posts={seriesItems}
              />
            ) : (
              <MoreArticlesSection posts={moreArticles} />
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
