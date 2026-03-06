"use client";

import Link from "next/link";
import { useDeferredValue, useState, useTransition } from "react";
import {
  getCategoryMeta,
  NEWS_CATEGORY_ENTRIES,
  type NewsArticle,
  type NewsCategory,
  type NewsDigest,
} from "@/lib/news";
import { SiteLogo } from "@/components/site-logo";

type FilterSection = "all" | NewsCategory;

const FILTERS: Array<{
  key: FilterSection;
  label: string;
}> = [
  { key: "all", label: "All stories" },
  ...NEWS_CATEGORY_ENTRIES.map((category) => ({
    key: category.key,
    label: category.label,
  })),
];

const STAT_META: Array<{
  label: string;
  key: keyof NewsDigest["stats"];
}> = [
  { label: "Original briefs", key: "storyCount" },
  { label: "Source files", key: "sourceCount" },
  { label: "Desks tracked", key: "categoryCount" },
  { label: "Fresh this week", key: "freshCount" },
];

export function NewsBoard({ digest }: { digest: NewsDigest }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterSection>("all");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const searchTerm = deferredQuery.trim().toLowerCase();

  const matchesArticle = (article: NewsArticle) => {
    const sectionMatch = activeFilter === "all" || article.category === activeFilter;

    if (!sectionMatch) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const haystack = `${article.title} ${article.deck} ${article.excerpt} ${article.kicker}`
      .toLowerCase()
      .trim();

    return haystack.includes(searchTerm);
  };

  const visibleArticles = digest.articles.filter(matchesArticle);
  const leadArticle = visibleArticles[0];
  const secondaryArticles = visibleArticles.slice(1, 3);
  const briefingArticles = visibleArticles.slice(3, 6);

  const lanes = Object.fromEntries(
    NEWS_CATEGORY_ENTRIES.map((category) => [
      category.key,
      visibleArticles.filter((article) => article.category === category.key),
    ]),
  ) as Record<NewsCategory, NewsArticle[]>;

  const visibleLaneKeys = NEWS_CATEGORY_ENTRIES.filter(
    (category) => lanes[category.key].length > 0,
  ).map((category) => category.key);

  const hasVisibleStories = visibleArticles.length > 0;

  return (
    <div className="page-shell">
      <div className="page-shell__glow page-shell__glow--left" />
      <div className="page-shell__glow page-shell__glow--right" />

      <div className="page-frame">
        <header className="topbar panel panel--delayed-1">
          <Link className="brand" href="/">
            <SiteLogo subtitle="AI and tech, written from the source file." />
          </Link>

          <div className="topbar__meta">
            <div className="issue-pill">{digest.issueLabel}</div>
            <div className="live-pill">
              <span className="live-pill__dot" />
              Updated {digest.updatedLabel}
            </div>
          </div>
        </header>

        <main className="main-grid">
          <section className="hero panel panel--delayed-2">
            <div className="hero__copy">
              <p className="eyebrow">Original briefs from primary sources</p>
              <h1 className="hero__title">The elegant AI news desk.</h1>
              <p className="hero__description">
                KEB News turns the latest moves in models, products, labor, and
                enterprise software into original articles, so the homepage feels like a
                real publication instead of a stack of outbound links.
              </p>

              <div className="hero__actions">
                <a className="cta cta--primary" href="#front-page">
                  Read the front page
                </a>
                <a className="cta" href="#partner-note">
                  See the ad philosophy
                </a>
              </div>
            </div>

            <div className="hero__aside">
              {leadArticle ? (
                <div className="hero-note">
                  <span className="hero-note__label">Lead angle</span>
                  <p className="hero-note__text">{leadArticle.excerpt}</p>
                </div>
              ) : null}

              <div className="hero__stats">
                {STAT_META.map((stat, index) => (
                  <div
                    className="metric-card"
                    key={stat.key}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="metric-card__label">{stat.label}</span>
                    <strong className="metric-card__value">{digest.stats[stat.key]}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="control-bar panel panel--delayed-3">
            <label className="search-field" htmlFor="news-search">
              <span className="search-field__label">Search</span>
              <input
                id="news-search"
                name="news-search"
                placeholder="Search topics, companies, and desks"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="filter-row" aria-label="Story filters">
              {FILTERS.map((filter) => {
                const isActive = filter.key === activeFilter;

                return (
                  <button
                    className={`filter-chip${isActive ? " filter-chip--active" : ""}`}
                    key={filter.key}
                    type="button"
                    onClick={() =>
                      startTransition(() => {
                        setActiveFilter(filter.key);
                      })
                    }
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="control-bar__status">
              {isPending
                ? "Reframing the front page..."
                : `${visibleArticles.length} stories in view`}
            </div>
          </section>

          {leadArticle ? (
            <section
              className={`front-page${
                secondaryArticles.length === 0 ? " front-page--single" : ""
              }`}
              id="front-page"
            >
              <ArticleCard article={leadArticle} className="story-card story-card--lead panel panel--delayed-4" />

              {secondaryArticles.length > 0 ? (
                <div className="front-stack">
                  {secondaryArticles.map((article, index) => (
                    <ArticleCard
                      article={article}
                      className={`story-card panel panel--delayed-${Math.min(index + 5, 6)}`}
                      key={article.id}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {briefingArticles.length > 0 ? (
            <section className="briefing-panel panel panel--delayed-5">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Today&apos;s desk</p>
                  <h2>More stories shaping the next seven days</h2>
                </div>
                <p className="section-heading__description">
                  Shorter reads from the same source file, written to keep the site clean,
                  fast, and actually useful to follow.
                </p>
              </div>

              <div className="briefing-grid">
                {briefingArticles.map((article, index) => (
                  <Link className="briefing-card" href={`/news/${article.slug}`} key={article.id}>
                    <span className="briefing-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="briefing-card__title">{article.title}</p>
                    <p className="briefing-card__summary">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {visibleLaneKeys.length > 0 ? (
            <section
              className={`desk-grid${
                visibleLaneKeys.length === 1 ? " desk-grid--single" : ""
              }`}
            >
              {visibleLaneKeys.map((sectionKey) => {
                const articles = lanes[sectionKey];
                const sectionMeta = getCategoryMeta(sectionKey);

                return (
                  <section className="desk panel panel--delayed-6" key={sectionKey}>
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">{sectionMeta.eyebrow}</p>
                        <h2>{sectionMeta.label}</h2>
                      </div>
                      <p className="section-heading__description">
                        {sectionMeta.description}
                      </p>
                    </div>

                    <div className="desk__stories">
                      {articles.map((article) => (
                        <ArticleCard
                          article={article}
                          className="story-card story-card--compact"
                          compact
                          key={article.id}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </section>
          ) : null}

          {!hasVisibleStories ? (
            <section className="empty-state panel panel--delayed-6">
              <p className="eyebrow">No matches</p>
              <h2>Nothing matched that front-page view.</h2>
              <p>
                Try a broader keyword, or switch back to All stories to bring the full
                issue back into view.
              </p>
            </section>
          ) : null}
        </main>

        <footer className="footer-grid">
          <section className="partner-note panel panel--delayed-6" id="partner-note">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Partner note</p>
                <h2>Built to carry tasteful sponsorships later</h2>
              </div>
              <p className="section-heading__description">
                When monetization turns on, it should look like part of a premium
                publication, not a pile of ad-tech bolted onto the page.
              </p>
            </div>

            <div className="principle-grid">
              <article className="principle-card">
                <span className="principle-card__eyebrow">Placement one</span>
                <h3 className="principle-card__title">One premium sponsor slot near the lead package</h3>
                <p className="principle-card__body">
                  High intent, clearly labeled, and visually integrated instead of loud.
                </p>
              </article>

              <article className="principle-card">
                <span className="principle-card__eyebrow">Placement two</span>
                <h3 className="principle-card__title">One partner note between editorial desks</h3>
                <p className="principle-card__body">
                  Enough room for a message without breaking the reading rhythm.
                </p>
              </article>

              <article className="principle-card">
                <span className="principle-card__eyebrow">Never</span>
                <h3 className="principle-card__title">No autoplay, no sticky clutter, no ad wall</h3>
                <p className="principle-card__body">
                  The product should still feel elegant when the business model shows up.
                </p>
              </article>
            </div>
          </section>

          <section className="source-panel panel panel--delayed-6">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Source file</p>
                <h2>Official desks this issue watched</h2>
              </div>
              <p className="section-heading__description">
                The articles on KEB News are written from current primary-source material,
                then edited into clean original briefs.
              </p>
            </div>

            <div className="source-strip">
              {digest.sources.map((source) => (
                <a
                  className="source-pill"
                  href={source.url}
                  key={source.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.name}
                </a>
              ))}
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  className,
  compact = false,
}: {
  article: NewsArticle;
  className: string;
  compact?: boolean;
}) {
  return (
    <article className={className}>
      <StoryMeta article={article} compact={compact} />
      <Link className="story-card__link" href={`/news/${article.slug}`}>
        <span className="story-card__kicker">{article.kicker}</span>
        <h3 className="story-card__title">{article.title}</h3>
        <p className="story-card__summary">{compact ? article.excerpt : article.deck}</p>
        <span className="story-card__action">Read briefing</span>
      </Link>
    </article>
  );
}

function StoryMeta({
  article,
  compact = false,
}: {
  article: NewsArticle;
  compact?: boolean;
}) {
  const categoryMeta = getCategoryMeta(article.category);

  return (
    <div className={`story-meta${compact ? " story-meta--compact" : ""}`}>
      <span className="story-meta__section">{categoryMeta.eyebrow}</span>
      <div className="story-meta__line">
        <span>{article.publishedLabel}</span>
        <span>{article.readTime}</span>
        <span>{article.sourceLinks.length} source file links</span>
      </div>
    </div>
  );
}
