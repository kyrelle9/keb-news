export const SITE_URL = "https://keb-news-iota.vercel.app";

const CATEGORY_META = {
  analysis: {
    label: "Analysis",
    eyebrow: "Issue analysis",
    description:
      "Original framing on the bigger shifts hiding underneath the latest AI headlines.",
  },
  frontier: {
    label: "Frontier models",
    eyebrow: "Frontier models",
    description:
      "How the leading labs are positioning model quality, trust, and product fit.",
  },
  infrastructure: {
    label: "Infrastructure",
    eyebrow: "Infrastructure",
    description:
      "The compute, capital, and cloud moves that determine who can actually ship at scale.",
  },
  work: {
    label: "Work and policy",
    eyebrow: "Work and policy",
    description:
      "Research and operating questions around labor, skills, and how AI changes daily work.",
  },
  products: {
    label: "Products",
    eyebrow: "Products",
    description:
      "The app, workspace, and workflow updates most likely to change user habits next.",
  },
  enterprise: {
    label: "Enterprise software",
    eyebrow: "Enterprise software",
    description:
      "Where AI is moving beyond chat into the tools finance, operations, and teams already use.",
  },
} as const;

export type NewsCategory = keyof typeof CATEGORY_META;

export type SourceLink = {
  label: string;
  publisher: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type NewsArticle = {
  deck: string;
  excerpt: string;
  id: string;
  category: NewsCategory;
  kicker: string;
  lede: string;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  relatedSlugs: string[];
  sections: ArticleSection[];
  slug: string;
  sourceLinks: SourceLink[];
  takeaways: string[];
  title: string;
  updatedAt: string;
  updatedLabel: string;
};

type RawNewsArticle = Omit<NewsArticle, "publishedLabel" | "updatedLabel">;

export type NewsDigest = {
  issueLabel: string;
  updatedAt: string;
  updatedLabel: string;
  stats: {
    storyCount: number;
    sourceCount: number;
    categoryCount: number;
    freshCount: number;
  };
  articles: NewsArticle[];
  sources: Array<{
    name: string;
    url: string;
  }>;
};

export const NEWS_CATEGORY_META = CATEGORY_META;

export const NEWS_CATEGORY_ENTRIES = (
  Object.entries(CATEGORY_META) as Array<[NewsCategory, (typeof CATEGORY_META)[NewsCategory]]>
).map(([key, value]) => ({
  key,
  ...value,
}));

const RAW_ARTICLES: RawNewsArticle[] = [
  {
    id: "ai-systems-race",
    slug: "ai-systems-race-week-one",
    kicker: "Issue 01",
    title: "AI just turned from a chatbot race into a systems race",
    deck:
      "This week's launches, compute partnerships, and work-product updates point to a market that now cares more about reliability, distribution, and operating leverage than raw novelty.",
    excerpt:
      "Five recent moves from OpenAI, Amazon, Google, and Anthropic show an AI market shifting from wow-factor demos to embedded systems.",
    lede:
      "A year ago the AI market could still act like the next spectacular demo was the whole game. This week's news flow looks different. OpenAI is selling steadier outputs, Amazon is buying deeper into cloud economics and distribution, Google is widening its attachment points inside the workday, and Anthropic is pressing the labor question in more concrete terms. The center of gravity is moving from flashy chat to systems that stay useful, funded, and embedded.",
    category: "analysis",
    publishedAt: "2026-03-06T16:00:00.000Z",
    updatedAt: "2026-03-06T16:00:00.000Z",
    readTime: "5 min read",
    relatedSlugs: [
      "openai-gpt-5-4-work-model",
      "openai-amazon-enterprise-compute-deal",
      "google-gemini-workday-attachment",
    ],
    sourceLinks: [
      {
        label: "OpenAI: Introducing GPT-5.4",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-gpt-5-4/",
      },
      {
        label: "OpenAI: OpenAI and Amazon partner to advance AI",
        publisher: "OpenAI",
        url: "https://openai.com/index/openai-and-amazon-partner-to-advance-ai/",
      },
      {
        label: "Anthropic Research: Labor market impacts",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/labor-market-impacts",
      },
      {
        label: "Google Workspace Updates: AI expanded access",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/google-workspace-ai-expanded-access.html",
      },
      {
        label: "Google Blog: Gemini Drop, February 2026",
        publisher: "Google Blog",
        url: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-drop-february-2026/",
      },
    ],
    takeaways: [
      "Model launches are now framed around steadiness and trust, not just surprise.",
      "Cloud alignment and compute access are strategic weapons again.",
      "The next sticky winners will be the products that stay inside real workflows.",
    ],
    sections: [
      {
        heading: "The headlines are getting less theatrical",
        paragraphs: [
          "OpenAI's GPT-5.4 announcement is revealing partly because of what it does not try to be. The company positioned the model around better coding, stronger instruction following, cleaner writing, and lower sycophancy. That is the language of a vendor trying to win repeat usage, not a single dramatic news cycle.",
          "Google's recent Gemini posts point the same way. The company is broadening AI access inside Workspace while also shipping a steady stream of Gemini app improvements. The message across both companies is simple: the next layer of growth comes from making AI dependable inside real work, not merely impressive in a chat window.",
        ],
      },
      {
        heading: "The real money is moving into compute and distribution",
        paragraphs: [
          "The OpenAI-Amazon partnership underlines how industrial the market has become. Amazon committed up to $50 billion, OpenAI said it could spend up to $100 billion on AWS over eight years, and AWS now gets a bigger seat in the enterprise AI stack. This is not branding. It is a fight over where model demand gets served and who captures the margin around it.",
          "That matters because the AI winners of the next phase will not be defined only by model quality. They will be defined by whether they can finance inference, secure enough infrastructure, and sit close to existing buyer relationships. Compute is no longer a back-office concern. It is part of the product strategy.",
        ],
      },
      {
        heading: "Work is the hardest frontier now",
        paragraphs: [
          "Anthropic's labor market research is a reminder that the social side of AI is catching up with the product side. The company argues that AI's impact will not land evenly across jobs and regions. That is exactly why the problem is getting harder. Uneven disruption is more difficult to see early and more difficult to manage well.",
          "The practical read is that the market is leaving its toy phase. Once AI lives in spreadsheets, codebases, cloud deals, and core work software, the real questions become adoption quality, labor effects, retention, and cost. That is what a systems race looks like.",
        ],
      },
    ],
  },
  {
    id: "gpt-5-4-work-model",
    slug: "openai-gpt-5-4-work-model",
    kicker: "Frontier models",
    title: "OpenAI's GPT-5.4 looks less like a leap and more like a work model",
    deck:
      "The strongest signal in the launch is not spectacle. It is OpenAI trying to make everyday outputs more dependable for coding, instruction following, and written work.",
    excerpt:
      "GPT-5.4 reads like a product tuned for daily trust, which may be exactly what the market rewards next.",
    lede:
      "When frontier labs launch a new flagship, the market usually looks for a dramatic jump. OpenAI's GPT-5.4 story feels more grounded. The company is emphasizing better coding, stronger instruction following, improved creative writing, and lower sycophancy. Those are practical traits, but practical is exactly what matters when AI leaves experimentation and becomes part of day-to-day output.",
    category: "frontier",
    publishedAt: "2026-03-05T17:30:00.000Z",
    updatedAt: "2026-03-05T17:30:00.000Z",
    readTime: "4 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "chatgpt-for-excel-operations-software",
      "openai-amazon-enterprise-compute-deal",
    ],
    sourceLinks: [
      {
        label: "OpenAI: Introducing GPT-5.4",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-gpt-5-4/",
      },
    ],
    takeaways: [
      "OpenAI framed GPT-5.4 around coding, instruction following, and writing quality.",
      "The company also called out lower sycophancy, which shows trust is now core product work.",
      "Enterprise buyers may value a steadier model more than a louder one.",
    ],
    sections: [
      {
        heading: "The launch language tells the story",
        paragraphs: [
          "OpenAI's own description of GPT-5.4 focuses on quality-of-work traits. Better coding and better instruction following both translate directly into fewer rewrites and less supervision. Improved creative writing matters too, but the deeper point is consistency. A model that is easier to direct has a better chance of surviving inside real teams.",
          "Lower sycophancy is another clue. Labs now understand that overly agreeable behavior is not a quirky side effect. It is a trust problem. Once businesses use AI for research, drafting, and analysis, false confidence becomes expensive.",
        ],
      },
      {
        heading: "Dependability is becoming the premium feature",
        paragraphs: [
          "The frontier market is maturing enough that reliability itself is starting to look like a differentiator. Buyers still care about raw capability, but they increasingly care about whether the model behaves cleanly across many sessions, many prompts, and many users.",
          "That shift should favor vendors that can tighten tone, reduce unhelpful behavior, and make outputs easier to steer. GPT-5.4 appears to be aimed directly at that layer of demand.",
        ],
      },
      {
        heading: "Why that matters beyond OpenAI",
        paragraphs: [
          "If GPT-5.4 is remembered as a work model rather than a showpiece model, that will say a lot about where the market is headed. The next growth phase may be won by whoever reduces friction in daily usage, not whoever produces the most viral launch day.",
          "That would also explain why AI companies are moving so aggressively into office software, spreadsheets, and cloud distribution. A dependable model earns more when it sits inside recurring workflows.",
        ],
      },
    ],
  },
  {
    id: "openai-amazon-deal",
    slug: "openai-amazon-enterprise-compute-deal",
    kicker: "Infrastructure",
    title: "Why the OpenAI-Amazon deal matters beyond the headline number",
    deck:
      "The agreement is about more than capital. It turns AWS into a deeper AI distribution and compute channel while reducing OpenAI's dependence on a single cloud narrative.",
    excerpt:
      "This is one of the clearest signs yet that the AI battle is also a cloud battle again.",
    lede:
      "Big investment headlines are easy to flatten into vanity numbers. The new OpenAI-Amazon agreement is more interesting than that. Amazon committed up to $50 billion, OpenAI said it may spend up to $100 billion on AWS over the next eight years, and AWS receives a share of gross revenue under the deal. That is not passive financing. It is a structural alliance around compute, enterprise access, and who gets paid when AI demand scales.",
    category: "infrastructure",
    publishedAt: "2026-03-05T13:00:00.000Z",
    updatedAt: "2026-03-05T13:00:00.000Z",
    readTime: "4 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "openai-gpt-5-4-work-model",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "OpenAI: OpenAI and Amazon partner to advance AI",
        publisher: "OpenAI",
        url: "https://openai.com/index/openai-and-amazon-partner-to-advance-ai/",
      },
    ],
    takeaways: [
      "Amazon committed up to $50 billion and OpenAI outlined up to $100 billion in AWS spend over eight years.",
      "AWS now has stronger alignment with one of the most important AI product companies in the market.",
      "Cloud distribution is becoming inseparable from AI product strategy.",
    ],
    sections: [
      {
        heading: "Capital is only one layer of the deal",
        paragraphs: [
          "The cash headline matters, but the operating structure matters more. OpenAI is effectively tying a major portion of future compute demand to AWS while AWS gains revenue participation and deeper relevance in enterprise AI conversations. That changes the shape of the relationship from supplier to strategic channel.",
          "For Amazon, this is a way to turn infrastructure strength into application-level importance. For OpenAI, it is a way to widen its compute story and strengthen negotiating leverage in a market where inference costs still shape product decisions.",
        ],
      },
      {
        heading: "Cloud leverage is back in fashion",
        paragraphs: [
          "For a while, the AI conversation felt dominated by labs and model releases. Deals like this bring the focus back to cloud leverage. Whoever hosts, distributes, and bundles AI most effectively will capture more of the value around the model itself.",
          "That is especially important in enterprise buying, where trust, procurement, security, and account relationships often matter as much as benchmark performance. AWS is already in those rooms.",
        ],
      },
      {
        heading: "What buyers should watch next",
        paragraphs: [
          "The near-term question is whether the partnership translates into cleaner enterprise packaging and wider reach. If it does, the market will treat cloud alignment as a growth multiplier rather than a background detail.",
          "The longer-term question is whether other labs and hyperscalers respond with their own structural partnerships. Once that cycle accelerates, AI competition will look less like a pure model race and more like a full-stack platform contest.",
        ],
      },
    ],
  },
  {
    id: "anthropic-labor-market",
    slug: "anthropic-labor-market-impacts",
    kicker: "Work and policy",
    title: "Anthropic's latest labor paper lands where the AI debate is hardest",
    deck:
      "The company argues that AI's economic impact is unlikely to arrive evenly across occupations and geographies, which makes the policy and operating challenge more complicated.",
    excerpt:
      "The hardest AI question is no longer whether work changes. It is where the pressure shows up first.",
    lede:
      "AI labor debates often fall into extremes. Either every job is about to vanish or nothing important will change for years. Anthropic's latest research pushes back on that framing. The company argues that the impact will likely be uneven across occupations and geographies. That matters because uneven disruption is exactly what makes adaptation difficult: it appears early in some roles, hides inside averages, and catches institutions flat-footed.",
    category: "work",
    publishedAt: "2026-03-04T18:00:00.000Z",
    updatedAt: "2026-03-04T18:00:00.000Z",
    readTime: "4 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "google-gemini-workday-attachment",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "Anthropic Research: Labor market impacts",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/labor-market-impacts",
      },
    ],
    takeaways: [
      "Anthropic argues that AI's effects on work are unlikely to be evenly distributed.",
      "That means the first real shocks may be local, role-specific, and easy to underestimate.",
      "Companies that treat adoption and reskilling as one project will be better positioned.",
    ],
    sections: [
      {
        heading: "Averages hide where the pain starts",
        paragraphs: [
          "The most important insight in Anthropic's framing is that concentration matters. If AI pressure lands first on specific entry-level paths, specific service roles, or specific regions, then broad economic averages can mask real stress for a long time.",
          "That is one reason the public conversation has felt slippery. The top-line story is not simple enough to fit one slogan. Some workers will see leverage and productivity gains. Others may see compression in the tasks that once gave them a foothold.",
        ],
      },
      {
        heading: "This is an operating problem as much as a policy problem",
        paragraphs: [
          "Executives often talk about adoption as if it were only a software rollout. It is not. Once AI changes who drafts, analyzes, forecasts, or summarizes, the surrounding workflow changes too. Training, review, and role design all have to move with it.",
          "That makes labor impact a management issue long before it becomes a macroeconomic headline. The first companies that navigate this well will probably be the ones that redesign jobs instead of pretending they can automate in isolation.",
        ],
      },
      {
        heading: "The market should stop looking for one answer",
        paragraphs: [
          "The most responsible way to talk about AI and work now is to accept that the effects will arrive unevenly. That is less dramatic than total replacement narratives, but it is more useful.",
          "It also lines up with what the product market is showing. AI is moving from demos into the tools people actually use, which means its labor effects are becoming operational rather than theoretical.",
        ],
      },
    ],
  },
  {
    id: "google-gemini-workday",
    slug: "google-gemini-workday-attachment",
    kicker: "Products",
    title: "Google is making Gemini harder to leave once the workday starts",
    deck:
      "A mix of broader Workspace AI access and steady Gemini app updates suggests Google's real bet is attachment, not one standalone announcement.",
    excerpt:
      "Google's latest Gemini moves look smaller individually, but together they tell a strong habit-building story.",
    lede:
      "Not every important AI story arrives as a single blockbuster launch. Google's recent Gemini updates are more strategic than flashy. One track is broadening AI access across Workspace. The other is keeping the Gemini app moving with new capabilities and quality-of-life upgrades. Read together, they show a company trying to make Gemini more present across the whole workday rather than relying on one signature moment.",
    category: "products",
    publishedAt: "2026-03-03T19:30:00.000Z",
    updatedAt: "2026-03-03T19:30:00.000Z",
    readTime: "4 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "anthropic-labor-market-impacts",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "Google Workspace Updates: Expanded AI access",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/google-workspace-ai-expanded-access.html",
      },
      {
        label: "Google Blog: Gemini Drop, February 2026",
        publisher: "Google Blog",
        url: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-drop-february-2026/",
      },
    ],
    takeaways: [
      "Google is widening access to Workspace AI while keeping the Gemini app on a fast update cadence.",
      "That combination is designed to build habit, not just awareness.",
      "The real competition is over who becomes the default AI layer across the workday.",
    ],
    sections: [
      {
        heading: "Broader access matters more than one flashy feature",
        paragraphs: [
          "The Google Workspace update matters because distribution still wins markets. When AI capabilities become easier to access inside tools people already use, adoption barriers fall fast. That does not guarantee deep usage, but it gives Google a powerful starting position.",
          "In enterprise software, the easiest product to try often becomes the product that gets institutionalized. Google knows that, and broader Workspace AI access pushes directly at that advantage.",
        ],
      },
      {
        heading: "The Gemini app is evolving into a habit engine",
        paragraphs: [
          "The latest Gemini Drop reinforces the same strategy from the consumer side. Faster responses, better formatting, more research-oriented tools, and a tighter feature cadence all help Gemini feel less occasional and more ambient.",
          "That matters because stickiness in AI may come from repetition, not novelty. The assistant people keep inside their daily loop gains more opportunities to learn preferences, earn trust, and capture follow-on activity.",
        ],
      },
      {
        heading: "Google is playing for attachment",
        paragraphs: [
          "Viewed together, the Workspace and Gemini app updates suggest Google is optimizing for attachment across contexts. It wants Gemini visible in documents, meetings, messaging, research, and personal workflows at the same time.",
          "That is a strong position if the next phase of AI is defined by presence and continuity rather than single-session performance alone.",
        ],
      },
    ],
  },
  {
    id: "chatgpt-excel",
    slug: "chatgpt-for-excel-operations-software",
    kicker: "Enterprise software",
    title: "ChatGPT for Excel is the clearest sign yet that AI wants the spreadsheet",
    deck:
      "OpenAI's add-in pushes the company directly into finance, operations, and forecasting workflows where AI will be judged on accuracy, traceability, and usefulness instead of novelty.",
    excerpt:
      "If AI wins the spreadsheet, it stops being a side tool and starts looking like operating software.",
    lede:
      "The spreadsheet is where software becomes real for a lot of businesses. Budgets, headcount plans, forecasts, reconciliations, scenario models, and operating reviews all end up there. That is why OpenAI's new ChatGPT for Excel add-in matters. It brings advanced analysis, charting, forecasting, and Python into one of the most common decision surfaces in the modern company.",
    category: "enterprise",
    publishedAt: "2026-03-03T14:00:00.000Z",
    updatedAt: "2026-03-03T14:00:00.000Z",
    readTime: "4 min read",
    relatedSlugs: [
      "openai-gpt-5-4-work-model",
      "google-gemini-workday-attachment",
      "openai-amazon-enterprise-compute-deal",
    ],
    sourceLinks: [
      {
        label: "OpenAI: ChatGPT for Excel",
        publisher: "OpenAI",
        url: "https://openai.com/index/chatgpt-for-excel/",
      },
    ],
    takeaways: [
      "OpenAI is moving closer to recurring operational workflows with an Excel add-in.",
      "The product puts AI inside a tool finance and operations teams already trust.",
      "Winning this layer would make AI feel more like software infrastructure than a destination app.",
    ],
    sections: [
      {
        heading: "Why Excel is such an important battleground",
        paragraphs: [
          "A lot of AI usage still happens in side windows. That is useful, but it can feel detached from the systems where decisions actually get made. Excel is different. It is already part of planning, reporting, and accountability.",
          "By entering that environment directly, OpenAI is pushing beyond idea generation and into work that has owners, deadlines, and consequences. That raises the bar on usefulness in a good way.",
        ],
      },
      {
        heading: "This is where trust gets tested",
        paragraphs: [
          "A spreadsheet workflow exposes AI to harder scrutiny than a casual chat. Outputs need to be interpretable, repeatable, and safe enough to support real analysis. If the tool helps with forecasting, charting, and Python-based exploration in a clean way, it could become a serious leverage layer for operators.",
          "If it does not, users will reject it quickly because the spreadsheet makes weak reasoning obvious. That is why this kind of product move is more revealing than another demo reel.",
        ],
      },
      {
        heading: "The bigger market signal",
        paragraphs: [
          "The add-in points toward a future where AI does not have to own the full application shell to win. It can become the intelligence layer inside software people already live in.",
          "That is a much larger opportunity than chatbot engagement alone. It is also a harder one, because the product has to survive real workflow pressure. That is exactly why it matters.",
        ],
      },
    ],
  },
];

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatIssueDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(new Date(value));
}

