"use client"

import type React from "react"

import { CodeBlock } from "./code-block"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse markdown and render with code blocks
  const renderContent = () => {
    const parts: React.ReactNode[] = []
    const lines = content.split("\n")
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Check for code block
      if (line.trim().startsWith("```")) {
        const language = line.trim().replace("```", "") || "text"
        const codeLines: string[] = []
        i++

        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i])
          i++
        }

        parts.push(<CodeBlock key={i} code={codeLines.join("\n").trim()} language={language} />)
        i++
        continue
      }

      // Heading 1
      if (line.startsWith("# ")) {
        parts.push(
          <h1 key={i} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {line.replace("# ", "")}
          </h1>,
        )
        i++
        continue
      }

      // Heading 2
      if (line.startsWith("## ")) {
        parts.push(
          <h2 key={i} className="text-2xl font-semibold text-foreground mt-8 mb-3">
            {line.replace("## ", "")}
          </h2>,
        )
        i++
        continue
      }

      // Heading 3
      if (line.startsWith("### ")) {
        parts.push(
          <h3 key={i} className="text-xl font-semibold text-foreground mt-6 mb-2">
            {line.replace("### ", "")}
          </h3>,
        )
        i++
        continue
      }

      // Regular paragraph
      if (line.trim()) {
        // Handle inline code
        const rendered = line.replace(
          /`([^`]+)`/g,
          '<code class="px-1.5 py-0.5 rounded bg-secondary text-primary font-mono text-sm">$1</code>',
        )
        parts.push(
          <p
            key={i}
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />,
        )
      }

      i++
    }

    return parts
  }

  return <div className="prose-custom">{renderContent()}</div>
}
