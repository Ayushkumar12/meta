import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { BlogPost, ContactMessage, Project, blogApi, contactApi, uploadApi, authApi, projectApi } from "@/lib/api";
import {
    LayoutDashboard, FileText, MessageSquare, Plus, Trash2, Edit3,
    Image as ImageIcon, CheckCircle2, X, Sparkles, Bell, Eye, TrendingUp,
    Users, Mail, ArrowRight, ChevronRight, LogOut, Layers, Menu,
    Search, Check, AlertCircle, Upload, Loader2, Lock, KeyRound, Briefcase
} from "lucide-react";
import logo from "@/assets/logo.png";

/* ─────────────── Types ─────────────── */
type AdminView = "dashboard" | "blogs" | "projects" | "messages";

/* ─────────────── Token helpers ─────────────── */
const TOKEN_KEY = "metacode_admin_token";
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/* ─────────────── Login Screen ─────────────── */
function LoginScreen({ onLogin }: { onLogin: (user: any) => void }) {
    const [email, setEmail] = useState("admin@metacode.com");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await authApi.login(email, password);
            setToken(res.token);
            onLogin(res.admin);
        } catch (err: any) {
            setError(err.message || "Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                        <img src={logo} alt="MetaCode" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-white font-black tracking-tight">MetaCode</p>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Control Core</p>
                    </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.07]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <KeyRound size={18} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight">Authenticate</h1>
                            <p className="text-white/30 text-xs">Admin access required</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-4 px-5 text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-4 px-5 text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:shadow-glow-primary hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:scale-100"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                            {loading ? "Authenticating..." : "Enter Core"}
                        </button>

                        <p className="text-center text-[10px] text-white/20 font-bold">
                            First time?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    const base = window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://back.metacode.co.in/api";
                                    fetch(`${base}/auth/setup`, { method: "POST" }).then(() => alert("Admin account seeded! Try logging in now."));
                                }}
                                className="text-primary underline"
                            >
                                Setup admin account
                            </button>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────── Sidebar ─────────────── */
