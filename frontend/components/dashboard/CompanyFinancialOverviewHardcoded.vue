<template>
  <div v-if="company" class="space-y-6">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p class="text-muted-foreground">Loading financial data...</p>
      </div>
    </div>

    <!-- API Error message -->
    <div v-if="hasApiError" class="p-4 bg-rose-100 border border-rose-200 rounded-md text-rose-700 mb-4">
      <div class="flex items-start">
        <Icon name="lucide:alert-circle" class="mr-2 h-5 w-5 text-rose-500 mt-0.5" />
        <div>
          <h3 class="font-semibold">API Error</h3>
          <p>{{ errorMessage }}</p>
          <p class="mt-2 text-sm">
            Please check your Financial Modeling Prep API key configuration.
            <a href="https://site.financialmodelingprep.com/" target="_blank" class="underline font-medium">
              Get an API key here
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Company header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold text-foreground">{{ company.name }}</h2>
          <span class="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{{ company.symbol }}</span>
          <UiButton v-if="!isLoading" variant="ghost" size="icon" @click="refreshData" title="Refresh data">
            <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          </UiButton>
          <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
        <p class="text-muted-foreground">{{ company.exchange }}{{ company.currency ? ' • ' + company.currency : '' }}</p>
      </div>
      <UiButton size="sm" class="gap-2">
        <Icon name="lucide:heart" class="h-4 w-4" />
        Add to Watchlist
      </UiButton>
    </div>

    <!-- Stock price and chart summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard class="md:col-span-2">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <div>
            <UiCardTitle class="text-lg text-foreground">Price Chart</UiCardTitle>
            <UiCardDescription>{{ company.symbol }} stock performance</UiCardDescription>
          </div>
          <UiSelect defaultValue="1M">
            <UiSelectTrigger class="w-[100px]">
              <UiSelectValue placeholder="Time Range" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="1D">1 Day</UiSelectItem>
              <UiSelectItem value="1W">1 Week</UiSelectItem>
              <UiSelectItem value="1M">1 Month</UiSelectItem>
              <UiSelectItem value="3M">3 Months</UiSelectItem>
              <UiSelectItem value="1Y">1 Year</UiSelectItem>
              <UiSelectItem value="5Y">5 Years</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-72">
            <!-- Chart component would go here -->
            <div class="h-full w-full flex items-center justify-center bg-muted/10 rounded-md">
              <p class="text-muted-foreground">Price chart visualization</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-lg text-foreground">Current Price</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-4">
            <div>
              <div class="text-3xl font-bold text-foreground">${{ formatCurrency(stockData.price) }}</div>
              <div class="flex items-center mt-1">
                <div 
                  :class="stockData.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'"
                  class="flex items-center text-sm"
                >
                  <Icon 
                    :name="stockData.changePercent >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'" 
                    class="mr-1 h-4 w-4" 
                  />
                  <span>{{ stockData.changePercent >= 0 ? '+' : '' }}{{ stockData.changePercent.toFixed(2) }}%</span>
                </div>
                <div class="text-sm text-muted-foreground ml-2">
                  ${{ stockData.change >= 0 ? '+' : '' }}{{ stockData.change.toFixed(2) }}
                </div>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-muted-foreground">Market Cap</div>
                  <div class="font-medium">${{ formatLargeNumber(stockData.marketCap) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Volume</div>
                  <div class="font-medium">{{ formatLargeNumber(stockData.volume) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">P/E Ratio</div>
                  <div class="font-medium">{{ stockData.peRatio.toFixed(2) }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Dividend Yield</div>
                  <div class="font-medium">{{ stockData.dividendYield.toFixed(2) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Financial metrics -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-lg text-foreground">Financial Highlights</UiCardTitle>
        <UiCardDescription>Key financial metrics for {{ company.name }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Revenue (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ formatLargeNumber(financialData.revenue) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.revenueGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.revenueGrowth >= 0 ? '+' : '' }}{{ financialData.revenueGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Net Income (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ formatLargeNumber(financialData.netIncome) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.netIncomeGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.netIncomeGrowth >= 0 ? '+' : '' }}{{ financialData.netIncomeGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">EPS (TTM)</h3>
            <div class="text-2xl font-bold text-foreground">${{ financialData.eps.toFixed(2) }}</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.epsGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.epsGrowth >= 0 ? '+' : '' }}{{ financialData.epsGrowth.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Profit Margin</h3>
            <div class="text-2xl font-bold text-foreground">{{ financialData.profitMargin.toFixed(2) }}%</div>
            <div class="flex items-center text-xs">
              <span 
                :class="financialData.profitMarginChange >= 0 ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ financialData.profitMarginChange >= 0 ? '+' : '' }}{{ financialData.profitMarginChange.toFixed(2) }}% YoY
              </span>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- News and Analysis -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-lg text-foreground">Recent News</UiCardTitle>
        <UiCardDescription>Latest updates about {{ company.name }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="newsLoading" class="flex justify-center my-6">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="newsError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ newsError }}
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(article, i) in alphaVantageNews" :key="i" class="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-medium text-foreground">{{ article.title }}</h4>
                <span 
                  v-if="article.overall_sentiment_score" 
                  class="text-xs px-2 py-0.5 rounded-full" 
                  :class="getSentimentClass(article.overall_sentiment_score)"
                >
                  {{ formatSentiment(article.overall_sentiment_score) }}
                </span>
              </div>
              <p class="text-sm text-muted-foreground line-clamp-2">{{ article.summary }}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="text-xs text-muted-foreground">{{ article.source }} · {{ formatDate(article.time_published) }}</span>
                <a 
                  :href="article.url" 
                  target="_blank"
                  class="text-xs text-primary flex items-center hover:underline"
                >
                  Read more
                  <Icon name="lucide:external-link" class="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <div class="text-center">
      <Icon name="lucide:search" class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 class="text-lg font-medium text-foreground mb-2">Search for a company</h3>
      <p class="text-muted-foreground max-w-md">Enter a company name or ticker symbol to view detailed financial information</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRuntimeConfig } from '#imports';
// The UI components are auto-imported by shadcn-nuxt

interface Company {
  name: string;
  symbol: string;
  exchange: string;
  currency?: string;
}

// Alpha Vantage News Item interface
interface AlphaVantageNewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  authors?: string[];
  banner_image?: string;
  category_within_source?: string;
  source_domain?: string;
  topics?: any[];
  ticker_sentiment?: Array<{
    ticker: string;
    relevance_score: number;
    ticker_sentiment_score: number;
  }>;
}

// Props
const props = defineProps<{
  company: Company | null;
}>();

// Hardcoded data for companies
const companiesData: Record<string, any> = {
  'AAPL': {
    stockData: {
      price: 187.68,
      change: 1.84,
      changePercent: 0.99,
      marketCap: 2890000000000,
      volume: 64321000,
      peRatio: 29.8,
      dividendYield: 0.51
    },
    financialData: {
      revenue: 383292000000,
      revenueGrowth: 2.15,
      netIncome: 97158000000,
      netIncomeGrowth: 8.32,
      eps: 6.42,
      epsGrowth: 10.12,
      profitMargin: 25.35,
      profitMarginChange: 1.58
    },
    news: [
      {
        title: "Apple's Vision Pro Sales Reportedly Slow, But Headset 'Will Get Better'",
        url: "https://www.macrumors.com/2024/05/10/vision-pro-sales-slow-will-get-better/",
        time_published: "2024-05-10T16:10:00Z",
        summary: "Sales of the Apple Vision Pro headset have reportedly slowed in recent weeks, with one analyst claiming that Apple may only sell around 700,000...",
        source: "MacRumors",
        overall_sentiment_score: -0.15,
        overall_sentiment_label: "Neutral"
      },
      {
        title: "Apple's AI Announcements at WWDC: What to Expect",
        url: "https://www.bloomberg.com/news/articles/2024-05-09/apple-s-ai-announcements-at-wwdc-what-to-expect",
        time_published: "2024-05-09T12:30:00Z",
        summary: "Apple is expected to unveil its AI strategy at WWDC in June, with multiple new generative AI features coming to iOS 18 and other operating systems.",
        source: "Bloomberg",
        overall_sentiment_score: 0.42,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Apple Expands iPhone Manufacturing in India, Reducing Dependency on China",
        url: "https://www.reuters.com/technology/apple-expands-iphone-manufacturing-india-2024-05-08/",
        time_published: "2024-05-08T14:45:00Z",
        summary: "Apple continues to diversify its manufacturing base by expanding production in India, with reports suggesting over 14% of iPhones were made in India last quarter.",
        source: "Reuters",
        overall_sentiment_score: 0.38,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Apple's iPhone 16 Series: Everything We Know So Far",
        url: "https://www.macrumors.com/guide/iphone-16/",
        time_published: "2024-05-07T18:20:00Z",
        summary: "The iPhone 16 lineup is expected to feature the new A18 chip, camera improvements, and potentially a new Capture button for photography and video recording.",
        source: "MacRumors",
        overall_sentiment_score: 0.25,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Apple Reports Q2 Earnings: Revenue Down 4% But Services Hit All-Time High",
        url: "https://www.apple.com/newsroom/2024/05/apple-reports-second-quarter-results/",
        time_published: "2024-05-02T21:00:00Z",
        summary: "Apple reported Q2 2024 revenue of $90.8 billion, down 4% year-over-year, while Services revenue reached a new all-time high of $24.2 billion.",
        source: "Apple Newsroom",
        overall_sentiment_score: 0.10,
        overall_sentiment_label: "Neutral"
      }
    ]
  },
  'MSFT': {
    stockData: {
      price: 412.08,
      change: 5.26,
      changePercent: 1.29,
      marketCap: 3060000000000,
      volume: 22145000,
      peRatio: 35.6,
      dividendYield: 0.73
    },
    financialData: {
      revenue: 227583000000,
      revenueGrowth: 15.8,
      netIncome: 83205000000,
      netIncomeGrowth: 18.7,
      eps: 11.17,
      epsGrowth: 19.3,
      profitMargin: 36.56,
      profitMarginChange: 0.89
    },
    news: [
      {
        title: "Microsoft Announces Major Expansion of AI Datacenters with $16 Billion Investment",
        url: "https://news.microsoft.com/2024/05/11/microsoft-expands-ai-infrastructure/",
        time_published: "2024-05-11T14:30:00Z",
        summary: "Microsoft announced a $16 billion investment to expand its AI infrastructure globally, focusing on sustainable datacenter designs to support growing AI workloads.",
        source: "Microsoft News",
        overall_sentiment_score: 0.68,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Microsoft and OpenAI Relationship Under Scrutiny from EU Regulators",
        url: "https://www.reuters.com/technology/eu-regulators-examining-microsoft-openai-relationship-2024-05-09/",
        time_published: "2024-05-09T09:15:00Z",
        summary: "EU antitrust regulators are examining Microsoft's partnership with OpenAI to determine if it requires formal investigation under merger regulations.",
        source: "Reuters",
        overall_sentiment_score: -0.32,
        overall_sentiment_label: "Negative"
      },
      {
        title: "Microsoft Teams Adds New AI Features to Enhance Productivity",
        url: "https://www.theverge.com/2024/5/8/microsoft-teams-ai-features-update",
        time_published: "2024-05-08T16:45:00Z",
        summary: "Microsoft is rolling out new AI features in Teams, including improved meeting summaries, real-time transcription, and smart suggested responses.",
        source: "The Verge",
        overall_sentiment_score: 0.55,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Microsoft Surface Pro 11 Leak Reveals Major Design Changes",
        url: "https://www.windowscentral.com/microsoft-surface-pro-11-leak",
        time_published: "2024-05-06T13:20:00Z",
        summary: "Leaked images of the upcoming Surface Pro 11 suggest a significant redesign with thinner bezels, new keyboard attachment mechanism, and both Intel and ARM processor options.",
        source: "Windows Central",
        overall_sentiment_score: 0.48,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Microsoft Azure Growth Slows, But Still Outpacing Cloud Competitors",
        url: "https://www.cnbc.com/2024/05/03/microsoft-azure-growth-slows-but-still-outpacing-competitors/",
        time_published: "2024-05-03T18:10:00Z",
        summary: "Microsoft's Azure cloud service grew 31% in the latest quarter, showing some deceleration but still growing faster than competitors AWS and Google Cloud.",
        source: "CNBC",
        overall_sentiment_score: 0.22,
        overall_sentiment_label: "Neutral"
      }
    ]
  },
  'AMZN': {
    stockData: {
      price: 181.93,
      change: 2.45,
      changePercent: 1.37,
      marketCap: 1890000000000,
      volume: 38945000,
      peRatio: 42.3,
      dividendYield: 0.0
    },
    financialData: {
      revenue: 574784000000,
      revenueGrowth: 12.3,
      netIncome: 42740000000,
      netIncomeGrowth: 127.6,
      eps: 4.03,
      epsGrowth: 129.5,
      profitMargin: 7.44,
      profitMarginChange: 3.25
    },
    news: [
      {
        title: "Amazon Web Services Announces New AI Infrastructure Service",
        url: "https://aws.amazon.com/news/2024/05/12/aws-announces-new-ai-infrastructure-service/",
        time_published: "2024-05-12T15:20:00Z",
        summary: "AWS has unveiled a new AI infrastructure service designed to provide more cost-effective training and inference options for large language models.",
        source: "Amazon Web Services",
        overall_sentiment_score: 0.61,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Amazon Expands Same-Day Delivery to More Markets",
        url: "https://www.cnbc.com/2024/05/10/amazon-expands-same-day-delivery/",
        time_published: "2024-05-10T19:30:00Z",
        summary: "Amazon is rolling out same-day delivery to 15 additional U.S. metropolitan areas, increasing its competitive advantage in quick delivery services.",
        source: "CNBC",
        overall_sentiment_score: 0.45,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Amazon Reportedly Developing Its Own Version of ChatGPT",
        url: "https://www.theinformation.com/articles/amazon-developing-chatgpt-competitor",
        time_published: "2024-05-09T12:10:00Z",
        summary: "Amazon is reportedly developing a consumer-facing AI chatbot to compete with ChatGPT and Google Gemini, leveraging its vast cloud infrastructure.",
        source: "The Information",
        overall_sentiment_score: 0.38,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Amazon Prime Video to Increase Subscription Prices in September",
        url: "https://variety.com/2024/digital/news/amazon-prime-video-price-increase-1235962782/",
        time_published: "2024-05-07T20:45:00Z",
        summary: "Amazon plans to raise the price of its standalone Prime Video subscription by $2 per month starting in September, citing increased content costs.",
        source: "Variety",
        overall_sentiment_score: -0.28,
        overall_sentiment_label: "Negative"
      },
      {
        title: "Amazon's Twitch Announces Major Platform Changes to Support Creators",
        url: "https://blog.twitch.tv/en/2024/05/05/new-creator-features-coming-to-twitch/",
        time_published: "2024-05-05T17:30:00Z",
        summary: "Twitch is introducing new monetization features and improved discovery tools to help creators grow their audiences and increase earnings on the platform.",
        source: "Twitch Blog",
        overall_sentiment_score: 0.52,
        overall_sentiment_label: "Positive"
      }
    ]
  },
  'GOOGL': {
    stockData: {
      price: 171.78,
      change: 0.63,
      changePercent: 0.37,
      marketCap: 2140000000000,
      volume: 25632000,
      peRatio: 26.2,
      dividendYield: 0.48
    },
    financialData: {
      revenue: 307393000000,
      revenueGrowth: 13.4,
      netIncome: 78693000000,
      netIncomeGrowth: 23.6,
      eps: 6.21,
      epsGrowth: 28.1,
      profitMargin: 25.6,
      profitMarginChange: 2.14
    },
    news: [
      {
        title: "Google Announces New Gemini AI Model with Impressive Performance Gains",
        url: "https://blog.google/technology/ai/google-gemini-pro-2/",
        time_published: "2024-05-12T18:45:00Z",
        summary: "Google has unveiled the next version of its Gemini AI model, featuring significant improvements in reasoning, coding, and multimodal understanding capabilities.",
        source: "Google Blog",
        overall_sentiment_score: 0.72,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Google I/O 2024: Everything Announced at the Developer Conference",
        url: "https://www.theverge.com/2024/5/14/google-io-2024-announcements-ai-android",
        time_published: "2024-05-11T22:30:00Z",
        summary: "Google's annual I/O conference featured numerous AI announcements, Android 15 preview, and new Pixel hardware, highlighting the company's AI-first strategy.",
        source: "The Verge",
        overall_sentiment_score: 0.56,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Google Faces New Antitrust Lawsuit Over Digital Ad Market Dominance",
        url: "https://www.reuters.com/legal/google-faces-new-antitrust-lawsuit-2024-05-09/",
        time_published: "2024-05-09T14:15:00Z",
        summary: "A coalition of state attorneys general has filed a new antitrust lawsuit against Google, alleging monopolistic practices in the digital advertising market.",
        source: "Reuters",
        overall_sentiment_score: -0.41,
        overall_sentiment_label: "Negative"
      },
      {
        title: "Google Cloud Partners with NVIDIA on Next-Gen AI Infrastructure",
        url: "https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-nvidia-partnership",
        time_published: "2024-05-08T16:00:00Z",
        summary: "Google Cloud and NVIDIA announced an expanded partnership to develop next-generation AI infrastructure with custom-designed chips for machine learning workloads.",
        source: "Google Cloud Blog",
        overall_sentiment_score: 0.63,
        overall_sentiment_label: "Positive"
      },
      {
        title: "YouTube Premium Subscribers Top 100 Million Globally",
        url: "https://blog.youtube/news-and-events/youtube-premium-100-million-subscribers/",
        time_published: "2024-05-06T13:30:00Z",
        summary: "YouTube has announced that its Premium subscription service has surpassed 100 million subscribers worldwide, representing significant growth for Google's subscription business.",
        source: "YouTube Official Blog",
        overall_sentiment_score: 0.59,
        overall_sentiment_label: "Positive"
      }
    ]
  },
  'META': {
    stockData: {
      price: 475.98,
      change: 4.26,
      changePercent: 0.90,
      marketCap: 1210000000000,
      volume: 15786000,
      peRatio: 27.3,
      dividendYield: 0.48
    },
    financialData: {
      revenue: 134902000000,
      revenueGrowth: 16.2,
      netIncome: 39147000000,
      netIncomeGrowth: 69.4,
      eps: 14.87,
      epsGrowth: 73.6,
      profitMargin: 29.0,
      profitMarginChange: 9.1
    },
    news: [
      {
        title: "Meta's Llama 3 AI Model Adoption Surges Among Developers",
        url: "https://ai.meta.com/blog/llama-3-adoption-milestone/",
        time_published: "2024-05-13T17:15:00Z",
        summary: "Meta's open-source Llama 3 AI model has seen rapid adoption among developers, with over 1 million downloads in the first month of its release.",
        source: "Meta AI Blog",
        overall_sentiment_score: 0.67,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Instagram Tests New Creator Monetization Features",
        url: "https://about.instagram.com/blog/announcements/new-creator-monetization-tools",
        time_published: "2024-05-11T14:40:00Z",
        summary: "Instagram is testing new ways for creators to earn money directly on the platform, including subscription content, digital collectibles, and improved tipping features.",
        source: "Instagram Blog",
        overall_sentiment_score: 0.58,
        overall_sentiment_label: "Positive"
      },
      {
        title: "Meta Ordered to Pay $1.4B in Patent Infringement Case Over VR Technology",
        url: "https://www.reuters.com/legal/litigation/meta-ordered-pay-14-billion-vr-patent-case-2024-05-10/",
        time_published: "2024-05-10T19:20:00Z",
        summary: "A U.S. court has ordered Meta to pay $1.4 billion in damages for patent infringement related to virtual reality technology used in its Meta Quest headsets.",
        source: "Reuters",
        overall_sentiment_score: -0.45,
        overall_sentiment_label: "Negative"
      },
      {
        title: "Meta's New AR Glasses Prototype Shown in Internal Presentation",
        url: "https://www.theinformation.com/articles/meta-ar-glasses-prototype-revealed",
        time_published: "2024-05-08T23:10:00Z",
        summary: "An internal Meta presentation revealed a new, more advanced prototype of the company's AR glasses, featuring improved display technology and longer battery life.",
        source: "The Information",
        overall_sentiment_score: 0.51,
        overall_sentiment_label: "Positive"
      },
      {
        title: "WhatsApp Business Platform Adds New Automation Tools",
        url: "https://business.whatsapp.com/blog/new-automation-tools-for-businesses",
        time_published: "2024-05-07T15:30:00Z",
        summary: "Meta's WhatsApp Business Platform is introducing new automation tools powered by AI to help businesses manage customer conversations more efficiently.",
        source: "WhatsApp Business Blog",
        overall_sentiment_score: 0.62,
        overall_sentiment_label: "Positive"
      }
    ]
  }
};

// State
const stockData = ref({
  price: 0,
  change: 0,
  changePercent: 0,
  marketCap: 0,
  volume: 0,
  peRatio: 0,
  dividendYield: 0
});

const financialData = ref({
  revenue: 0,
  revenueGrowth: 0,
  netIncome: 0,
  netIncomeGrowth: 0,
  eps: 0,
  epsGrowth: 0,
  profitMargin: 0,
  profitMarginChange: 0
});

const isLoading = ref(false);
const errorMessage = ref('');
const hasApiError = ref(false);

// Alpha Vantage News
const alphaVantageNews = ref<AlphaVantageNewsItem[]>([]);
const newsLoading = ref(false);
const newsError = ref<string | null>(null);

// Format currency values
const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

// Format large numbers (billions, millions)
const formatLargeNumber = (value: number): string => {
  if (value === undefined || value === null) {
    return '0';
  }
  
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toString();
};

// Load hardcoded data for the company
const loadHardcodedData = (symbol: string) => {
  isLoading.value = true;
  hasApiError.value = false;
  errorMessage.value = '';
  newsLoading.value = true;
  newsError.value = null;
  
  // Simulate API delay
  setTimeout(() => {
    const companyKey = Object.keys(companiesData).find(key => key === symbol) || 'AAPL';
    const data = companiesData[companyKey];
    
    // Update stock data
    stockData.value = data.stockData;
    
    // Update financial data
    financialData.value = data.financialData;
    
    // Update news
    alphaVantageNews.value = data.news;
    
    // Update loading states
    isLoading.value = false;
    newsLoading.value = false;
  }, 800); // Add a delay to simulate real API call
};

// Format date
const formatDate = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Get sentiment class
const getSentimentClass = (score: number): string => {
  if (score > 0.25) return "bg-green-100 text-green-800";
  if (score < -0.25) return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
};

// Format sentiment
const formatSentiment = (score: number): string => {
  if (score > 0.25) return "Positive";
  if (score < -0.25) return "Negative";
  return "Neutral";
};

// Watch for changes in company and load data
watch(() => props.company, (newCompany) => {
  if (newCompany) {
    loadHardcodedData(newCompany.symbol);
  }
}, { immediate: true });

// Add a refresh function
const refreshData = () => {
  if (props.company) {
    loadHardcodedData(props.company.symbol);
  }
};
</script> 