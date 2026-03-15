/**
 * Utility to optimize Cloudinary URLs for frontend performance.
 * Automatically applies auto-format, auto-quality, and optional resizing.
 */

export const optimizeCloudinaryUrl = (
  url: string,
  options: { width?: number; height?: number; crop?: string } = {}
) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const { width, height, crop = "fill" } = options;

  // Split URL into parts: [base, version_and_public_id]
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  // Add transformations:
  // f_auto: automatic format (WebP/AVIF)
  // q_auto: automatic quality compression
  let transformation = "f_auto,q_auto";

  if (width) transformation += `,w_${width}`;
  if (height) transformation += `,h_${height}`;
  if (width || height) transformation += `,c_${crop}`;

  return `${parts[0]}/upload/${transformation}/${parts[1]}`;
};

/**
 * Hook or function to get responsive image sizes
 */
export const getResponsiveCloudinaryUrl = (url: string, size: "small" | "medium" | "large") => {
  const sizes = {
    small: 400,
    medium: 800,
    large: 1200,
  };
  return optimizeCloudinaryUrl(url, { width: sizes[size] });
};
