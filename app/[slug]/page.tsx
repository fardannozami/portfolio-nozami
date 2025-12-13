import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getAllBlogPostsFromBlob, getBlogPostFromBlob } from "@/lib/blog"
import type { BlogPost } from "@/lib/blog-data"
import { formatDate } from "@/lib/date"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

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

function getSeriesPosts(current: BlogPost, otherPosts: BlogPost[]): BlogPost[] {
  const currentSeries = current.series
  if (!currentSeries) return []

  const sameSeries = otherPosts.filter((post) => {
    if (!post.series) return false
    if (currentSeries.slug && post.series.slug) {
      return post.series.slug === currentSeries.slug
    }
    return post.series.name === currentSeries.name
  })

  const uniquePosts = [...sameSeries, current].filter(
    (post, index, arr) => arr.findIndex((item) => item.slug === post.slug) === index
  )

  return uniquePosts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

function pickRandomPosts(posts: BlogPost[], count: number): BlogPost[] {
  if (posts.length <= count) return posts

  const copy = [...posts]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

function SeriesSection({
  seriesName,
  currentSlug,
  posts,
}: {
  seriesName: string
  currentSlug: string
  posts: BlogPost[]
}) {
  if (!posts.length) return null

  return (
    <section className="rounded-2xl border border-border bg-card/60 shadow-sm p-6">
      <p className="text-primary font-mono text-xs mb-2">Article Series</p>
      <h2 className="text-2xl font-semibold text-foreground mb-4">{seriesName}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Lanjutkan membaca seri ini untuk melihat perjalanan lengkapnya.
      </p>
      <ol className="space-y-4">
        {posts.map((item, index) => {
          const isActive = item.slug === currentSlug
          return (
            <li
              key={item.slug}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-4"
            >
              <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {index + 1}
              </span>
              <div className="space-y-1">
                <Link
                  href={`/${item.slug}`}
                  className={`text-base font-semibold transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                >
                  {item.title}
                </Link>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(item.date, { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {item.readTime}
                  </span>
                  {isActive && (
                    <Badge variant="secondary" className="text-[11px]">
                      Current article
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function MoreArticlesSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-primary font-mono text-xs mb-1">More Articles</p>
          <h2 className="text-2xl font-semibold text-foreground">You might also like</h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`}>
            <Card className="h-full border-border bg-card/60 hover:border-primary/50 transition-all hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(item.date, { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {item.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
