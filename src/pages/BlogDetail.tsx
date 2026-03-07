"use client";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Share2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { AboutBackground } from "@/components/sections/AboutBackground";
import { blogApi, BlogPost } from "@/lib/api";

export default function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        blogApi
            .getById(id)
            .then((res) => setPost(res.blog))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050508]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050508] text-white pt-44 pb-24">
                <h1 className="display-sm mb-10">Voice Not Found</h1>
                <Link to="/blog" className="pill hover:bg-white/10 transition-colors">
                    Back to Journal
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    const handleShare = async () => {
        try {
            await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
        } catch {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="min-h-screen bg-[#050508] text-white pt-44 pb-32 overflow-hidden selection:bg-primary/20">
            <SEO
                title={`${post.title} | MetaCode Journal`}
                description={post.excerpt}
                canonical={`/blog/${post._id}`}
            />

            <AboutBackground />

            <div className="container-lg relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-20 group text-[10px] font-black tracking-widest uppercase"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Vortex Archive
                    </Link>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {/* ── Meta Info ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-wrap items-center gap-8 mb-12 text-white/20 text-[10px] uppercase font-bold tracking-[0.3em]"
                    >
                        <div className="flex items-center gap-3">
                            <Calendar size={12} className="text-primary" />
                            {formattedDate}
                        </div>
                        <div className="flex items-center gap-3">
                            <User size={12} className="text-primary" />
                            By {post.author}
                        </div>
                        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.02] text-primary flex items-center gap-2">
                            <Tag size={10} />
                            {post.category}
                        </div>
                        {post.views > 0 && (
                            <div className="text-white/20">
                                {post.views} views
                            </div>
                        )}
                    </motion.div>

                    {/* ── Title ── */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="display-md text-white mb-20 leading-[0.95] tracking-tighter"
                    >
                        {post.title}
                    </motion.h1>

                    {/* ── Feature Image ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full mb-24 rounded-[3rem] overflow-hidden border border-white/5 bg-black/40 flex items-center justify-center p-4"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto max-h-[800px] object-contain rounded-2xl"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60 pointer-events-none" />
                    </motion.div>

                    {/* ── Content Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-24 items-start">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="prose prose-invert prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white prose-p:text-white/40 prose-p:leading-[1.8] prose-p:text-2xl prose-strong:text-white prose-strong:font-black prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-10 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-white/80"
                        >
                            {/* Render content — split by newlines for paragraph support */}
                            {post.content.split("\n\n").map((para, i) =>
                                i === 0 ? (
                                    <p
                                        key={i}
                                        className="text-white/80 font-medium mb-16 first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-1"
                                    >
                                        {para}
                                    </p>
                                ) : (
                                    <p key={i}>{para}</p>
                                )
                            )}
                        </motion.div>

                        {/* ── Sidebar ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="sticky top-44 space-y-16"
                        >

                            <div className="flex flex-col gap-6">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center justify-center gap-4 py-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-primary/10 hover:border-primary transition-all duration-500 group"
                                >
                                    <Share2 size={16} className="text-white/40 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Radiate Insights</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ── Back to Journal ── */}
                <div className="mt-48 pt-32 border-t border-white/5">
                    <div className="flex items-center justify-between gap-10">
                        <div>
                            <p className="text-white/20 text-[10px] uppercase font-black tracking-[.8em] mb-8">Explore More</p>
                            <h2 className="text-4xl font-black text-white max-w-lg mb-12">
                                More from the <br /> Digital digital solutions provider.
                            </h2>
                            <Link
                                to="/blog"
                                className="group flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                Explore Vortex
                                <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </div>
                        <div className="w-96 h-64 rounded-[3rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
                                alt="next"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
