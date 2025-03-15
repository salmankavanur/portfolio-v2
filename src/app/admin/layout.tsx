"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    if (isMounted && status !== "loading") {
      // If not authenticated and not on login page, redirect to login
      if (status === "unauthenticated" && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [status, isMounted, pathname, router]);

  // Don't render anything while checking authentication
  if (!isMounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For login page, just render the children without the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Image },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  // Only render the admin UI if the user is authenticated
  return status === "authenticated" ? (
    <div className="flex h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 border-r bg-background">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-muted text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted/50'
                  } group flex items-center px-2 py-2 text-sm rounded-md`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-gray-900">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground group-hover:text-gray-700">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-background border-b">
        <div className="px-4 h-16 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="py-4 border-b">
                    <p className="text-sm font-medium text-foreground">
                      {session?.user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                  <nav className="mt-6 flex-1 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${
                          isActive(item.href)
                            ? 'bg-muted text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted/50'
                        } group flex items-center px-2 py-2 text-sm rounded-md`}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 p-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  ) : null;
};

export default AdminLayout;
