export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  image?: string
}

const HASHNODE_ENDPOINT = "https://gql.hashnode.com/"
const HASHNODE_HOST = process.env.HASHNODE_HOST
const HASHNODE_REVALIDATE_SECONDS = 3600

export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-rest-api-laravel",
    title: "Building Scalable REST API with Laravel",
    excerpt:
      "Learn how to build a robust and scalable REST API using Laravel with best practices for authentication, validation, and error handling.",
    date: "2024-12-01",
    readTime: "8 min read",
    tags: ["Laravel", "PHP", "REST API"],
    content: `
# Building Scalable REST API with Laravel

When building APIs with Laravel, there are several best practices you should follow to ensure scalability and maintainability.

## Project Setup

First, create a new Laravel project with the API preset:

\`\`\`bash
composer create-project laravel/laravel api-project
cd api-project
php artisan install:api
\`\`\`

## Creating API Resources

Laravel's API Resources provide a transformation layer between your models and JSON responses:

\`\`\`php
<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
\`\`\`

## Rate Limiting

Implement rate limiting to protect your API from abuse:

\`\`\`php
// In RouteServiceProvider.php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
\`\`\`

## Conclusion

By following these practices, you'll have a solid foundation for building scalable APIs with Laravel.
    `,
  },
  {
    slug: "concurrency-patterns-golang",
    title: "Concurrency Patterns in Golang",
    excerpt:
      "Deep dive into Go's concurrency model with goroutines and channels. Learn practical patterns for building concurrent applications.",
    date: "2024-11-15",
    readTime: "12 min read",
    tags: ["Golang", "Concurrency", "Performance"],
    content: `
# Concurrency Patterns in Golang

Go's concurrency model, built on goroutines and channels, makes it easy to write concurrent programs.

## Goroutines

Goroutines are lightweight threads managed by the Go runtime:

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 9 jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 9; a++ {
        <-results
    }
}
\`\`\`

## Fan-Out, Fan-In Pattern

This pattern distributes work across multiple goroutines:

\`\`\`go
func fanOut(input <-chan int, n int) []<-chan int {
    outputs := make([]<-chan int, n)
    for i := 0; i < n; i++ {
        outputs[i] = process(input)
    }
    return outputs
}

func fanIn(inputs ...<-chan int) <-chan int {
    output := make(chan int)
    var wg sync.WaitGroup
    
    for _, ch := range inputs {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                output <- v
            }
        }(ch)
    }
    
    go func() {
        wg.Wait()
        close(output)
    }()
    
    return output
}
\`\`\`

## Conclusion

Understanding these patterns will help you build efficient concurrent applications in Go.
    `,
  },
  {
    slug: "postgresql-performance-optimization",
    title: "PostgreSQL Performance Optimization Tips",
    excerpt:
      "Essential tips and techniques for optimizing PostgreSQL database performance including indexing, query optimization, and configuration tuning.",
    date: "2024-10-28",
    readTime: "10 min read",
    tags: ["PostgreSQL", "Database", "Performance"],
    content: `
# PostgreSQL Performance Optimization Tips

Optimizing PostgreSQL performance is crucial for applications handling large datasets.

## Indexing Strategies

Create indexes wisely to speed up queries:

\`\`\`sql
-- B-tree index for equality and range queries
CREATE INDEX idx_users_email ON users(email);

-- Partial index for specific conditions
CREATE INDEX idx_active_users ON users(created_at) 
WHERE status = 'active';

-- Composite index for multi-column queries
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- GIN index for JSONB columns
CREATE INDEX idx_products_metadata ON products USING GIN(metadata);
\`\`\`

## Query Optimization

Use EXPLAIN ANALYZE to understand query performance:

\`\`\`sql
EXPLAIN ANALYZE 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
\`\`\`

## Connection Pooling

Configure PgBouncer for connection pooling:

\`\`\`ini
[databases]
mydb = host=127.0.0.1 port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
\`\`\`

## Conclusion

Regular monitoring and optimization ensure your PostgreSQL database performs optimally.
    `,
  },
]

const HASHNODE_POSTS_QUERY = `
  query PublicationPosts($host: String!) {
    publication(host: $host) {
      posts(first: 20) {
        edges {
          node {
            slug
            title
            brief
            publishedAt
            readTimeInMinutes
            tags {
              name
            }
            coverImage {
              url
            }
            content {
              markdown
            }
          }
        }
      }
    }
  }
`

const HASHNODE_POST_QUERY = `
  query PublicationPost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        slug
        title
        brief
        publishedAt
        readTimeInMinutes
        tags {
          name
        }
        coverImage {
          url
        }
        content {
          markdown
        }
      }
    }
  }
`

type HashnodePost = {
  slug: string
  title: string
  brief: string
  publishedAt: string
  readTimeInMinutes?: number | null
  tags?: { name?: string | null }[] | null
  coverImage?: { url?: string | null } | null
  content?: { markdown?: string | null } | null
}

type HashnodePostsResponse = {
  publication?: {
    posts?: {
      edges?: {
        node?: HashnodePost | null
      }[]
    } | null
  } | null
}

type HashnodePostResponse = {
  publication?: {
    post?: HashnodePost | null
  } | null
}

async function requestHashnode<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  if (!HASHNODE_HOST) {
    return null
  }

  try {
    const response = await fetch(HASHNODE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: HASHNODE_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      throw new Error(`Hashnode request failed with status ${response.status}`)
    }

    const json = (await response.json()) as { data?: T; errors?: { message: string }[] }

    if (json.errors?.length) {
      throw new Error(json.errors.map((error) => error.message).join(", "))
    }

    return json.data ?? null
  } catch (error) {
    console.error("[hashnode] failed to fetch data", error)
    return null
  }
}

function mapHashnodePost(node: HashnodePost | null | undefined): BlogPost | null {
  if (!node?.slug || !node.title) {
    return null
  }

  return {
    slug: node.slug,
    title: node.title,
    excerpt: node.brief || node.title,
    content: node.content?.markdown ?? "",
    date: node.publishedAt,
    readTime: node.readTimeInMinutes ? `${node.readTimeInMinutes} min read` : "5 min read",
    tags: (node.tags ?? []).map((tag) => tag?.name).filter(Boolean) as string[],
    image: node.coverImage?.url ?? undefined,
  }
}

async function fetchHashnodePosts(): Promise<BlogPost[]> {
  const data = await requestHashnode<HashnodePostsResponse>(HASHNODE_POSTS_QUERY, { host: HASHNODE_HOST })

  if (!data?.publication?.posts?.edges?.length) {
    return []
  }

  const posts =
    data.publication.posts.edges
      ?.map((edge) => mapHashnodePost(edge?.node))
      .filter(Boolean)
      .map((post) => post as BlogPost) ?? []

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function fetchHashnodePost(slug: string): Promise<BlogPost | undefined> {
  const list = await fetchHashnodePosts()
  const cached = list.find((post) => post.slug === slug && post.content)

  if (cached) {
    return cached
  }

  const data = await requestHashnode<HashnodePostResponse>(HASHNODE_POST_QUERY, { host: HASHNODE_HOST, slug })
  const post = mapHashnodePost(data?.publication?.post)

  return post ?? undefined
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const hashnodePost = await fetchHashnodePost(slug)

  if (hashnodePost) {
    return hashnodePost
  }

  return blogPosts.find((post) => post.slug === slug)
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const hashnodePosts = await fetchHashnodePosts()

  if (hashnodePosts.length) {
    return hashnodePosts
  }

  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
