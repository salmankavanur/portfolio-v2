"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-posts";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

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

// Categories for filtering
const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

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
                <span className="text-sm font-medium text-primary">My Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Insights & <span className="text-primary">Expertise</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Explore articles, tutorials, and insights about web design, graphic design, and digital marketing from my professional journey.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-3 w-full bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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

        {/* Blog Posts Grid */}
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
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} index={index} />
              ))}
            </motion.div>
            
            {filteredPosts.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-muted-foreground">No articles found matching your criteria. Try adjusting your search.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BlogPostCard({ post, index }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden group bg-background/70 backdrop-blur-sm border border-border/40 shadow-xl rounded-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-4">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Category Badge */}
            <Badge 
              className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground shadow-md font-medium px-3 py-1 rounded-full"
            >
              {post.category}
            </Badge>
          </div>
          
          <CardContent className="pt-6 pb-4 relative">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Salman MP</span>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
            
            <CardDescription className="line-clamp-3 text-muted-foreground">
              {post.excerpt}
            </CardDescription>
          </CardContent>
          
          <CardFooter className="pt-2 pb-6 relative border-t border-border/30 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src="https://ext.same-assets.com/1352563405/518262652.webp"
                  alt="Salman MP"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">Salman MP</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}