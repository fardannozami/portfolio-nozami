import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-Commerce API Platform",
    description:
      "A scalable e-commerce backend built with Golang, featuring product management, order processing, payment integration, and real-time inventory tracking.",
    technologies: ["Golang", "PostgreSQL", "Redis", "Docker", "gRPC"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Authentication Microservice",
    description:
      "Secure authentication system supporting OAuth2, JWT tokens, and multi-factor authentication. Handles millions of auth requests daily.",
    technologies: ["Node.js", "PostgreSQL", "Redis", "JWT", "OAuth2"],
    github: "https://github.com",
  },
  {
    title: "CMS Backend System",
    description:
      "A robust content management system built with Laravel, featuring role-based access control, media management, and RESTful API endpoints.",
    technologies: ["Laravel", "MySQL", "AWS S3", "Elasticsearch"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Real-time Chat Service",
    description:
      "High-performance chat backend using WebSockets for real-time communication. Supports group chats, file sharing, and message encryption.",
    technologies: ["Golang", "WebSocket", "MongoDB", "Redis"],
    github: "https://github.com",
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
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    {project.live && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Live Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
