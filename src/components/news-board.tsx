"use client";

import { useDeferredValue, useState, useTransition } from "react";
import type { NewsArticle, NewsDigest, NewsSection } from "@/lib/news";

type FilterSection = "all" | NewsSection;

const FILTERS: Array<{
  key: FilterSection;
  label: string;
}> = [
  { key: "all", label: "All stories" },
  { key: "ai", label: "AI pulse" },
  { key: "tech", label: "Tech brief" },
  { key: "releases", label: "Release radar" },
  { key: "signal", label: "Builder signal" },
];

const SECTION_META: Record<
  NewsSection,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  ai: {
    eyebrow: "AI pulse",
    title: "Model moves and research momentum",
    description:
      "The newest stories on AI products, labs, chips, and the companies pushing the category forward.",
  },
  tech: {
    eyebrow: "Tech brief",
    title: "Platforms, products, and infrastructure",
    description:
      "The stories shaping software, devices, cloud, and the competitive map across tech.",
  },
  releases: {
    eyebrow: "Release radar",
    title: "Official launches and product notes",
    description:
      "Primary-source updates from the teams shipping new capabilities into the market.",
  },
  signal: {
    eyebrow: "Builder signal",
    title: "What engineers are surfacing right now",
    description:
      "A quick read on which links and conversations are accelerating inside the builder crowd.",
  },
};

const STAT_META: Array<{
  label: string;
  key: keyof NewsDigest["stats"];
}> = [
  { label: "Stories", key: "storyCount" },
  { label: "Sources", key: "sourceCount" },
  { label: "AI", key: "aiCount" },
  { label: "Tech", key: "techCount" },
  { label: "Releases", key: "releaseCount" },
  { label: "Signal", key: "signalCount" },
];

