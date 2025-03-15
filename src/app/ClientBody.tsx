"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, trackPageView } from "@/lib/analytics";

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize analytics when the component mounts
  useEffect(() => {
    const analytics = initAnalytics();

    // Clean up when the component unmounts
    return () => {
      analytics.cleanup();
    };
  }, []);

  // Track page views when the pathname changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
