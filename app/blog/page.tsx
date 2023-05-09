"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

interface BlogData {
  title: string;
  description: string;
  date: string;
  time: string;
  filename: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(() => data.list);
      });
  }, []);
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.title}
            className="flex items-end gap-x-5 mb-5 transition-all"
          >
            <Link
              href={`/blog/${blog.filename}`}
              className="text-gray-500 hover:text-black font-sans text-lg  hover:underline decoration-dotted underline-offset-2 transition-all"
            >
              {blog.title}
            </Link>
            <div className="text-gray-400">{blog.time.slice(0, 5)}</div>
            <div className="text-gray-400">
              {dayjs(blog.date.slice(0, 10)).format("YYYY-MM")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
