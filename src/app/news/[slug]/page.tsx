import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLogo } from "@/components/site-logo";
import {
  getArticleBySlug,
  getCategoryMeta,
  getAllArticles,
  getRelatedArticles,
  SITE_URL,
} from "@/lib/news";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Story not found",
    };
  }

  return {
    title: article.title,
    description: article.deck,
    openGraph: {
      title: article.title,
      description: article.deck,
      images: [
        {
          alt: "KEB News logo",
          height: 1024,
          url: "/brand/keb-news-logo.png",
          width: 1536,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url: `${SITE_URL}/news/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.deck,
      images: ["/brand/keb-news-logo.png"],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(article.category);
  const relatedArticles = getRelatedArticles(article, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.deck,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: categoryMeta.label,
    author: {
      "@type": "Organization",
      name: "KEB News Desk",
    },
    publisher: {
      "@type": "Organization",
      name: "KEB News",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
  };

  return (
    <div className="page-shell">
      <div className="page-shell__glow page-shell__glow--left" />
      <div className="page-shell__glow page-shell__glow--right" />

      <div className="page-frame">
        <header className="topbar panel panel--delayed-1">
          <Link className="brand" href="/">
            <SiteLogo compact subtitle="Return to the front page." />
          </Link>

          <div className="topbar__meta">
            <div className="issue-pill">{categoryMeta.label}</div>
            <div className="live-pill">
              <span className="live-pill__dot" />
              Updated {article.updatedLabel}
            </div>
          </div>
        </header>

        <main className="article-layout">
          <Link className="back-link" href="/">
            Back to the front page
          </Link>

          <section className="article-hero panel panel--delayed-2">
            <div className="article-hero__copy">
              <p className="eyebrow">{categoryMeta.eyebrow}</p>
              <h1 className="article-title">{article.title}</h1>
              <p className="article-deck">{article.deck}</p>
            </div>

            <div className="article-hero__facts">
              <div className="meta-stat">
                <span className="meta-stat__label">Byline</span>
                <strong className="meta-stat__value">KEB News Desk</strong>
              </div>
              <div className="meta-stat">
                <span className="meta-stat__label">Filed</span>
                <strong className="meta-stat__value">{article.publishedLabel}</strong>
              </div>
              <div className="meta-stat">
                <span className="meta-stat__label">Read time</span>
                <strong className="meta-stat__value">{article.readTime}</strong>
              </div>
              <div className="meta-stat">
                <span className="meta-stat__label">Source file</span>
                <strong className="meta-stat__value">
                  {article.sourceLinks.length} links reviewed
                </strong>
              </div>
            </div>
          </section>

          <div className="article-grid">
            <article className="article-body panel panel--delayed-3">
              <p className="article-lede">{article.lede}</p>

              <section className="takeaway-card">
                <span className="eyebrow">Why it matters</span>
                <ul className="takeaway-list">
                  {article.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </section>

              {article.sections.map((section) => (
                <section className="article-section" key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </article>

            <aside className="article-rail">
              <section className="rail-card panel panel--delayed-4">
                <div>
                  <p className="eyebrow">Source file</p>
                  <h3>Material reviewed for this article</h3>
                </div>

                <div className="source-file">
                  {article.sourceLinks.map((source) => (
                    <a
                      className="source-file__link"
                      href={source.url}
                      key={source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="source-file__publisher">{source.publisher}</span>
                      <span className="source-file__label">{source.label}</span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="rail-card panel panel--delayed-5">
                <div>
                  <p className="eyebrow">Read next</p>
                  <h3>More from the current issue</h3>
                </div>

                <div className="related-list">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      className="related-story"
                      href={`/news/${relatedArticle.slug}`}
                      key={relatedArticle.slug}
                    >
                      <span className="related-story__meta">
                        {getCategoryMeta(relatedArticle.category).label}
                      </span>
                      <span className="related-story__title">{relatedArticle.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>

      <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
    </div>
  );
}
