"use client";

import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "Exploring the Frankfurter API",
    summary:
      "A deep dive into the Frankfurter API and how it can be used to get the latest exchange rates.",
    link: "/blogs/frankfurter",
  },
  {
    id: 2,
    title: "Why the US Dollar Dominates Global Finance",
    summary:
      "A look at the history, impact, and future of the US dollar's dominance in global finance.",
    link: "/blogs/dollar-dominance",
  },
];

export default function BlogsPage() {
  return (
    <main className=" mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{blog.title}</CardTitle>
              <CardDescription>{blog.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={blog.link} passHref legacyBehavior>
                <Button asChild>
                  <a>Read More</a>
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