function decorateArticle(article: RawNewsArticle): NewsArticle {
  return {
    ...article,
    publishedLabel: formatLongDate(article.publishedAt),
    updatedLabel: formatLongDate(article.updatedAt),
  };
}

export function getAllArticles() {
  return RAW_ARTICLES.map(decorateArticle);
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getCategoryMeta(category: NewsCategory) {
  return CATEGORY_META[category];
}

export function getRelatedArticles(article: NewsArticle, limit = 3) {
  const articles = getAllArticles();
  const articleMap = new Map(articles.map((item) => [item.slug, item]));

  const seeded = article.relatedSlugs
    .map((slug) => articleMap.get(slug))
    .filter((item): item is NewsArticle => Boolean(item));

  if (seeded.length >= limit) {
    return seeded.slice(0, limit);
  }

  const existing = new Set([article.slug, ...seeded.map((item) => item.slug)]);
  const fill = articles.filter(
    (item) => !existing.has(item.slug) && item.category === article.category,
  );
  const remaining = articles.filter((item) => !existing.has(item.slug));

  return [...seeded, ...fill, ...remaining].slice(0, limit);
}

export function getNewsDigest(): NewsDigest {
  const articles = getAllArticles();
  const sourceMap = new Map<string, { name: string; url: string }>();
  const sourceFiles = new Set<string>();

  for (const article of articles) {
    for (const source of article.sourceLinks) {
      sourceFiles.add(source.url);

      if (!sourceMap.has(source.publisher)) {
        sourceMap.set(source.publisher, {
          name: source.publisher,
          url: source.url,
        });
      }
    }
  }

  const updatedAt = articles.reduce(
    (latest, article) =>
      Date.parse(article.updatedAt) > Date.parse(latest) ? article.updatedAt : latest,
    articles[0]?.updatedAt ?? new Date().toISOString(),
  );
  const updatedTimestamp = Date.parse(updatedAt);

  return {
    issueLabel: "Issue 01",
    updatedAt,
    updatedLabel: formatIssueDate(updatedAt),
    stats: {
      storyCount: articles.length,
      sourceCount: sourceFiles.size,
      categoryCount: NEWS_CATEGORY_ENTRIES.length,
      freshCount: articles.filter(
        (article) => updatedTimestamp - Date.parse(article.publishedAt) <= 1000 * 60 * 60 * 24 * 7,
      ).length,
    },
    articles,
    sources: [...sourceMap.values()],
  };
}
