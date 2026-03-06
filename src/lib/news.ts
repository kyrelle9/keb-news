import Parser from "rss-parser";

export type NewsSection = "ai" | "tech" | "releases" | "signal";

export type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceUrl: string;
  section: NewsSection;
  publishedAt: string;
  publishedLabel: string;
  domain: string;
  score: number;
};

export type NewsDigest = {
  updatedAt: string;
  updatedLabel: string;
  stats: {
    storyCount: number;
    sourceCount: number;
    aiCount: number;
    techCount: number;
    releaseCount: number;
    signalCount: number;
  };
  sources: Array<{
    name: string;
    url: string;
  }>;
  featured: NewsArticle[];
  headlineStack: NewsArticle[];
  lanes: Record<NewsSection, NewsArticle[]>;
};

type FeedSection = Exclude<NewsSection, "signal">;

type FeedSource = {
  name: string;
  sourceUrl: string;
  feedUrl: string;
  defaultSection: FeedSection;
  limit: number;
  requireKeywords?: boolean;
};

type FeedItem = Parser.Item & {
  contentEncoded?: string;
  creator?: string;
  published?: string;
};

type HnItem = {
  by?: string;
  descendants?: number;
  id: number;
  score?: number;
  text?: string;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
};

const FEED_SOURCES: FeedSource[] = [
  {
    name: "OpenAI",
    sourceUrl: "https://openai.com/news/",
    feedUrl: "https://openai.com/news/rss.xml",
    defaultSection: "releases",
    limit: 6,
  },
  {
    name: "VentureBeat AI",
    sourceUrl: "https://venturebeat.com/category/ai/",
    feedUrl: "https://venturebeat.com/category/ai/feed/",
    defaultSection: "ai",
    limit: 8,
  },
  {
    name: "WIRED AI",
    sourceUrl: "https://www.wired.com/tag/ai/",
    feedUrl: "https://www.wired.com/feed/tag/ai/latest/rss",
    defaultSection: "ai",
    limit: 8,
  },
  {
    name: "TechCrunch",
    sourceUrl: "https://techcrunch.com/",
    feedUrl: "https://techcrunch.com/feed/",
    defaultSection: "tech",
    limit: 8,
  },
  {
    name: "MIT Technology Review",
    sourceUrl: "https://www.technologyreview.com/",
    feedUrl: "https://www.technologyreview.com/feed/",
    defaultSection: "tech",
    limit: 8,
    requireKeywords: true,
  },
  {
    name: "Ars Technica",
    sourceUrl: "https://arstechnica.com/",
    feedUrl: "https://feeds.arstechnica.com/arstechnica/index",
    defaultSection: "tech",
    limit: 8,
    requireKeywords: true,
  },
  {
    name: "The Verge",
    sourceUrl: "https://www.theverge.com/",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    defaultSection: "tech",
    limit: 8,
    requireKeywords: true,
  },
  {
    name: "Google Blog",
    sourceUrl: "https://blog.google/",
    feedUrl: "https://blog.google/rss/",
    defaultSection: "releases",
    limit: 6,
    requireKeywords: true,
  },
];

const AI_KEYWORDS = [
  "ai",
  "agent",
  "agents",
  "anthropic",
  "artificial intelligence",
  "chatgpt",
  "copilot",
  "cursor",
  "deepmind",
  "gemini",
  "gpt",
  "inference",
  "language model",
  "llm",
  "model",
  "nvidia",
  "openai",
  "reasoning",
  "robot",
  "robotics",
  "xai",
];

const TECH_KEYWORDS = [
  "android",
  "api",
  "apple",
  "app",
  "apps",
  "browser",
  "battery",
  "chip",
  "chips",
  "cloud",
  "cyber",
  "cybersecurity",
  "data center",
  "developer",
  "device",
  "devices",
  "google",
  "gpu",
  "hardware",
  "ipad",
  "iphone",
  "macbook",
  "laptop",
  "meta",
  "microsoft",
  "open source",
  "saas",
  "security",
  "semiconductor",
  "social media",
  "space",
  "streaming",
  "software",
  "startup",
  "tech",
  "technology",
  "tesla",
];

const SECTION_SCORE: Record<NewsSection, number> = {
  ai: 18,
  tech: 14,
  releases: 20,
  signal: 8,
};

