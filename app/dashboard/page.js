"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/dashboard/StatCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.config";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    caseStudies: 0,
    latestWorks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const usersSnapshot = await getDocs(collection(db, "users"));
        const caseStudiesSnapshot = await getDocs(
          collection(db, "case_studies")
        );
        const latestWorksSnapshot = await getDocs(
          collection(db, "latest_works")
        );

        setStats({
          users: usersSnapshot.size,
          caseStudies: caseStudiesSnapshot.size,
          latestWorks: latestWorksSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          description="Registered users"
          icon="👥"
        />
        <StatCard
          title="Case Studies"
          value={stats.caseStudies}
          description="Total case studies"
          icon="📁"
        />
        <StatCard
          title="Latest Works"
          value={stats.latestWorks}
          description="Uploaded projects"
          icon="🖼️"
        />
      </div>

      {/* Analytics Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Analytics Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700">Visitors</p>
            <p className="text-2xl font-bold">1,248</p>
            <p className="text-xs text-green-500">↑ 12.4% from last month</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">Page Views</p>
            <p className="text-2xl font-bold">3,842</p>
            <p className="text-xs text-green-500">↑ 8.2% from last month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">Engagement</p>
            <p className="text-2xl font-bold">2.4 min</p>
            <p className="text-xs text-red-500">↓ 3.1% from last month</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-700">Conversion</p>
            <p className="text-2xl font-bold">4.2%</p>
            <p className="text-xs text-green-500">↑ 1.8% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
