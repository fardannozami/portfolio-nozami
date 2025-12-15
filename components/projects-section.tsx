import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

type DemoUsers = Record<
  string,
  {
    email: string
    password: string
  }
>

type Project = {
  title: string
  description: string
  technologies: string[]
  live?: string
  github?: string | null
  demo?: DemoUsers
}

const formatRole = (role: string) =>
  role
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())

const projects: Project[] = [
  {
    title: "Jemput Jodohmu",
    description:
      "Platform matchmaking berbasis web dengan sistem keanggotaan dan manajemen user. Dibangun untuk performa stabil dan deployment sederhana.",
    technologies: ["Laravel 12", "MySQL", "cPanel"],
    live: "https://member.jemputjodohmu.com",
    github: null,
  },
  {
    title: "Ship Management System",
    description:
      "Sistem manajemen kapal berbasis SPA & PWA untuk mengelola operasional kapal, user role kompleks, dan workflow perusahaan pelayaran.",
    technologies: [
      "Laravel 12",
      "Inertia",
      "Vue.js",
      "SPA",
      "PWA",
      "PostgreSQL",
    ],
    live: "https://pms.ajitama.dev",
    github: null,
    demo: {
      superAdmin: {
        email: "admin@admin.com",
        password: "password",
      },
      companyAdmin: {
        email: "admincompany@admin.com",
        password: "password",
      },
      master: {
        email: "master@papandayan.com",
        password: "password",
      },
      chiefEngineer: {
        email: "ce@papandayan.com",
        password: "password",
      },
      superintendent: {
        email: "super@intendent.com",
        password: "password",
      },
    },
  },
  {
    title: "Malinau Satu Inovasi",
    description:
      "Portal inovasi daerah dengan sistem admin modern untuk mengelola konten, galeri, dan data inovasi menggunakan admin panel Filament.",
    technologies: [
      "Laravel 12",
      "Inertia",
      "Vue.js",
      "SPA",
      "MySQL",
      "Filament v4",
    ],
    live: "https://masi.ajitama.dev",
    github: null,
    demo: {
      admin: {
        email: "admin@admin.com",
        password: "password",
      },
    },
  },
]


export function ProjectsSection() {
  return (
    <section className="py-20" id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary font-mono text-sm mb-2">What I've Built</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                    {project.live ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Live Demo</span>
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-[10px] font-mono uppercase">
                        Private
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.demo && (
                    <div className="rounded-lg border border-border/70 bg-muted/40 p-4 shadow-inner">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-foreground">Demo Users</p>
                        <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                          Preview
                        </Badge>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {Object.entries(project.demo).map(([role, creds]) => (
                          <div key={role} className="rounded-md border border-border/60 bg-background/60 p-3">
                            <p className="text-sm font-medium text-foreground">{formatRole(role)}</p>
                            <p className="text-xs text-muted-foreground">Email: {creds.email}</p>
                            <p className="text-xs text-muted-foreground">Password: {creds.password}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
