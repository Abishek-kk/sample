import { useState } from 'react';

type RealNewsItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  verificationScore: number;
  publishedTime: string;
  verificationMethods: string[];
  additionalSources: string[];
  region: string;
  impactLevel: 'critical' | 'high' | 'medium';
};

const OptimizedRealNews = () => {
  const realNewsData: RealNewsItem[] = [
    {
      id: 1,
      title: "WHO releases updated vaccination guidelines for 2025",
      description:
        "The World Health Organization has published comprehensive new guidelines for vaccination protocols, incorporating latest research on immunity duration and booster recommendations.",
      imageUrl: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&h=250&fit=crop",
      sourceUrl: "https://www.who.int",
      sourceName: "World Health Organization",
      category: "Health",
      verificationScore: 99,
      publishedTime: "2 hours ago",
      region: "Global",
      impactLevel: "critical",
      verificationMethods: [
        "Official WHO website publication",
        "Press conference with Director-General",
        "Peer-reviewed journal publication in The Lancet",
        "Confirmed by multiple health ministries worldwide"
      ],
      additionalSources: ["The Lancet", "CDC", "European CDC", "NIH"]
    },
    {
      id: 2,
      title: "Federal Reserve announces interest rate adjustment",
      description:
        "The Federal Reserve has officially raised interest rates by 0.25% to combat inflation, with detailed economic projections and policy rationale released.",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      sourceUrl: "https://www.federalreserve.gov",
      sourceName: "Federal Reserve",
      category: "Finance",
      verificationScore: 100,
      publishedTime: "4 hours ago",
      region: "United States",
      impactLevel: "critical",
      verificationMethods: [
        "Official Federal Reserve website announcement",
        "Live FOMC press conference",
        "Policy statement document published",
        "Covered by Bloomberg, Reuters, WSJ"
      ],
      additionalSources: ["Bloomberg", "Reuters", "Wall Street Journal", "Financial Times"]
    },
    {
      id: 3,
      title: "International Climate Summit reaches historic emissions agreement",
      description:
        "156 countries have signed a landmark agreement at the UN Climate Summit, committing to reduce carbon emissions by 45% by 2030 with binding enforcement mechanisms.",
      imageUrl: "https://images.unsplash.com/photo-1569163139394-de4798aa62b0?w=400&h=250&fit=crop",
      sourceUrl: "https://unfccc.int",
      sourceName: "United Nations Climate Change",
      category: "Environment",
      verificationScore: 98,
      publishedTime: "6 hours ago",
      region: "Global",
      impactLevel: "critical",
      verificationMethods: [
        "Official UN press release and treaty document",
        "156 country representatives signed publicly",
        "Live coverage by international news agencies",
        "Agreement text available on UNFCCC portal"
      ],
      additionalSources: ["BBC", "CNN", "Al Jazeera", "Guardian"]
    },
    {
      id: 4,
      title: "FDA approves breakthrough Alzheimer's treatment",
      description:
        "The U.S. Food and Drug Administration has approved a new drug showing significant promise in slowing cognitive decline in early-stage Alzheimer's patients.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
      sourceUrl: "https://www.fda.gov",
      sourceName: "U.S. FDA",
      category: "Health",
      verificationScore: 97,
      publishedTime: "8 hours ago",
      region: "United States",
      impactLevel: "high",
      verificationMethods: [
        "Official FDA approval announcement",
        "Clinical trial data published in NEJM",
        "Press briefing with FDA Commissioner",
        "Confirmed by pharmaceutical company"
      ],
      additionalSources: ["NEJM", "Mayo Clinic", "Johns Hopkins", "WebMD"]
    },
    {
      id: 5,
      title: "Space agency confirms successful Mars rover landing",
      description:
        "NASA's latest Mars rover has successfully landed in Jezero Crater, beginning its mission to search for signs of ancient microbial life and collect samples.",
      imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=250&fit=crop",
      sourceUrl: "https://www.nasa.gov",
      sourceName: "NASA",
      category: "Science",
      verificationScore: 100,
      publishedTime: "12 hours ago",
      region: "Global",
      impactLevel: "high",
      verificationMethods: [
        "Official NASA live stream broadcast",
        "Telemetry data confirmed landing",
        "First images transmitted from rover",
        "Mission control press conference"
      ],
      additionalSources: ["ESA", "JAXA", "Nature", "Science Magazine"]
    },
    {
      id: 6,
      title: "Supreme Court issues major ruling on data privacy",
      description:
        "The Supreme Court has ruled in favor of enhanced digital privacy protections, requiring tech companies to obtain explicit consent before collecting user data.",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      sourceUrl: "https://www.supremecourt.gov",
      sourceName: "U.S. Supreme Court",
      category: "Legal",
      verificationScore: 100,
      publishedTime: "1 day ago",
      region: "United States",
      impactLevel: "high",
      verificationMethods: [
        "Official Supreme Court opinion published",
        "Full case documentation available",
        "Live announcement from court",
        "Legal analysis by constitutional experts"
      ],
      additionalSources: ["SCOTUSblog", "Legal Times", "ABA Journal", "Harvard Law Review"]
    },
    {
      id: 7,
      title: "Major earthquake early warning system launched in Japan",
      description:
        "Japan has activated an advanced AI-powered earthquake detection system capable of providing up to 60 seconds of advance warning before tremors reach populated areas.",
      imageUrl: "https://images.unsplash.com/photo-1590698933947-a202b069a861?w=400&h=250&fit=crop",
      sourceUrl: "https://www.jma.go.jp",
      sourceName: "Japan Meteorological Agency",
      category: "Technology",
      verificationScore: 98,
      publishedTime: "1 day ago",
      region: "Asia",
      impactLevel: "medium",
      verificationMethods: [
        "Official JMA press release",
        "System demonstration conducted",
        "Technical specifications published",
        "Partnership with tech companies confirmed"
      ],
      additionalSources: ["NHK", "Kyodo News", "IEEE", "Nature Technology"]
    },
    {
      id: 8,
      title: "New renewable energy record set in European Union",
      description:
        "The European Union reports that renewable energy sources now account for 45% of total electricity generation, surpassing fossil fuels for the first time.",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
      sourceUrl: "https://ec.europa.eu",
      sourceName: "European Commission",
      category: "Environment",
      verificationScore: 99,
      publishedTime: "2 days ago",
      region: "Europe",
      impactLevel: "medium",
      verificationMethods: [
        "Official EU statistical report",
        "Data from Eurostat database",
        "Confirmed by member state energy ministries",
        "Independent audit by energy analysts"
      ],
      additionalSources: ["Eurostat", "IEA", "Reuters", "Financial Times"]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');

  const categories = ['all', 'Health', 'Finance', 'Environment', 'Science', 'Technology', 'Legal'];
  const impactLevels = [
    { value: 'all', label: 'All Impact', color: '#64748b' },
    { value: 'critical', label: 'Critical Impact', color: '#7c3aed' },
    { value: 'high', label: 'High Impact', color: '#2563eb' },
    { value: 'medium', label: 'Medium Impact', color: '#16a34a' }
  ];

  const filteredNews = realNewsData.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesImpact = selectedImpact === 'all' || news.impactLevel === selectedImpact;
    return matchesCategory && matchesImpact;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return '#7c3aed';
      case 'high': return '#2563eb';
      case 'medium': return '#16a34a';
      default: return '#64748b';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'critical': return '#f3e8ff';
      case 'high': return '#dbeafe';
      case 'medium': return '#dcfce7';
      default: return '#f1f5f9';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                backdropFilter: 'blur(10px)'
              }}>
                ✅
              </div>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  Verified Real News Center
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0.5rem 0 0 0'
                }}>
                  Authenticated news from trusted and official sources worldwide
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Verified Articles
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {realNewsData.length}
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Avg Credibility
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {(realNewsData.reduce((sum, item) => sum + item.verificationScore, 0) / realNewsData.length).toFixed(1)}%
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Official Sources
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {new Set(realNewsData.map(n => n.sourceName)).size}
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Status
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                  }}></span>
                  Live
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: '0 0 1rem 0' }}>
              Filter by Category
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '20px',
                    border: selectedCategory === category ? '2px solid #10b981' : '2px solid #e2e8f0',
                    background: selectedCategory === category ? '#10b981' : 'white',
                    color: selectedCategory === category ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = '#dcfce7';
                      e.currentTarget.style.borderColor = '#10b981';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: '1rem 0 1rem 0' }}>
              Filter by Impact Level
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {impactLevels.map(impact => (
                <button
                  key={impact.value}
                  onClick={() => setSelectedImpact(impact.value)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '20px',
                    border: selectedImpact === impact.value ? `2px solid ${impact.color}` : '2px solid #e2e8f0',
                    background: selectedImpact === impact.value ? impact.color : 'white',
                    color: selectedImpact === impact.value ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedImpact !== impact.value) {
                      e.currentTarget.style.borderColor = impact.color;
                      e.currentTarget.style.color = impact.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImpact !== impact.value) {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  {impact.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f0fdf4',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#15803d',
            border: '1px solid #bbf7d0'
          }}>
            ✓ Showing <strong>{filteredNews.length}</strong> of <strong>{realNewsData.length}</strong> verified news articles from trusted sources
          </div>
        </div>

        {/* News Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '2rem'
        }}>
          {filteredNews.map((news) => (
            <div
              key={news.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                border: `3px solid ${getImpactColor(news.impactLevel)}`,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Image with overlay */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={news.imageUrl}
                  alt="Verified news"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
                }}></div>
                
                {/* Impact badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: getImpactColor(news.impactLevel),
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  {news.impactLevel} Impact
                </div>

                {/* Region badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  backdropFilter: 'blur(10px)'
                }}>
                  🌍 {news.region}
                </div>

                {/* Verification score */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(16, 185, 129, 0.95)',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>✓</span>
                  {news.verificationScore}% Verified
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Verified badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 1rem',
                  background: '#dcfce7',
                  color: '#15803d',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  border: '2px solid #10b981'
                }}>
                  <span>✅</span>
                  VERIFIED AUTHENTIC
                </div>

                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4'
                }}>
                  {news.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {news.description}
                </p>

                {/* Source and category */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>
                      Official Source
                    </p>
                    <p style={{ fontSize: '0.875rem', fontWeight: '700', color: '#10b981', margin: 0 }}>
                      🏛️ {news.sourceName}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>
                      Published
                    </p>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', margin: 0 }}>
                      {news.publishedTime}
                    </p>
                  </div>
                </div>

                {/* Category tag */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.375rem 1rem',
                    background: getImpactBg(news.impactLevel),
                    color: getImpactColor(news.impactLevel),
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    border: `1px solid ${getImpactColor(news.impactLevel)}`,
                    textTransform: 'uppercase'
                  }}>
                    📑 {news.category}
                  </span>
                </div>

                {/* Verification methods */}
                <div style={{
                  background: '#f0fdf4',
                  border: '2px solid #10b981',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#15803d',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>🔍</span> Verification Methods
                  </p>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '1.25rem',
                    fontSize: '0.8rem',
                    color: '#166534',
                    lineHeight: '1.6'
                  }}>
                    {news.verificationMethods.map((method, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional sources */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '0.5rem'
                  }}>
                    📰 Also reported by:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {news.additionalSources.map((source, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#f1f5f9',
                          color: '#475569',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          border: '1px solid #cbd5e1'
                        }}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => window.open(news.sourceUrl, '_blank')}
                >
                  🔗 Read Full Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
              No Results Found
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Try adjusting your filters to see more verified news articles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedRealNews;
