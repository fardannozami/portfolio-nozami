import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BlogSection } from "@/components/blog-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Portfolio Fardan Nozami Ajitama, Backend Developer yang berfokus pada API yang scalable, database yang efisien, dan arsitektur server-side yang aman.",
  openGraph: {
    title: "Fardan Nozami Ajitama | Backend Developer",
    description:
      "Lihat proyek, pengalaman, dan tulisan Fardan Nozami Ajitama dalam membangun backend yang andal dengan Laravel, Golang, Node.js, dan PostgreSQL.",
    url: "/",
    siteName: "Fardan Nozami Ajitama",
    type: "website",
    images: [
      {
        url: "/ajitama.png",
        width: 1200,
        height: 630,
        alt: "Fardan Nozami Ajitama",
      },
    ],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BlogSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
