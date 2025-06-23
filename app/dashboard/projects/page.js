"use client";
import { useState } from "react";
import ProjectForm from "@/components/dashboard/ProjectForm";

export default function DashboardProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUploadClick = () => {
    setShowForm((v) => !v);
    setSuccess(false);
  };

  const handleFormSubmit = (data) => {
    // For now, just log the data
    console.log("Project submitted:", data);
    setShowForm(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        Projects (Admin)
      </h1>
      <button
        className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold hover:from-purple-700 hover:to-pink-700 transition"
        onClick={handleUploadClick}
      >
        {showForm ? "Cancel" : "Upload Project"}
      </button>
      {showForm && (
        <div className="w-full max-w-xl mb-8">
          <ProjectForm onSubmit={handleFormSubmit} />
        </div>
      )}
      {success && (
        <div className="text-green-400 font-medium mb-4">
          Project uploaded (mock)!
        </div>
      )}
      {!showForm && !success && (
        <p className="text-lg text-gray-300">Projects will be uploaded soon.</p>
      )}
    </div>
  );
}
