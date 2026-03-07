import { useState, useEffect } from "react";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    author: string;
}

const DEFAULT_BLOGS: BlogPost[] = [
    {
        id: "1",
        title: "The Zero-Gravity Design Philosophy",
        excerpt: "Exploring how spatial computing and anti-gravity aesthetics are redefining high-end UI/UX in the era of XR.",
        content: "Design is no longer bound by the physics of the page. As we move into spatial interfaces, the 'grounded' elements are becoming anchors in an infinite void...",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        category: "Design",
        date: "Mar 05, 2026",
        author: "Siddhartha"
    },
    {
        id: "2",
        title: "Neuro-Aesthetics in Modern Tech",
        excerpt: "Decoding the cognitive impact of immersive storytelling and how subconscious design converts visitors into lifelong clients.",
        content: "Human perception is wired for patterns. In the digital void, creating a sequence of 'Aha!' moments through neuro-responsive visuals is the ultimate conversion tool...",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        category: "Cognitive",
        date: "Feb 28, 2026",
        author: "Elena"
    }
];

export function useBlogStore() {
    const [blogs, setBlogs] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem("metacode_blogs");
        return saved ? JSON.parse(saved) : DEFAULT_BLOGS;
    });

    useEffect(() => {
        localStorage.setItem("metacode_blogs", JSON.stringify(blogs));
    }, [blogs]);

    const addBlog = (blog: Omit<BlogPost, "id" | "date">) => {
        const newBlog: BlogPost = {
            ...blog,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
        };
        setBlogs((prev) => [newBlog, ...prev]);
    };

    const deleteBlog = (id: string) => {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
    };

    const updateBlog = (id: string, updated: Partial<BlogPost>) => {
        setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    };

    return { blogs, addBlog, deleteBlog, updateBlog };
}
