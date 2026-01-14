import { useState } from 'react';

type FakeNewsItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  platform: string;
  reason: string;
  shares: number;
  timeDetected: string;
  severity: 'high' | 'medium' | 'low';
  categories: string[];
  factCheckSources: string[];
};

const OptimizedFakeNews = () => {
  const fakeNewsData: FakeNewsItem[] = [
    {
      id: 1,
      title: "Breaking: Government announces mandatory digital currency by March 2025",
      description:
        "Viral WhatsApp message claims all physical currency will be banned and replaced with digital-only payments within 60 days. No withdrawal limits mentioned.",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-digital-currency",
      platform: "WhatsApp",
      reason:
        "No official government announcement exists on any verified portal (PIB, Finance Ministry, RBI). Central banks have made no such directive. This is a recycled hoax from 2023.",
      shares: 287453,
      timeDetected: "3 hours ago",
      severity: 'high',
      categories: ['Finance', 'Government Policy'],
      factCheckSources: ['PIB Fact Check', 'RBI Official', 'Alt News']
    },
    {
      id: 2,
      title: "Miracle remedy: Garlic and honey cures all cancers in 30 days",
      description:
        "Posts claim a simple home mixture can eliminate any type of cancer without medical treatment. Includes testimonials and before/after photos.",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-cancer-cure",
      platform: "Facebook",
      reason:
        "No peer-reviewed medical research supports this claim. WHO and major cancer institutes have not endorsed this. Dangerous medical misinformation that could delay proper treatment.",
      shares: 156782,
      timeDetected: "8 hours ago",
      severity: 'high',
      categories: ['Health', 'Medical Misinformation'],
      factCheckSources: ['WHO', 'NIH', 'FactCheck.org']
    },
    {
      id: 3,
      title: "Major earthquake predicted for January 15th in California",
      description:
        "Viral posts claim seismologists have predicted a catastrophic earthquake with specific date and time, but government is hiding the information.",
      imageUrl: "https://images.unsplash.com/photo-1590698933947-a202b069a861?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-earthquake",
      platform: "Twitter/X",
      reason:
        "Earthquakes cannot be predicted with date-specific accuracy. No seismological agency has issued such a warning. USGS confirms no unusual seismic activity.",
      shares: 134567,
      timeDetected: "5 hours ago",
      severity: 'medium',
      categories: ['Disaster', 'Public Safety'],
      factCheckSources: ['USGS', 'Snopes', 'Reuters Fact Check']
    },
    {
      id: 4,
      title: "5G towers cause COVID-19 symptoms and spread the virus",
      description:
        "Video claims that 5G electromagnetic radiation causes COVID-like symptoms and helps spread the coronavirus through radio waves.",
      imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-5g-covid",
      platform: "YouTube",
      reason:
        "Scientifically debunked: viruses cannot travel on radio waves. WHO and IEEE confirm 5G is safe. COVID-19 spreads through respiratory droplets, not electromagnetic radiation.",
      shares: 98234,
      timeDetected: "12 hours ago",
      severity: 'medium',
      categories: ['Health', 'Technology', 'Conspiracy'],
      factCheckSources: ['WHO', 'IEEE', 'Full Fact']
    },
    {
      id: 5,
      title: "Free government laptops for all students - Click link to register",
      description:
        "Message claims government is distributing free laptops. Includes registration link asking for personal details and bank account information.",
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-laptop-scheme",
      platform: "Telegram",
      reason:
        "Phishing scam designed to steal personal information. No such government scheme exists. Official schemes are announced through government portals, not messaging apps.",
      shares: 76543,
      timeDetected: "1 day ago",
      severity: 'high',
      categories: ['Scam', 'Phishing', 'Government'],
      factCheckSources: ['PIB Fact Check', 'Cyber Crime Cell', 'CERT-In']
    },
    {
      id: 6,
      title: "Drinking hot water with lemon prevents COVID-19 infection",
      description:
        "Widely shared health advice claiming that hot water with lemon creates an alkaline environment that kills coronavirus before it reaches the lungs.",
      imageUrl: "https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?w=400&h=250&fit=crop",
      sourceUrl: "https://example.com/fake-lemon-remedy",
      platform: "Instagram",
      reason:
        "No scientific evidence supports this claim. WHO confirms no food or drink prevents COVID-19. Virus prevention requires vaccination, masks, and hygiene - not home remedies.",
      shares: 65432,
      timeDetected: "1 day ago",
      severity: 'low',
      categories: ['Health', 'COVID-19'],
      factCheckSources: ['WHO', 'CDC', 'Health Feedback']
    }
  ];

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filters = ['all', 'Health', 'Finance', 'Government Policy', 'Technology', 'Disaster'];
  const severityFilters = [
    { value: 'all', label: 'All Severity', color: '#64748b' },
    { value: 'high', label: 'High Risk', color: '#dc2626' },
    { value: 'medium', label: 'Medium Risk', color: '#f59e0b' },
    { value: 'low', label: 'Low Risk', color: '#16a34a' }
  ];

  const filteredNews = fakeNewsData.filter(news => {
    const matchesCategory = selectedFilter === 'all' || news.categories.includes(selectedFilter);
    const matchesSeverity = selectedSeverity === 'all' || news.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return '#64748b';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return '#fee2e2';
      case 'medium': return '#fef3c7';
      case 'low': return '#dcfce7';
      default: return '#f1f5f9';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 60px rgba(220, 38, 38, 0.3)',
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
                🚫
              </div>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  Fake News Detection Center
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0.5rem 0 0 0'
                }}>
                  Real-time detection and analysis of verified misinformation
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
                  Total Detected
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {fakeNewsData.length}
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Total Shares
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {(fakeNewsData.reduce((sum, item) => sum + item.shares, 0) / 1000).toFixed(0)}K
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  High Severity
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                  {fakeNewsData.filter(n => n.severity === 'high').length}
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                  Last Updated
                </p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
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
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '20px',
                    border: selectedFilter === filter ? '2px solid #dc2626' : '2px solid #e2e8f0',
                    background: selectedFilter === filter ? '#dc2626' : 'white',
                    color: selectedFilter === filter ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFilter !== filter) {
                      e.currentTarget.style.background = '#fee2e2';
                      e.currentTarget.style.borderColor = '#dc2626';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFilter !== filter) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: '1rem 0 1rem 0' }}>
              Filter by Severity Level
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {severityFilters.map(sev => (
                <button
                  key={sev.value}
                  onClick={() => setSelectedSeverity(sev.value)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '20px',
                    border: selectedSeverity === sev.value ? `2px solid ${sev.color}` : '2px solid #e2e8f0',
                    background: selectedSeverity === sev.value ? sev.color : 'white',
                    color: selectedSeverity === sev.value ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSeverity !== sev.value) {
                      e.currentTarget.style.borderColor = sev.color;
                      e.currentTarget.style.color = sev.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSeverity !== sev.value) {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            Showing <strong style={{ color: '#1e293b' }}>{filteredNews.length}</strong> of <strong style={{ color: '#1e293b' }}>{fakeNewsData.length}</strong> detected fake news items
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
                border: `3px solid ${getSeverityColor(news.severity)}`,
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
                  alt="Fake news"
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
                
                {/* Severity badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: getSeverityColor(news.severity),
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  {news.severity} Risk
                </div>

                {/* Platform badge */}
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
                  📱 {news.platform}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Fake badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 1rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  <span>🚨</span>
                  FAKE NEWS DETECTED
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

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>
                      Shares
                    </p>
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#dc2626', margin: 0 }}>
                      {news.shares.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>
                      Detected
                    </p>
                    <p style={{ fontSize: '1rem', fontWeight: '600', color: '#64748b', margin: 0 }}>
                      {news.timeDetected}
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {news.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#f1f5f9',
                          color: '#475569',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reason box */}
                <div style={{
                  background: getSeverityBg(news.severity),
                  border: `2px solid ${getSeverityColor(news.severity)}`,
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: getSeverityColor(news.severity),
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    🔍 Why This is Fake
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#1e293b',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {news.reason}
                  </p>
                </div>

                {/* Fact check sources */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '0.5rem'
                  }}>
                    ✓ Verified by:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {news.factCheckSources.map((source, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#dcfce7',
                          color: '#15803d',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          border: '1px solid #16a34a'
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
                    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => window.open(news.sourceUrl, '_blank')}
                >
                  🔗 View Full Analysis
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
              Try adjusting your filters to see more fake news detections
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedFakeNews;