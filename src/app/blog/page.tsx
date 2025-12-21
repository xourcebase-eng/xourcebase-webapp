'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonCards = Array.from({ length: 3 }, (_, i) => i);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 via-white to-teal-50 py-16 px-6 lg:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 flex justify-center items-center gap-3">
            XourceBase Blog
            <Newspaper className="w-8 h-8 md:w-12 md:h-12 text-[#8B0000]" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay tuned for the latest updates, tips, and stories from our team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skeletonCards.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100"
                >
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gray-200"></div>
                  {/* Content Placeholder */}
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center py-20"
            >
              <Newspaper className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                No blog posts yet
              </h2>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Check back soon for insights on career acceleration, tech trends, and more!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}