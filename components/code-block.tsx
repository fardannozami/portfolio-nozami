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
  const addPlaceholder = (value: string) => {
    const token = `@@PLACEHOLDER_${placeholders.length}@@`
    placeholders.push({ token, value })
    return token
  }

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
  highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|--.*$)/gm, (match) =>
    addPlaceholder(`<span class="text-slate-400">${match}</span>`),
  )

  // Capture strings separately to keep other rules out of them
  highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) =>
    addPlaceholder(`<span class="text-green-400">${match}</span>`),
  )

  // Highlight keywords
  if (langKeywords.length) {
    const keywordPattern = langKeywords.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
    const regex = new RegExp(`\\b(${keywordPattern})\\b`, "gi")
    highlighted = highlighted.replace(regex, (match) =>
      addPlaceholder(`<span class="text-sky-300 font-semibold">${match}</span>`),
    )
  }

  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, (match) =>
    addPlaceholder(`<span class="text-orange-400">${match}</span>`),
  )

  // Highlight function calls
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (_match, func) =>
    addPlaceholder(`<span class="text-yellow-300">${func}</span>(`),
  )

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
    <div className="relative group my-4 rounded-lg overflow-hidden border border-slate-800 bg-[#0c1220] text-slate-100">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-slate-800">
        <span className={`text-xs font-mono ${languageColors[language] || "text-slate-300"}`}>{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 px-2 text-xs gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-100 hover:bg-white/10"
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
      <pre className="p-4 overflow-x-auto text-sm bg-transparent text-slate-100">
        <code className="font-mono text-slate-100" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  )
}
