"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";

interface BlogInfo {
  content: string;
  date: string;
  description: string;
  time: string;
  title: string;
}

const BlogInfo = () => {
  const pathname = usePathname();
  const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);

  const processedContent = useMemo(() => {
    const tmp = blogInfo?.content || "";
    return tmp.replace(/<code(.*?)>(.*?)<\/code>/gi, (match, p1, p2) => {
      const highlightedCode = hljs.highlightAuto(p2).value;
      return `<code${p1}>${highlightedCode}</code>`;
    });
  }, [blogInfo?.content]);

  useEffect(() => {
    fetch(`/api/blog/${filename}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogInfo(() => data);
      });
  }, [filename]);

  return (
    <div className="blog">
      <div dangerouslySetInnerHTML={{ __html: processedContent || "" }}></div>
    </div>
  );
};

export default BlogInfo;
