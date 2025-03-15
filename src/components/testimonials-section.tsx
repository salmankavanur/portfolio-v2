"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    text: "Salman is a multi-talented professional with an excellent personality. His expertise has significantly contributed to the growth of our business, particularly in web design, Google Workspace management, and social media profile enhancement. Thanks to his efforts and timely updates, we have achieved a leading position in the sector.",
    name: "Mohamed Nazeemudeen",
    role: "Project Manager, RKD Works LLC",
    location: "Dubai, UAE",
    avatar: "https://ext.same-assets.com/2089583212/2746487974.png",
    rating: 5
  },
  {
    text: "Salman was fantastic—responsive, professional, knowledgeable, and skilled. He quickly grasped our intended concept and helped us achieve a clean and beautiful presentation. His talent and skills were evident throughout his work with our company, significantly contributing to our business growth. He did an excellent job as a digital marketer and designer.",
    name: "Moosa Abdul Basith",
    role: "CEO, Mabco Developers",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/2297260833/1703067666.png",
    rating: 5
  },
  {
    text: "Salman is a multi-talented personality and a wonderful individual. His extraordinary skills and talent have significantly contributed to our brand's growth, enabling us to reach a wider audience and secure major projects. Salman excels in web designing, graphic designing, aerial shooting, and more, proving himself to be an invaluable asset to our team.",
    name: "Sayyid Noufal Shihab",
    role: "Managing Director, Alif Media Solutions",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/1621712162/3598258398.png",
    rating: 5
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
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

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
      <motion.div
        className="absolute -top-36 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
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
            <span className="text-sm font-medium text-primary">Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            What My <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building success together — hear directly from clients about their experience working with me.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const cardVariants = {
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
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card className="h-full flex flex-col backdrop-blur-sm bg-background/70 border-border/40 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-start">
            <motion.div
              className="text-primary"
              initial={{ scale: 0.9, opacity: 0.5 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.3 + (index * 0.15)
                }
              }}
              viewport={{ once: true }}
            >
              <Quote className="w-10 h-10 text-primary/30" />
            </motion.div>
            
            <motion.div 
              className="flex"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.4 + (index * 0.15)
                }
              }}
              viewport={{ once: true }}
            >
              {testimonial.rating && Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow relative">
          <motion.p
            className="text-foreground/90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.4 + (index * 0.15)
              }
            }}
            viewport={{ once: true }}
          >
            "{testimonial.text}"
          </motion.p>
        </CardContent>
        
        <CardFooter className="pt-6 border-t border-border/30 relative">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.5 + (index * 0.15)
              }
            }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}