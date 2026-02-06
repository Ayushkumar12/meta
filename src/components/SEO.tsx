import { Helmet } from "react-helmet";
import logo from "../assets/logo.png";

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
  const siteName = "MetaCode";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Future Digital Solutions - Premium Tech Agency`;
  const defaultDescription = "MetaCode is a premium tech agency in India delivering web development, branding, and custom digital solutions for modern businesses.";
  const metaDescription = description || defaultDescription;
  const url = "https://metacode.co.in";
  const fullCanonical = canonical ? `${url}${canonical}` : url;
  const defaultOgImage = "https://metacode.co.in/assets/logo-DM748ReK.png";
  const metaOgImage = ogImage || defaultOgImage;

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

      {/* Robot tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Helmet>
  );
};
