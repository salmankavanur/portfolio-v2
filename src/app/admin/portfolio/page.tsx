"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  Image,
  ExternalLink,
  Edit,
  Trash,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// In a real app, this would come from a database
// Here we're reusing the portfolio items from the homepage
const portfolioItems = [
  {
    id: 1,
    title: "Brochure Design",
    category: "Print Design",
    image: "https://ext.same-assets.com/1656152839/4013486423.jpeg",
    href: "https://www.behance.net/gallery/175280677/Brochure-Design-Landscape-Print",
    featured: true
  },
  {
    id: 2,
    title: "Responsive Website Design",
    category: "Web Design",
    image: "https://ext.same-assets.com/542509979/1327173141.jpeg",
    href: "https://www.behance.net/gallery/197521677/Web-Design-Elementor-Wordpress",
    featured: true
  },
  {
    id: 3,
    title: "Arabic Book Design",
    category: "Print Design",
    image: "https://ext.same-assets.com/3449514301/227553070.jpeg",
    href: "https://www.behance.net/gallery/200146981/Arabic-Book-Cover-Design",
    featured: false
  },
  {
    id: 4,
    title: "3 Fold Brochure Design",
    category: "Print Design",
    image: "https://ext.same-assets.com/3159438604/4177502529.jpeg",
    href: "https://www.behance.net/gallery/197516607/Brochure-Design-Print-Design-",
    featured: true
  },
  {
    id: 5,
    title: "Election Campaign Design",
    category: "Flyer Design",
    image: "https://ext.same-assets.com/1498376394/2515084413.jpeg",
    href: "https://www.behance.net/gallery/172282465/Election-Campaign-(-Social-Media-PosterFlyerCard)",
    featured: false
  },
  {
    id: 6,
    title: "Educational Website Design",
    category: "Web Design",
    image: "https://ext.same-assets.com/2788829444/2448085752.jpeg",
    href: "https://www.behance.net/gallery/197546171/Educational-Website-Elementor-Wordpress-CMS",
    featured: true
  },
];

// Functions to simulate actions (in a real app these would modify a database)
function deletePortfolioItem(id: number) {
  alert(`In a real app, portfolio item ${id} would be deleted here.`);
}

function toggleFeature(id: number) {
  alert(`In a real app, portfolio item ${id} feature status would be toggled here.`);
}

export default function AdminPortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  // Filter items based on search and category
  const filteredItems = portfolioItems.filter(item => {
    // Search filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      filter === "all" ||
      (filter === "featured" && item.featured) ||
      item.category.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter
  const categories = ["all", "featured", ...new Set(portfolioItems.map(item => item.category))];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio items</p>
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => toggleFeature(item.id)}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background"
                      asChild
                    >
                      <Link href={item.href} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  {item.featured && (
                    <Badge
                      className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                      variant="secondary"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-grow flex flex-col p-4">
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/portfolio/edit/${item.id}`}>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePortfolioItem(item.id)}
                    >
                      <Trash className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-muted-foreground bg-muted/50 rounded-lg">
            {searchTerm || filter !== "all"
              ? "No portfolio items found matching your search criteria."
              : "No portfolio items found. Add your first project by clicking the 'Add Project' button."}
          </div>
        )}
      </div>
    </>
  );
}
