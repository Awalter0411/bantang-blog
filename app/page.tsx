"use client";

import { useEffect, useState } from "react";
import "public/styles/home.css";

export default function Home() {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => {
        setContent(() => data.content);
      });
  }, []);
  return (
    <div
      className="m-auto home"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
