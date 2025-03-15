import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { motion } from "framer-motion";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header with background image */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
          <div
            className="h-[50vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          ></div>
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container">
              <div className="max-w-3xl">
                <Button variant="outline" size="sm" asChild className="mb-6 bg-background/80 backdrop-blur-sm hover:bg-background">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
                <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Salman MP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="prose dark:prose-invert max-w-none">
                {post.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section.type === 'paragraph' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                      </motion.p>
                    )}
                    {section.type === 'heading' && (
                      <motion.h2
                        className="text-2xl font-bold mt-8 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                      </motion.h2>
                    )}
                    {section.type === 'subheading' && (
                      <motion.h3
                        className="text-xl font-semibold mt-6 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                      </motion.h3>
                    )}
                    {section.type === 'image' && (
                      <motion.figure
                        className="my-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <img
                          src={section.src}
                          alt={section.alt || 'Blog image'}
                          className="rounded-lg w-full"
                        />
                        {section.caption && (
                          <figcaption className="text-center text-sm text-muted-foreground mt-2">
                            {section.caption}
                          </figcaption>
                        )}
                      </motion.figure>
                    )}
                    {section.type === 'list' && (
                      <motion.ul
                        className="list-disc pl-6 my-4 space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        viewport={{ once: true }}
                      >
                        {section.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                    {section.type === 'quote' && (
                      <motion.blockquote
                        className="border-l-4 border-primary pl-4 my-6 italic"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                        {section.author && (
                          <footer className="text-sm font-medium mt-2 not-italic">
                            — {section.author}
                          </footer>
                        )}
                      </motion.blockquote>
                    )}
                  </div>
                ))}
              </div>

              {/* Share and Tags section */}
              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Share</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://salmanmp.me/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                          </svg>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://salmanmp.me/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
                          </svg>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://salmanmp.me/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 448 512">
                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                          </svg>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {blogPosts
                    .filter(p => p.slug !== post.slug && p.category === post.category)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                        <motion.div
                          className="group"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="aspect-video overflow-hidden rounded-lg mb-3">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(relatedPost.date), 'MMMM dd, yyyy')}
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
