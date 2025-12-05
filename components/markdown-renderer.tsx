"use client"

import type React from "react"

import { CodeBlock } from "./code-block"

interface MarkdownRendererProps {
  content: string
}

function formatInline(text: string) {
  // Preserve inline code before applying other formatting
  const placeholders: string[] = []
  let rendered = text.replace(/`([^`]+)`/g, (_match, code) => {
    const placeholder = `__CODE_PLACEHOLDER_${placeholders.length}__`
    placeholders.push(
      `<code class="px-1.5 py-0.5 rounded bg-secondary text-primary font-mono text-sm">${code}</code>`,
    )
    return placeholder
  })

  // Bold text wrapped with **...**
  rendered = rendered.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  // Restore inline code blocks
  placeholders.forEach((html, index) => {
    rendered = rendered.replace(`__CODE_PLACEHOLDER_${index}__`, html)
  })

  return rendered
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
          <h1
            key={i}
            className="text-3xl font-bold text-foreground mt-8 mb-4"
            dangerouslySetInnerHTML={{ __html: formatInline(line.replace("# ", "")) }}
          />,
        )
        i++
        continue
      }

      // Heading 2
      if (line.startsWith("## ")) {
        parts.push(
          <h2
            key={i}
            className="text-2xl font-semibold text-foreground mt-8 mb-3"
            dangerouslySetInnerHTML={{ __html: formatInline(line.replace("## ", "")) }}
          />,
        )
        i++
        continue
      }

      // Heading 3
      if (line.startsWith("### ")) {
        parts.push(
          <h3
            key={i}
            className="text-xl font-semibold text-foreground mt-6 mb-2"
            dangerouslySetInnerHTML={{ __html: formatInline(line.replace("### ", "")) }}
          />,
        )
        i++
        continue
      }

      // Regular paragraph
      if (line.trim()) {
        parts.push(
          <p
            key={i}
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />,
        )
      }

      i++
    }

    return parts
  }

  return <div className="prose-custom">{renderContent()}</div>
}
