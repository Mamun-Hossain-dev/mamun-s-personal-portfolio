"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import React from "react";

export default function ProjectDetailPage({ params }) {
  const actualParams = React.use(params);
  const { id } = actualParams;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl text-red-400 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }
  if (!project) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors group"
        >
          <span className="text-lg">←</span>
          <span>Go Back</span>
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {project.title}
          </span>
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {project.tags &&
            project.tags.split(",").map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-gray-800 text-purple-300 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
        </div>
        {project.imageUrl && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/10">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-8">
          <p>{project.description}</p>
        </div>
        {project.techStack && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-8">
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              Live Site
            </Link>
          )}
          {project.repoLink && (
            <Link
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-800 text-purple-300 rounded-lg font-semibold border border-purple-700 hover:bg-gray-900 transition"
            >
              Source Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
