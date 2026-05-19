import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, image, type = 'website', schema }) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://revaprocess.in';
  
  // Clean pathname to avoid double slashes, but ensure root is just /
  const cleanPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const canonicalUrl = `${siteUrl}${cleanPathname}`;
  const defaultTitle = 'REVA Process Technologies - Engineering & Process Solutions';
  const defaultDescription = 'REVA Process Technologies delivers complete engineering and manufacturing solutions for chemical, petrochemical, biogas, and environmental industries. Based in Pune, India.';
  const defaultImage = `${siteUrl}/logo.png`;
  
  const seoTitle = title ? `${title} | REVA Process Technologies` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Meta Robots - Force indexing on all public pages */}
      <meta name="robots" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
