import { Code, Cpu, Cloud, Smartphone, Palette } from "lucide-react";

export const services = [
  {
    id: "01",
    slug: "frontend-development",
    title: "Frontend Development",
    desc: "Crafting immersive user interfaces with React, Framer Motion, and modern CSS for seamless web experiences.",
    longDesc: "Our frontend development service focuses on creating highly interactive, responsive, and performance-optimized web applications. We leverage the latest technologies like React, Next.js, and Framer Motion to build interfaces that not only look stunning but also provide an exceptional user experience across all devices.",
    icon: Code,
    color: "#00D4FF",
    features: [
      "Responsive Web Design",
      "Interactive UI/UX",
      "Performance Optimization",
      "Single Page Applications (SPA)",
      "Progressive Web Apps (PWA)"
    ]
  },
  {
    id: "02",
    slug: "backend-development",
    title: "Backend Development",
    desc: "Building robust architectures and scalable APIs using Node.js, Express, and high-performance databases.",
    longDesc: "We design and implement powerful backend systems that serve as the backbone of your digital products. From database architecture to API development and server management, we ensure your application is secure, scalable, and capable of handling high traffic with ease.",
    icon: Cpu,
    color: "#FF6B6B",
    features: [
      "RESTful & GraphQL APIs",
      "Database Architecture",
      "Cloud Infrastructure",
      "Real-time Systems",
      "Security & Authentication"
    ]
  },
  {
    id: "03",
    slug: "full-stack-development",
    title: "Full Stack Development",
    desc: "Bridging the gap between design and logic, delivering end-to-end solutions that are fast, secure, and scalable.",
    longDesc: "Our full-stack expertise allows us to handle every aspect of your project, from the initial concept and UI/UX design to backend implementation and deployment. We provide a cohesive development process that ensures all components of your application work together seamlessly.",
    icon: Cloud,
    color: "#6BCB77",
    features: [
      "End-to-end Solutions",
      "Cross-platform Compatibility",
      "Continuous Integration/Deployment",
      "Microservices Architecture",
      "Quality Assurance"
    ]
  },
  {
    id: "04",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    desc: "Creating native and cross-platform mobile applications for iOS and Android using modern frameworks.",
    longDesc: "We build high-quality mobile applications that provide native-like performance and a smooth user experience. Using frameworks like React Native and Flutter, we deliver cost-effective solutions that work perfectly on both iOS and Android platforms.",
    icon: Smartphone,
    color: "#F9D423",
    features: [
      "iOS & Android Development",
      "React Native Expertise",
      "Mobile UI/UX Design",
      "App Store Optimization",
      "Post-launch Support"
    ]
  },
  {
    id: "05",
    slug: "web-design",
    title: "Web Design",
    desc: "Creating visually stunning, user-centric designs that tell a story and drive meaningful engagement.",
    longDesc: "Our web design service focuses on creating visually stunning, user-centric websites that effectively communicate your brand message and provide an exceptional user experience. We combine creativity with technical expertise to deliver designs that are not only beautiful but also functional, responsive, and conversion-optimized across all devices.",
    icon: Palette,
    color: "#FAB1A0",
    features: [
      "Custom UI/UX Design",
      "Responsive Web Layouts",
      "Brand Identity Integration",
      "Prototyping & Wireframing",
      "Conversion Optimization",
      "Accessibility Compliance"
    ]
  }
];
