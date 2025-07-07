"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-[60vh] py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        Projects
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-lg text-gray-300 text-center">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-shadow border border-white/10 overflow-hidden group flex flex-col"
            >
              {project.imageUrl && (
                <div className="relative w-full h-56">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-bold text-2xl mb-2 text-white line-clamp-1">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.techStack.split(",").map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex gap-2">
                  <span className="text-purple-400 font-semibold hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
