import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    title: "Software Engineer (Backend)",
    company: "PT Digdaya Inovasi Gemilang",
    period: "September 2023 — Present (Remote)",
    description:
      "Played a key role in developing and maintaining high-performance backend systems for production-grade web applications. Designed and built scalable services using Golang and PostgreSQL, optimized database performance, and ensured reliable deployments using Docker on AWS EC2. Implemented CI/CD pipelines with GitHub Actions to automate testing and deployment, improving delivery speed and system reliability.",
    technologies: [
      "Golang",
      "PostgreSQL",
      "Docker",
      "AWS EC2",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    title: "Backend Developer",
    company: "PT Inosoft",
    period: "August 2022 — August 2023 (Remote)",
    description:
      "Developed and maintained backend services using Laravel and MySQL. Responsible for designing and optimizing database schemas, building secure and scalable RESTful APIs, and integrating third-party services. Actively handled bug fixes, feature enhancements, and performance improvements while maintaining clean and well-versioned code using Git.",
    technologies: [
      "Laravel",
      "MySQL",
      "REST API",
      "Git",
      "Backend Architecture",
    ],
  },
  {
    title: "Node.js Developer",
    company: "PT Sambung Digital Indonesia",
    period: "January 2022 — December 2022 (Remote)",
    description:
      "Worked as a Node.js Developer focusing on backend application development using Express.js and PostgreSQL. Built REST APIs, handled server-side rendering with EJS, and managed application deployments on AWS EC2. Provided technical support during product rollout and assisted the team in debugging and resolving production issues.",
    technologies: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "EJS",
      "AWS EC2",
      "REST API",
    ],
  },
]


export function ExperienceSection() {
  return (
    <section className="py-20 bg-secondary/30" id="experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary font-mono text-sm mb-2">Where I&apos;ve Worked</p>
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
