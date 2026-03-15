import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { settingsApi, SEOSettings } from "@/lib/api";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
}: SEOProps) => {
  const [settings, setSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    settingsApi.get().then((res) => {
      if (res.success) setSettings(res.settings);
    }).catch(err => console.error("SEO fetch failed", err));
  }, []);

  const siteName = settings?.siteName || "MetaCode";
  const fullTitle = title ? `${title} | ${siteName}` : (settings?.defaultTitle || `${siteName} | Future Digital Solutions - Premium Tech Agency`);
  const metaDescription = description || settings?.defaultDescription || "MetaCode is a premium tech agency in India delivering web development, branding, and custom digital solutions for modern businesses.";
  const baseUrl = settings?.baseUrl || "https://metacode.co.in";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const metaOgImage = ogImage || settings?.defaultOgImage || `${baseUrl}/logo.png`;
  const twitterHandle = settings?.twitterHandle || "@metacode";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Robot tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Keywords */}
      {settings?.keywords && settings.keywords.length > 0 && (
        <meta name="keywords" content={settings.keywords.join(", ")} />
      )}
    </Helmet>
  );
};
