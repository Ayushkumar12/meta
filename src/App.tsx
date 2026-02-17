import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

// Pages
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Works = lazy(() => import("@/pages/Works"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      import("gsap/ScrollTrigger").then((m) => {
        m.ScrollTrigger.refresh();
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      {!loading && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <CustomCursor />
            <Navbar />

            <main className="relative z-10">
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/works" element={<Works />} />
                  <Route path="/works/:slug" element={<ProjectDetail />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Suspense>
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
