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

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
