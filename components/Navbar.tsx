"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiTwitter, FiGithub } from "react-icons/fi";
import { BsSinaWeibo } from "react-icons/bs";

interface DataInfo {
  title: string;
  twitter: string;
  github: string;
  weibo: string;
}

const Navbar = () => {
  const [info, setInfo] = useState<null | DataInfo>(null);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        setInfo(() => data.info);
      });
  }, []);

  return (
    <nav className="flex justify-between mt-2 items-center mb-5">
      <section
        className="flex items-center hover:text-black hover:cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src="/images/avatar.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full  mr-2"
        />
        <span className="text-gray-400 hover:text-black">
          {info?.title || ""}
        </span>
      </section>
      <section>
        <ul className="flex items-center text-gray-500">
          <li className="mr-5 hover:text-black">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="mr-5 hover:text-black">
            <Link href="/">Project</Link>
          </li>
          <li className="mr-5 hover:text-black">
            <Link href={info?.twitter || "/"} target="_blank">
              <FiTwitter size={21} />
            </Link>
          </li>
          <li className="mr-5 hover:text-black">
            <Link href={info?.github || "/"} target="_blank">
              <FiGithub size={21} />
            </Link>
          </li>
          <li className="mr-5 hover:text-black">
            <Link href={info?.weibo || "/"} target="_blank">
              <BsSinaWeibo size={21} />
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
