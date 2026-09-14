import { motion } from 'framer-motion';
import { FaMedium } from 'react-icons/fa';
import { BlogData } from '@/data/blogs';

export default function BlogCard({ title, description, url, publishDate }: BlogData) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-7 shadow-[0_0_0_rgba(59,108,255,0)] transition-all duration-300 hover:border-[#3b6cff]/50 hover:shadow-[0_12px_40px_-12px_rgba(59,108,255,0.35)]"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3b6cff] to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {new Date(publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <FaMedium className="h-4 w-4 text-white/25 transition-colors duration-300 group-hover:text-[#3b6cff]" />
      </div>

      <h2 className="mt-4 line-clamp-3 text-lg sm:text-xl font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#3b6cff]">
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
