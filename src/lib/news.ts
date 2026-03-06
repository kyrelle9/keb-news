export const SITE_URL = "https://keb-news-iota.vercel.app";
export const SITE_NAME = "KEB News";
export const NEWSROOM_NAME = "KEB News Desk";
export const SITE_DESCRIPTION =
  "Original reporting on AI systems, products, labor, and enterprise software, written from current primary sources.";

const CATEGORY_META = {
  analysis: {
    label: "Analysis",
    eyebrow: "Market analysis",
    description:
      "Big-picture reads on what the latest launches and partnerships actually mean once the headlines cool off.",
  },
  frontier: {
    label: "Frontier models",
    eyebrow: "Frontier models",
    description:
      "How the leading labs are positioning capability, trust, and workflow fit in their newest models.",
  },
  infrastructure: {
    label: "Infrastructure",
    eyebrow: "Infrastructure",
    description:
      "The compute, cloud, and distribution moves that decide which AI products can operate at real scale.",
  },
  work: {
    label: "Work and policy",
    eyebrow: "Work and policy",
    description:
      "Research, labor, and operating questions around how AI changes hiring, management, and economic pressure.",
  },
  products: {
    label: "Products",
    eyebrow: "Products",
    description:
      "The AI product updates most likely to change daily habits inside the actual workday.",
  },
  enterprise: {
    label: "Enterprise software",
    eyebrow: "Enterprise software",
    description:
      "Where AI is moving beyond chat and into the systems finance, operations, and decision-makers already use.",
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
  keywords: string[];
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
    kicker: "Weekly note",
    title: "AI is no longer a chatbot race. It is a systems race now.",
    deck:
      "This week's most important AI stories point in the same direction: the winners of the next phase will be the companies that combine strong models with workflow attachment, compute access, and distribution that survives procurement.",
    excerpt:
      "The newest model, cloud, workplace, and spreadsheet launches all suggest AI is being judged less on novelty and more on whether it can slot into real work without friction.",
    keywords: [
      "AI news",
      "OpenAI",
      "Google Gemini",
      "Anthropic labor",
      "ChatGPT for Excel",
      "Amazon Bedrock",
      "enterprise AI",
    ],
    lede:
      "A year ago, the easiest way to describe the AI market was as a contest for the next memorable demo. That framing is starting to break. The most consequential moves this week were not isolated magic tricks. They were model improvements aimed at professional work, cloud partnerships designed around distribution and runtime control, workplace features that extend AI continuity across sessions, labor research that tries to separate hype from measurable risk, and spreadsheet products that push AI straight into operating software. Taken together, those moves say something clear about where the market is going: AI is becoming a systems business. The next winners will not just impress people once. They will stay useful, governable, and economically viable across the places where real work happens.",
    category: "analysis",
    publishedAt: "2026-03-06T16:00:00.000Z",
    updatedAt: "2026-03-06T16:00:00.000Z",
    readTime: "8 min read",
    relatedSlugs: [
      "openai-gpt-5-4-work-model",
      "openai-amazon-enterprise-compute-deal",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "OpenAI: Introducing GPT-5.4",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-gpt-5-4/",
      },
      {
        label: "OpenAI: OpenAI and Amazon announce strategic partnership",
        publisher: "OpenAI",
        url: "https://openai.com/index/amazon-partnership/",
      },
      {
        label: "OpenAI: Introducing the Stateful Runtime Environment for Agents in Amazon Bedrock",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-the-stateful-runtime-environment-for-agents-in-amazon-bedrock/",
      },
      {
        label: "Anthropic: Labor market impacts of AI",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/labor-market-impacts",
      },
      {
        label: "Google Workspace Updates: Gemini conversation history is coming to the side panel in Google Workspace",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/gemini-conversation-history-is-coming-to-side-panel-in-google-workspace.html",
      },
      {
        label: "Google Workspace Updates Weekly Recap: AI Expanded Access",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/weekly-recap-02-06-2026.html",
      },
      {
        label: "OpenAI: Introducing ChatGPT for Excel and new financial data integrations",
        publisher: "OpenAI",
        url: "https://openai.com/index/chatgpt-for-excel/",
      },
    ],
    takeaways: [
      "Model companies are now selling reliability, steerability, and workflow fit rather than just bigger benchmark headlines.",
      "Distribution is becoming a strategic asset again, whether that means Bedrock, Workspace, or Excel.",
      "The most durable AI products will be the ones that can survive governance, cost pressure, and day-to-day work habits.",
    ],
    sections: [
      {
        heading: "This week changed the shape of the conversation",
        paragraphs: [
          "OpenAI's GPT-5.4 launch was framed in the language of professional work. The company emphasized stronger knowledge work, spreadsheet performance, better tool use, lower error rates, and even native computer use. That is different from the old pattern where a launch was mostly about theater and top-line intelligence. The product message is now about how much supervision a model needs once it is inside a real workflow.",
          "That same shift shows up in the rest of the news cycle. ChatGPT for Excel is not an attempt to win attention in a new interface. It is a move into the spreadsheet, which remains one of the most stubborn and important operating surfaces in modern business. Google's latest Gemini updates are pushing continuity and attachment inside Workspace. Anthropic's labor paper is asking where AI is already creating observable pressure. And OpenAI's Amazon partnership is about running agents with state, governance, and long-term capacity, not just renting more chips.",
        ],
      },
      {
        heading: "Distribution is back at the center of the market",
        paragraphs: [
          "The early AI boom made it easy to believe that model quality alone would decide everything. That was always incomplete. In software, good products become great businesses when they have a clean way into existing workflows, budgets, and buying motions. That is why AWS and Amazon Bedrock matter. It is why Workspace bundles and rollout cadences matter. It is why Excel matters. The product does not win only when it is impressive. It wins when it is present.",
          "OpenAI's deal with Amazon makes that especially visible. The partnership is not just a financing story. It creates a route for OpenAI technology to be embedded in Amazon's cloud distribution and agent tooling, while OpenAI secures long-duration Trainium capacity. In the same way, Google's recent Workspace moves are not just feature launches. They are habit-building exercises inside tools that millions of people already open every day.",
        ],
      },
      {
        heading: "Professional trust is becoming the premium feature",
        paragraphs: [
          "One of the clearest themes across the latest official announcements is that trust has moved from the margin to the center. GPT-5.4 is positioned as more factual and more efficient for professional tasks. ChatGPT for Excel highlights cell-level references, approval before workbook edits, and enterprise controls. Google's conversation history rollout in Workspace arrives with retention settings, admin controls, and explicit notes about privacy boundaries. The features that matter now are the ones that make AI less slippery when stakes are real.",
          "This is also why labor research suddenly feels more relevant. Once AI is embedded in the tools people use for actual output, its impact on hiring, entry-level work, and job design stops being a thought experiment. Anthropic's paper is notable precisely because it avoids a cartoonish answer. It finds no broad unemployment shock yet, but it does find signs that exposure is concentrated and that younger workers in exposed occupations may already be feeling some slowdown. That is how systems shifts usually begin: unevenly, not all at once.",
        ],
      },
      {
        heading: "Where the next durable advantage comes from",
        paragraphs: [
          "The next phase of AI competition will likely reward companies that can combine four things at once: capable models, dependable operating behavior, privileged distribution, and an economic structure that can withstand heavy usage. Missing any one of those pieces is becoming expensive. Great models without distribution can become niche. Great distribution without trustworthy outputs becomes shelfware. Great user experience without cost discipline becomes hard to scale.",
          "For readers and builders, the practical implication is straightforward. Stop evaluating AI news as if every launch lives in isolation. The more useful question is whether a new model, partnership, or product feature strengthens an end-to-end system. That is the business that is being built now. And it is the business that will likely decide who still matters once the novelty cycle fades.",
        ],
      },
    ],
  },
  {
    id: "gpt-5-4-work-model",
    slug: "openai-gpt-5-4-work-model",
    kicker: "Model launch",
    title: "GPT-5.4 is OpenAI's clearest attempt yet to build a model for professional work",
    deck:
      "The important story in GPT-5.4 is not that it is newer. It is that OpenAI is explicitly positioning it around the messy, multi-step work people do inside documents, spreadsheets, software, and long-running tasks.",
    excerpt:
      "OpenAI is pitching GPT-5.4 as a professional work model, and that framing says a lot about where the frontier market thinks the real revenue will come from next.",
    keywords: [
      "GPT-5.4",
      "OpenAI",
      "AI agents",
      "computer use",
      "knowledge work",
      "Codex",
      "professional work",
    ],
    lede:
      "Frontier model launches used to be interpreted mostly through a single question: how much smarter is it than the last one? GPT-5.4 suggests the more useful question now is different: how much more deployable is it? OpenAI is presenting GPT-5.4 as its most capable and efficient frontier model for professional work, with stronger knowledge-work performance, native computer-use capabilities, improved spreadsheet and presentation handling, better tool search, and lower error rates than GPT-5.2. That package sounds less like a pure research milestone and more like a product built for environments where work has owners, deadlines, revisions, and costs.",
    category: "frontier",
    publishedAt: "2026-03-06T14:00:00.000Z",
    updatedAt: "2026-03-06T14:00:00.000Z",
    readTime: "7 min read",
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
      {
        label: "OpenAI: Introducing ChatGPT for Excel and new financial data integrations",
        publisher: "OpenAI",
        url: "https://openai.com/index/chatgpt-for-excel/",
      },
    ],
    takeaways: [
      "OpenAI framed GPT-5.4 around professional output, not just general-purpose chat performance.",
      "Computer use, tool search, and spreadsheet quality are major clues about the market OpenAI is aiming at.",
      "The frontier race is increasingly about whether a model can finish real work with less supervision and less waste.",
    ],
    sections: [
      {
        heading: "OpenAI is selling deployability, not just intelligence",
        paragraphs: [
          "The opening language of the GPT-5.4 release is revealing. OpenAI says the model is designed for professional work and highlights that it is available across ChatGPT, the API, and Codex. That matters because it places the model inside the full chain from end-user assistant to developer tool to embedded product. The company is not treating GPT-5.4 like a standalone showcase. It is treating it like an engine for work that needs to move across interfaces and teams.",
          "The features highlighted in the announcement reinforce that reading. OpenAI points to stronger performance on knowledge work, better spreadsheet modeling, better presentation generation, improved factuality, stronger browser and computer use, and more efficient tool search. Those are not random upgrades. They are all about reducing friction in actual output. A model does not become professionally valuable by being clever in a vacuum. It becomes valuable by making it easier to ship a useful deliverable with fewer repair cycles.",
        ],
      },
      {
        heading: "The spreadsheet benchmark may be the most important clue",
        paragraphs: [
          "One of the most important details in the release is OpenAI's focus on spreadsheets. The company says GPT-5.4 performs significantly better than GPT-5.2 on internal spreadsheet modeling tasks similar to junior investment banking analyst work. That is a much more concrete signal than a generic benchmark. It says OpenAI is measuring its progress against commercial workflows that companies already pay people to do.",
          "This is also why the same-day Excel launch matters so much. OpenAI is not only saying the model can handle spreadsheet work better. It is also giving users a product surface where that claim can be tested directly. That combination is important. The model story and the product story reinforce each other, which is exactly how a company turns technical gains into commercial credibility.",
        ],
      },
      {
        heading: "Computer use changes what counts as a frontier model",
        paragraphs: [
          "GPT-5.4 is also notable because OpenAI describes it as its first general-purpose model with native, state-of-the-art computer-use capabilities. That matters well beyond demos. It means OpenAI is increasingly defining frontier quality not just by raw answer generation, but by whether the model can operate across tools, browser sessions, and software workflows with enough reliability to be useful as an agent.",
          "That creates a higher standard for everyone. If a frontier model can understand screenshots, navigate interfaces, use tools more efficiently, and keep longer context while remaining more token-efficient than an earlier model, then product builders gain leverage and buyers start expecting more complete automation. The market shifts from asking what the model knows to asking what the model can successfully carry through from start to finish.",
        ],
      },
      {
        heading: "Why this launch matters beyond OpenAI",
        paragraphs: [
          "If GPT-5.4 succeeds, it will likely be because it feels easier to trust in work environments where the cost of mistakes is obvious. That means the broader lesson is not about one benchmark win. It is about the direction of demand. Buyers want models that can be steered, audited, integrated, and economically justified. They want fewer hallucinations, fewer extra turns, and more durable output quality.",
          "That is why GPT-5.4 reads like an important market signal even if some observers prefer flashier leaps. The frontier market is growing up. The model that matters most may not be the one that produces the loudest reaction online. It may be the one that quietly saves the most time, makes the fewest expensive mistakes, and fits most cleanly into the software people already use.",
        ],
      },
    ],
  },
  {
    id: "openai-amazon-deal",
    slug: "openai-amazon-enterprise-compute-deal",
    kicker: "Cloud strategy",
    title: "Why the OpenAI-Amazon partnership matters more than its headline dollar figure",
    deck:
      "This is not just a large investment. It is a distribution, runtime, and compute agreement that shows how much of the AI market is moving from experimentation into full-stack enterprise delivery.",
    excerpt:
      "Amazon is not merely funding OpenAI. The partnership puts Bedrock, Trainium, and enterprise distribution much closer to the center of OpenAI's next growth phase.",
    keywords: [
      "OpenAI Amazon partnership",
      "AWS",
      "Amazon Bedrock",
      "Trainium",
      "AI infrastructure",
      "Stateful Runtime Environment",
      "OpenAI Frontier",
    ],
    lede:
      "Big AI partnership headlines often get flattened into a single number and then forgotten. That would miss the real significance of OpenAI's new agreement with Amazon. Yes, Amazon is investing $50 billion. But the more consequential part is structural. OpenAI and AWS are co-creating a Stateful Runtime Environment inside Amazon Bedrock, AWS becomes the exclusive third-party cloud distribution provider for OpenAI Frontier, and OpenAI is committing to roughly 2 gigawatts of Trainium capacity under an expanded multi-year infrastructure agreement. That is not passive capital. It is a blueprint for how frontier AI is moving into production-grade cloud systems.",
    category: "infrastructure",
    publishedAt: "2026-03-06T12:00:00.000Z",
    updatedAt: "2026-03-06T12:00:00.000Z",
    readTime: "7 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "openai-gpt-5-4-work-model",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "OpenAI: OpenAI and Amazon announce strategic partnership",
        publisher: "OpenAI",
        url: "https://openai.com/index/amazon-partnership/",
      },
      {
        label: "OpenAI: Introducing the Stateful Runtime Environment for Agents in Amazon Bedrock",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-the-stateful-runtime-environment-for-agents-in-amazon-bedrock/",
      },
      {
        label: "OpenAI: Scaling AI for everyone",
        publisher: "OpenAI",
        url: "https://openai.com/index/scaling-ai-for-everyone/",
      },
    ],
    takeaways: [
      "The deal expands OpenAI's cloud reach while giving Amazon a much deeper position in agent infrastructure and distribution.",
      "Stateful runtime and Bedrock integration show that the market is moving beyond stateless API demos into long-horizon enterprise workflows.",
      "Long-term AI advantage will depend on who can pair frontier models with capacity, governance, and buyer access at the same time.",
    ],
    sections: [
      {
        heading: "The real story is operational, not symbolic",
        paragraphs: [
          "Amazon's $50 billion investment is the number that will travel furthest, but the operating terms are what make this deal strategic. OpenAI and AWS say they are jointly developing a Stateful Runtime Environment powered by OpenAI models inside Amazon Bedrock. That means the partnership is not only about where compute is bought. It is about how agentic workloads will be packaged, controlled, and deployed for customers who want something sturdier than a stateless API.",
          "This is an important shift because much of the AI market has been stuck in the prototype zone. Companies have been able to test agents, but running long-horizon work across tools with state, memory, governance, and infrastructure cohesion has remained hard. The Bedrock announcement is effectively a statement that this layer is now important enough to become its own product surface.",
        ],
      },
      {
        heading: "Distribution is the quiet power in the deal",
        paragraphs: [
          "AWS also becomes the exclusive third-party cloud distribution provider for OpenAI Frontier. That is a meaningful sentence. It suggests OpenAI increasingly values not just raw infrastructure, but the route by which enterprise customers discover, buy, govern, and scale its most advanced platform. AWS is already embedded in procurement, identity, security, and architecture conversations at global scale. That gives OpenAI access to rooms that pure model quality cannot open by itself.",
          "For Amazon, the upside is equally obvious. The company strengthens Bedrock's relevance, gets closer to the frontier model layer, and inserts itself more deeply into the part of the market that is moving from chat assistants toward coordinated teams of agents. In other words, Amazon is not just monetizing compute. It is working to capture more of the control layer above compute.",
        ],
      },
      {
        heading: "Trainium capacity makes this about economics too",
        paragraphs: [
          "OpenAI's commitment to consume approximately 2 gigawatts of Trainium capacity matters because the economics of AI are still being written. If frontier usage keeps expanding, model companies need not only access to chips but leverage over cost curves and supply certainty. The agreement says OpenAI and AWS are expanding their existing infrastructure relationship by $100 billion over eight years. That is an enormous statement about the scale of demand both companies expect.",
          "It also shows how the AI stack is widening. Model labs now care about custom silicon roadmaps, cloud-native runtime environments, and long-duration capacity planning in the same way hyperscalers do. Once that happens, the boundary between model company and infrastructure company gets thinner. Competitive advantage starts to come from how tightly those layers can be coordinated.",
        ],
      },
      {
        heading: "What this means for the rest of the market",
        paragraphs: [
          "Deals like this raise the bar for everyone else. If buyers come to expect packaged agent infrastructure, enterprise governance, cloud-native deployment, and secure access to top-tier models in one place, then standalone vendors will need a much sharper answer for why they should exist outside those ecosystems. It does not eliminate the opportunity for independent builders, but it does change the standard they must meet.",
          "The larger market lesson is simple. AI competition is becoming more industrial. The best businesses will not just have powerful models. They will have distribution, capacity, operating surfaces, and buyer trust. OpenAI and Amazon are betting that the company that integrates those layers fastest will have the strongest claim on the enterprise future of AI.",
        ],
      },
    ],
  },
  {
    id: "anthropic-labor-market",
    slug: "anthropic-labor-market-impacts",
    kicker: "Labor research",
    title: "Anthropic's new labor paper is useful because it resists the easy answers",
    deck:
      "The report does not claim AI has already caused a broad employment shock. Instead, it argues that exposure is concentrated, effects may arrive unevenly, and early hiring pressure could show up before unemployment tells the full story.",
    excerpt:
      "This is one of the more valuable AI labor papers so far because it is trying to measure what is observable now instead of forecasting one dramatic outcome for everyone.",
    keywords: [
      "Anthropic labor market",
      "AI jobs",
      "Anthropic Economic Index",
      "AI displacement",
      "white-collar work",
      "AI hiring",
      "AI policy",
    ],
    lede:
      "AI labor debates often get pulled toward extremes. One side says broad displacement is imminent. The other says the real economy has barely changed, so concern is overblown. Anthropic's new labor-market report is more useful than either story because it tries to measure what can actually be seen right now. The company introduces an exposure framework that combines theoretical capability with observed usage and finds a more nuanced picture: AI exposure is concentrated, broad unemployment effects are not yet visible, occupations with higher observed exposure are projected to grow more slowly, and there is tentative evidence that hiring of younger workers has slowed in exposed professions. That is less dramatic than a total replacement narrative, but probably closer to how real labor disruption begins.",
    category: "work",
    publishedAt: "2026-03-06T10:00:00.000Z",
    updatedAt: "2026-03-06T10:00:00.000Z",
    readTime: "7 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "google-gemini-workday-attachment",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "Anthropic: Labor market impacts of AI",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/research/labor-market-impacts",
      },
      {
        label: "Anthropic: Introducing the Anthropic Economic Index",
        publisher: "Anthropic",
        url: "https://www.anthropic.com/news/the-anthropic-economic-index",
      },
    ],
    takeaways: [
      "Anthropic finds concentrated exposure rather than a broad labor-market collapse.",
      "The report sees no systematic unemployment increase yet, but does find early signs of slower hiring for younger workers in exposed jobs.",
      "The hardest management problem may be uneven disruption that appears role by role instead of all at once.",
    ],
    sections: [
      {
        heading: "Observed exposure is a better question than pure theory",
        paragraphs: [
          "A major weakness in AI labor discussions has been the tendency to jump from capability to outcome. If a model can theoretically do a task, commentators often assume job loss follows automatically. Anthropic's paper tries to fix that by introducing a measure of observed exposure that blends theoretical feasibility with real-world usage data and puts more weight on automated, work-related use than on casual experimentation.",
          "That matters because capability alone can mislead. Plenty of technologies are technically capable of replacing work long before they are adopted in a way that meaningfully changes labor demand. By focusing on what is actually being used, the paper offers a more grounded way to think about which occupations may be under pressure first and which claims still belong in the speculative bucket.",
        ],
      },
      {
        heading: "The lack of a broad unemployment spike is not a clean all-clear",
        paragraphs: [
          "One of the most important points in the report is what it does not find. Anthropic says it finds no systematic increase in unemployment for highly exposed workers since late 2022. That is a useful corrective to the loudest doom narratives. It suggests that, so far, the labor market has not delivered unmistakable evidence of widespread displacement from AI.",
          "But the paper is equally clear that this does not mean nothing is changing. Effects can be ambiguous before they are large. Anthropic points to suggestive evidence that hiring of younger workers has slowed in exposed occupations. That kind of signal matters because entry-level hiring is often where structural shifts show up early. It is easier for a company to quietly reduce openings, automate pieces of junior work, or change team shape than it is to suddenly lay off entire categories of workers.",
        ],
      },
      {
        heading: "Uneven disruption is the hardest kind to manage",
        paragraphs: [
          "The market often wants one answer to the AI and jobs question. Anthropic's paper argues for the opposite view. Exposure is not evenly distributed, and workers in the most exposed professions are not a random slice of the labor force. The report notes that more exposed workers are more likely to be older, female, more educated, and higher-paid. That alone should make policymakers and executives cautious about relying on broad averages.",
          "Uneven disruption is difficult because it is easy to miss in aggregate data and easy to underestimate until it becomes socially obvious. A small change in the hiring funnel for specific professional roles can matter a great deal over time even if national unemployment looks normal. That is one reason the paper feels useful. It treats AI's labor effects as something that may spread through the economy in pockets and sequences rather than one clean macro shock.",
        ],
      },
      {
        heading: "Why operators should read this as a management story",
        paragraphs: [
          "The report is not just for economists. It is also a management document. If AI exposure is arriving unevenly and the first signs of change are concentrated in specific workflows and career ladders, then adoption cannot be managed as a simple software rollout. Leaders will need to think about training, workflow redesign, review structures, and what junior talent development looks like in an AI-heavy environment.",
          "That is the practical importance of this research. The most responsible organizations will not wait for a dramatic unemployment chart before they respond. They will monitor where AI is changing task mix, where it is reducing demand for entry-level repetition, and where new kinds of higher-leverage work need to be defined. That is slower, harder work than making a sweeping prediction, but it is also the work that reality is increasingly demanding.",
        ],
      },
    ],
  },
  {
    id: "google-gemini-workday",
    slug: "google-gemini-workday-attachment",
    kicker: "Workspace AI",
    title: "Google's latest Gemini moves are about attachment more than spectacle",
    deck:
      "Conversation history in the Workspace side panel, a new AI Expanded Access tier, and the February Gemini Drop all point to the same product strategy: make Gemini easier to keep inside the user's everyday loop.",
    excerpt:
      "Google's recent Gemini updates are individually modest, but together they show a company working hard to become the AI layer people stay with across the workday.",
    keywords: [
      "Google Gemini",
      "Google Workspace",
      "Gemini conversation history",
      "AI Expanded Access",
      "Gemini Drop",
      "workspace AI",
      "product habit",
    ],
    lede:
      "The smartest product strategy in AI right now may be attachment. Not just getting someone to try a feature, but making it increasingly inconvenient to leave. Google's latest Gemini updates are notable for that reason. Conversation history is rolling into the Gemini side panel in Google Workspace, giving users a way to resume prior threads inside the specific app where work is happening. Google Workspace is also introducing AI Expanded Access as a middle layer between the standard offering and the top-tier plan. Meanwhile, February's Gemini Drop highlights a steady product cadence around research, creativity, and demanding workflows. None of these announcements alone looks like a seismic event. Together, they look like habit design.",
    category: "products",
    publishedAt: "2026-03-06T08:00:00.000Z",
    updatedAt: "2026-03-06T08:00:00.000Z",
    readTime: "6 min read",
    relatedSlugs: [
      "ai-systems-race-week-one",
      "anthropic-labor-market-impacts",
      "chatgpt-for-excel-operations-software",
    ],
    sourceLinks: [
      {
        label: "Google Workspace Updates: Gemini conversation history is coming to the side panel in Google Workspace",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/gemini-conversation-history-is-coming-to-side-panel-in-google-workspace.html",
      },
      {
        label: "Google Workspace Updates Weekly Recap: AI Expanded Access",
        publisher: "Google Workspace Updates",
        url: "https://workspaceupdates.googleblog.com/2026/02/weekly-recap-02-06-2026.html",
      },
      {
        label: "The Keyword: Gemini Drops, new updates to the Gemini app, February 2026",
        publisher: "The Keyword",
        url: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-drop-february-2026/",
      },
    ],
    takeaways: [
      "Google is improving Gemini's continuity inside Workspace, not just adding isolated features.",
      "A new mid-tier AI Expanded Access offer suggests Google is refining the pricing ladder as adoption matures.",
      "The broader goal looks like habit capture across documents, research, and creative workflows.",
    ],
    sections: [
      {
        heading: "Conversation history is a small feature with big strategic weight",
        paragraphs: [
          "On the surface, Gemini conversation history in the Workspace side panel may sound like a quality-of-life update. In reality, it touches something much deeper: continuity. According to Google's rollout notes, users will be able to resume prior conversations with Gemini across sessions inside the app where the work took place, while admins get controls over manual deletion and retention. That turns Gemini from a one-off helper into something closer to a persistent collaborator.",
          "Continuity matters because AI products become more useful when they can pick up where work left off. It reduces re-prompting, preserves context, and makes the assistant feel more native to the workspace. The fact that Google is pairing this with explicit admin controls and privacy boundaries is equally important. In enterprise settings, convenience only matters if governance keeps up with it.",
        ],
      },
      {
        heading: "The pricing ladder is getting more intentional",
        paragraphs: [
          "The mention of AI Expanded Access in Workspace is easy to overlook, but it reveals something important about the market. Google is acknowledging that there is now enough demand for AI in productivity software to warrant a more segmented packaging strategy. A middle tier between the standard offer and the highest-end plan is not just a pricing tweak. It is a sign that customers are differentiating between baseline AI access and heavier usage or more advanced capabilities.",
          "That is what product maturation looks like. Early in a market cycle, companies are mainly trying to get the product into more hands. Later, they start shaping the ladder more carefully so different buyer types can step in at different levels. AI Expanded Access suggests Google sees a growing middle of customers who want more than the included layer but are not yet natural buyers of the most expensive tier.",
        ],
      },
      {
        heading: "Gemini Drop keeps the product moving between big launches",
        paragraphs: [
          "February's Gemini Drop reinforces the same strategy from another angle. Google used it to highlight newer capabilities around demanding workflows, scientific citations, music generation, visual creation, and video templates. The point is not that every feature will matter equally to every user. The point is that Gemini is being kept alive through recurring improvements that touch different job types and creative needs.",
          "That cadence matters in a category where usage habits are still malleable. AI products become sticky partly through repeated reasons to come back. A product that keeps adding useful tools around research, drafting, creation, and problem-solving gives itself more chances to become someone's default starting point.",
        ],
      },
      {
        heading: "Google is playing for presence, not just awareness",
        paragraphs: [
          "Put together, these announcements suggest Google is not chasing one blockbuster AI moment. It is playing for presence across the day. Presence in the document. Presence in the spreadsheet. Presence in the side panel. Presence in a resumed conversation. Presence through pricing tiers that make the next step feel natural. That is a sophisticated product strategy because it reflects how habits are actually built.",
          "The competitive implication is clear. AI does not have to win only through the biggest model jump. It can also win by being available in more of the moments where work happens, by reducing the cost of coming back, and by staying governable enough for organizations to keep it switched on. That is where Google's latest Gemini moves look strongest.",
        ],
      },
    ],
  },
  {
    id: "chatgpt-excel",
    slug: "chatgpt-for-excel-operations-software",
    kicker: "Finance workflows",
    title: "ChatGPT for Excel is a bigger deal than another app launch because Excel is where work gets real",
    deck:
      "OpenAI's new add-in and financial data integrations put AI inside one of the most important operating surfaces in business, where usefulness will be judged by traceability, speed, and judgment support rather than novelty.",
    excerpt:
      "If AI becomes genuinely useful in spreadsheets, it starts to look less like a side assistant and more like operating infrastructure.",
    keywords: [
      "ChatGPT for Excel",
      "OpenAI Excel",
      "financial modeling AI",
      "enterprise AI",
      "spreadsheet AI",
      "finance workflows",
      "OpenAI integrations",
    ],
    lede:
      "The spreadsheet still sits at the center of modern business in ways many software narratives prefer to ignore. Forecasts, budgets, hiring plans, reconciliations, scenario models, and board-prep numbers all end up there. That is why OpenAI's ChatGPT for Excel launch matters. The company is bringing GPT-5.4 into the workbook itself, alongside new financial data integrations in ChatGPT for providers like Moody's, Dow Jones Factiva, MSCI, and others. The message is clear: OpenAI wants AI to matter where analysts, operators, and finance teams already do their highest-consequence work.",
    category: "enterprise",
    publishedAt: "2026-03-05T18:00:00.000Z",
    updatedAt: "2026-03-05T18:00:00.000Z",
    readTime: "7 min read",
    relatedSlugs: [
      "openai-gpt-5-4-work-model",
      "openai-amazon-enterprise-compute-deal",
      "google-gemini-workday-attachment",
    ],
    sourceLinks: [
      {
        label: "OpenAI: Introducing ChatGPT for Excel and new financial data integrations",
        publisher: "OpenAI",
        url: "https://openai.com/index/chatgpt-for-excel/",
      },
      {
        label: "OpenAI: Introducing GPT-5.4",
        publisher: "OpenAI",
        url: "https://openai.com/index/introducing-gpt-5-4/",
      },
    ],
    takeaways: [
      "OpenAI is moving AI into an environment where outputs have to be auditable, editable, and tied to real business decisions.",
      "The Excel add-in and new financial data integrations make ChatGPT more credible as serious operating software.",
      "If AI earns trust in the spreadsheet, it becomes much harder to dismiss as a side tool.",
    ],
    sections: [
      {
        heading: "The spreadsheet is still one of software's most important battlefields",
        paragraphs: [
          "A lot of AI usage today still happens outside the systems where final decisions are made. Users brainstorm in one window and then move the results somewhere more official. Excel is different. It is already official. It is where assumptions get tested, scenarios get modeled, and numbers get defended. That makes it one of the hardest and most valuable surfaces AI can enter.",
          "OpenAI's framing of ChatGPT for Excel understands that. The company says the add-in can build and update models, run scenarios, reason across worksheets, explain how outputs changed, and link answers to the exact cells it references and updates. Those details matter because they aim directly at the reason many operators stay skeptical of AI: not whether it can say something plausible, but whether you can follow how it got there.",
        ],
      },
      {
        heading: "Traceability is the product, not a side feature",
        paragraphs: [
          "One of the smartest parts of the launch is the focus on reviewability. OpenAI says ChatGPT for Excel explains what it is doing, asks permission before making workbook changes, and lets users trace assumptions, formulas, and outputs directly in Excel. That is the right instinct. In business software, trust is often built through visibility, not magic.",
          "This is also why the product feels different from a generic assistant embedded in a document. The spreadsheet punishes hand-waving. If an AI tool helps with model refreshes, budgeting, inventory planning, or scenario analysis, it will be judged on whether users can verify the logic without doing all the work twice. A spreadsheet-native workflow makes that test much more honest.",
        ],
      },
      {
        heading: "The new data integrations push the story beyond one add-in",
        paragraphs: [
          "OpenAI paired the Excel launch with financial data integrations in ChatGPT for a reason. Enterprise usefulness depends on inputs as much as model quality. By naming providers like Moody's, Dow Jones Factiva, MSCI, and others, the company is saying it understands that professional work often depends on trusted, current, domain-specific data rather than whatever the model can infer from memory.",
          "That expands the opportunity considerably. AI in the spreadsheet is powerful, but AI connected to the data sources analysts already trust is more powerful still. It turns the product from a formula helper into something closer to a research and modeling layer that spans the path from inputs to outputs.",
        ],
      },
      {
        heading: "Why this matters for the broader AI market",
        paragraphs: [
          "If ChatGPT for Excel works, it will do more than help individual analysts move faster. It will strengthen the case that AI belongs inside the operating software stack rather than outside it. That is a much bigger market. It is also a much harder market because products must survive governance, change management, role-based permissions, and a much lower tolerance for mistakes.",
          "That is why this launch deserves more attention than it might first get. Winning the spreadsheet is not about prestige. It is about whether AI can become a dependable layer inside the workflows where businesses already spend money, manage risk, and make decisions. If OpenAI can earn trust there, the commercial implications are enormous.",
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

function formatIssueLabel(value: string) {
  return `${new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
  }).format(new Date(value))} briefing`;
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
  const sourcesReviewed = new Set<string>();

  for (const article of articles) {
    for (const source of article.sourceLinks) {
      sourcesReviewed.add(source.url);

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
    issueLabel: formatIssueLabel(updatedAt),
    updatedAt,
    updatedLabel: formatIssueDate(updatedAt),
    stats: {
      storyCount: articles.length,
      sourceCount: sourcesReviewed.size,
      categoryCount: NEWS_CATEGORY_ENTRIES.length,
      freshCount: articles.filter(
        (article) => updatedTimestamp - Date.parse(article.publishedAt) <= 1000 * 60 * 60 * 24 * 7,
      ).length,
    },
    articles,
    sources: [...sourceMap.values()],
  };
}
