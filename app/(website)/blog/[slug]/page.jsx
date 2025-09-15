import { Orbitron } from "next/font/google";
import { getBlogs } from "../../../../lib/blogService";
import BlogDetailsClient from "./BlogDetailsClient";

const orbitron = Orbitron({ subsets: ["latin"] });

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  try {
    const blogPostData = await getBlogs({ published: true });
    const blogDetails = Array.isArray(blogPostData)
      ? blogPostData.find((blogs) => blogs.slug === params.slug)
      : blogPostData?.blogs?.find((blogs) => blogs.slug === params.slug);

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
        title: blogDetails.title,
        description: description,
        images: blogDetails.featureImage
          ? [
              {
                url: blogDetails.featureImage,
                width: 1200,
                height: 630,
                alt: blogDetails.title,
              },
            ]
          : [],
        url: `https://arsahak.com/blog/${blogDetails.slug}`,
        type: "article",
        siteName: "AR Sahak Portfolio",
        publishedTime: blogDetails.createdAt,
        modifiedTime: blogDetails.updatedAt,
        authors: [blogDetails.author || "AR Sahak"],
        tags: blogDetails.tags || [],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: blogDetails.title,
        description: description,
        images: blogDetails.featureImage ? [blogDetails.featureImage] : [],
        creator: "@arsahak",
        site: "@arsahak",
      },
      alternates: {
        canonical: `https://arsahak.com/blog/${blogDetails.slug}`,
      },
      other: {
        "article:author": blogDetails.author || "AR Sahak",
        "article:section": blogDetails.category || "Technology",
        "article:tag":
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
