"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar, User, Tag, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { blogApi, BlogPost } from "@/lib/api";
import { AboutBackground } from "@/components/sections/AboutBackground";

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        blogApi
            .getAll({ published: "true" })
            .then((res) => setBlogs(res.blogs))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div className="bg-[#050508] min-h-screen pt-44 pb-24 overflow-hidden">
            <SEO
                title="Journal | MetaCode Insights into the Digital Void"
                description="Explorations in design, technology, and neuroscience. Read the MetaCode blog for deep dives into digital excellence."
                canonical="/blog"
            />

            {/* ── Background ── */}
            <AboutBackground />

            <div className="container-lg relative z-10">
                {/* ── Header ── */}
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="pill mb-8 inline-flex">
                            <Sparkles size={12} className="mr-2 animate-pulse" />
                            The Deep Journal
                        </div>
                        <h1 className="display-lg text-white mb-10 leading-[0.85]">
                            Insights from the <br />
                            <span className="gradient-text">Digital digital solutions provider.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-2xl">
                            Mapping the intersections of spatial computing, neuro-aesthetics, and recursive design.
                        </p>
                    </motion.div>
                </div>

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex items-center justify-center py-40">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
                            Could not reach the digital solutions provider. {error}
                        </p>
                    </div>
                )}

                {/* ── Blog Grid ── */}
                {!loading && !error && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
                    >
                        {blogs.map((post) => (
                            <motion.div
                                key={post._id}
                                variants={itemVariants}
                                className="group relative flex flex-col rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] overflow-hidden glass hover:border-primary/40 transition-all duration-700 h-full"
                            >
                                <Link to={`/blog/${post._id}`} className="absolute inset-0 z-20" />

                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-black/20 flex items-center justify-center">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-auto max-h-[350px] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000"
                                    />
                                    <div className="absolute top-6 left-6 z-10">
                                        <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-black tracking-widest text-primary flex items-center gap-2">
                                            <Tag size={10} />
                                            {post.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-1">
                                    <div className="flex items-center gap-6 mb-6 text-white/20 text-[10px] uppercase font-black tracking-[0.2em]">
                                        <div className="flex items-center gap-2 group-hover:text-white/40 transition-colors">
                                            <Calendar size={12} className="text-primary/40" />
                                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <div className="flex items-center gap-2 group-hover:text-white/40 transition-colors">
                                            <User size={12} className="text-primary/40" />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black text-white mb-6 leading-tight group-hover:text-primary transition-colors duration-500">
                                        {post.title}
                                    </h2>

                                    <p className="text-white/40 text-lg leading-relaxed mb-10 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center gap-3 text-white/60 font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-6 transition-all duration-500">
                                        Dive Deeper
                                        <ArrowRight size={14} className="text-primary" />
                                        <div className="h-px flex-1 bg-white/5 group-hover:bg-primary/20 transition-colors" />
                                    </div>
                                </div>

                                {/* Glow Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* ── Empty State ── */}
                {!loading && !error && blogs.length === 0 && (
                    <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem]">
                        <p className="text-white/20 text-xl font-black uppercase tracking-[.5em]">The digital solutions provider is quiet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
