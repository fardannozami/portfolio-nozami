import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/date"
import type { BlogPost } from "@/lib/blog-data"

type SeriesSectionProps = {
  seriesName: string
  currentSlug: string
  posts: BlogPost[]
}

export function SeriesSection({ seriesName, currentSlug, posts }: SeriesSectionProps) {
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
                  className={`text-base font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
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

export function MoreArticlesSection({ posts }: { posts: BlogPost[] }) {
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
