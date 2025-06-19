import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function LatestWorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "latest_works"));
        const worksList = [];
        querySnapshot.forEach((doc) => {
          worksList.push({ id: doc.id, ...doc.data() });
        });
        setWorks(worksList);
      } catch (error) {
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Latest Works
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : works.length === 0 ? (
          <div className="text-center text-gray-500">No works found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {works.map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {work.imageUrl ? (
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1 text-gray-800">
                    {work.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {work.description}
                  </p>
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
