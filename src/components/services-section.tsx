"use client";

import {
  Globe,
  Paintbrush,
  TrendingUp,
  Server,
  Library,
  Video,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Web Design",
    description: "Expert in creating responsive and user-centric designs with proficiency in various web design tools and technologies.",
    skills: ["HTML | CSS | JavaScript", "WordPress | Elementor | WPBakery", "PHP | Laravel", "Bootstrap / SASS"],
    href: "/services/web-design",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Digital Marketing",
    description: "As a leading Digital Marketing Strategist in Malappuram, Kerala, I offer a comprehensive suite of services tailored to meet the unique needs of your business.",
    skills: ["Search Engine Optimization", "Social Media Marketing", "Content Marketing", "Data Analytics"],
    href: "/services/digital-marketing",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: "Media Production",
    description: "In the captivating world of media, I'm not just a designer — I'm a visual storyteller. From drone photo/videography to seamless editing and color grading, I bring visuals to life.",
    skills: ["Adobe Premiere Pro", "After Effects", "Drone Photo/Videography", "Photography + Videography", "Editing and Color Grading", "Live Streaming and Broadcasting"],
    href: "/services/media",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    icon: <Paintbrush className="h-10 w-10" />,
    title: "Graphic Design",
    description: "Specializing in creating visually compelling designs for various media, ensuring brand consistency and engagement.",
    skills: ["Social Media Design", "Flyer Design", "Brochure", "Print Design", "Adobe Creative Suite - Photoshop/Illustrator/InDesign"],
    href: "/services/graphic-design",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <Server className="h-10 w-10" />,
    title: "Hosting & Server Management",
    description: "Well-experienced in hosting and server management to ensure smooth and reliable web operations.",
    skills: ["Hosting", "Server Management", "Dedicated Servers"],
    href: "/services/hosting",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    icon: <Library className="h-10 w-10" />,
    title: "Library & Digitalization",
    description: "Proficient in library digitalization using Koha, ensuring efficient management and accessibility of digital resources.",
    skills: ["Library Digitalization", "Koha", "Digital Resource Management"],
    href: "/services/library-digitalization",
    color: "from-teal-500/20 to-cyan-500/20"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 80
    }
  }
};

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
      <motion.div
        className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      ></motion.div>
      
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Professional Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
            My Areas of <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Delivering exceptional services in web design, graphic design, digital marketing, and media production — tailored to elevate your brand's digital presence.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group"
    >
      <Card className="h-full transition-all duration-500 border border-border/40 shadow-xl overflow-hidden bg-background/70 backdrop-blur-sm relative">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        {/* Icon Circle */}
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-foreground/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
        
        <CardHeader className="relative">
          <motion.div
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            {service.icon}
          </motion.div>
          <CardTitle className="text-2xl mt-4 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative space-y-4">
          <CardDescription className="text-base text-foreground/80 leading-relaxed">
            {service.description}
          </CardDescription>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2 text-foreground/90">Expertise in:</h4>
            <ul className="space-y-1.5">
              {service.skills.map((skill, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 relative">
          <Button
            asChild
            variant="ghost"
            className="group/btn w-full justify-between hover:bg-primary/10 text-foreground/90 hover:text-primary"
          >
            <Link href={service.href}>
              <span>Learn More</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  repeatDelay: 0.5,
                  ease: "easeInOut"
                }}
              >
                <ArrowUpRight className="h-4 w-4 opacity-70 group-hover/btn:opacity-100" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}