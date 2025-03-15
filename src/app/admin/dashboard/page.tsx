"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/data/blog-posts";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function AdminDashboardPage() {
  // Get counts from data
  const blogPostCount = blogPosts.length;

  // Simulated data (in a real app, this would come from a database)
  const counts = {
    portfolio: 16,
    testimonials: 3,
    visitorsToday: 124,
    visitorsTotal: 13528,
    messagesPending: 5,
    messagesTotal: 152,
    lastUpdated: new Date().toLocaleString()
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin dashboard</p>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Last updated: {counts.lastUpdated}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Blog Posts"
          value={blogPostCount.toString()}
          description="Total published articles"
          icon={FileText}
          delay={0.1}
        />
        <StatsCard
          title="Portfolio Items"
          value={counts.portfolio.toString()}
          description="Projects in your portfolio"
          icon={Image}
          delay={0.2}
        />
        <StatsCard
          title="Testimonials"
          value={counts.testimonials.toString()}
          description="Client testimonials"
          icon={Users}
          delay={0.3}
        />
        <StatsCard
          title="Messages"
          value={`${counts.messagesPending} / ${counts.messagesTotal}`}
          description="Pending / Total contact messages"
          icon={MessageSquare}
          delay={0.4}
          highlight={counts.messagesPending > 0}
        />
      </div>

      {/* Traffic Overview */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Visitor Statistics</CardTitle>
              <CardDescription>Recent website traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Today's Visitors</span>
                  </div>
                  <span className="font-medium">{counts.visitorsToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Total Visitors</span>
                  </div>
                  <span className="font-medium">{counts.visitorsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Page Engagement</span>
                  </div>
                  <span className="font-medium">68%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest website updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-primary/50 pl-4 py-1">
                  <p className="text-sm font-medium">New message received</p>
                  <p className="text-xs text-muted-foreground">Today, 10:42 AM</p>
                </div>
                <div className="border-l-2 border-primary/50 pl-4 py-1">
                  <p className="text-sm font-medium">Portfolio item updated</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:15 PM</p>
                </div>
                <div className="border-l-2 border-primary/50 pl-4 py-1">
                  <p className="text-sm font-medium">New blog post published</p>
                  <p className="text-xs text-muted-foreground">April 12, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionButton href="/admin/blog/new" label="Create Blog Post" icon={FileText} />
              <QuickActionButton href="/admin/portfolio/new" label="Add Portfolio Item" icon={Image} />
              <QuickActionButton href="/admin/testimonials/new" label="Add Testimonial" icon={Users} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  delay = 0,
  highlight = false
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  delay?: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <Card className={highlight ? "border-primary" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Quick Action Button Component
function QuickActionButton({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
  return (
    <a
      href={href}
      className="flex items-center p-3 rounded-md border border-input bg-card hover:bg-muted transition-colors"
    >
      <Icon className="h-5 w-5 mr-3 text-primary" />
      <span>{label}</span>
    </a>
  );
}
