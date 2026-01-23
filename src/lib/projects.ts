import mehryaan from "../assets/mehryaan.png";
import delightio from "../assets/delightio.png";
import brainbuildersabacus from "../assets/brainbuildersabacus.png";

export const projects = [
  {
    id: "01",
    slug: "mehryaan",
    title: "Mehryaan",
    category: "E-COMMERCE",
    image: mehryaan,
    year: "2026",
    description: "A high-end luxury e-commerce platform designed for a seamless shopping experience.",
    longDescription: "Mehryaan is a premium e-commerce destination that blends traditional elegance with modern digital convenience. We built a custom storefront that focuses on high-resolution imagery, lightning-fast performance, and an intuitive checkout flow that minimizes friction and maximizes conversion.",
    client: "Mehryaan Luxury",
    role: "Full Stack Development",
    stack: ["React", "Express", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "https://mehryan-e-commerce.vercel.app/"
  },
  {
    id: "02",
    slug: "delightio",
    title: "Delightio",
    category: "RESTAURANT",
    image: delightio,
    year: "2026",
    description: "An interactive digital menu and reservation system for a modern fusion restaurant.",
    longDescription: "Delightio reimagines the dining experience through a digital-first lens. The platform features an immersive interactive menu with real-time availability, a seamless table reservation system, and a backend dashboard for restaurant managers to handle orders and customer feedback efficiently.",
    client: "Delightio Hospitality Group",
    role: "UI/UX & Frontend Development",
    stack: ["React", "Express", "Tailwind CSS", "Firebase"],
    link: "https://delightio.vercel.app/"
  },
  {
    id: "03",
    slug: "exam portal",
    title: "exam portal",
    category: "Institute",
    image: brainbuildersabacus,
    year: "2026",
    description: " A centralized administrative hub for managing student registrations, exam configurations, and academic results.",
    longDescription: " The admin portal provides a robust suite of tools for educational administrators to efficiently manage the platform's core operations. It includes a streamlined dashboard for approving new student registrations, managing student data, and overseeing administrative accounts. Admins have full control over the examination lifecycle, including creating exams, managing question banks, controlling exam statuses (start/stop), and analyzing student results. Designed to simplify complex administrative workflows, the portal ensures operational efficiency and data accuracy in managing the entire educational ecosystem.",
    client: "brain builders abacus",
    role: "Frontend Development & backend Development",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    link: "http://www.brainbuildersabacus.com/"
  }
];