const SOURCE_SCORE: Record<string, number> = {
  OpenAI: 22,
  "VentureBeat AI": 18,
  "WIRED AI": 17,
  TechCrunch: 16,
  "MIT Technology Review": 18,
  "Ars Technica": 17,
  "The Verge": 16,
  "Google Blog": 15,
  "Hacker News": 12,
};

const parser = new Parser<Record<string, never>, FeedItem>({
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["dc:creator", "creator"],
    ],
  },
});

export async function getNewsDigest(): Promise<NewsDigest> {
  const [feedArticleGroups, signalArticles] = await Promise.all([
    Promise.all(FEED_SOURCES.map((source) => fetchFeedArticles(source))),
    fetchHackerNewsSignal(),
  ]);

  const allArticles = dedupeArticles([
    ...feedArticleGroups.flat(),
    ...signalArticles,
  ]).sort((left, right) => right.score - left.score);

  const featured = pickFeatured(allArticles);
  const featuredIds = new Set(featured.map((article) => article.id));

  const lanes: Record<NewsSection, NewsArticle[]> = {
    ai: allArticles
      .filter((article) => article.section === "ai" && !featuredIds.has(article.id))
      .slice(0, 8),
    tech: allArticles
      .filter((article) => article.section === "tech" && !featuredIds.has(article.id))
      .slice(0, 8),
    releases: allArticles
      .filter(
        (article) => article.section === "releases" && !featuredIds.has(article.id),
      )
      .slice(0, 6),
    signal: allArticles
      .filter((article) => article.section === "signal")
      .slice(0, 8),
  };

  const headlineStack = allArticles
    .filter((article) => !featuredIds.has(article.id))
    .slice(0, 8);

  const updatedAt = new Date().toISOString();

  return {
    updatedAt,
    updatedLabel: formatAbsoluteTime(updatedAt),
    stats: {
      storyCount: allArticles.length,
      sourceCount: new Set(allArticles.map((article) => article.source)).size,
      aiCount: allArticles.filter((article) => article.section === "ai").length,
      techCount: allArticles.filter((article) => article.section === "tech").length,
      releaseCount: allArticles.filter((article) => article.section === "releases").length,
      signalCount: allArticles.filter((article) => article.section === "signal").length,
    },
    sources: FEED_SOURCES.map(({ name, sourceUrl }) => ({ name, url: sourceUrl })).concat({
      name: "Hacker News",
      url: "https://news.ycombinator.com/",
    }),
    featured,
    headlineStack,
    lanes,
  };
}

async function fetchFeedArticles(source: FeedSource): Promise<NewsArticle[]> {
  try {
    const response = await fetch(source.feedUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; KEBNewsBot/1.0; +https://keb-news.vercel.app)",
      },
      next: {
        revalidate: 900,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    return feed.items
      .flatMap((item) => mapFeedItem(source, item))
      .filter(Boolean)
      .slice(0, source.limit) as NewsArticle[];
  } catch {
    return [];
  }
}

function mapFeedItem(source: FeedSource, item: FeedItem): NewsArticle[] {
  const title = cleanText(item.title);
  const link = normalizeUrl(item.link);
  const publishedAt = parsePublishedAt(item.isoDate ?? item.pubDate ?? item.published);

  if (!title || !link || !publishedAt) {
    return [];
  }

  const rawSummary = item.contentSnippet ?? item.summary ?? item.contentEncoded ?? item.content;
  const summary = summarizeText(rawSummary);
  const combinedText = `${title} ${summary}`.toLowerCase();
  const section = resolveSection(source.defaultSection, combinedText);

  if (source.requireKeywords && !matchesRelevantTopic(combinedText)) {
    return [];
  }

  const article: NewsArticle = {
    id: `${source.name}:${link}`,
    title,
    summary:
      summary ||
      `Fresh coverage from ${source.name} on the people, platforms, and products shaping AI and technology.`,
    url: link,
    source: source.name,
    sourceUrl: source.sourceUrl,
    section,
    publishedAt: publishedAt.toISOString(),
    publishedLabel: formatRelativeTime(publishedAt.toISOString()),
    domain: extractDomain(link),
    score: scoreArticle({
      publishedAt: publishedAt.toISOString(),
      section,
      source: source.name,
    }),
  };

  return [article];
}

async function fetchHackerNewsSignal(): Promise<NewsArticle[]> {
  try {
    const topIds = await fetchJson<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
    );

    if (!topIds?.length) {
      return [];
    }

    const stories = await Promise.all(
      topIds.slice(0, 22).map((id) =>
        fetchJson<HnItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
      ),
    );

    return stories
      .flatMap((story) => mapHackerNewsItem(story))
      .slice(0, 8);
  } catch {
    return [];
  }
}