function Sidebar({ view, setView, unreadCount, blogCount, onLogout, open, setOpen, role }: {
    view: AdminView;
    setView: (v: AdminView) => void;
    unreadCount: number;
    blogCount: number;
    onLogout: () => void;
    open: boolean;
    setOpen: (v: boolean) => void;
    role: string;
}) {
    const links: { id: string; label: string; icon: any; roles: string[]; badge?: number }[] = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin"] },
        { id: "blogs", label: "Journal", icon: FileText, badge: blogCount, roles: ["admin", "editor"] },
        { id: "projects", label: "Works", icon: Briefcase, roles: ["admin", "editor"] },
        { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadCount, roles: ["admin"] },
    ].filter(l => l.roles.includes(role));

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-[#050508]/80 backdrop-blur-sm z-[45] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#08080f] border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="p-8 border-b border-white/[0.05]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                            <img src={logo} alt="MetaCode" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">MetaCode</p>
                            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Control Core</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const active = view === link.id;
                        return (
                            <button
                                key={link.id}
                                onClick={() => {
                                    setView(link.id as AdminView);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group ${active
                                    ? "bg-primary/10 border border-primary/20 text-white"
                                    : "text-white/30 hover:text-white hover:bg-white/[0.04] border border-transparent"
                                    }`}
                            >
                                <Icon size={18} className={active ? "text-primary" : "text-white/20 group-hover:text-white/50"} />
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] flex-1">{link.label}</span>
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${active ? "bg-primary text-white" : "bg-white/10 text-white/40"}`}>
                                        {link.badge}
                                    </span>
                                )}
                                {active && <ChevronRight size={14} className="text-primary/50" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/[0.05] space-y-2">
                    <a
                        href="/"
                        className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white/20 hover:text-white hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                        <Eye size={16} className="group-hover:text-accent transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">View Site</span>
                    </a>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-white/20 hover:text-white hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                        <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

/* ─────────────── Stat Card ─────────────── */
function StatCard({ label, value, icon: Icon, color, sub }: { label: string; value: string | number; icon: any; color: string; sub?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-500 group"
        >
            <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={20} style={{ color }} />
                </div>
                <TrendingUp size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-4xl font-black text-white tracking-tighter mb-2">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/20 mb-1">{label}</p>
            {sub && <p className="text-xs text-white/10 mt-2">{sub}</p>}
        </motion.div>
    );
}

/* ─────────────── Dashboard View ─────────────── */
function DashboardView({ blogCount, unreadCount, totalMessages, projectCount, setView }: { blogCount: number; unreadCount: number; totalMessages: number; projectCount: number; setView: (v: AdminView) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"admin" | "editor">("editor");
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await authApi.createUser({ email, password, name, role });
            setStatus({ type: "success", message: `Successfully created ${role} account for ${name}!` });
            setEmail("");
            setPassword("");
            setName("");
            setRole("editor");
        } catch (err: any) {
            setStatus({ type: "error", message: err.message || "Failed to create user." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-10 md:mb-14">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3">System <span className="gradient-text">Overview.</span></h1>
                <p className="text-white/30 font-medium">Welcome to the MetaCode control core. All systems are synchronized.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
                <StatCard label="Journal Voices" value={blogCount} icon={FileText} color="#6c63ff" sub="Published insights" />
                <StatCard label="Projects" value={projectCount} icon={Briefcase} color="#f59e0b" sub="Works in showcase" />
                <StatCard label="Unread" value={unreadCount} icon={Mail} color="#00f5c4" sub="Awaiting attention" />
                <StatCard label="Total Reach" value={totalMessages} icon={Users} color="#ff6b9d" sub="Contact inquiries" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-lg font-black text-white mb-8 tracking-tight">Quick Actions</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Write New Journal Entry", icon: Plus, action: () => setView("blogs"), color: "#6c63ff" },
                            { label: "Upload New Project", icon: Briefcase, action: () => setView("projects"), color: "#f59e0b" },
                            { label: "Read New Messages", icon: MessageSquare, action: () => setView("messages"), color: "#00f5c4", badge: unreadCount },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                className="w-full flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                                    <item.icon size={16} style={{ color: item.color }} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors flex-1 text-left">{item.label}</span>
                                {"badge" in item && item.badge !== undefined && item.badge > 0 && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-accent/20 text-accent">{item.badge} new</span>
                                )}
                                <ArrowRight size={14} className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-lg font-black text-white mb-8 tracking-tight">System Pulse</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Blog Engine", status: "Online", ok: true },
                            { label: "Message Inbox", status: "Synchronized", ok: true },
                            { label: "Contact Form", status: "Active", ok: true },
                            { label: "Cloudinary CDN", status: "Connected", ok: true },
                            { label: "MongoDB Atlas", status: "Live", ok: true },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-none">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${item.ok ? "bg-accent animate-pulse" : "bg-white/20"}`} />
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.ok ? "text-accent" : "text-white/20"}`}>{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Management Section */}
            <div className="mt-8 p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Users size={18} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white tracking-tight">Access Control</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">Deploy New Operatives</p>
                    </div>
                </div>

                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">Name</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3 px-4 text-white text-sm focus:border-primary/50 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3 px-4 text-white text-sm focus:border-primary/50 outline-none transition-all" placeholder="name@metacode.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3 px-4 text-white text-sm focus:border-primary/50 outline-none transition-all" placeholder="••••••••" minLength={6} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30">Clearance Level</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "editor")} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3 px-4 text-white text-sm focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer">
                            <option value="editor" className="bg-[#08080f]">Content Editor</option>
                            <option value="admin" className="bg-[#08080f]">System Administrator</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:shadow-glow-primary transition-all disabled:opacity-50">
                        {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        {loading ? "Deploying..." : "Create User"}
                    </button>
                </form>

                {status && (
                    <div className={`mt-6 p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${status.type === "success" ? "bg-accent/10 text-accent border border-accent/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────── Blog Modal ─────────────── */
function BlogModal({ editingBlog, onClose, onSubmit, saving }: {
    editingBlog: BlogPost | null;
    onClose: () => void;
    onSubmit: (data: any) => void;
    saving: boolean;
}) {
    const [formData, setFormData] = useState({
        title: editingBlog?.title ?? "",
        excerpt: editingBlog?.excerpt ?? "",
        content: editingBlog?.content ?? "",
        image: editingBlog?.image ?? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        imagePublicId: editingBlog?.imagePublicId ?? "",
        category: editingBlog?.category ?? "Design",
        author: editingBlog?.author ?? "MetaCode Team",
        tags: editingBlog?.tags?.join(", ") ?? "",
        published: editingBlog?.published ?? true,
    });
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const categories = ["Design", "Technology", "Cognitive", "Storytelling", "Strategy"];

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { url, publicId } = await uploadApi.uploadImage(file, "blogs");
            setFormData((prev) => ({ ...prev, image: url, imagePublicId: publicId }));
        } catch (err: any) {
            alert("Image upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                className="relative w-full max-w-4xl bg-[#0d0d16] border border-white/[0.08] rounded-3xl md:rounded-[3rem] overflow-y-auto max-h-[92vh] shadow-2xl"
            >
                <div className="sticky top-0 z-10 bg-[#0d0d16]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 md:px-12 py-6 md:py-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                            {editingBlog ? "Edit" : "New"} <span className="gradient-text">Journal Entry</span>
                        </h2>
                        <p className="text-white/30 text-xs mt-1 font-medium">Capture the insight and release it into the digital void.</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 transition-all duration-300 group">
                        <X size={18} className="text-white/40 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-8 md:space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Title *</label>
                            <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-lg font-bold text-white placeholder:text-white/10 focus:border-primary/50 focus:bg-white/[0.07] outline-none transition-all" placeholder="The Eternal Void..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Category *</label>
                            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-lg font-bold text-white appearance-none focus:border-primary/50 outline-none transition-all">
                                {categories.map((c) => <option key={c} className="bg-[#0d0d16]">{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Author *</label>
                            <input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-lg font-bold text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all" placeholder="Siddhartha..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Tags (comma-separated)</label>
                            <input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white/60 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all" placeholder="UI, Web3, Design..." />
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Cover Image</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <ImageIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 pl-12 pr-6 text-white/60 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all" placeholder="https://... or upload below" />
                            </div>
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/20 transition-all disabled:opacity-50"
                            >
                                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </div>
                        {formData.image && (
                            <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                                <img src={formData.image} className="w-full h-full object-cover opacity-60" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest text-white/40">Image Preview</div>
                                {formData.imagePublicId && <div className="absolute bottom-4 right-4 text-[9px] text-accent font-bold">☁ Cloudinary</div>}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Excerpt / Subnarrative *</label>
                        <textarea required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white/60 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all min-h-[100px] resize-none" placeholder="Summarize the key insight in 2–3 sentences..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Primary Content *</label>
                        <textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white/60 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all min-h-[280px] resize-none" placeholder="Write the full article content here. Use double line breaks for paragraphs." />
                    </div>

                    {/* Published toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, published: !p.published }))}
                            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${formData.published ? "bg-accent" : "bg-white/10"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${formData.published ? "left-7" : "left-1"}`} />
                        </button>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                            {formData.published ? "Published" : "Draft"}
                        </span>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/[0.05]">
                        <button type="button" onClick={onClose} className="px-8 py-4 rounded-2xl border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all font-black text-[10px] uppercase tracking-[0.3em]">Cancel</button>
                        <button type="submit" disabled={saving || uploading} className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:shadow-glow-primary hover:scale-105 transition-all duration-300 active:scale-95 group disabled:opacity-60 disabled:scale-100">
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} className="group-hover:rotate-12 transition-transform" />}
                            {saving ? "Saving..." : editingBlog ? "Update Entry" : "Publish Entry"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

/* ─────────────── Blog Manager View ─────────────── */
function BlogsView() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchBlogs = () => {
        setLoading(true);
        blogApi.getAll({ limit: "100" })
            .then((res) => setBlogs(res.blogs))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchBlogs(); }, []);

    const filtered = blogs.filter(
        (b) =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async (data: any) => {
        setSaving(true);
        try {
            if (editingBlog) {
                await blogApi.update(editingBlog._id, data);
            } else {
                await blogApi.create(data);
            }
            setIsModalOpen(false);
            fetchBlogs();
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await blogApi.delete(id);
            setConfirmDelete(null);
            fetchBlogs();
        } catch (err: any) {
            alert("Delete failed: " + err.message);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 md:mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">Journal <span className="gradient-text">Manager.</span></h1>
                    <p className="text-white/30 font-medium">{blogs.length} insights archived in the digital digital solutions provider</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => { setEditingBlog(null); setIsModalOpen(true); }}
                    className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-glow-primary transition-all duration-300 group flex-shrink-0"
                >
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                    New Entry
                </motion.button>
            </div>

            <div className="relative mb-8">
                <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search entries by title or category..." className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl py-4 pl-12 pr-6 text-white/60 placeholder:text-white/20 focus:border-primary/40 outline-none transition-all" />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((blog) => (
                            <motion.div
                                key={blog._id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                className="group flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 rounded-3xl md:rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-500"
                            >
                                <div className="w-full sm:w-52 aspect-video sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={blog.title} />
                                </div>
                                <div className="flex-1 w-full min-w-0">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-[9px] font-black tracking-[0.35em] uppercase text-primary">{blog.category}</span>
                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                            {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                        </span>
                                        <span className="text-[9px] font-bold text-white/20">By {blog.author}</span>
                                        {!blog.published && <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Draft</span>}
                                    </div>
                                    <h2 className="text-xl font-black text-white leading-tight mb-1 truncate">{blog.title}</h2>
                                    <p className="text-white/30 text-sm line-clamp-1">{blog.excerpt}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <a href={`/blog/${blog._id}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group/btn">
                                        <Eye size={15} className="text-white/20 group-hover/btn:text-white transition-colors" />
                                    </a>
                                    <button onClick={() => { setEditingBlog(blog); setIsModalOpen(true); }} className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group/btn">
                                        <Edit3 size={15} className="text-white/20 group-hover/btn:text-white transition-colors" />
                                    </button>
                                    {confirmDelete === blog._id ? (
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDelete(blog._id)} className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center group/btn">
                                                <Check size={15} className="text-red-400" />
                                            </button>
                                            <button onClick={() => setConfirmDelete(null)} className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                                                <X size={15} className="text-white/20" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setConfirmDelete(blog._id)} className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all group/btn">
                                            <Trash2 size={15} className="text-white/20 group-hover/btn:text-red-400 transition-colors" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div className="py-24 text-center rounded-[2.5rem] border border-dashed border-white/10">
                            <FileText size={40} className="mx-auto text-white/10 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.6em] text-sm">
                                {searchQuery ? "No entries match your search." : "The digital solutions provider is silent. Create the first entry."}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <BlogModal
                        editingBlog={editingBlog}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        saving={saving}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────── Project Modal ─────────────── */
function ProjectModal({ editingProject, onClose, onSubmit, saving }: {
    editingProject: Project | null;
    onClose: () => void;
    onSubmit: (data: any) => void;
    saving: boolean;
}) {
    const [formData, setFormData] = useState({
        title: editingProject?.title ?? "",
        slug: editingProject?.slug ?? "",
        category: editingProject?.category ?? "Web Development",
        type: editingProject?.type ?? "website",
        image: editingProject?.image ?? "",
        imagePublicId: editingProject?.imagePublicId ?? "",
        year: editingProject?.year ?? new Date().getFullYear().toString(),
        description: editingProject?.description ?? "",
        longDescription: editingProject?.longDescription ?? "",
        client: editingProject?.client ?? "",
        role: editingProject?.role ?? "Full Stack Development",
        stack: editingProject?.stack?.join(", ") ?? "",
        link: editingProject?.link ?? "",
        published: editingProject?.published ?? true,
    });
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const types = [
        { id: "website", label: "Web App" },
        { id: "graphics", label: "Graphics" },
        { id: "social_media", label: "Social Media" }
    ];

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFormData({ ...formData, title: val, slug: generateSlug(val) });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { url, publicId } = await uploadApi.uploadImage(file, "projects");
            setFormData((prev: any) => ({ ...prev, image: url, imagePublicId: publicId }));
        } catch (err: any) {
            alert("Image upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            stack: formData.stack.split(",").map((t: string) => t.trim()).filter(Boolean),
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                className="relative w-full max-w-4xl bg-[#0d0d16] border border-white/[0.08] rounded-3xl md:rounded-[3rem] overflow-y-auto max-h-[92vh] shadow-2xl"
            >
                <div className="sticky top-0 z-10 bg-[#0d0d16]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 md:px-12 py-6 md:py-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                            {editingProject ? "Edit" : "New"} <span className="gradient-text">Project Entry</span>
                        </h2>
                        <p className="text-white/30 text-xs mt-1 font-medium">Add a new masterpiece to your digital showcase.</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 transition-all duration-300 group">
                        <X size={18} className="text-white/40 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-8 md:space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Project Title *</label>
                            <input required value={formData.title} onChange={handleTitleChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-lg font-bold text-white focus:border-primary/50 outline-none transition-all" placeholder="Project Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Category *</label>
                            <input required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-lg font-bold text-white focus:border-primary/50 outline-none transition-all" placeholder="e.g. E-Commerce" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Type *</label>
                            <select value={formData.type} onChange={(e: any) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 font-bold text-white appearance-none focus:border-primary/50 outline-none transition-all">
                                {types.map((t) => <option key={t.id} value={t.id} className="bg-[#0d0d16]">{t.label}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Slug (Auto-generated)</label>
                            <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 font-mono text-xs text-primary/70 focus:border-primary/50 outline-none transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Client</label>
                            <input value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white focus:border-primary/50 outline-none transition-all" placeholder="Client Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Role</label>
                            <input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white focus:border-primary/50 outline-none transition-all" placeholder="Full Stack Development" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Stack (comma-separated)</label>
                            <input value={formData.stack} onChange={(e) => setFormData({ ...formData, stack: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white focus:border-primary/50 outline-none transition-all" placeholder="React, Node.js, etc." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Project Link</label>
                            <input value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white focus:border-primary/50 outline-none transition-all" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Display Image *</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <ImageIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 pl-12 pr-6 text-white/60 focus:border-primary/50 outline-none transition-all" placeholder="Image URL or upload" />
                            </div>
                            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/20 transition-all">
                                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </div>
                        {formData.image && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                                <img src={formData.image} className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Short Description *</label>
                        <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white/60 focus:border-primary/50 outline-none transition-all min-h-[100px] resize-none" placeholder="One sentence teaser..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Detailed Narrative</label>
                        <textarea value={formData.longDescription} onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-5 px-6 text-white/60 focus:border-primary/50 outline-none transition-all min-h-[200px] resize-none" placeholder="Explain the project impact and challenges..." />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/[0.05]">
                        <button type="button" onClick={onClose} className="px-8 py-4 rounded-2xl border border-white/10 text-white/30 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.3em]">Cancel</button>
                        <button type="submit" disabled={saving || uploading} className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:shadow-glow-primary hover:scale-105 transition-all">
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                            {saving ? "Storing..." : editingProject ? "Update Masterpiece" : "Add to Showcase"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

/* ─────────────── Project Manager View ─────────────── */
function ProjectsView() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchProjects = () => {
        setLoading(true);
        projectApi.getAll()
            .then((res) => setProjects(res.projects))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchProjects(); }, []);

    const filtered = projects.filter(
        (p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async (data: any) => {
        setSaving(true);
        try {
            if (editingProject) await projectApi.update(editingProject._id, data);
            else await projectApi.create(data);
            setIsModalOpen(false);
            fetchProjects();
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this masterpiece?")) return;
        try {
            await projectApi.delete(id);
            fetchProjects();
        } catch (err: any) {
            alert("Delete failed: " + err.message);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">Showcase <span className="gradient-text">Manager.</span></h1>
                    <p className="text-white/30 font-medium">{projects.length} artifacts in the digital museum.</p>
                </div>
                <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn btn-primary px-8">
                    <Plus size={16} /> New Project
                </button>
            </div>

            <div className="relative mb-8">
                <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Filter artifacts..." className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl py-4 pl-12 pr-6 text-white/60 focus:border-primary/40 outline-none transition-all" />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p) => (
                        <div key={p._id} className="group p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-500">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button onClick={() => { setEditingProject(p); setIsModalOpen(true); }} className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-all"><Edit3 size={14} /></button>
                                    <button onClick={() => handleDelete(p._id)} className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-primary text-white">{p.type}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">{p.title}</h3>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">{p.category} · {p.year}</p>
                            <p className="text-white/40 text-sm line-clamp-2 leading-relaxed mb-6">{p.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {p.stack.slice(0, 3).map((s) => <span key={s} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-white/[0.05] text-white/40">{s}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && <ProjectModal editingProject={editingProject} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} saving={saving} />}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────── Messages View ─────────────── */
function MessagesView() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchMessages = () => {
        setLoading(true);
        contactApi.getAll({ limit: "100" })
            .then((res) => {
                setMessages(res.contacts);
                setUnreadCount(res.pagination.unread);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchMessages(); }, []);

    const filtered = messages.filter(
        (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedMsg = messages.find((m) => m._id === selected);

    const handleSelect = async (id: string) => {
        setSelected(id);
        const msg = messages.find((m) => m._id === id);
        if (msg && !msg.read) {
            try {
                await contactApi.markRead(id);
                setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m));
                setUnreadCount((c) => Math.max(0, c - 1));
            } catch { /* silent */ }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await contactApi.delete(id);
            setSelected(null);
            fetchMessages();
        } catch (err: any) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleMarkReplied = async (id: string) => {
        try {
            await contactApi.markReplied(id);
            setMessages((prev) => prev.map((m) => m._id === id ? { ...m, replied: true, read: true } : m));
        } catch { /* silent */ }
    };

    return (
        <div>
            <div className="mb-8 md:mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">
                    Messages Inbox. {unreadCount > 0 && <span className="text-primary text-2xl md:text-3xl">{unreadCount} new</span>}
                </h1>
                <p className="text-white/30 font-medium">{messages.length} messages received from potential clients.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="flex flex-col lg:grid lg:grid-cols-[350px_1fr] gap-6 lg:min-h-[600px]">
                    {/* Message List */}
                    <div className="bg-white/[0.02] rounded-3xl lg:rounded-[2rem] border border-white/[0.05] overflow-hidden flex flex-col max-h-[450px] lg:max-h-[800px]">
                        <div className="p-5 border-b border-white/[0.05]">
                            <div className="relative">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search messages..." className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl py-3 pl-10 pr-4 text-white/60 placeholder:text-white/20 text-sm focus:border-primary/40 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {filtered.map((msg) => (
                                <button
                                    key={msg._id}
                                    onClick={() => handleSelect(msg._id)}
                                    className={`w-full text-left p-5 border-b border-white/[0.04] last:border-none hover:bg-white/[0.04] transition-all duration-200 ${selected === msg._id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {!msg.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 animate-pulse" />}
                                            <p className={`font-black text-sm truncate ${msg.read ? "text-white/50" : "text-white"}`}>{msg.name}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {msg.replied && <span className="text-[8px] font-black text-accent uppercase tracking-wider">Replied</span>}
                                            <span className="text-[9px] text-white/20 font-bold">
                                                {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                                            </span>
                                        </div>
                                    </div>
                                    {msg.company && <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mb-1">{msg.company}</p>}
                                    <p className="text-white/30 text-xs line-clamp-2">{msg.message}</p>
                                </button>
                            ))}
                            {filtered.length === 0 && (
                                <div className="p-10 text-center">
                                    <p className="text-white/20 text-xs font-black uppercase tracking-widest">No messages found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="bg-white/[0.02] rounded-3xl lg:rounded-[2rem] border border-white/[0.05] overflow-hidden flex flex-col min-h-[400px]">
                        {selectedMsg ? (
                            <div className="flex flex-col h-full">
                                <div className="p-8 border-b border-white/[0.05] flex items-start justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-2xl font-black text-white">{selectedMsg.name}</h3>
                                            {selectedMsg.company && (
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">{selectedMsg.company}</span>
                                            )}
                                        </div>
                                        <p className="text-white/30 text-sm">{selectedMsg.email}</p>
                                        <p className="text-white/20 text-xs mt-1">
                                            {new Date(selectedMsg.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                        </p>
                                    </div>
                                    <button onClick={() => handleDelete(selectedMsg._id)} className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all group">
                                        <Trash2 size={15} className="text-white/20 group-hover:text-red-400 transition-colors" />
                                    </button>
                                </div>

                                {(selectedMsg.service || selectedMsg.budget) && (
                                    <div className="px-8 py-5 border-b border-white/[0.05] flex gap-8">
                                        {selectedMsg.service && (
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-1">Service</p>
                                                <p className="text-sm font-bold text-white/60">{selectedMsg.service}</p>
                                            </div>
                                        )}
                                        {selectedMsg.budget && (
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-1">Budget</p>
                                                <p className="text-sm font-bold text-accent">{selectedMsg.budget}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex-1 p-8 overflow-y-auto">
                                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-6">Message</p>
                                    <p className="text-white/70 leading-[1.9] text-lg">{selectedMsg.message}</p>
                                </div>

                                <div className="p-8 border-t border-white/[0.05] flex gap-4">
                                    <a
                                        href={`mailto:${selectedMsg.email}`}
                                        onClick={() => handleMarkReplied(selectedMsg._id)}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:shadow-glow-primary hover:scale-105 transition-all duration-300"
                                    >
                                        <Mail size={16} />
                                        Reply via Email
                                    </a>
                                    {!selectedMsg.replied && (
                                        <button
                                            onClick={() => handleMarkReplied(selectedMsg._id)}
                                            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-[0.2em] hover:bg-accent/20 transition-all"
                                        >
                                            <Check size={14} />
                                            Mark Replied
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center flex-col gap-6">
                                <MessageSquare size={48} className="text-white/10" />
                                <p className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Select a message to read</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}



/* ─────────────── Main Admin Shell ─────────────── */
export default function Admin() {
    const [user, setUser] = useState<{ id: string; email: string; name: string; role: string } | null | undefined>(undefined);
    const [view, setView] = useState<AdminView>("dashboard");
    const [blogCount, setBlogCount] = useState(0);
    const [projects, setProjects] = useState<Project[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Verify token on mount
    useEffect(() => {
        const token = getToken();
        if (!token) { setUser(null); return; }
        authApi.me()
            .then((res) => {
                setUser(res.admin);
                if (res.admin.role === "editor") setView("blogs");
            })
            .catch(() => { clearToken(); setUser(null); });
    }, []);

    // Load dashboard counts
    useEffect(() => {
        if (!user) return;
        blogApi.getAll({ limit: "1" }).then((r) => setBlogCount(r.pagination.total));
        projectApi.getAll().then((r) => setProjects(r.projects));

        if (user.role === "admin") {
            contactApi.getAll({ limit: "1" }).then((r) => {
                setTotalMessages(r.pagination.total);
                setUnreadCount(r.pagination.unread);
            });
        }
    }, [user]);

    if (user === undefined) {
        return (
            <div className="min-h-screen bg-[#050508] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <LoginScreen onLogin={(usr) => {
            setUser(usr);
            if (usr.role === "editor") setView("blogs");
        }} />;
    }

    const handleLogout = () => {
        clearToken();
        setUser(null);
    };

    const views: Record<AdminView, React.ReactNode> = {
        dashboard: user.role === "admin" ? <DashboardView blogCount={blogCount} unreadCount={unreadCount} totalMessages={totalMessages} projectCount={projects.length} setView={setView} /> : <BlogsView />,
        blogs: <BlogsView />,
        projects: <ProjectsView />,
        messages: user.role === "admin" ? <MessagesView /> : <BlogsView />,
    };

    return (
        <div className="min-h-screen bg-[#050508] text-white">
            <Sidebar view={view} setView={setView} unreadCount={unreadCount} blogCount={blogCount} onLogout={handleLogout} open={sidebarOpen} setOpen={setSidebarOpen} role={user.role} />

            <main className="lg:ml-72 min-h-screen transition-all duration-500">
                {/* Top Bar */}
                <div className="sticky top-0 z-40 bg-[#050508]/90 backdrop-blur-xl border-b border-white/[0.05] px-6 lg:px-10 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 mr-1 text-white/60 hover:text-white transition-colors">
                            <Menu size={18} />
                        </button>
                        <Layers size={14} className="text-primary/50 hidden sm:block" />
                        <span className="hidden sm:inline">Control Core</span>
                        <ChevronRight size={12} className="hidden sm:block" />
                        <span className="text-white/50 capitalize">{view}</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        {unreadCount > 0 && (
                            <button onClick={() => setView("messages")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/20 transition-all">
                                <Bell size={12} className="animate-bounce" />
                                {unreadCount} New
                            </button>
                        )}
                        <div className="flex items-center gap-3 px-5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <Sparkles size={13} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">MongoDB Live</span>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6 md:p-10 lg:p-14">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {views[view]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
