import PortfolioDetailsClient from "./PortfolioDetailsClient";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}/portfolio?slug=${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        title: "Portfolio Project Not Found | AR Sahak",
        description:
          "The portfolio project you are looking for could not be found.",
      };
    }

    const portfolio = await res.json();

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.arsahak.com";
    const ogImageUrl = portfolio.featureImage || "/opengraph-image.png";

    // Extract plain text from HTML description
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "").substring(0, 160);
    };

    const description =
      stripHtml(portfolio.description) ||
      `View ${portfolio.title} project details, technologies used, and live demo.`;

    return {
      title: `${portfolio.title} | Portfolio | AR Sahak`,
      description: description,
      keywords:
        portfolio.technologies?.join(", ") ||
        "portfolio, web development, mobile development",
      authors: [{ name: "AR Sahak" }],
      creator: "AR Sahak",
      publisher: "AR Sahak",
      openGraph: {
        title: `${portfolio.title} | Portfolio | AR Sahak`,
        description: description,
        url: `${siteUrl}/portfolio/${slug}`,
        siteName: "AR Sahak Portfolio",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: portfolio.title,
            type: "image/jpeg",
          },
        ],
        locale: "en_US",
        type: "website",
        section: portfolio.category || "Portfolio",
      },
      twitter: {
        card: "summary_large_image",
        title: `${portfolio.title} | Portfolio | AR Sahak`,
        description: description,
        images: [ogImageUrl],
        creator: "@arsahak",
        site: "@arsahak",
      },
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
      alternates: {
        canonical: `${siteUrl}/portfolio/${slug}`,
      },
      other: {
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/jpeg",
        "og:image:secure_url": ogImageUrl,
        "twitter:image:width": "1200",
        "twitter:image:height": "630",
        "twitter:image:alt": portfolio.title,
        "twitter:image:src": ogImageUrl,
        "twitter:domain": new URL(siteUrl).hostname,
        "twitter:url": `${siteUrl}/portfolio/${slug}`,
        "twitter:label1": "Category",
        "twitter:data1": portfolio.category || "Portfolio",
        "twitter:label2": "Technologies",
        "twitter:data2":
          portfolio.technologies?.slice(0, 3).join(", ") || "Web Development",
        "twitter:label3": "Budget",
        "twitter:data3": portfolio.projectBudget
          ? `$${portfolio.projectBudget.toLocaleString()}`
          : "Contact for quote",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Portfolio Project | AR Sahak",
      description: "View portfolio project details and technologies used.",
    };
  }
}

const PortfolioDetailsPage = ({ params }) => {
  return <PortfolioDetailsClient params={params} />;
};

export default PortfolioDetailsPage;
