"use client";

import { setDarkMode } from "@/utils/spaghetti";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProject {
  type: string;
  data: Record<string, string>[];
}

const ProjectPage = () => {
  setDarkMode();
  const [projectData, setProjectData] = useState<IProject[]>([]);
  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((res) => {
        setProjectData(() => res.data);
      });
  }, []);
  return (
    <div className="dark:text-gray-400 mt-10">
      {projectData?.map((project) => (
        <div key={project.type}>
          <h2 className="text-center dark:text-gray-200">{project.type}</h2>
          <div className="grid grid-cols-3 gap-10">
            {project.data.map((p) => (
              <Link
                href={p.link}
                key={p.name}
                target="_blank"
                className="rounded-lg flex flex-col items-center justify-start text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-slate-200 hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300 px-5"
              >
                <h4 className="text-center">{p.name}</h4>
                <p className="text-center">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center text-zinc-500 mt-10 dark:text-zinc-400">
        Thanks for getting interested in my works! If like them, consider
        sponsoring me to support me keeping them sustainable. Cheers! :) Sponsor
        to support my work All projects sort by Stars.
      </div>
    </div>
  );
};

export default ProjectPage;
