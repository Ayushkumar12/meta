import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";

const ParallaxCanvas = lazy(() => import("@/components/canvas/ParallaxCanvas").then(m => ({ default: m.ParallaxCanvas })));
const Hero = lazy(() => import("@/components/sections/Hero").then(m => ({ default: m.Hero })));
const CoreServices = lazy(() => import("@/components/sections/CoreServices").then(m => ({ default: m.CoreServices })));
const Process = lazy(() => import("@/components/sections/Process").then(m => ({ default: m.Process })));
const WhyChooseUs = lazy(() => import("@/components/sections/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
// const ClientFeedback = lazy(() => import("@/components/sections/ClientFeedback").then(m => ({ default: m.ClientFeedback })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ParallaxCanvas />
      <div className="relative z-10">
        <Helmet>
          
        <meta property="title" content="MetaCode | Future Digital Solutions - Premium Tech Agency" />


        <meta property="og:title" content="MetaCode | Future Digital Solutions - Premium Tech Agency"/>

        <meta name="robots" content="index, follow" />

        <meta name="url" content="https://metacode.co.in/" />

        <meta
          name="identifier-url"
          content="https://metacode.co.in/ "
        />

        <meta name="revisit-after" content="1 days" />

        <meta name="googlebot" content="index, follow" />

        <link
          rel="canonical"
          href="https://metacode.co.in/"
        />

        <meta name="bingbot" content="index, follow" />

        
      </Helmet>
        <Hero />
        <CoreServices />
        <Process />
        <WhyChooseUs />
        {/* <ClientFeedback /> */}
        <Contact />
      </div>
    </Suspense>
  );
}
