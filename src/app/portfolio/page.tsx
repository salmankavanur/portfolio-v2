"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";

// Portfolio items by category
const portfolioItems = {
  webDesign: [
    {
      title: "Responsive Website Design",
      description: "A fully responsive website built with WordPress and Elementor for optimal viewing across all devices.",
      image: "https://ext.same-assets.com/542509979/1327173141.jpeg",
      category: "Web Design",
      href: "https://www.behance.net/gallery/197521677/Web-Design-Elementor-Wordpress"
    },
    {
      title: "Educational Website Design",
      description: "A modern educational website created for an Islamic academy using WordPress CMS.",
      image: "https://ext.same-assets.com/2788829444/2448085752.jpeg",
      category: "Web Design",
      href: "https://www.behance.net/gallery/197546171/Educational-Website-Elementor-Wordpress-CMS"
    },
    {
      title: "E-commerce Website",
      description: "A fully functional e-commerce website with product catalog and checkout system.",
      image: "https://ext.same-assets.com/520029251/4089997871.jpeg",
      category: "Web Design",
      href: "#"
    },
    {
      title: "Corporate Website",
      description: "A professional corporate website with modern design and user-friendly navigation.",
      image: "https://ext.same-assets.com/1792636688/3373328149.png",
      category: "Web Design",
      href: "#"
    },
  ],
  graphicDesign: [
    {
      title: "Branding for Blossom Learning",
      description: "Complete branding package including logo, business cards, and marketing materials.",
      image: "https://ext.same-assets.com/3990713075/4175009383.jpeg",
      category: "Graphic Design",
      href: "https://creative.salmanmp.me/branding-blossom-learning/"
    },
    {
      title: "Social Media Campaign",
      description: "A series of social media graphics designed for a marketing campaign.",
      image: "https://ext.same-assets.com/3877360704/1361190712.jpeg",
      category: "Graphic Design",
      href: "#"
    },
    {
      title: "Corporate Identity",
      description: "Complete corporate identity design including logo, business cards, and stationery.",
      image: "https://ext.same-assets.com/3132628730/4088532353.jpeg",
      category: "Graphic Design",
      href: "#"
    },
  ],
  printDesign: [
    {
      title: "Brochure Design",
      description: "Professional landscape brochure design for print.",
      image: "https://ext.same-assets.com/1656152839/4013486423.jpeg",
      category: "Print Design",
      href: "https://www.behance.net/gallery/175280677/Brochure-Design-Landscape-Print"
    },
    {
      title: "Arabic Book Design",
      description: "Custom book cover design for an Arabic publication.",
      image: "https://ext.same-assets.com/3449514301/227553070.jpeg",
      category: "Print Design",
      href: "https://www.behance.net/gallery/200146981/Arabic-Book-Cover-Design"
    },
    {
      title: "3 Fold Brochure Design",
      description: "Tri-fold brochure design for print marketing.",
      image: "https://ext.same-assets.com/3159438604/4177502529.jpeg",
      category: "Print Design",
      href: "https://www.behance.net/gallery/197516607/Brochure-Design-Print-Design-"
    },
  ],
  flyerDesign: [
    {
      title: "Election Campaign Design",
      description: "Election campaign materials including posters, flyers, and social media graphics.",
      image: "https://ext.same-assets.com/1498376394/2515084413.jpeg",
      category: "Flyer Design",
      href: "https://www.behance.net/gallery/172282465/Election-Campaign-(-Social-Media-PosterFlyerCard)"
    },
    {
      title: "Educational Flyer",
      description: "Flyer design for educational institution promotion.",
      image: "https://ext.same-assets.com/598037781/3899959648.jpeg",
      category: "Flyer Design",
      href: "#"
    },
  ],
  seo: [
    {
      title: "Featured Snippet Achievement",
      description: "Successfully ranked a client's website in the featured snippet position on Google.",
      image: "https://ext.same-assets.com/1027258135/405907514.webp",
      category: "SEO",
      href: "https://creative.salmanmp.me/achieved-featured-snippet-on-google-search-results/"
    },
    {
      title: "Ranked #1 on Google",
      description: "SEO strategy that achieved first-page ranking for competitive keywords.",
      image: "https://ext.same-assets.com/2829790378/2578197748.png",
      category: "SEO",
      href: "https://creative.salmanmp.me/ranked-1-on-google/"
    },
  ],
  wikipedia: [
    {
      title: "Wikipedia Page for MIC ASAS",
      description: "Creation and management of a Wikipedia page for an educational institution.",
      image: "https://ext.same-assets.com/1341021514/1237084003.webp",
      category: "Wikipedia",
      href: "https://creative.salmanmp.me/wikipedia-page-mic-asas/"
    },
  ],
};

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
}

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 80
    }
  }
};

