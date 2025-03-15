"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating?: number;
  project?: string;
  category?: string;
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    text: "Salman is a multi-talented professional with an excellent personality. His expertise has significantly contributed to the growth of our business, particularly in web design, Google Workspace management, and social media profile enhancement. Thanks to his efforts and timely updates, we have achieved a leading position in the sector.",
    name: "Mohamed Nazeemudeen",
    role: "Project Manager, RKD Works LLC",
    location: "Dubai, UAE",
    avatar: "https://ext.same-assets.com/2089583212/2746487974.png",
    rating: 5,
    project: "Corporate Website Redesign",
    category: "Web Design"
  },
  {
    text: "Salman was fantastic—responsive, professional, knowledgeable, and skilled. He quickly grasped our intended concept and helped us achieve a clean and beautiful presentation. His talent and skills were evident throughout his work with our company, significantly contributing to our business growth. He did an excellent job as a digital marketer and designer.",
    name: "Moosa Abdul Basith",
    role: "CEO, Mabco Developers",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/2297260833/1703067666.png",
    rating: 5,
    project: "Branding & Digital Marketing",
    category: "Digital Marketing"
  },
  {
    text: "Salman is a multi-talented personality and a wonderful individual. His extraordinary skills and talent have significantly contributed to our brand's growth, enabling us to reach a wider audience and secure major projects. Salman excels in web designing, graphic designing, aerial shooting, and more, proving himself to be an invaluable asset to our team.",
    name: "Sayyid Noufal Shihab",
    role: "Managing Director, Alif Media Solutions",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/1621712162/3598258398.png",
    rating: 5,
    project: "Media Production & Website Development",
    category: "Media Production"
  },
  {
    text: "Working with Salman has been an absolute pleasure. His attention to detail and creative approach to design challenges set him apart from other designers I've worked with. He not only delivered a stunning website but also provided valuable insights that improved our overall brand presence.",
    name: "Aisha Rahman",
    role: "Marketing Director, Bloom Boutique",
    location: "Kochi, Kerala, India",
    avatar: "/placeholder-avatar-1.png",
    rating: 5,
    project: "E-commerce Website",
    category: "Web Design"
  },
  {
    text: "Salman's work on our library digitalization project was exceptional. He demonstrated a deep understanding of our needs and delivered a solution that exceeded our expectations. His expertise in Koha and digital resource management has transformed how we operate.",
    name: "Dr. Rajesh Kumar",
    role: "Head Librarian, Kerala Academic Library",
    location: "Thiruvananthapuram, Kerala, India",
    avatar: "/placeholder-avatar-2.png",
    rating: 5,
    project: "Library Digitalization",
    category: "Library & Digitalization"
  },
  {
    text: "The graphic design work Salman created for our annual report was outstanding. He has a unique ability to translate complex information into visually appealing designs that communicate our message effectively. His professionalism and timely delivery made the entire process smooth.",
    name: "Fathima Zahra",
    role: "Communications Manager, Global Connect",
    location: "Calicut, Kerala, India",
    avatar: "/placeholder-avatar-3.png",
    rating: 5,
    project: "Annual Report Design",
    category: "Graphic Design"
  },
  {
    text: "I was impressed by Salman's SEO expertise and strategic approach. Within just three months of implementing his recommendations, our website traffic increased by 70% and we started ranking for competitive keywords. His data-driven approach and clear communication made him a joy to work with.",
    name: "Arjun Menon",
    role: "Founder, TechSolutions",
    location: "Kochi, Kerala, India",
    avatar: "/placeholder-avatar-4.png",
    rating: 5,
    project: "SEO Optimization",
    category: "Digital Marketing"
  },
  {
    text: "Salman created an incredible Wikipedia page for our institution that perfectly captured our history and achievements. His attention to detail and ability to present information in a neutral, encyclopedic tone was impressive. The page has significantly enhanced our online presence.",
    name: "Prof. Muhammed Rashid",
    role: "Principal, Academic Excellence Institute",
    location: "Malappuram, Kerala, India",
    avatar: "/placeholder-avatar-5.png",
    rating: 5,
    project: "Wikipedia Page Creation",
    category: "Wikipedia"
  }
];

// Categories for filtering
const categories = [
  "All",
  "Web Design",
  "Graphic Design", 
  "Digital Marketing",
  "Media Production",
  "Library & Digitalization",
  "Wikipedia"
];

// Animation variants
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
      staggerChildren: 0.2,
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

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card className="h-full flex flex-col backdrop-blur-sm bg-background/70 border-border/40 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <CardContent className="pt-6 px-6 flex-grow relative">
          <div className="flex justify-between items-start mb-4">
            <Quote className="w-10 h-10 text-primary/30" />
            
            <div className="flex">
              {testimonial.rating && Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
          
          {testimonial.project && (
            <div className="mb-4">
              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {testimonial.project}
              </span>
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-foreground/90 leading-relaxed">
              "{testimonial.text}"
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 pb-6 px-6 border-t border-border/30 relative mt-auto">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20 ring-2 ring-background">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              <p className="text-xs text-muted-foreground/80">{testimonial.location}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Main Page Component
export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredTestimonials = activeCategory === "All" 
    ? testimonials 
    : testimonials.filter(item => item.category === activeCategory);
  
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
                <span className="text-sm font-medium text-primary">Client Stories</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                What My Clients <span className="text-primary">Say About Me</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover how I've helped businesses and individuals achieve their goals through creative design solutions and strategic digital services.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Categories Filter */}
        <section className="py-6 relative">
          <div className="container">
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${activeCategory === category 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                      : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"}
                  `}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials Grid */}
        <section className="py-10 pb-24 relative">
          <motion.div
            className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </motion.div>
            
            {filteredTestimonials.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-muted-foreground">No testimonials found for this category.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}