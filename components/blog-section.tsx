import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog-data"

export function BlogSection() {
  const posts = getAllBlogPosts().slice(0, 3)

  return (
    <section className="py-20" id="blog">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-primary font-mono text-sm mb-2">Latest Articles</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Blog</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="flex sm:hidden items-center justify-center gap-2 mt-8 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
