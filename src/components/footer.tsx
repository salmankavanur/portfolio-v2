import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Settings,
  ArrowRight,
  Figma
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t py-16 md:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Salman MP</span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Web & Graphic Designer based in Kerala, India. Transforming ideas into exceptional digital experiences through user-centric design.
            </p>

            <div className="flex items-center space-x-3">
              <Link
                href="https://www.linkedin.com/in/salmanmp/"
                className="bg-background hover:bg-primary/10 p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/salmankavanur/"
                className="bg-background hover:bg-primary/10 p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/salman_kavanur/"
                className="bg-background hover:bg-primary/10 p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.behance.net/salmanmp"
                className="bg-background hover:bg-primary/10 p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
              >
                <Figma className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="font-semibold tracking-wide relative inline-block">
              <span className="relative z-10">Services</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20"></span>
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { name: "Web Design & Development", href: "/services/web-design" },
                { name: "Digital Marketing", href: "/services/digital-marketing" },
                { name: "Graphic Design", href: "/services/graphic-design" },
                { name: "Media Production", href: "/services/media" },
                { name: "Hosting & Server Management", href: "/services/hosting" },
                { name: "Library & Digitalization", href: "/services/library-digitalization" }
              ].map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href} 
                    className="hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="font-semibold tracking-wide relative inline-block">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20"></span>
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Services", href: "/services" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="font-semibold tracking-wide relative inline-block">
              <span className="relative z-10">Contact Info</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20"></span>
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start group">
                <MapPin className="mr-3 h-5 w-5 mt-0.5 text-primary shrink-0 group-hover:text-primary/80 transition-colors" />
                <span className="group-hover:text-foreground transition-colors duration-300">Kerala, India</span>
              </li>
              <li>
                <Link 
                  href="mailto:hello@salmanmp.me" 
                  className="flex items-center hover:text-primary transition-colors duration-300 group"
                >
                  <Mail className="mr-3 h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                  <span>hello@salmanmp.me</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="tel:+918129489071" 
                  className="flex items-center hover:text-primary transition-colors duration-300 group"
                >
                  <Phone className="mr-3 h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                  <span>+91 8129489071</span>
                </Link>
              </li>
              
              <li className="mt-8 pt-6 border-t border-border/40">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors duration-300"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2 order-2 md:order-1">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} <span className="text-foreground font-medium">Salman MP</span>. All rights reserved.
              </p>
              <Link
                href="/admin/login"
                className="ml-6 flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="mr-1 h-3 w-3" />
                <span>Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground order-1 md:order-2">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <div className="h-4 w-px bg-border/40"></div>
              <Link href="/terms" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}