// Get color based on category
const getCategoryColor = (category: string) => {
  switch(category) {
    case 'Web Design': 
      return 'bg-blue-500/90 hover:bg-blue-600/90';
    case 'Graphic Design':
      return 'bg-purple-500/90 hover:bg-purple-600/90';
    case 'Print Design':
      return 'bg-emerald-500/90 hover:bg-emerald-600/90';
    case 'Flyer Design':
      return 'bg-amber-500/90 hover:bg-amber-600/90';
    case 'SEO':
      return 'bg-indigo-500/90 hover:bg-indigo-600/90';
    case 'Wikipedia':
      return 'bg-rose-500/90 hover:bg-rose-600/90';
    default:
      return 'bg-primary hover:bg-primary/90';
  }
};

const PortfolioCard = ({ item, index = 0 }: { item: PortfolioItem; index?: number }) => {
  const colorClass = getCategoryColor(item.category);
  
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full flex flex-col bg-background/70 backdrop-blur-sm border border-border/40 shadow-xl rounded-xl relative">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover transition-all duration-700 group-hover:scale-110 rounded-t-xl"
            />
          </AspectRatio>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
            >
              <Eye className="w-6 h-6" />
            </motion.span>
          </div>
          
          <Badge className={`absolute top-3 right-3 ${colorClass} text-white shadow-md font-medium px-3 py-1 rounded-full`}>
            {item.category}
          </Badge>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-blue-600 group-hover:w-full transition-all duration-500"></div>
        </div>
        
        <CardContent className="py-6 px-6 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
          <p className="text-muted-foreground flex-grow leading-relaxed">{item.description}</p>
          
          <div className="mt-6 pt-4 border-t border-border/30">
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300 group/link"
            >
              <span className="mr-2 font-medium">View Project</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function PortfolioPage() {
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
                <span className="text-sm font-medium text-primary">My Creative Work</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Explore My <span className="text-primary">Portfolio</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A showcase of my creative projects spanning web design, graphic design, print design, and digital marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-16 md:py-20 relative">
          <motion.div
            className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap justify-center gap-3 mb-16 bg-muted/50 p-1.5 rounded-full">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    All Projects
                  </TabsTrigger>
                  <TabsTrigger 
                    value="webDesign"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Web Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="graphicDesign"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Graphic Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="printDesign"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Print Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flyerDesign"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Flyer Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="seo"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    SEO
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wikipedia"
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Wikipedia
                  </TabsTrigger>
                </TabsList>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <TabsContent value="all" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      ...portfolioItems.webDesign,
                      ...portfolioItems.graphicDesign,
                      ...portfolioItems.printDesign,
                      ...portfolioItems.flyerDesign,
                      ...portfolioItems.seo,
                      ...portfolioItems.wikipedia
                    ].map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="webDesign" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.webDesign.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="graphicDesign" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.graphicDesign.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="printDesign" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.printDesign.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="flyerDesign" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.flyerDesign.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="seo" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.seo.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>

                  <TabsContent value="wikipedia" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.wikipedia.map((item, index) => (
                      <PortfolioCard key={index} item={item} index={index} />
                    ))}
                  </TabsContent>
                </motion.div>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}