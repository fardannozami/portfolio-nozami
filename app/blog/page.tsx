import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog"

interface BlogPageProps {
  searchParams?: {
    page?: string | string[]
  }
}

export const metadata = {
  title: "Blog - Fardan Nozami Ajitama",
  description:
    "Technical articles about backend development, Laravel, Golang, Node.js, and database optimization.",
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  /** ---------------------------
   * SAFE RESOLVE SEARCH PARAMS
   * --------------------------- */
  let params: { page?: string | string[] } | undefined = searchParams

  // Kadang Next.js dev mode kirim Promise, kita unwrap kalau iya
  if (params && typeof params === "object" && "then" in params) {
    params = await params
  }

  /** ---------------------------
   * PAGINATION
   * --------------------------- */
  const posts = await getAllBlogPosts()
  const pageSize = 10

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))

  const pageParam = Array.isArray(params?.page)
    ? params?.page[0]
    : params?.page

  const requestedPage = Number(pageParam) || 1
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages)

  const start = (currentPage - 1) * pageSize
  const pagedPosts = posts.slice(start, start + pageSize)

  /** ---------------------------
   * PAGE RENDER
   * --------------------------- */
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <p className="text-primary font-mono text-sm mb-2">All Articles</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg">
              Sharing my knowledge and experience in backend development, database optimization,
              and software architecture.
            </p>
          </div>

          {/* Cards */}
          {posts.length ? (
            <div className="space-y-6">
              {pagedPosts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-0.5 cursor-pointer group">
                    <CardContent className="p-6">
                      {/* Image */}
                      {post.image && (
                        <div className="mb-4 h-52 overflow-hidden rounded-lg border border-border/60 bg-muted">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Belum ada artikel yang bisa ditampilkan.</p>
          )}

          {/* Pagination */}
          {posts.length > pageSize && (
            <div className="flex items-center justify-between mt-10 text-sm text-muted-foreground">
              <Link
                href={`/blog?page=${Math.max(1, currentPage - 1)}`}
                className={`px-3 py-2 rounded-md border border-border ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:border-primary/60 hover:text-foreground"
                }`}
              >
                Sebelumnya
              </Link>

              <div className="flex items-center gap-2">
                <span>Halaman</span>
                <span className="font-semibold text-foreground">
                  {currentPage} / {totalPages}
                </span>
              </div>

              <Link
                href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`px-3 py-2 rounded-md border border-border ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:border-primary/60 hover:text-foreground"
                }`}
              >
                Selanjutnya
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
