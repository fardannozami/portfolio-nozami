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

// Query list posts
const HASHNODE_POSTS_QUERY = (nonce: string) => `
  query PublicationPosts($host: String!) {
    _cacheBuster_${nonce}: __typename
    publication(host: $host) {
      posts(first: 10) {
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

// Query single post
const HASHNODE_POST_QUERY = (nonce: string) => `
  query PublicationPost($host: String!, $slug: String!) {
    _cacheBuster_${nonce}: __typename
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


// Types from API
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
      edges?: { node?: HashnodePost | null }[]
    } | null
  } | null
}

type HashnodePostResponse = {
  publication?: {
    post?: HashnodePost | null
  } | null
}

// Fetch helper — ALWAYS NO CACHE
async function requestHashnode<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  if (!HASHNODE_HOST) return null

  try {
    const response = await fetch(HASHNODE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // 👈 anti-cache mode
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

// Mapping HashnodePost → BlogPost
function mapHashnodePost(node: HashnodePost | null | undefined): BlogPost | null {
  if (!node?.slug || !node.title) return null

  return {
    slug: node.slug,
    title: node.title,
    excerpt: node.brief || node.title,
    content: node.content?.markdown ?? "",
    date: node.publishedAt,
    readTime: node.readTimeInMinutes
      ? `${node.readTimeInMinutes} min read`
      : "5 min read",
    tags: (node.tags ?? []).map((tag) => tag?.name).filter(Boolean) as string[],
    image: node.coverImage?.url ?? undefined,
  }
}

// Fetch ALL posts (fresh always)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = HASHNODE_POSTS_QUERY(Date.now().toString())

  const data = await requestHashnode<HashnodePostsResponse>(query, {
    host: HASHNODE_HOST,
  })

  const posts =
    data?.publication?.posts?.edges
      ?.map((edge) => mapHashnodePost(edge?.node))
      .filter(Boolean)
      .map((p) => p as BlogPost) ?? []

  // sort newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Fetch SINGLE POST (fresh always)
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const query = HASHNODE_POST_QUERY(Date.now().toString())

  const data = await requestHashnode<HashnodePostResponse>(query, {
    host: HASHNODE_HOST,
    slug,
  })


  const post = mapHashnodePost(data?.publication?.post)
  return post ?? undefined
}
