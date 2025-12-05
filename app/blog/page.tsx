import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog-data"

export const metadata = {
  title: "Blog - Fardan Nozami Ajitama",
  description: "Technical articles about backend development, Laravel, Golang, Node.js, and database optimization.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <p className="text-primary font-mono text-sm mb-2">All Articles</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg">
              Sharing my knowledge and experience in backend development, database optimization, and software
              architecture.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
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
        </div>
      </div>
      <Footer />
    </main>
  )
}
