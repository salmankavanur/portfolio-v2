"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Globe,
  Paintbrush,
  TrendingUp,
  Server,
  Library,
  Video,
  ArrowRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Web Design",
    description: "Expert in creating responsive and user-centric designs with proficiency in various web design tools and technologies.",
    skills: ["HTML | CSS | JavaScript", "WordPress | Elementor | WPBakery", "PHP | Laravel", "Bootstrap / SASS"],
    href: "/services/web-design",
    longDescription: "As a web designer, I focus on creating websites that not only look great but also provide an exceptional user experience. I take a thoughtful approach to design, considering both aesthetics and functionality to create websites that effectively communicate your message and achieve your goals. From responsive layouts to interactive elements, I ensure that every aspect of your website is optimized for performance and usability across all devices.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Digital Marketing",
    description: "As a leading Digital Marketing Strategist in Malappuram, Kerala, I offer a comprehensive suite of services tailored to meet the unique needs of your business.",
    skills: ["Search Engine Optimization", "Social Media Marketing", "Content Marketing", "Data Analytics"],
    href: "/services/digital-marketing",
    longDescription: "Digital marketing is essential for businesses looking to establish a strong online presence. I provide comprehensive digital marketing services that help you reach your target audience and achieve your business objectives. From search engine optimization (SEO) to social media marketing, I develop strategies that increase your visibility, drive traffic to your website, and convert visitors into customers. My data-driven approach ensures that your marketing efforts deliver measurable results.",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: "Media Production",
    description: "In the captivating world of media, I'm not just a designer — I'm a visual treater. From drone photo/videography to seamless editing and color grading, I bring visuals to life.",
    skills: ["Adobe Premiere Pro", "After Effects", "Drone Photo/Videography", "Photography + Videography", "Editing and Color Grading", "Live Streaming and Broadcasting"],
    href: "/services/media",
    longDescription: "Media production is an art form that combines creativity and technical expertise. I specialize in creating high-quality media content that captivates your audience and effectively conveys your message. From professional photography and videography to drone aerial shots, I provide a full range of media services. My expertise in editing and color grading ensures that your final product has a polished, professional look that stands out. I also offer live streaming and broadcasting services for events and special occasions.",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    icon: <Paintbrush className="h-10 w-10" />,
    title: "Graphic Design",
    description: "Specializing in creating visually compelling designs for various media, ensuring brand consistency and engagement.",
    skills: ["Social Media Design", "Flyer Design", "Brochure Design", "Print Design", "Adobe Creative Suite - Photoshop/Illustrator/InDesign"],
    href: "/services/graphic-design",
    longDescription: "Graphic design is the art of visual communication. I create designs that not only look good but also effectively communicate your message to your target audience. My graphic design services include everything from logo design and brand identity to marketing materials and social media graphics. I work closely with clients to understand their vision and create designs that reflect their brand personality and resonate with their audience. My expertise in Adobe Creative Suite allows me to produce high-quality designs for both print and digital media.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <Server className="h-10 w-10" />,
    title: "Hosting & Server Management",
    description: "Well-experienced in hosting and server management to ensure smooth and reliable web operations.",
    skills: ["Hosting", "Server Management", "Dedicated Servers"],
    href: "/services/hosting",
    longDescription: "Reliable hosting and efficient server management are crucial for the performance and security of your website. I provide hosting solutions tailored to your specific needs, whether you require shared hosting, VPS, or dedicated servers. My server management services ensure that your website remains secure, fast, and always available to your visitors. I handle everything from server setup and configuration to ongoing maintenance and troubleshooting, allowing you to focus on your business while I take care of the technical aspects.",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    icon: <Library className="h-10 w-10" />,
    title: "Library & Digitalization",
    description: "Proficient in library digitalization using Koha, ensuring efficient management and accessibility of digital resources.",
    skills: ["Library Digitalization", "Koha", "Digital Resource Management"],
    href: "/services/library-digitalization",
    longDescription: "In today's digital age, libraries need to adapt to meet the changing needs of their users. I specialize in library digitalization, helping libraries transition from traditional to digital systems. My expertise in Koha library management system allows me to create efficient, user-friendly digital libraries that enhance accessibility and streamline resource management. I provide comprehensive solutions for cataloging, circulation, and access to digital resources, enabling libraries to better serve their communities while preserving valuable information for future generations.",
    color: "from-teal-500/20 to-cyan-500/20"
  }
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

// Service Card component
const ServiceCard = ({ service, index }) => {
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
          <CardDescription className="text-base text-foreground/80 leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative space-y-4">
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-3 text-foreground/90">Expertise in:</h4>
            <ul className="space-y-2">
              {service.skills.map((skill, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center mr-2">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.longDescription.substring(0, 150)}...
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 relative">
          <Button
            asChild
            className="w-full rounded-xl group-hover:bg-primary/90 transition-colors duration-300"
          >
            <Link href={service.href} className="flex items-center justify-center">
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Process Step component
const ProcessStep = ({ number, title, description }) => {
  return (
    <motion.div 
      className="relative"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center z-10 relative">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
              {number}
            </div>
          </div>
          {number < 4 && (
            <div className="absolute top-1/2 left-1/2 h-0.5 w-16 md:w-20 lg:w-36 bg-gradient-to-r from-primary/70 to-primary/10 -z-10 hidden md:block"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
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
                <span className="text-sm font-medium text-primary">Professional Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Expert Solutions for Your <span className="text-primary">Digital Needs</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Comprehensive web design, graphic design, digital marketing, and media production services
                tailored to meet the unique needs of your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 relative">
          <motion.div
            className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
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

        {/* Work Process */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
          <motion.div
            className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl -z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Process & Methodology</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
                My Proven <span className="text-primary">Work Process</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A systematic and refined approach to ensure high-quality results for every project,
                from initial concept to final delivery.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <ProcessStep 
                number="1" 
                title="Research & Discovery" 
                description="Understanding your needs, goals, and target audience to lay a strong foundation for the project."
              />
              
              <ProcessStep 
                number="2" 
                title="Planning & Strategy" 
                description="Developing a comprehensive plan and strategy tailored to your specific requirements and objectives."
              />
              
              <ProcessStep 
                number="3" 
                title="Design & Development" 
                description="Creating visually appealing and functional designs that effectively communicate your message."
              />
              
              <ProcessStep 
                number="4" 
                title="Review & Launch" 
                description="Thorough testing and refinement to ensure the final product meets all requirements before launch."
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <motion.div
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 2, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
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
                      Ready to start your <span className="text-primary">project?</span>
                    </CardTitle>
                    <CardDescription className="text-lg max-w-2xl mx-auto pt-3 text-muted-foreground">
                      Let's collaborate to create something amazing together. Get in touch to discuss your project needs and transform your ideas into reality.
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                
                <CardContent className="relative pb-12">
                  <motion.div
                    className="flex flex-wrap justify-center gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        asChild 
                        size="lg" 
                        className="px-8 py-6 text-base rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
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
                    >
                      <Button 
                        variant="outline" 
                        asChild 
                        size="lg" 
                        className="px-8 py-6 text-base rounded-xl border-2 hover:bg-primary/5"
                      >
                        <Link href="/portfolio">View My Work</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}