'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMedium } from 'react-icons/fa';
import { blogs } from '@/data/blogs';
import BlogCard from '@/components/BlogCard';

export default function Blogs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-[95%] py-10 lg:w-[80%]"
    >
      <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#3b6cff]">
            Blogs // Asymmetric
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Notes from the club</h1>
        </div>
        <Link
          href="https://medium.com/@asymmetric_97099"
          target="_blank"
          className="flex items-center gap-2 rounded-full bg-ass-button px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          <FaMedium className="h-4 w-4" />
          Read on Medium
        </Link>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">No blog posts available.</div>
      )}
    </motion.div>
  );
}
