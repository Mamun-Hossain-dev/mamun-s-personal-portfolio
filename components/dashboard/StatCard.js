import { motion } from "framer-motion";

export default function StatCard({ title, value, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center">
        <div className="p-3 bg-purple-100 rounded-lg text-purple-600 text-2xl">
          {icon}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
