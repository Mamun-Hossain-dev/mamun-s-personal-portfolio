"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase.config";

// Helper function to generate a unique ID
const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

const ProjectForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [liveLink, setLiveLink] = useState(initialData?.liveLink || "");
  const [repoLink, setRepoLink] = useState(initialData?.repoLink || "");
  const [screenshot, setScreenshot] = useState(initialData?.screenshot || null);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [techStack, setTechStack] = useState(initialData?.techStack || "");
  const [tags, setTags] = useState(initialData?.tags || "");

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      liveLink,
      repoLink,
      screenshot,
      description,
      techStack,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Live Link</label>
        <input
          type="url"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Repository Link</label>
        <input
          type="url"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="https://github.com/..."
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Project Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleScreenshotChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">
          Description (Markdown supported)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded border min-h-[120px]"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Tech Stack</label>
        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="e.g. React, Node.js, MongoDB"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="e.g. portfolio, dashboard"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold"
      >
        Save Project
      </button>
    </form>
  );
};

export default ProjectForm;
