"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Instagram, Figma, Github } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.95, rotateY: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const statsVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut"
    }
  }
};

const gradientText = {
  hidden: { opacity: 0, backgroundPosition: "0% 50%" },
  visible: {
    opacity: 1,
    backgroundPosition: "100% 50%",
    transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
  }
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28 lg:py-36">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <motion.div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.3 }}
      ></motion.div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Content Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Professional Web & Graphic Designer</span>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Hi, I'm 
                <motion.span
                  className="ml-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block"
                  variants={gradientText}
                >
                  Salman
                </motion.span>
                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  A Web &amp; Graphic
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Designer
                  </motion.span>
                </motion.span>
              </h1>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                A Freelance Web & Graphic Designer based in Kerala, India. I transform concepts into exceptional digital experiences through carefully crafted, user-centric design.
              </motion.p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 pt-2">
              <Button asChild size="lg" className="h-14 px-6 rounded-lg font-medium shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                <Link href="/portfolio" className="flex items-center gap-2">
                  View My Works <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-14 px-6 rounded-lg font-medium border-2 hover:bg-background/5">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex items-center space-x-6 pt-6">
              <p className="text-sm font-semibold">Connect:</p>
              <div className="flex space-x-5">
                <Link
                  href="https://www.linkedin.com/in/salmanmp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/salman_kavanur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://www.behance.net/salmanmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Behance"
                >
                  <Figma size={20} />
                </Link>
                <Link
                  href="https://github.com/salmankavanur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={imageReveal}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-black/10 ring-1 ring-black/5">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              <img
                src="https://ext.same-assets.com/1352563405/518262652.webp"
                alt="Salman MP - Freelance Web Designer in Malappuram"
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <motion.div
              className="absolute -bottom-8 -left-8 bg-background/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-muted"
              variants={statsVariant}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Experience</p>
                <p className="text-3xl font-bold text-primary">7+ <span className="text-foreground text-xl">Years</span></p>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-8 -right-8 bg-background/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-muted"
              variants={statsVariant}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                <p className="text-3xl font-bold text-primary">300+ <span className="text-foreground text-xl">Completed</span></p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}