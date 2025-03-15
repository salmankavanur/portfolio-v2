"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle, Edit, Trash, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// In a real app, this would come from a database
const testimonials = [
  {
    id: 1,
    text: "Salman is a multi-talented professional with an excellent personality. His expertise has significantly contributed to the growth of our business, particularly in web design, Google Workspace management, and social media profile enhancement. Thanks to his efforts and timely updates, we have achieved a leading position in the sector.",
    name: "Mohamed Nazeemudeen",
    role: "Project Manager, RKD Works LLC",
    location: "Dubai, UAE",
    avatar: "https://ext.same-assets.com/2089583212/2746487974.png",
    featured: true,
    date: "2023-11-15"
  },
  {
    id: 2,
    text: "Salman was fantastic—responsive, professional, knowledgeable, and skilled. He quickly grasped our intended concept and helped us achieve a clean and beautiful presentation. His talent and skills were evident throughout his work with our company, significantly contributing to our business growth. He did an excellent job as a digital marketer and designer.",
    name: "Moosa Abdul Basith",
    role: "CEO, Mabco Developers",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/2297260833/1703067666.png",
    featured: true,
    date: "2023-10-22"
  },
  {
    id: 3,
    text: "Salman is a multi-talented personality and a wonderful individual. His extraordinary skills and talent have significantly contributed to our brand's growth, enabling us to reach a wider audience and secure major projects. Salman excels in web designing, graphic designing, aerial shooting, and more, proving himself to be an invaluable asset to our team.",
    name: "Sayyid Noufal Shihab",
    role: "Managing Director, Alif Media Solutions",
    location: "Perinthalmanna, Kerala, India",
    avatar: "https://ext.same-assets.com/1621712162/3598258398.png",
    featured: false,
    date: "2023-09-05"
  },
];

// Functions to simulate actions (in a real app these would modify a database)
function deleteTestimonial(id: number) {
  alert(`In a real app, testimonial ${id} would be deleted here.`);
}

function toggleFeatured(id: number) {
  alert(`In a real app, testimonial ${id} featured status would be toggled here.`);
}

export default function AdminTestimonialsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  // Filter testimonials based on filter selection
  const filteredTestimonials = filter === "all"
    ? testimonials
    : testimonials.filter(testimonial => testimonial.featured);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="inline-flex rounded-md border bg-background p-1">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-sm ${
              filter === "all" ? "bg-muted" : "hover:bg-muted/50"
            }`}
            onClick={() => setFilter("all")}
          >
            All Testimonials
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-sm ${
              filter === "featured" ? "bg-muted" : "hover:bg-muted/50"
            }`}
            onClick={() => setFilter("featured")}
          >
            Featured Only
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={testimonial.featured ? "border-primary" : ""}>
                <CardHeader className="pb-4 relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{testimonial.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{testimonial.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFeatured(testimonial.id)}
                      className={testimonial.featured ? "text-yellow-500" : ""}
                    >
                      {testimonial.featured ? (
                        <Star className="h-4 w-4 fill-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Location badge */}
                  <Badge
                    variant="outline"
                    className="absolute top-4 right-12 text-xs"
                  >
                    {testimonial.location}
                  </Badge>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-2">
                    "{testimonial.text}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Added on: {new Date(testimonial.date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-muted-foreground bg-muted/50 rounded-lg">
            No testimonials found. Add your first testimonial by clicking the 'Add Testimonial' button.
          </div>
        )}
      </div>
    </>
  );
}
