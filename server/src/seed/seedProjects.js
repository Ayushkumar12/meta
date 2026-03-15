const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');
const connectDB = require('../config/db');

const projects = [
  {
    title: "KDMCH-1",
    slug: "KDMCH-1",
    category: "Institute",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/kd1.png",
    imagePublicId: "meta/kd1",
    year: "2026",
    description: "Kanti Devi Medical College and Hospital-1 is a comprehensive web-based platform designed to provide information about the medical college and hospital.",
    longDescription: "Kanti Devi Medical College and Hospital-1 is a comprehensive web-based platform that aggregates a wide range of information about the medical college and hospital, including details about courses, faculty, facilities, and patient services.",
    client: "Kanti Devi Medical College and Hospital",
    role: "Frontend Development & backend Development",
    stack: ["React", "tailwind CSS"],
    link: "https://kd-college-2nd-website.vercel.app/"
  },
  {
    title: "KDMCH-2",
    slug: "KDMCH-2",
    category: "Institute",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/kd2.png",
    imagePublicId: "meta/kd2",
    year: "2026",
    description: "Kanti Devi Medical College and Hospital-2 is a comprehensive web-based platform designed to provide information about the medical college and hospital.",
    longDescription: "Kanti Devi Medical College and Hospital-2 is a comprehensive web-based platform that aggregates a wide range of information about the medical college and hospital, including details about courses, faculty, facilities, and patient services.",
    client: "Kanti Devi Medical College and Hospital",
    role: "Frontend Development & backend Development",
    stack: ["React", "tailwind CSS"],
    link: "https://kanti-devi-college.vercel.app/"
  },
  {
    title: "Mehryaan",
    slug: "mehryaan",
    category: "E-COMMERCE",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/mehryaan.png",
    imagePublicId: "meta/mehryaan",
    year: "2026",
    description: "A high-end luxury e-commerce platform designed for a seamless shopping experience.",
    longDescription: "Mehryaan is a premium e-commerce destination that blends traditional elegance with modern digital convenience. We built a custom storefront that focuses on high-resolution imagery, lightning-fast performance, and an intuitive checkout flow that minimizes friction and maximizes conversion.",
    client: "Metacode",
    role: "Full Stack Development",
    stack: ["React", "Express", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "https://mehryan-e-commerce.vercel.app/"
  },
  {
    title: "Delightio",
    slug: "delightio",
    category: "RESTAURANT",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/delightio.png",
    imagePublicId: "meta/delightio",
    year: "2026",
    description: "An interactive digital menu and reservation system for a modern fusion restaurant.",
    longDescription: "Delightio reimagines the dining experience through a digital-first lens. The platform features an immersive interactive menu with real-time availability, a seamless table reservation system, and a backend dashboard for restaurant managers to handle orders and customer feedback efficiently.",
    client: "Metacode",
    role: "Full Stack Development",
    stack: ["React", "Express", "Tailwind CSS", "Firebase"],
    link: "https://delightio.vercel.app/"
  },
  {
    title: "Brain Builders Abacus",
    slug: "brainbuildersabacus",
    category: "Institute",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/brainbuildersabacus.png",
    imagePublicId: "meta/brainbuildersabacus",
    year: "2026",
    description: "A centralized administrative hub for managing student registrations, exam configurations, and academic results.",
    longDescription: "The admin portal provides a robust suite of tools for educational administrators to efficiently manage the platform's core operations. It includes a streamlined dashboard for approving new student registrations, managing student data, and overseeing administrative accounts. Designed to simplify complex administrative workflows, the portal ensures operational efficiency and data accuracy in managing the entire educational ecosystem.",
    client: "Brain Builders Abacus",
    role: "Frontend Development & backend Development",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    link: "http://www.brainbuildersabacus.com/"
  },
  {
    title: "EduPrime",
    slug: "eduprime",
    category: "Education",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/eduprime.png",
    imagePublicId: "meta/eduprime",
    year: "2026",
    description: "EduPrime (Learning Management System) developed a web-based LMS that enables students to access courses, learning materials, and educational resources.",
    longDescription: "EduPrime is a comprehensive Learning Management System (LMS) designed to facilitate online education and streamline the learning process. Built using React for the frontend, Tailwind CSS for styling, Express and Node.js for the backend, and MongoDB for data storage, EduPrime offers a robust platform for students and educators alike.",
    client: "MetaCode",
    role: "Frontend Development & backend Development",
    stack: ["React", "MongoDB", "Node", "tailwind CSS", "Express", "Cloudinary"],
    link: "https://lms-sand-beta.vercel.app"
  },
  {
    title: "iCoder",
    slug: "icoder",
    category: "Education",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/icoder.png",
    imagePublicId: "meta/icoder",
    year: "2026",
    description: "iCoder Project is an innovative web-based platform designed to support programmers, learners, and technology enthusiasts.",
    longDescription: "The iCoder Project features an integrated code editor that allows users to write, test, and debug code in multiple programming languages, combined with a comprehensive eBook library filled with programming guides and tutorials.",
    client: "MetaCode",
    role: "Frontend Development & backend Development",
    stack: ["JavaScript", "HTML", "CSS", "bootstrap", "Node", "Express", "MongoDB", "Cloudinary"],
    link: "https://i-coder-a-coding-platform.vercel.app"
  },
  {
    title: "Fresh Meat Wala",
    slug: "freshmeatwala",
    category: "Food",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/freshmeatwala.png",
    imagePublicId: "meta/freshmeatwala",
    year: "2026",
    description: "FreshMeatWala is a premium hyperlocal delivery platform designed to connect meat lovers with trusted local vendors.",
    longDescription: "FreshMeatWala is a cutting-edge online platform that revolutionizes the way customers access and purchase non-vegetarian food products, ensuring quality and convenience from trusted local vendors.",
    client: "MetaCode",
    role: "Frontend Development & backend Development",
    stack: ["React", "MongoDB", "Node", "tailwind CSS", "Express", "Cloudinary"],
    link: "https://fresh-meat-wala.vercel.app"
  },
  {
    title: "ToolBox",
    slug: "toolbox",
    category: "Services",
    type: "website",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/toolbox.png",
    imagePublicId: "meta/toolbox",
    year: "2026",
    description: "ToolBox is a free web-based platform that provides multiple everyday digital tools in one place, helping users perform common tasks quickly.",
    longDescription: "ToolBox is a comprehensive web-based platform that aggregates a wide range of everyday digital tools in a single, accessible location, designed for operational efficiency and ease of use.",
    client: "MetaCode",
    role: "Frontend Development & backend Development",
    stack: ["React", "MongoDB", "Next", "tailwind CSS", "Express", "Cloudinary"],
    link: "https://tool-box-solution.vercel.app"
  },
  {
    title: "Seed Depot Canada",
    slug: "seed-depot-canada",
    category: "Social Media",
    type: "social_media",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/sdc.png",
    imagePublicId: "meta/sdc",
    year: "2026",
    description: "Social media management and content creation for Seed Depot Canada to grow their online community.",
    longDescription: "Managed social media presence for Seed Depot Canada, focusing on visual storytelling and community engagement through the Instagram platform.",
    client: "Seed Depot Canada",
    role: "Social Media",
    stack: ["Instagram", "Content Creation"],
    link: "https://www.instagram.com/seeddepotcanada/"
  },
  {
    title: "Medicos Family Clinic",
    slug: "medicos-family-clinic",
    category: "Social Media",
    type: "social_media",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/mfc.png",
    imagePublicId: "meta/mfc",
    year: "2026",
    description: "Visual identity and social media presence for Medicos Family Clinic.",
    longDescription: "Enhanced the digital outreach of Medicos Family Clinic through strategic content creation and active social media management on Instagram.",
    client: "Medicos Family Clinic",
    role: "Social Media",
    stack: ["Instagram", "Visual Design"],
    link: "https://www.instagram.com/medicosfamilyclinic/"
  },
  {
    title: "Yoga Addicts",
    slug: "yoga-addicts",
    category: "Social Media",
    type: "social_media",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/ya.png",
    imagePublicId: "meta/ya",
    year: "2026",
    description: "Spiritual and physical wellness promotion through social media channels.",
    longDescription: "Strategic social media management for Yoga Addicts, focusing on promoting mindfulness and physical well-being through engaging Instagram content.",
    client: "Yoga Addicts",
    role: "Social Media",
    stack: ["Instagram", "Content Strategy"],
    link: "https://www.instagram.com/yoga-addicts/"
  },
  {
    title: "D-BEST-MASSAGE",
    slug: "dbestmassage",
    category: "Social Media",
    type: "social_media",
    image: "https://res.cloudinary.com/ddd0pijhx/image/upload/v1710500000/meta/dbm.png",
    imagePublicId: "meta/dbm",
    year: "2026",
    description: "Premium massage and wellness social media management.",
    longDescription: "Crafting a premium online identity for D-BEST-MASSAGE through curated visual content and targeted social media marketing on Instagram.",
    client: "D-BEST-MASSAGE",
    role: "Social Media",
    stack: ["Instagram", "Branding"],
    link: "https://www.instagram.com/dbestmassage/"
  }
];

const seedProjects = async () => {
  try {
    await connectDB();

    // Delete existing projects that might conflict with slugs
    // Or just clear all if you want a fresh start
    // await Project.deleteMany({});

    for (const project of projects) {
      await Project.findOneAndUpdate(
        { slug: project.slug },
        project,
        { upsert: true, new: true }
      );
    }

    console.log('Projects seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProjects();
