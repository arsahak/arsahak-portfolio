import { Orbitron } from "next/font/google";
import BlogDetailsClient from "./BlogDetailsClient";

const orbitron = Orbitron({ subsets: ["latin"] });

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/blog?slug=${encodeURIComponent(params.slug)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Blog not found | AR Sahak",
        description: "The requested blog post could not be found.",
      };
    }

    const blogDetails = await res.json();

    if (!blogDetails) {
      return {
        title: "Blog not found | AR Sahak",
        description: "The requested blog post could not be found.",
      };
    }

    // Extract plain text from HTML content for description
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "").substring(0, 160);
    };

    const description =
      blogDetails.metaDescription ||
      stripHtml(blogDetails.content) ||
      "Read this blog post by AR Sahak";

    return {
      title: `${blogDetails.title} | AR Sahak`,
      description: description,
      keywords:
        blogDetails.tags?.join(", ") ||
        "web development, programming, technology",
      authors: [{ name: blogDetails.author || "AR Sahak" }],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: `${blogDetails.title} | AR Sahak`,
        description: description,
        images: [
          {
            url: blogDetails.featureImage
              ? blogDetails.featureImage.startsWith("http")
                ? blogDetails.featureImage
                : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}${blogDetails.featureImage}`
              : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/opengraph-image.png`,
            width: 1200,
            height: 630,
            alt: blogDetails.title,
            type: "image/png",
          },
        ],
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/blog/${blogDetails.slug}`,
        type: "article",
        siteName: "AR Sahak Portfolio",
        publishedTime: blogDetails.createdAt,
        modifiedTime: blogDetails.updatedAt,
        authors: [blogDetails.author || "AR Sahak"],
        tags: blogDetails.tags || [],
        locale: "en_US",
        section: blogDetails.category || "Technology",
      },
      twitter: {
        card: "summary_large_image",
        title: `${blogDetails.title} | AR Sahak`,
        description: description,
        images: [
          blogDetails.featureImage
            ? blogDetails.featureImage.startsWith("http")
              ? blogDetails.featureImage
              : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}${blogDetails.featureImage}`
            : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/opengraph-image.png`,
        ],
        creator: "@arsahak",
        site: "@arsahak",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/blog/${blogDetails.slug}`,
      },
      other: {
        "article:author": blogDetails.author || "AR Sahak",
        "article:section": blogDetails.category || "Technology",
        "article:tag":
          blogDetails.tags?.join(", ") ||
          "web development, programming, technology",
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/png",
        "article:published_time": blogDetails.createdAt,
        "article:modified_time": blogDetails.updatedAt,
        "og:image:secure_url": blogDetails.featureImage
          ? blogDetails.featureImage.startsWith("http")
            ? blogDetails.featureImage
            : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}${blogDetails.featureImage}`
          : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/opengraph-image.png`,
        "twitter:image:width": "1200",
        "twitter:image:height": "630",
        "twitter:image:alt": blogDetails.title,
        "twitter:image:src": blogDetails.featureImage
          ? blogDetails.featureImage.startsWith("http")
            ? blogDetails.featureImage
            : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}${blogDetails.featureImage}`
          : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/opengraph-image.png`,
        "twitter:domain": "www.arsahak.com",
        "twitter:url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com"}/blog/${blogDetails.slug}`,
        "twitter:label1": "Written by",
        "twitter:data1": blogDetails.author || "AR Sahak",
        "twitter:label2": "Published on",
        "twitter:data2": blogDetails.createdAt
          ? new Date(blogDetails.createdAt).toLocaleDateString()
          : "",
        "twitter:label3": "Category",
        "twitter:data3": blogDetails.category || "Technology",
        "twitter:label4": "Tags",
        "twitter:data4":
          blogDetails.tags?.join(", ") ||
          "web development, programming, technology",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog | AR Sahak",
      description:
        "Read the latest blog posts by AR Sahak, a passionate Full Stack Developer.",
    };
  }
}

const BlogDetailsPage = ({ params }) => {
  return <BlogDetailsClient params={params} />;
};

export default BlogDetailsPage;
