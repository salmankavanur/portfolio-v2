"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  FileText,
  Edit,
  Trash,
  ExternalLink,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import { format } from "date-fns";

// For a real app, these functions would connect to a database
// Here we just simulate them
function deleteBlogPost(slug: string) {
  alert(`In a real app, the post "${slug}" would be deleted here.`);
}

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"date" | "title">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortDirection === "desc"
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
    });

  const toggleSort = (field: "date" | "title") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts by title, category or tag..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-md overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
          <div className="col-span-6 sm:col-span-5 flex items-center cursor-pointer" onClick={() => toggleSort("title")}>
            <span>Title</span>
            {sortField === "title" && (
              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </div>
          <div className="col-span-3 sm:col-span-2 hidden sm:block">Category</div>
          <div
            className="col-span-3 sm:col-span-2 flex items-center cursor-pointer"
            onClick={() => toggleSort("date")}
          >
            <span>Date</span>
            {sortField === "date" && (
              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </div>
          <div className="col-span-3 sm:col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50"
              >
                <div className="col-span-6 sm:col-span-5 flex items-center">
                  <FileText className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="font-medium truncate">{post.title}</span>
                </div>
                <div className="col-span-3 sm:col-span-2 hidden sm:block">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <div className="col-span-3 sm:col-span-2 text-sm text-muted-foreground">
                  {format(new Date(post.date), "MMM d, yyyy")}
                </div>
                <div className="col-span-3 sm:col-span-3 flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/blog/edit/${post.slug}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteBlogPost(post.slug)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm
                ? "No blog posts found matching your search criteria."
                : "No blog posts found. Create your first post by clicking the 'New Post' button."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
