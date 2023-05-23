"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { setDarkMode } from "@/utils/spaghetti";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface BlogData {
  title: string;
  description: string;
  date: string;
  time: string;
  filename: string;
}

const BlogPage = () => {
  setDarkMode();
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  const pageCount = useMemo(() => Math.floor(blogs.length / 10) + 1, [blogs]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleGoPage = (type: "prev" | "next") => {
    if (type === "prev") {
      setPageNumber((page) => page - 1);
    } else {
      setPageNumber((page) => page + 1);
    }
  };

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(() => data.list);
      });
  }, []);

  return (
    <div>
      <h1 className="dark:text-slate-200 text-black">Blog</h1>
      <ul>
        {blogs.slice(10 * (pageNumber - 1), 10 * pageNumber).map((blog) => (
          <li
            key={blog.title}
            className="flex items-end gap-x-5 mb-5 transition-all"
          >
            <Link
              href={`/blog/${blog.filename}`}
              className="text-gray-500 dark:text-slate-300 dark:hover:text-slate-50 hover:text-black  font-sans text-lg  hover:underline decoration-dotted underline-offset-2 transition-all"
            >
              {blog.title}
            </Link>
            <div className="text-gray-400">
              {blog.time.slice(0, blog.time.length - 5)}
            </div>
            <div className="text-gray-400">
              {dayjs(blog.date.slice(0, 10)).format("YYYY-MM")}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end text-zinc-400 items-center">
        <button
          className="pt-[3px]"
          onClick={() => handleGoPage("prev")}
          disabled={pageNumber === 1}
        >
          <MdKeyboardArrowLeft size={25} />
        </button>
        current: <span className="font-medium">{pageNumber}</span>-all:
        {pageCount}
        <button
          className="pt-[1px]"
          onClick={() => handleGoPage("next")}
          disabled={pageNumber === pageCount}
        >
          <MdKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