function mapHackerNewsItem(story: HnItem | null): NewsArticle[] {
  if (!story?.id || story.type !== "story" || !story.title || !story.time) {
    return [];
  }

  const title = cleanText(story.title);
  const link = normalizeUrl(story.url) ?? `https://news.ycombinator.com/item?id=${story.id}`;
  const publishedAt = new Date(story.time * 1000).toISOString();
  const summaryParts = [
    typeof story.score === "number" ? `${story.score} points` : null,
    typeof story.descendants === "number" ? `${story.descendants} comments` : null,
    story.by ? `by ${story.by}` : null,
  ].filter(Boolean);

  return [
    {
      id: `Hacker News:${story.id}`,
      title,
      summary:
        summaryParts.join(" / ") ||
        "Builder conversation and links bubbling to the top on Hacker News.",
      url: link,
      source: "Hacker News",
      sourceUrl: "https://news.ycombinator.com/",
      section: "signal",
      publishedAt,
      publishedLabel: formatRelativeTime(publishedAt),
      domain: extractDomain(link),
      score:
        scoreArticle({
          publishedAt,
          section: "signal",
          source: "Hacker News",
        }) + Math.min(18, Math.floor((story.score ?? 0) / 20)),
    },
  ];
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; KEBNewsBot/1.0; +https://keb-news.vercel.app)",
    },
    next: {
      revalidate: 900,
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

function resolveSection(defaultSection: FeedSection, combinedText: string): NewsSection {
  if (defaultSection === "releases") {
    return "releases";
  }

  if (defaultSection === "ai" || matchesAiTopic(combinedText)) {
    return "ai";
  }

  return "tech";
}

function scoreArticle(article: Pick<NewsArticle, "publishedAt" | "section" | "source">): number {
  const hoursOld = Math.max(
    0,
    (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60),
  );
  const freshnessScore = Math.max(0, 96 - hoursOld);

  return (
    freshnessScore +
    SECTION_SCORE[article.section] +
    (SOURCE_SCORE[article.source] ?? 10)
  );
}

function pickFeatured(articles: NewsArticle[]): NewsArticle[] {
  const picked: NewsArticle[] = [];
  const seenSections = new Set<NewsSection>();

  for (const article of articles) {
    if (article.section === "signal") {
      continue;
    }

    if (!seenSections.has(article.section)) {
      picked.push(article);
      seenSections.add(article.section);
    }

    if (picked.length === 3) {
      return picked;
    }
  }

  for (const article of articles) {
    if (article.section === "signal" || picked.some((entry) => entry.id === article.id)) {
      continue;
    }

    picked.push(article);

    if (picked.length === 3) {
      break;
    }
  }

  return picked;
}

function dedupeArticles(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();

  return articles.filter((article) => {
    const key = `${article.title.toLowerCase()}::${article.url}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function matchesRelevantTopic(text: string): boolean {
  return matchesAiTopic(text) || matchesKeyword(text, TECH_KEYWORDS);
}

function matchesAiTopic(text: string): boolean {
  return matchesKeyword(text, AI_KEYWORDS);
}

function matchesKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => {
    if (keyword.length <= 3) {
      return new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i").test(text);
    }

    return text.includes(keyword);
  });
}

function cleanText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

function summarizeText(value: string | null | undefined): string {
  const text = cleanText(stripHtml(value ?? ""));

  if (!text) {
    return "";
  }

  if (text.length <= 180) {
    return text;
  }

  return `${text.slice(0, 177).trimEnd()}...`;
}

function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function normalizeUrl(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    [
      "utm_campaign",
      "utm_content",
      "utm_medium",
      "utm_name",
      "utm_source",
      "utm_term",
      "ref",
    ].forEach((parameter) => url.searchParams.delete(parameter));
    url.hash = "";

    return url.toString();
  } catch {
    return null;
  }
}

function parsePublishedAt(value: string | undefined): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function formatRelativeTime(value: string): string {
  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatAbsoluteTime(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function extractDomain(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
