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

    return {
      title: `${portfolio.title} | Portfolio | AR Sahak`,
      description:
        portfolio.description ||
        `View ${portfolio.title} project details, technologies used, and live demo.`,
      keywords:
        portfolio.technologies?.join(", ") ||
        "portfolio, web development, mobile development",
      authors: [{ name: "AR Sahak" }],
      creator: "AR Sahak",
      publisher: "AR Sahak",
      openGraph: {
        title: `${portfolio.title} | Portfolio | AR Sahak`,
        description:
          portfolio.description ||
          `View ${portfolio.title} project details, technologies used, and live demo.`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/portfolio/${slug}`,
        siteName: "AR Sahak Portfolio",
        images: [
          {
            url:
              portfolio.featureImage ||
              "/assets/portfolio-item/epharma-web.png",
            width: 1200,
            height: 630,
            alt: portfolio.title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${portfolio.title} | Portfolio | AR Sahak`,
        description:
          portfolio.description ||
          `View ${portfolio.title} project details, technologies used, and live demo.`,
        images: [
          portfolio.featureImage || "/assets/portfolio-item/epharma-web.png",
        ],
        creator: "@arsahak",
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
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/portfolio/${slug}`,
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
