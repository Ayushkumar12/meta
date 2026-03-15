"use client";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
    ArrowLeft, 
    Calendar, 
    User, 
    ArrowRight, 
    Clock, 
    ChevronLeft, 
    Linkedin, 
    Twitter, 
    Copy,
    ExternalLink
} from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { AboutBackground } from "@/components/sections/AboutBackground";
import { blogApi, BlogPost } from "@/lib/api";

export default function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const contentRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"]
    });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        
        Promise.all([
            blogApi.getById(id),
            blogApi.getAll({ published: "true" })
        ]).then(([detailRes, allRes]) => {
            setPost(detailRes.blog);
            setRelatedPosts(allRes.blogs.filter(b => b._id !== id).slice(0, 3));
        }).catch(() => {
            setNotFound(true);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    const formattedDate = post ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }) : "";

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <div className="w-16 h-16 relative">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full border-2 border-primary/20 border-t-primary rounded-full"
                    />
                </div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Loading Insight</p>
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-6 pt-44">
                <h1 className="text-8xl font-black text-white/5 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center">Article Not Found</h2>
                <Link to="/blog" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all font-black text-[10px] uppercase tracking-widest">
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30">
            <SEO
                title={`${post.title} | MetaCode Insights`}
                description={post.excerpt}
                canonical={`/blog/${post._id}`}
            />

            {/* ── Reading Progress ── */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" 
                style={{ scaleX }}
            />

            {/* ── Abstract Background ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <AboutBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
            </div>

            <main className="relative z-10">
                {/* ── Header / Hero Section ── */}
                <header className="pt-44 pb-20 px-6">
                    <div className="container-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <Link 
                                to="/blog" 
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-12 hover:gap-4 transition-all"
                            >
                                <ChevronLeft size={14} /> Back to Archive
                            </Link>
                            
                            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">
                                    {post.category}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                    <Clock size={12} /> {getReadingTime(post.content)} Min Read
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-12">
                                {post.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-16">
                                {post.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-10 pt-10 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                                        <User size={20} className="text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Written by</p>
                                        <p className="text-sm font-bold text-white/80">{post.author}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Calendar size={18} className="text-white/20" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Published</p>
                                        <p className="text-sm font-bold text-white/80">{formattedDate}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* ── Main Layout ── */}
                <div className="container-lg px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 pb-44">
                    
                    {/* ── Left: Content Area ── */}
                    <div className="space-y-24">
                        {/* Featured Image */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/5"
                        >
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-auto max-h-[700px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Article Text */}
                        <article 
                            ref={contentRef}
                            className="prose prose-invert prose-2xl max-w-none 
                                prose-p:text-white/40 prose-p:leading-[1.7] prose-p:mb-12 prose-p:text-2xl
                                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-12
                                prose-strong:text-white prose-strong:font-black
                                prose-blockquote:border-l-0 prose-blockquote:bg-white/[0.03] prose-blockquote:p-12 prose-blockquote:rounded-[2.5rem] prose-blockquote:my-20 prose-blockquote:not-italic prose-blockquote:text-white/80 prose-blockquote:border-primary/20 prose-blockquote:border
                                prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-3xl prose-pre:p-10
                                prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/5
                            "
                        >
                            {post.content.split("\n\n").map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </article>

                        {/* Article Footer */}
                        <div className="pt-20 border-t border-white/5">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Tags & Metadata</h4>
                            <div className="flex flex-wrap gap-3">
                                {(post.tags || ["AI Strategy", "Future", "MetaCode"]).map(tag => (
                                    <span key={tag} className="px-6 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold text-white/40">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Sidebar ── */}
                    <aside className="space-y-16 lg:sticky lg:top-44 h-fit">
                        {/* Share Card */}
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8">Share Article</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                                    <Linkedin size={20} className="text-white/20 group-hover:text-primary mb-3" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20">LinkedIn</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                                    <Twitter size={20} className="text-white/20 group-hover:text-primary mb-3" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Twitter</span>
                                </button>
                                <button 
                                    onClick={handleCopyLink}
                                    className="col-span-2 flex items-center justify-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/40 transition-all text-white/40 hover:text-white"
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.span 
                                                key="copied"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="text-[9px] font-black uppercase tracking-widest text-primary"
                                            >
                                                Copied!
                                            </motion.span>
                                        ) : (
                                            <motion.div 
                                                key="copy"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                <Copy size={14} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Copy Protocol</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>


                    </aside>
                </div>

                {/* ── Related Content ── */}
                {relatedPosts.length > 0 && (
                    <section className="py-44 px-6 bg-white/[0.01] border-t border-white/5">
                        <div className="container-lg">
                            <div className="flex items-center justify-between mb-20">
                                <div>
                                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.8em] mb-4">Deep Dive</p>
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Further Reading.</h2>
                                </div>
                                <Link to="/blog" className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all group">
                                    Full Archive <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((related) => (
                                    <Link 
                                        key={related._id} 
                                        to={`/blog/${related._id}`}
                                        className="group block"
                                    >
                                        <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/5 mb-8">
                                            <img 
                                                src={related.image} 
                                                alt={related.title} 
                                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                            />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-4 block">{related.category}</span>
                                        <h3 className="text-2xl font-black text-white/80 group-hover:text-primary transition-colors leading-tight">{related.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* ── Footer Nav ── */}
            <footer className="py-20 border-t border-white/5">
                <div className="container-lg px-6 flex flex-col md:flex-row items-center justify-between gap-10">
                    <Link to="/blog" className="group flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Return Path</p>
                            <p className="text-lg font-black text-white uppercase tracking-tighter">Back to Insights</p>
                        </div>
                    </Link>
                    
                    <div className="flex gap-8 items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Stay Connected</span>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, ExternalLink].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-lg border border-white/5 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
