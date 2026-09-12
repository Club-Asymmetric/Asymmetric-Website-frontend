'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMedium } from 'react-icons/fa';
import { blogs, BlogData } from '@/data/blogs';

function BlogCard({ title, description, url, publishDate }: BlogData) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group flex h-full flex-col border border-white/10 bg-[#080809] p-6 sm:p-7 transition-colors duration-300 hover:border-[#3b6cff]/50"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {new Date(publishDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>

      <h2 className="mt-3 line-clamp-3 text-lg sm:text-xl font-semibold leading-snug text-white">
        {title}
      </h2>

      <p className="mt-3 flex-1 line-clamp-4 text-xs sm:text-sm leading-relaxed text-white/55">
        {description}
      </p>

      <div className="mt-6 h-px w-full bg-white/10" />
      <span className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-[#3b6cff]">
        Read on Medium
        <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
      </span>
    </motion.a>
  );
}

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
