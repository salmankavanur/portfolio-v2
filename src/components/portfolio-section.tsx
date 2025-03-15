"use client";

import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const allCategories = ["All", "Web Design", "Graphic Design", "Print Design", "Flyer Design"];

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
  href: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    image: "https://ext.same-assets.com/1656152839/4013486423.jpeg",
    title: "Brochure Design",
    category: "Print Design",
    href: "https://www.behance.net/gallery/175280677/Brochure-Design-Landscape-Print"
  },
  {
    image: "https://ext.same-assets.com/542509979/1327173141.jpeg",
    title: "Responsive Website Design",
    category: "Web Design",
    href: "https://www.behance.net/gallery/197521677/Web-Design-Elementor-Wordpress"
  },
  {
    image: "https://ext.same-assets.com/3449514301/227553070.jpeg",
    title: "Arabic Book Design",
    category: "Print Design",
    href: "https://www.behance.net/gallery/200146981/Arabic-Book-Cover-Design"
  },
  {
    image: "https://ext.same-assets.com/3159438604/4177502529.jpeg",
    title: "3 Fold Brochure Design",
    category: "Print Design",
    href: "https://www.behance.net/gallery/197516607/Brochure-Design-Print-Design-"
  },
  {
    image: "https://ext.same-assets.com/1498376394/2515084413.jpeg",
    title: "Election Campaign Design",
    category: "Flyer Design",
    href: "https://www.behance.net/gallery/172282465/Election-Campaign-(-Social-Media-PosterFlyerCard)"
  },
  {
    image: "https://ext.same-assets.com/2788829444/2448085752.jpeg",
    title: "Educational Website Design",
    category: "Web Design",
    href: "https://www.behance.net/gallery/197546171/Educational-Website-Elementor-Wordpress-CMS"
  },
];

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

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <div className="absolute left-0 top-1/4 w-full h-1/2 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 z-0"></div>
      <motion.div
        className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      ></motion.div>
      
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">My Creative Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
            Showcasing My <span className="text-primary">Best Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A curated selection of projects spanning web design, graphic design, and print design — each crafted with precision and creativity.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-10"
            variants={filterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`
                  cursor-pointer text-sm px-5 py-2.5 rounded-full transition-all duration-300
                  ${activeCategory === category 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                    : "border-2 border-border hover:border-primary/50 hover:text-primary"}
                `}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredItems.map((item, index) => (
            <PortfolioItem key={index} item={item} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button 
            asChild 
            size="lg" 
            className="px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Link href="/portfolio" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioItem({ item, index }: { item: PortfolioItem; index: number }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-xl border border-border/40 shadow-xl bg-background/60 backdrop-blur-sm"
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Link href={item.href} target="_blank" rel="noopener noreferrer">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover transition-all duration-700 group-hover:scale-110 rounded-t-xl"
            />
          </AspectRatio>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <Badge 
                variant="secondary" 
                className="self-start mb-3 bg-primary/90 hover:bg-primary text-primary-foreground"
              >
                {item.category}
              </Badge>
              <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
              
              <div className="flex items-center text-primary-foreground/80 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span className="mr-2">View Project</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-blue-600 group-hover:w-full transition-all duration-500"></div>
        </div>
      </Link>
    </motion.div>
  );
}