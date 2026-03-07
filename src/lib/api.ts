/**
 * MetaCode API Client
 * Centralised fetch wrapper for all backend calls.
 * Base URL is configurable via VITE_API_URL env var.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken(): string | null {
    return localStorage.getItem("metacode_admin_token");
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "API request failed");
    }

    return data as T;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
    login: (email: string, password: string) =>
        request<{ success: boolean; token: string; admin: { id: string; email: string; name: string; role: string } }>(
            "/auth/login",
            { method: "POST", body: JSON.stringify({ email, password }) }
        ),

    setup: () =>
        request<{ success: boolean; message: string }>("/auth/setup", { method: "POST" }),

    me: () =>
        request<{ success: boolean; admin: { id: string; email: string; name: string; role: string } }>("/auth/me"),

    createUser: (data: { email: string; password: string; name: string; role: "admin" | "editor" }) =>
        request<{ success: boolean; user: { id: string; email: string; name: string; role: string } }>("/auth/users", {
            method: "POST",
            body: JSON.stringify(data),
        }),
};

// ─── Blogs ───────────────────────────────────────────────────────────────────
export interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    imagePublicId?: string;
    category: string;
    author: string;
    tags: string[];
    published: boolean;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export const blogApi = {
    getAll: (params?: Record<string, string>) => {
        const qs = params ? "?" + new URLSearchParams(params).toString() : "";
        return request<{ success: boolean; blogs: BlogPost[]; pagination: { total: number; pages: number } }>(
            `/blogs${qs}`
        );
    },

    getById: (id: string) =>
        request<{ success: boolean; blog: BlogPost }>(`/blogs/${id}`),

    create: (data: Omit<BlogPost, "_id" | "views" | "createdAt" | "updatedAt">) =>
        request<{ success: boolean; blog: BlogPost }>("/blogs", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    update: (id: string, data: Partial<BlogPost>) =>
        request<{ success: boolean; blog: BlogPost }>(`/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        request<{ success: boolean; message: string }>(`/blogs/${id}`, { method: "DELETE" }),
};

// ─── Contacts ────────────────────────────────────────────────────────────────
export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    company?: string;
    service?: string;
    budget?: string;
    message: string;
    read: boolean;
    replied: boolean;
    createdAt: string;
}

export const contactApi = {
    submit: (data: Omit<ContactMessage, "_id" | "read" | "replied" | "createdAt">) =>
        request<{ success: boolean; contact: ContactMessage }>("/contacts", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    getAll: (params?: Record<string, string>) => {
        const qs = params ? "?" + new URLSearchParams(params).toString() : "";
        return request<{
            success: boolean;
            contacts: ContactMessage[];
            pagination: { total: number; pages: number; unread: number };
        }>(`/contacts${qs}`);
    },

    markRead: (id: string) =>
        request<{ success: boolean; contact: ContactMessage }>(`/contacts/${id}/read`, { method: "PATCH" }),

    markReplied: (id: string) =>
        request<{ success: boolean; contact: ContactMessage }>(`/contacts/${id}/replied`, { method: "PATCH" }),

    delete: (id: string) =>
        request<{ success: boolean; message: string }>(`/contacts/${id}`, { method: "DELETE" }),
};

// ─── Upload ──────────────────────────────────────────────────────────────────
export const uploadApi = {
    uploadImage: async (file: File, folder?: string): Promise<{ url: string; publicId: string }> => {
        const token = getToken();
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `${BASE_URL}/upload/image${folder ? `?folder=${folder}` : ""}`,
            {
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: formData,
            }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");
        return { url: data.url, publicId: data.publicId };
    },

    deleteImage: (publicId: string) =>
        request<{ success: boolean; message: string }>("/upload/image", {
            method: "DELETE",
            body: JSON.stringify({ publicId }),
        }),
};
