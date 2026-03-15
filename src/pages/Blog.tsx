"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar, User, Tag, Sparkles, AlertCircle, Clock, ChevronRight } from "lucide-react";
import { blogApi, BlogPost } from "@/lib/api";
import { AboutBackground } from "@/components/sections/AboutBackground";

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef(null);

    useEffect(() => {
        blogApi
            .getAll({ published: "true" })
            .then((res) => setBlogs(res.blogs))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        },
    };

    // Calculate reading time roughly
    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const featuredPost = blogs[0];
    const otherPosts = blogs.slice(1);

    return (
        <div ref={containerRef} className="bg-background min-h-screen pt-44 pb-32 overflow-hidden selection:bg-primary/30">
            <SEO
                title="The Nexus | MetaCode Intellectual Frontier"
                description="Advanced explorations in digital architecture, neural interfaces, and the future of human-machine synergy."
                canonical="/blog"
            />

            {/* ── Background ── */}
            <div className="fixed inset-0 pointer-events-none">
                <AboutBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            </div>

            <div className="container-lg relative z-10 px-6 lg:px-12">
                {/* ── Modern Hero Section ── */}
                <div className="max-w-5xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-12">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">The Digital Frontier</span>
                        </div>
                        <h1 className="text-7xl md:text-[9rem] font-black text-white leading-[0.8] tracking-tighter mb-12">
                            Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/40 bg-[length:200%_auto] animate-gradient-flow">Blogs.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white/30 leading-tight max-w-3xl font-light">
                            Explore expert insights and actionable strategies for navigating the evolving landscape of enterprise AI.
                        </p>
                    </motion.div>
                </div>

                {/* ── Loading State ── */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-60 gap-8">
                        <div className="relative w-20 h-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-primary rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-b-2 border-primary/30 rounded-full"
                            />
                        </div>
                        <p className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Syncing with the grid</p>
                    </div>
                )}

                {/* ── Error State ── */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-60 gap-8 bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-3xl">
                        <AlertCircle className="w-16 h-16 text-red-500/50" />
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Network Disruption</h3>
                            <p className="text-white/30 max-w-md mx-auto">{error}</p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                        >
                            Reconnect
                        </button>
                    </div>
                )}

                {/* ── Blog Content ── */}
                {!loading && !error && blogs.length > 0 && (
                    <div className="space-y-32">
                        {/* ── Featured Post ── */}
                        {featuredPost && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm glass"
                            >
                                <Link to={`/blog/${featuredPost._id}`} className="absolute inset-0 z-30" />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
                                    <div className="relative h-[400px] lg:h-[700px] overflow-hidden">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover grayscale transition-all duration-[2s] ease-out group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
                                        <div className="absolute top-10 left-10 z-10">
                                            <div className="px-6 py-2 rounded-full bg-primary/90 text-black text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl">
                                                Featured
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                                        {/* Background Glow */}
                                        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

                                        <div className="flex items-center gap-6 mb-12 text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-primary" />
                                                {new Date(featuredPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-white/10" />
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-primary" />
                                                {getReadingTime(featuredPost.content)} min read
                                            </div>
                                        </div>

                                        <h2 className="text-4xl lg:text-7xl font-black text-white leading-[0.9] mb-12 group-hover:text-primary transition-colors duration-700">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-xl lg:text-2xl text-white/40 leading-relaxed mb-16 line-clamp-3 font-light">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                    <User size={18} className="text-white/40" />
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest text-white/60">{featuredPost.author}</span>
                                            </div>
                                            <div className="h-px flex-1 bg-white/5" />
                                            <div className="flex items-center gap-2 text-primary group-hover:gap-6 transition-all duration-700">
                                                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Read Full Protocol</span>
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Other Posts Grid ── */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {otherPosts.map((post) => (
                                <motion.div
                                    key={post._id}
                                    variants={itemVariants}
                                    className="group relative flex flex-col rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-700 hover:border-primary/20 hover:bg-white/[0.04]"
                                >
                                    <Link to={`/blog/${post._id}`} className="absolute inset-0 z-20" />

                                    {/* Image */}
                                    <div className="relative h-72 overflow-hidden bg-black/40">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6">
                                            <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] uppercase font-black tracking-widest text-primary flex items-center gap-2">
                                                <Tag size={10} />
                                                {post.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 flex flex-col flex-1 relative">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                                                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                                            </span>
                                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                                                <Clock size={10} className="text-primary/40" />
                                                {getReadingTime(post.content)}m
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-primary transition-colors duration-500">
                                            {post.title}
                                        </h3>

                                        <p className="text-white/30 text-base leading-relaxed mb-10 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-white/40 group-hover:text-primary transition-colors">
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Initialize Archive</span>
                                            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                                        </div>
                                    </div>

                                    {/* Inner Glow Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* ── Empty State ── */}
                {!loading && !error && blogs.length === 0 && (
                    <div className="py-60 text-center border border-dashed border-white/10 rounded-[4rem] bg-white/[0.01]">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
                            <Sparkles className="text-white/10 w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-white/40 uppercase tracking-[0.5em] mb-4">Silence in the Grid</h2>
                        <p className="text-white/10 uppercase tracking-widest text-[10px]">The digital solutions provider has not yet broadcasted.</p>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes gradient-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-flow {
                    background-size: 200% auto;
                    animation: gradient-flow 10s ease infinite;
                }
            `}} />
        </div>
    );
}
