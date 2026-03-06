import { NewsBoard } from "@/components/news-board";
import { getNewsDigest, NEWSROOM_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/news";

export default function Home() {
  const digest = getNewsDigest();
  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    isPartOf: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/keb-news-icon.png`,
    },
    author: {
      "@type": "Organization",
      name: NEWSROOM_NAME,
    },
    hasPart: digest.articles.map((article) => ({
      "@type": "NewsArticle",
      headline: article.title,
      url: `${SITE_URL}/news/${article.slug}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      keywords: article.keywords,
      articleSection: article.category,
    })),
  };

  return (
    <>
      <NewsBoard digest={digest} />
      <script type="application/ld+json">{JSON.stringify(homepageJsonLd)}</script>
    </>
  );
}
