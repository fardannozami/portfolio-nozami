import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: "⚡",
    skills: [
      { name: "Laravel", level: "Expert" },
      { name: "Golang", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "PHP", level: "Expert" },
      { name: "JavaScript", level: "Advanced" },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "MySQL", level: "Expert" },
      { name: "Redis", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "🛠️",
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "Git", level: "Expert" },
      { name: "Linux", level: "Advanced" },
      { name: "CI/CD", level: "Advanced" },
      { name: "AWS", level: "Intermediate" },
    ],
  },
  {
    title: "Architecture",
    icon: "🏗️",
    skills: [
      { name: "REST API", level: "Expert" },
      { name: "Microservices", level: "Advanced" },
    ],
  },
]

const levelColors: Record<string, string> = {
  Expert: "bg-primary/20 text-primary border-primary/30",
  Advanced: "bg-accent/20 text-accent border-accent/30",
  Intermediate: "bg-muted text-muted-foreground border-border",
}

export function SkillsSection() {
  return (
    <section className="py-20" id="skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary font-mono text-sm mb-2">What I Work With</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Skills & Technologies</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.title} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill.name} variant="outline" className={`${levelColors[skill.level]} text-xs`}>
                      {skill.name}
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
