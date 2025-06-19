"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "case_studies"));
        const studies = [];
        querySnapshot.forEach((doc) => {
          studies.push({ id: doc.id, ...doc.data() });
        });
        setCaseStudies(studies);
      } catch (error) {
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Case Studies
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="text-center text-gray-500">
            No case studies found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const tagsArray = Array.isArray(study.tags)
                ? study.tags
                : String(study.tags)
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);
              return (
                <div
                  key={study.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {study.imageUrl ? (
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-1 text-gray-800">
                      {study.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {study.description}
                    </p>
                    {tagsArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagsArray.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
