import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Types
type TrendingFakeNews = {
  id: number;
  rank: number;
  title: string;
  description: string;
  platforms: string[];
  shares: number;
  fakeScore: number;
  timeAgo: string;
  evidence: string[];
  region: string;
};

type TrendingRealNews = {
  id: number;
  rank: number;
  title: string;
  source: string;
  verification: string[];
  category: string;
  timeAgo: string;
  credibilityScore: number;
  region: string;
};

type RegionalData = {
  region: string;
  totalScraped: number;
  fakeNews: number;
  fakePercentage: number;
};

// Trending News Card Components
const TrendingFakeCard = ({ news }: { news: TrendingFakeNews }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-red-600">#{news.rank}</span>
        </div>
        <div>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
            FAKE - {news.fakeScore}% Confidence
          </span>
          <p className="text-xs text-gray-500 mt-1">{news.region} • {news.timeAgo}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Shares</p>
        <p className="text-lg font-bold text-red-600">{news.shares.toLocaleString()}</p>
      </div>
    </div>
    
    <h4 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{news.title}</h4>
    <p className="text-gray-600 text-sm mb-4">{news.description}</p>
    
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      {news.platforms.map((platform, idx) => (
        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          {platform}
        </span>
      ))}
    </div>
    
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
      <p className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
        <span>🔍</span> Evidence of Misinformation:
      </p>
      <ul className="space-y-1">
        {news.evidence.map((item, idx) => (
          <li key={idx} className="text-blue-800 text-xs flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TrendingRealCard = ({ news }: { news: TrendingRealNews }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">#{news.rank}</span>
        </div>
        <div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
            VERIFIED - {news.credibilityScore}% Credible
          </span>
          <p className="text-xs text-gray-500 mt-1">{news.region} • {news.timeAgo}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase">
        {news.category}
      </span>
    </div>
    
    <h4 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{news.title}</h4>
    
    <div className="mb-4">
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <span>🌐</span>
        <span className="font-semibold">Source:</span>
        <span>{news.source}</span>
      </p>
    </div>
    
    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
      <p className="font-semibold text-green-900 text-sm mb-2 flex items-center gap-2">
        <span>✓</span> Verification Evidence:
      </p>
      <ul className="space-y-1">
        {news.verification.map((item, idx) => (
          <li key={idx} className="text-green-800 text-xs flex items-start gap-2">
            <span className="text-green-600 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Regional Stats Card
const RegionalStatsCard = ({ data }: { data: RegionalData }) => {
  const barWidth = data.fakePercentage;
  const isHighRisk = data.fakePercentage > 40;
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-900">{data.region}</h4>
          <p className="text-xs text-gray-500">{data.totalScraped.toLocaleString()} news scraped</p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-orange-600'}`}>
            {data.fakePercentage}%
          </p>
          <p className="text-xs text-gray-500">Fake</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              isHighRisk ? 'bg-red-500' : 'bg-orange-500'
            }`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          <span className="font-semibold text-red-600">{data.fakeNews}</span> fake out of {data.totalScraped} total
        </p>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  // Mock data for trending fake news
  const trendingFakeNews: TrendingFakeNews[] = [
    {
      id: 1,
      rank: 1,
      title: 'Breaking: Government announces mandatory digital currency replacement by March 2025',
      description: 'Viral posts claim all physical currency will be banned and replaced with mandatory digital currency within 60 days.',
      platforms: ['WhatsApp', 'Facebook', 'Twitter/X', 'Telegram'],
      shares: 287453,
      fakeScore: 96,
      timeAgo: '3 hours ago',
      region: 'Global',
      evidence: [
        'No official government announcement found on any official portal',
        'Central banks and RBI have issued no such directive',
        'Similar hoax circulated in 2023 and debunked by fact-checkers',
        'Message contains grammatical errors typical of misinformation'
      ]
    },
    {
      id: 2,
      rank: 2,
      title: 'Miracle cure: Garlic and honey mixture eliminates all cancers within 30 days',
      description: 'Widely shared health claim stating that a simple home remedy can cure all types of cancer without medical treatment.',
      platforms: ['WhatsApp', 'Instagram', 'Facebook'],
      shares: 156782,
      fakeScore: 98,
      timeAgo: '8 hours ago',
      region: 'Asia-Pacific',
      evidence: [
        'No peer-reviewed medical research supports this claim',
        'WHO and major cancer institutes have not endorsed this treatment',
        'Multiple oncologists have publicly refuted this claim',
        'Dangerous medical misinformation that could delay proper treatment'
      ]
    },
    {
      id: 3,
      rank: 3,
      title: 'Major earthquake predicted for January 15th - Government hiding information',
      description: 'Posts claim seismologists have predicted a catastrophic earthquake but authorities are covering it up.',
      platforms: ['Twitter/X', 'Facebook', 'TikTok'],
      shares: 134567,
      fakeScore: 94,
      timeAgo: '5 hours ago',
      region: 'North America',
      evidence: [
        'Earthquakes cannot be predicted with date-specific accuracy',
        'No seismological agency has issued any such warning',
        'USGS confirms no unusual seismic activity detected',
        'Similar false predictions have circulated multiple times before'
      ]
    }
  ];

  // Mock data for trending real news
  const trendingRealNews: TrendingRealNews[] = [
    {
      id: 1,
      rank: 1,
      title: 'WHO announces updated vaccination guidelines for 2025',
      source: 'World Health Organization Official',
      verification: [
        'Published on official WHO website (who.int)',
        'Confirmed by multiple health ministries worldwide',
        'Press conference held with WHO Director-General',
        'Peer-reviewed supporting research published in The Lancet'
      ],
      category: 'Health',
      timeAgo: '2 hours ago',
      credibilityScore: 99,
      region: 'Global'
    },
    {
      id: 2,
      rank: 2,
      title: 'Central Bank raises interest rates by 0.25% effective immediately',
      source: 'Federal Reserve / RBI Official',
      verification: [
        'Official announcement on central bank website',
        'Live press conference broadcasted on official channels',
        'Covered by major financial news outlets (Bloomberg, Reuters)',
        'Policy document released with detailed rationale'
      ],
      category: 'Finance',
      timeAgo: '4 hours ago',
      credibilityScore: 100,
      region: 'United States'
    },
    {
      id: 3,
      rank: 3,
      title: 'International Climate Summit reaches historic emissions agreement',
      source: 'United Nations Climate Change',
      verification: [
        'Official UN press release and treaty document published',
        'Signed by 156 country representatives',
        'Live coverage by international news agencies',
        'Agreement text available on UNFCCC official portal'
      ],
      category: 'Environment',
      timeAgo: '6 hours ago',
      credibilityScore: 98,
      region: 'Global'
    }
  ];

  // Regional data showing areas with highest fake news
  const regionalData: RegionalData[] = [
    { region: 'Southeast Asia', totalScraped: 45230, fakeNews: 21847, fakePercentage: 48 },
    { region: 'South Asia', totalScraped: 38567, fakeNews: 17355, fakePercentage: 45 },
    { region: 'Latin America', totalScraped: 32145, fakeNews: 13501, fakePercentage: 42 },
    { region: 'Eastern Europe', totalScraped: 28934, fakeNews: 10934, fakePercentage: 38 },
    { region: 'Middle East', totalScraped: 25678, fakeNews: 9240, fakePercentage: 36 },
    { region: 'North America', totalScraped: 41234, fakeNews: 13184, fakePercentage: 32 },
  ];

  // Chart data - Fake news by category
  const categoryData = [
    { category: 'Health', fake: 3240, real: 1850, total: 5090 },
    { category: 'Politics', fake: 2890, real: 2340, total: 5230 },
    { category: 'Finance', fake: 2150, real: 1980, total: 4130 },
    { category: 'Technology', fake: 1450, real: 2890, total: 4340 },
    { category: 'Entertainment', fake: 1890, real: 1560, total: 3450 },
    { category: 'Science', fake: 980, real: 2450, total: 3430 },
  ];

  // Hourly trend data
  const hourlyTrendData = [
    { time: '00:00', fake: 45, real: 78 },
    { time: '04:00', fake: 32, real: 56 },
    { time: '08:00', fake: 89, real: 134 },
    { time: '12:00', fake: 156, real: 189 },
    { time: '16:00', fake: 134, real: 167 },
    { time: '20:00', fake: 178, real: 145 },
    { time: '23:59', fake: 98, real: 123 },
  ];

  // Platform distribution
  const platformData = [
    { name: 'WhatsApp', value: 35, color: '#25D366' },
    { name: 'Facebook', value: 28, color: '#1877F2' },
    { name: 'Twitter/X', value: 22, color: '#1DA1F2' },
    { name: 'Instagram', value: 10, color: '#E4405F' },
    { name: 'TikTok', value: 5, color: '#000000' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">📊 CrisisTruth AI Dashboard</h1>
          <p className="text-blue-100 text-lg">Real-time monitoring and analysis of news verification</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total News Analyzed</p>
            <p className="text-4xl font-bold text-gray-900">187.5K</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 23% vs last week</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-red-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">Fake News Detected</p>
            <p className="text-4xl font-bold text-red-600">67.2K</p>
            <p className="text-sm text-gray-500 mt-2">35.8% of total</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">Verified Real News</p>
            <p className="text-4xl font-bold text-green-600">120.3K</p>
            <p className="text-sm text-gray-500 mt-2">64.2% of total</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-purple-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">Detection Accuracy</p>
            <p className="text-4xl font-bold text-purple-600">96.8%</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 2.1% improvement</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">News by Category</h3>
            <p className="text-sm text-gray-500 mb-4">Fake vs Real distribution across categories</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="fake" fill="#ef4444" name="Fake News" radius={[0, 4, 4, 0]} />
                <Bar dataKey="real" fill="#10b981" name="Real News" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Distribution</h3>
            <p className="text-sm text-gray-500 mb-4">Where fake news spreads most</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 24-Hour Trend */}
          <div className="bg-white rounded-xl p-6 shadow-md lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-2">24-Hour Trend Analysis</h3>
            <p className="text-sm text-gray-500 mb-4">Real-time monitoring of news flow</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="fake" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Fake News"
                />
                <Area 
                  type="monotone" 
                  dataKey="real" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Real News"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Analysis - High Fake News Regions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🌍 Regional Analysis</h2>
              <p className="text-gray-600">Areas with highest concentration of fake news</p>
            </div>
            <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-bold rounded-full">
              High Risk Regions
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalData.map((region, idx) => (
              <RegionalStatsCard key={idx} data={region} />
            ))}
          </div>
        </div>

        {/* Top 3 Trending Fake News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🔥 Top 3 Trending Fake News</h2>
              <p className="text-gray-600">Most shared misinformation with evidence</p>
            </div>
            <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-bold rounded-full">
              Urgent Alert
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendingFakeNews.map((news) => (
              <TrendingFakeCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* Top 3 Trending Real News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">✅ Top 3 Verified Real News</h2>
              <p className="text-gray-600">Most impactful verified news with evidence</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-bold rounded-full">
              Verified Sources
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendingRealNews.map((news) => (
              <TrendingRealCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;