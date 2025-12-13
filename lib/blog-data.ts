export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  image?: string
  series?: {
    name: string
    slug?: string
  }
}

const HASHNODE_ENDPOINT = "https://gql.hashnode.com/"
const HASHNODE_HOST = process.env.HASHNODE_HOST

const seriesFragment = (includeSeries: boolean) =>
  includeSeries
    ? `
            series {
              name
              slug
            }
    `
    : ""

// Query list posts
const HASHNODE_POSTS_QUERY = (nonce: string, includeSeries: boolean) => `
  query PublicationPosts($host: String!, $after: String) {
    _cacheBuster_${nonce}: __typename
    publication(host: $host) {
      posts(first: 100, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            slug
            title
            brief
            publishedAt
            readTimeInMinutes
            tags { name }
            coverImage { url }
            content { markdown }
            ${seriesFragment(includeSeries)}
          }
        }
      }
    }
  }
`;

// Query single post
const HASHNODE_POST_QUERY = (nonce: string, includeSeries: boolean) => `
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
        ${seriesFragment(includeSeries)}
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
  series?: { name?: string | null; slug?: string | null } | null
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
    series: node.series?.name
      ? {
          name: node.series.name,
          slug: node.series.slug ?? undefined,
        }
      : undefined,
  }
}

async function fetchWithSeriesFallback<T>(
  queryBuilder: (nonce: string, includeSeries: boolean) => string,
  variables: Record<string, unknown>
): Promise<T | null> {
  const nonce = Date.now().toString()

  const withSeries = await requestHashnode<T>(queryBuilder(nonce, true), variables)
  if (withSeries) return withSeries

  return await requestHashnode<T>(queryBuilder(nonce, false), variables)
}

// Fetch ALL posts (fresh always)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchWithSeriesFallback<HashnodePostsResponse>(HASHNODE_POSTS_QUERY, {
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
  const data = await fetchWithSeriesFallback<HashnodePostResponse>(HASHNODE_POST_QUERY, {
    host: HASHNODE_HOST,
    slug,
  })


  const post = mapHashnodePost(data?.publication?.post)
  return post ?? undefined
}
