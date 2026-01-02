import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Youtube } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-20 bg-secondary/30" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-mono text-sm mb-2">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            I&apos;m currently open to new opportunities and interesting projects. Whether you have a question or just
            want to say hi, feel free to reach out!
          </p>
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>fardan.nozami@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Indonesia</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <a href="mailto:fardan.nozami@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-11 w-11 rounded-full bg-transparent">
              <a href="https://github.com/fardannozami" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-11 w-11 rounded-full bg-transparent">
              <a href="https://linkedin.com/in/cah-bantul" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-11 w-11 rounded-full bg-transparent">
              <a href="https://youtube.com/@programmertelo" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
