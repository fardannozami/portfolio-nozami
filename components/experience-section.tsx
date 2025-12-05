import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Senior Backend Developer",
    company: "Tech Company",
    period: "2023 — Present",
    description:
      "Leading backend development for enterprise-level applications. Designing and implementing scalable microservices architecture using Golang and PostgreSQL.",
    technologies: ["Golang", "PostgreSQL", "Docker", "Kubernetes", "gRPC"],
  },
  {
    title: "Backend Developer",
    company: "Startup Inc",
    period: "2021 — 2023",
    description:
      "Built and maintained RESTful APIs using Laravel and Node.js. Optimized database queries resulting in 40% performance improvement.",
    technologies: ["Laravel", "Node.js", "MySQL", "Redis", "AWS"],
  },
  {
    title: "Junior Backend Developer",
    company: "Digital Agency",
    period: "2020 — 2021",
    description:
      "Developed backend systems for various client projects. Collaborated with frontend teams to integrate APIs and ensure smooth user experiences.",
    technologies: ["PHP", "Laravel", "MySQL", "Git", "REST API"],
  },
]

export function ExperienceSection() {
  return (
    <section className="py-20 bg-secondary/30" id="experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary font-mono text-sm mb-2">Where I've Worked</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Experience</h2>
        </div>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-mono">
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
