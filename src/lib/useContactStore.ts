import { useState, useEffect } from "react";

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    company?: string;
    service?: string;
    budget?: string;
    message: string;
    date: string;
    read: boolean;
}

const DEMO_MESSAGES: ContactMessage[] = [
    {
        id: "1",
        name: "Arjun Mehta",
        email: "arjun@nextvision.io",
        company: "NextVision",
        service: "Web Design",
        budget: "$5k–$15k",
        message: "We need a full brand overhaul and an interactive 3D landing page. Timeline is 8 weeks. Please reach out ASAP.",
        date: "Mar 04, 2026",
        read: false,
    },
    {
        id: "2",
        name: "Sofia Ruiz",
        email: "sofia@runnerpack.co",
        company: "RunnerPack",
        service: "Branding",
        budget: "$15k+",
        message: "Looking for an agency to redesign our entire digital identity—from logo to product UI. Big project with long-term retainer potential.",
        date: "Mar 03, 2026",
        read: true,
    },
];

export function useContactStore() {
    const [messages, setMessages] = useState<ContactMessage[]>(() => {
        const saved = localStorage.getItem("metacode_contacts");
        return saved ? JSON.parse(saved) : DEMO_MESSAGES;
    });

    useEffect(() => {
        localStorage.setItem("metacode_contacts", JSON.stringify(messages));
    }, [messages]);

    const markRead = (id: string) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
    };

    const deleteMessage = (id: string) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    const addMessage = (msg: Omit<ContactMessage, "id" | "date" | "read">) => {
        const newMsg: ContactMessage = {
            ...msg,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
            read: false,
        };
        setMessages((prev) => [newMsg, ...prev]);
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    return { messages, markRead, deleteMessage, addMessage, unreadCount };
}
