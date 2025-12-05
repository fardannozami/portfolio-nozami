import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-16" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-primary font-mono text-sm mb-4">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Fardan Nozami Ajitama
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground mb-6">Backend Developer</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl text-pretty">
              I'm a passionate backend developer with <span className="text-primary font-semibold">3+ years</span> of
              experience building scalable, efficient, and secure server-side applications. I specialize in crafting
              robust APIs and database architectures that power modern web applications.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild size="lg" className="rounded-full">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent">
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/fardannozami"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/cah-bantul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:fardan.nozami@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl sm:text-8xl font-bold text-primary/20">FA</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm font-mono text-primary">3+ Years Exp.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
