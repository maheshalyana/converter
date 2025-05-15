"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col p-4 bg-background transition-colors duration-300">
      <header className="w-full mx-auto py-4 px-4">
        {pathname !== "/blogs" && (
          <Link
            href="/blogs"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Back to Blogs
          </Link>
        )}
      </header>
      {children}
    </div>
  );
}
