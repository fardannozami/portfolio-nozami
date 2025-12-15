import { getAllBlogPostsFromBlob, getBlogPostFromBlob } from "@/lib/blog"
import type { Metadata } from "next"

import { resolveParams } from "./post-helpers"
import type { BlogPostPageProps } from "./types"

const defaultOgImage = "/ajitama.png"

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
