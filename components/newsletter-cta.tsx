'use client'

import { FormEvent, useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    const mailto = `mailto:fardan.nozami@gmail.com?subject=Subscribe%20me%20to%20the%20newsletter&body=Halo,%20tolong%20daftarkan%20${encodeURIComponent(
      trimmed
    )}%20ke%20newsletter%20ajitama.dev.`

    window.location.href = mailto
    setStatus("sent")
  }

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
      <p className="text-primary font-mono text-xs mb-2">Stay in the loop</p>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Subscribe to our letter</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Dapatkan update artikel terbaru langsung ke inbox kamu. Tidak ada spam, hanya konten bermanfaat.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setStatus("idle")
          }}
          required
          className="bg-background/80"
        />
        <Button
          type="submit"
          disabled={!email.trim()}
          className="sm:w-auto w-full"
          aria-label="Subscribe to newsletter"
        >
          <Mail className="h-4 w-4 mr-2" />
          Subscribe
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        Kami akan membuka email client kamu dengan pesan berisi permintaan berlangganan.
        {status === "sent" ? " Cek draft email dan kirim untuk menyelesaikan pendaftaran." : ""}
      </p>
    </section>
  )
}
