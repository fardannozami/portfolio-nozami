export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fardan Nozami Ajitama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
