"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Linkedin, Instagram, Figma, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <motion.div
        className="absolute -top-36 -right-36 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-blue-600/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
      ></motion.div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="border border-border/30 bg-background/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            
            <CardHeader className="text-center relative pb-8 pt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="mx-auto w-16 h-1.5 bg-gradient-to-r from-primary to-blue-600 rounded-full mb-4"></div>
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                  Have an idea? <span className="text-primary">Let's build it!</span>
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto pt-3 text-muted-foreground">
                  Ready to transform your digital presence? Let's collaborate to create 
                  <span className="hidden md:inline"> something exceptional</span> together.
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="relative pb-12">
              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full px-8 py-6 text-base rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Link href="/contact" className="flex items-center">
                      Contact Me
                      <motion.div
                        className="ml-2 relative"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="w-full px-8 py-6 text-base rounded-xl border-2 hover:bg-primary/5"
                  >
                    <Link href="mailto:hello@salmanmp.me" className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      hello@salmanmp.me
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Or Call */}
              <motion.div
                className="mt-8 pt-6 border-t border-border/30 flex flex-col items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-muted-foreground text-sm font-medium mb-3">
                  Or connect with me on:
                </p>
                <div className="flex justify-center gap-5">
                  <SocialIcon href="https://www.linkedin.com/in/salmanmp/" icon={<Linkedin className="h-5 w-5" />} />
                  <SocialIcon href="https://www.instagram.com/salman_kavanur/" icon={<Instagram className="h-5 w-5" />} />
                  <SocialIcon href="https://www.behance.net/salmanmp" icon={<Figma className="h-5 w-5" />} />
                  <SocialIcon href="https://github.com/salmankavanur/" icon={<Github className="h-5 w-5" />} />
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-12 w-12 rounded-full bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border/40 shadow-sm transition-colors duration-300"
        aria-label={href.split('/').pop() || 'Social link'}
      >
        {icon}
      </Link>
    </motion.div>
  );
}