export function NewsBoard({ digest }: { digest: NewsDigest }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterSection>("all");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const searchTerm = deferredQuery.trim().toLowerCase();

  const matchesArticle = (article: NewsArticle) => {
    const sectionMatch = activeFilter === "all" || article.section === activeFilter;

    if (!sectionMatch) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const haystack = `${article.title} ${article.summary} ${article.source} ${article.domain}`
      .toLowerCase()
      .trim();

    return haystack.includes(searchTerm);
  };

  const featured = digest.featured.filter(matchesArticle);
  const headlineStack = digest.headlineStack.filter(matchesArticle);
  const lanes: Record<NewsSection, NewsArticle[]> = {
    ai: digest.lanes.ai.filter(matchesArticle),
    tech: digest.lanes.tech.filter(matchesArticle),
    releases: digest.lanes.releases.filter(matchesArticle),
    signal: digest.lanes.signal.filter(matchesArticle),
  };
  const visibleLaneKeys = (["ai", "tech", "releases", "signal"] as NewsSection[]).filter(
    (sectionKey) => lanes[sectionKey].length > 0,
  );

  const hasVisibleStories =
    featured.length > 0 ||
    headlineStack.length > 0 ||
    Object.values(lanes).some((articles) => articles.length > 0);

  return (
    <div className="page-shell">
      <div className="page-shell__glow page-shell__glow--left" />
      <div className="page-shell__glow page-shell__glow--right" />

      <div className="page-frame">
        <header className="topbar panel panel--delayed-1">
          <div className="brand">
            <div className="brand__mark">K</div>
            <div>
              <p className="eyebrow">KEB News</p>
              <h1 className="brand__title">AI and tech, distilled.</h1>
            </div>
          </div>

          <div className="topbar__meta">
            <div className="live-pill">
              <span className="live-pill__dot" />
              Updated {digest.updatedLabel}
            </div>
          </div>
        </header>

        <main className="main-grid">
          <section className="hero panel panel--delayed-2">
            <div className="hero__copy">
              <p className="eyebrow">Signal over noise</p>
              <h2 className="hero__title">
                The cleanest pulse on AI, software, chips, and the products shaping what
                is next.
              </h2>
              <p className="hero__description">
                KEB News aggregates free public feeds and official sources into one elegant
                stream so you can scan the market fast without opening fifteen tabs.
              </p>
            </div>

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
          </section>

          <section className="control-bar panel panel--delayed-3">
            <label className="search-field" htmlFor="news-search">
              <span className="search-field__label">Search</span>
              <input
                id="news-search"
                name="news-search"
                placeholder="Search headlines, companies, products"
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
              {isPending ? "Refining view..." : "Refresh cadence: every 15 minutes"}
            </div>
          </section>

          {featured.length > 0 ? (
            <section
              className={`featured-grid${
                featured.length === 1 ? " featured-grid--single" : ""
              }`}
            >
              <article className="story-card story-card--lead panel panel--delayed-4">
                <StoryMeta article={featured[0]} />
                <a
                  className="story-card__link"
                  href={featured[0].url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <h3 className="story-card__title">{featured[0].title}</h3>
                  <p className="story-card__summary">{featured[0].summary}</p>
                  <span className="story-card__action">Open article</span>
                </a>
              </article>

              <div className="story-stack">
                {featured.slice(1).map((article, index) => (
                  <article
                    className={`story-card panel panel--delayed-${Math.min(index + 5, 6)}`}
                    key={article.id}
                  >
                    <StoryMeta article={article} compact />
                    <a
                      className="story-card__link"
                      href={article.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <h3 className="story-card__title">{article.title}</h3>
                      <p className="story-card__summary">{article.summary}</p>
                      <span className="story-card__action">Open article</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {headlineStack.length > 0 ? (
            <section className="headline-panel panel panel--delayed-5">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Live index</p>
                  <h3>Fast scan of what is moving right now</h3>
                </div>
              </div>

              <div className="headline-list">
                {headlineStack.map((article, index) => (
                  <a
                    className="headline-item"
                    href={article.url}
                    key={article.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="headline-item__count">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="headline-item__content">
                      <p className="headline-item__title">{article.title}</p>
                      <p className="headline-item__meta">
                        {article.source} / {article.publishedLabel} / {article.domain}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section
            className={`lane-grid${visibleLaneKeys.length === 1 ? " lane-grid--single" : ""}`}
          >
            {visibleLaneKeys.map((sectionKey) => {
              const articles = lanes[sectionKey];

              return (
                <section className="lane panel panel--delayed-6" key={sectionKey}>
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">{SECTION_META[sectionKey].eyebrow}</p>
                      <h3>{SECTION_META[sectionKey].title}</h3>
                    </div>
                    <p className="section-heading__description">
                      {SECTION_META[sectionKey].description}
                    </p>
                  </div>

                  <div className="lane__stories">
                    {articles.map((article) => (
                      <article className="story-card story-card--compact" key={article.id}>
                        <StoryMeta article={article} compact />
                        <a
                          className="story-card__link"
                          href={article.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <h4 className="story-card__title">{article.title}</h4>
                          <p className="story-card__summary">{article.summary}</p>
                          <span className="story-card__action">Open article</span>
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </section>

          {!hasVisibleStories ? (
            <section className="empty-state panel panel--delayed-6">
              <p className="eyebrow">No matches</p>
              <h3>Nothing matched that search.</h3>
              <p>
                Try a broader keyword, or switch back to All stories to scan the full news
                flow again.
              </p>
            </section>
          ) : null}
        </main>

        <footer className="footer panel panel--delayed-6">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Source set</p>
              <h3>Free public feeds, clean presentation</h3>
            </div>
            <p className="section-heading__description">
              KEB News runs on a lightweight aggregation layer built from public RSS feeds
              and the official Hacker News API, keeping it fast and free to operate.
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
        </footer>
      </div>
    </div>
  );
}

function StoryMeta({
  article,
  compact = false,
}: {
  article: NewsArticle;
  compact?: boolean;
}) {
  return (
    <div className={`story-meta${compact ? " story-meta--compact" : ""}`}>
      <span className="story-meta__section">{SECTION_META[article.section].eyebrow}</span>
      <div className="story-meta__line">
        <a href={article.sourceUrl} rel="noreferrer" target="_blank">
          {article.source}
        </a>
        <span>{article.publishedLabel}</span>
        <span>{article.domain}</span>
      </div>
    </div>
  );
}
