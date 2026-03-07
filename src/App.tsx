import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Works from "@/pages/Works";
import Feedback from "@/pages/Feedback";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import ServiceDetail from "@/pages/ServiceDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Admin from "@/pages/Admin";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      import("gsap/ScrollTrigger").then((m) => {
        m.ScrollTrigger.refresh();
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Render admin separately — no loading screen, smooth scroll, navbar, or footer
  if (isAdmin) {
    return (
      <>
        <CustomCursor />
        <NoiseOverlay />
        <Admin />
      </>
    );
  }

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      {!loading && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <CustomCursor />
            <Navbar />

            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/works" element={<Works />} />
                <Route path="/works/:slug" element={<ProjectDetail />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
              </Routes>
            </main>
            <Footer />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>
          </div>
        </SmoothScroll>
      )}
      <NoiseOverlay />
    </>
  );
}
