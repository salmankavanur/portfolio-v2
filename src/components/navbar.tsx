"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, Linkedin, Instagram, Figma, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const fadeInDown = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className={`sticky top-0 z-50 w-full ${
        scrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-background/70 backdrop-blur-sm"
      } transition-all duration-300`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="https://ext.same-assets.com/995111286/612566144.svg+xml"
              alt="Salman MP"
              className="h-9 w-auto relative"
            />
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-8 items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary py-1
              ${pathname === item.href 
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']" 
                : "text-foreground/70 hover:text-foreground"}`}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-border ml-2 mr-2"></div>
          <Button asChild size="sm" className="rounded-full px-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Let's Talk</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-border/30">
            <div className="flex flex-col space-y-8 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                  <img
                    src="https://ext.same-assets.com/995111286/612566144.svg+xml"
                    alt="Salman MP"
                    className="h-8 w-auto"
                  />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full hover:bg-muted">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-5">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors hover:text-primary group flex items-center
                    ${pathname === item.href ? "text-primary" : "text-foreground/70"}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-6 border-t border-border/30">
                <p className="text-sm font-medium mb-4 text-muted-foreground">Connect with me</p>
                <div className="flex gap-5">
                  <Link
                    href="https://www.linkedin.com/in/salmanmp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/salman_kavanur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.behance.net/salmanmp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Behance"
                  >
                    <Figma className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com/salmankavanur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <div className="pt-6">
                <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Let's Work Together
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}