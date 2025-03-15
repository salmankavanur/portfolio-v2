"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Instagram, Figma, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
          <motion.div
            className="absolute -top-36 -right-36 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Get In Touch</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Let's Start a <span className="text-primary">Conversation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Interested in working together? Reach out for collaborations, project inquiries, or just to say hello. I'm here to bring your vision to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-20 relative">
          <motion.div
            className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
            <div className="grid gap-16 md:grid-cols-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="order-2 md:order-1"
              >
                <motion.div 
                  variants={itemVariants} 
                  className="bg-background/70 backdrop-blur-sm rounded-2xl border border-border/40 shadow-xl p-8 mb-10"
                >
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-8">
                    <ContactItem 
                      icon={<Mail className="h-6 w-6 text-primary" />}
                      title="Email"
                      content="hello@salmanmp.me"
                      href="mailto:hello@salmanmp.me"
                    />
                    
                    <ContactItem 
                      icon={<Phone className="h-6 w-6 text-primary" />}
                      title="Phone"
                      content="+91 8129489071"
                      href="tel:+918129489071"
                    />
                    
                    <ContactItem 
                      icon={<MapPin className="h-6 w-6 text-primary" />}
                      title="Location"
                      content="Kerala, India"
                    />
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-border/30">
                    <h3 className="font-medium mb-4">Connect with me</h3>
                    <div className="flex gap-4">
                      <SocialLink 
                        href="https://www.linkedin.com/in/salmanmp/" 
                        icon={<Linkedin className="h-5 w-5" />} 
                        label="LinkedIn"
                      />
                      <SocialLink 
                        href="https://www.instagram.com/salman_kavanur/" 
                        icon={<Instagram className="h-5 w-5" />} 
                        label="Instagram"
                      />
                      <SocialLink 
                        href="https://www.behance.net/salmanmp" 
                        icon={<Figma className="h-5 w-5" />} 
                        label="Behance"
                      />
                      <SocialLink 
                        href="https://github.com/salmankavanur/" 
                        icon={<Github className="h-5 w-5" />} 
                        label="GitHub"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="relative rounded-2xl overflow-hidden h-52 md:h-64"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 z-10 flex flex-col justify-end p-6">
                    <p className="text-white/90 text-sm">Working Hours</p>
                    <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
                    <p className="text-white/80 max-w-xs">
                      Available Monday through Friday, 9 AM to 6 PM IST.
                      For urgent matters, feel free to reach out anytime.
                    </p>
                  </div>
                  <img 
                    src="https://ext.same-assets.com/1352563405/518262652.webp" 
                    alt="Salman MP" 
                    className="object-cover h-full w-full"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="bg-background/70 backdrop-blur-sm rounded-2xl border border-border/40 shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and I'll get back to you as soon as possible. I'm looking forward to hearing about your project.
                  </p>
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
          
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">My Location</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Me Here</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based in Kerala, India, but working with clients worldwide. Let's create something amazing together, no matter where you are.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl blur-lg opacity-70"></div>
              <div className="rounded-xl overflow-hidden aspect-[16/9] w-full max-w-5xl mx-auto relative shadow-2xl border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31277.13517650424!2d76.12799721562499!3d11.022869700000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64e330a1d61a9%3A0x86df55325a7b04a2!2sMalappuram%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1710527522284!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Salman MP Location Map"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Helper Components
const ContactItem = ({ icon, title, content, href }) => {
  const inner = (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-muted-foreground">
            {content}
          </p>
        </div>
      </div>
    </>
  );
  
  if (href) {
    return (
      <Link 
        href={href}
        className="block group hover:bg-primary/5 rounded-xl p-3 -mx-3 transition-colors duration-300"
      >
        {inner}
      </Link>
    );
  }
  
  return <div className="p-3 -mx-3">{inner}</div>;
};

const SocialLink = ({ href, icon, label }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300" 
        asChild
      >
        <Link 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon}
        </Link>
      </Button>
    </motion.div>
  );
};