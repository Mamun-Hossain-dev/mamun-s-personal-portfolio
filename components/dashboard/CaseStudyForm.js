"use client";
import { useState, useEffect } from "react";
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

export default function CaseStudyForm({ caseStudy, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageFile: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (caseStudy) {
      setFormData({
        title: caseStudy.title || "",
        description: caseStudy.description || "",
        tags: caseStudy.tags ? caseStudy.tags.join(", ") : "",
        imageUrl: caseStudy.imageUrl || "",
        imageFile: null,
      });
    }
  }, [caseStudy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", "mamun's portfolio");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/mamun-s-personal-portfolio/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.secure_url) throw new Error("Cloudinary upload failed");
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imageUrl: data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      setError("Failed to upload image. Please try a different file.");
      setFormData((prev) => ({ ...prev, imageFile: null }));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const caseStudyData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        imageUrl: formData.imageUrl,
        createdAt: Timestamp.now(),
      };

      // Update or create document
      if (caseStudy) {
        await setDoc(doc(db, "case_studies", caseStudy.id), caseStudyData, {
          merge: true,
        });
      } else {
        const uniqueId = generateUniqueId();
        await setDoc(doc(db, "case_studies", uniqueId), caseStudyData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving case study:", error);
      setError("Failed to save case study. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl text-white"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {caseStudy ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg border border-red-500/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-purple-300 hover:file:bg-gray-600"
              />
            </div>
            {formData.imageUrl && !formData.imageFile && (
              <div className="mt-2">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  width={320}
                  height={240}
                  style={{ width: 320, height: "auto" }}
                  className="max-w-xs h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isCompressing}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {isCompressing
                ? "Compressing..."
                : loading
                ? "Saving..."
                : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
