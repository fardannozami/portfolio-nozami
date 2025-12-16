"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language: string
}

const languageColors: Record<string, string> = {
  php: "text-purple-400",
  go: "text-cyan-400",
  sql: "text-yellow-400",
  bash: "text-green-400",
  javascript: "text-yellow-300",
  typescript: "text-blue-400",
  ini: "text-orange-400",
}

// Simple syntax highlighting
function highlightCode(code: string, language: string): string {
  let highlighted = code
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Use placeholders so later replacements don't touch already injected HTML
  const placeholders: { token: string; value: string }[] = []

  // Keywords based on language
  const keywords: Record<string, string[]> = {
    php: [
      "namespace",
      "use",
      "class",
      "function",
      "public",
      "private",
      "protected",
      "return",
      "if",
      "else",
      "foreach",
      "for",
      "while",
      "new",
      "extends",
      "implements",
      "static",
      "const",
      "array",
    ],
    go: [
      "package",
      "import",
      "func",
      "type",
      "struct",
      "interface",
      "return",
      "if",
      "else",
      "for",
      "range",
      "go",
      "defer",
      "chan",
      "make",
      "var",
      "const",
      "select",
      "case",
      "default",
    ],
    sql: [
      "SELECT",
      "FROM",
      "WHERE",
      "JOIN",
      "LEFT",
      "RIGHT",
      "INNER",
      "ON",
      "CREATE",
      "INDEX",
      "TABLE",
      "INSERT",
      "UPDATE",
      "DELETE",
      "GROUP",
      "BY",
      "ORDER",
      "HAVING",
      "COUNT",
      "AND",
      "OR",
      "AS",
      "USING",
      "GIN",
      "DESC",
      "ASC",
      "EXPLAIN",
      "ANALYZE",
    ],
    bash: ["cd", "composer", "php", "artisan", "npm", "yarn", "git"],
    javascript: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "async",
      "await",
      "import",
      "export",
      "from",
      "class",
      "new",
    ],
    typescript: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "async",
      "await",
      "import",
      "export",
      "from",
      "class",
      "new",
      "interface",
      "type",
    ],
  }

  const langKeywords = keywords[language] || []

  // Capture comments first so we don't highlight inside them
  highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|--.*$)/gm, (match) => {
    const token = `__COMMENT_${placeholders.length}__`
    placeholders.push({ token, value: `<span class="text-muted-foreground">${match}</span>` })
    return token
  })

  // Capture strings separately to keep other rules out of them
  highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    const token = `__STRING_${placeholders.length}__`
    placeholders.push({ token, value: `<span class="text-green-400">${match}</span>` })
    return token
  })

  // Highlight keywords
  langKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "gi")
    highlighted = highlighted.replace(regex, '<span class="text-primary font-medium">$1</span>')
  })

  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')

  // Highlight function calls
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-300">$1</span>(')

  // Restore captured segments
  placeholders.forEach(({ token, value }) => {
    highlighted = highlighted.replace(token, value)
  })

  return highlighted
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlighted = highlightCode(code, language)

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border bg-secondary/50">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
        <span className={`text-xs font-mono ${languageColors[language] || "text-muted-foreground"}`}>{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 px-2 text-xs gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="font-mono text-foreground" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  )
}
