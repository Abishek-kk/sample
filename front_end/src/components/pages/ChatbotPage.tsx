import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, CheckCircle, TrendingUp, Share2, Loader, Copy, ThumbsUp, ThumbsDown } from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
  verificationData?: {
    status: string;
    confidence: number;
    sources: string[];
  };
};

const UpgradedChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm CrisisTruth AI, your trusted news verification assistant. I can help you verify news articles, social media posts, images, and claims. Just share what you'd like me to check!",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const typingMessage: Message = {
      sender: "bot",
      text: "Analyzing...",
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isTyping));

      const botMessage: Message = {
        sender: "bot",
        text: `**🔍 Verification Complete**

**Status:** ⚠️ LIKELY FAKE
**Confidence Level:** 87%

---

**🎯 Key Findings:**
• No official confirmation from verified government sources
• Similar claims debunked by fact-checkers in the past
• Contains emotional language designed to provoke sharing
• Reverse image search shows image used in unrelated contexts
• Lacks credible attribution and peer review

---

**📊 Source Analysis:**
🔴 Unverified Source
🟡 Partially Verified
🟢 Fully Verified

**Recommended Actions:**
✓ Cross-check with official sources (PIB, WHO, government portals)
✓ Look for coverage in reputable news outlets (Reuters, AP, BBC)
✓ Verify dates and context of images/videos
✓ Be cautious before sharing unverified information
✓ Report suspicious content to platform moderators

---

**📚 Related Fact Checks:**
• AltNews: Similar claim debunked [Link]
• Snopes: Context verification [Link]
• Full Fact: Expert analysis [Link]

Need more help? Share an official news URL to verify its authenticity!`,
        timestamp: new Date(),
        verificationData: {
          status: "LIKELY FAKE",
          confidence: 87,
          sources: ["AltNews", "Snopes", "Full Fact"]
        }
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const suggestions = [
    { icon: "📰", text: "Verify a news article" },
    { icon: "📱", text: "Check social media post" },
    { icon: "🖼️", text: "Analyze an image" },
    { icon: "❓", text: "How does verification work?" }
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        borderBottom: "2px solid rgba(59, 130, 246, 0.2)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
          }}>
            ✓
          </div>
          <div>
            <h1 style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#ffffff",
              margin: 0
            }}>
              CrisisTruth AI
            </h1>
            <p style={{
              fontSize: "12px",
              color: "#94a3b8",
              margin: 0,
              fontWeight: "600",
              letterSpacing: "0.05em"
            }}>
              NEWS VERIFICATION ASSISTANT
            </p>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          borderRadius: "20px",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          fontSize: "13px",
          fontWeight: "600",
          color: "#22c55e"
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#22c55e",
            borderRadius: "50%",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }} />
          Online & Ready
        </div>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
      }}>
        {messages.length === 1 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: "32px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "64px",
                marginBottom: "16px",
                animation: "bounce 2s infinite"
              }}>
                🔍
              </div>
              <h2 style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#1e293b",
                margin: "0 0 8px 0"
              }}>
                Welcome to CrisisTruth AI
              </h2>
              <p style={{
                fontSize: "16px",
                color: "#64748b",
                margin: 0,
                maxWidth: "400px"
              }}>
                Your intelligent companion for fact-checking and news verification
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              width: "100%",
              maxWidth: "600px"
            }}>
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(suggestion.text);
                    inputRef.current?.focus();
                  }}
                  style={{
                    padding: "16px",
                    backgroundColor: "white",
                    border: "2px solid #e2e8f0",
                    borderRadius: "16px",
                    fontSize: "14px",
                    color: "#1e293b",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontWeight: "600",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.backgroundColor = "#f0f9ff";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{suggestion.icon}</span>
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  animation: "slideUp 0.3s ease-out"
                }}
              >
                <div style={{
                  maxWidth: "75%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  {msg.sender === "bot" && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      paddingLeft: "4px"
                    }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: "white",
                        fontWeight: "700"
                      }}>
                        ✓
                      </div>
                      <span style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#1e293b"
                      }}>
                        CrisisTruth AI
                      </span>
                    </div>
                  )}
                  
                  <div style={{
                    padding: msg.sender === "user" ? "12px 16px" : "16px",
                    borderRadius: msg.sender === "user" 
                      ? "16px 16px 4px 16px" 
                      : "16px 16px 16px 4px",
                    backgroundColor: msg.sender === "user" 
                      ? "#3b82f6" 
                      : "#ffffff",
                    color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                    boxShadow: msg.sender === "user"
                      ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                      : "0 2px 8px rgba(0, 0, 0, 0.08)",
                    border: msg.sender === "bot" ? "1px solid #e2e8f0" : "none",
                    position: "relative"
                  }}>
                    {msg.isTyping ? (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: "4px"
                        }}>
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#9ca3af",
                                borderRadius: "50%",
                                animation: `bounce 1.4s infinite ease-in-out`,
                                animationDelay: `${i * 0.16}s`
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ color: "#6b7280", fontSize: "13px" }}>
                          {msg.text}
                        </span>
                      </div>
                    ) : (
                      <div style={{ wordBreak: "break-word" }}>
                        {msg.text.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <strong key={i} style={{ display: "block", marginTop: i > 0 ? "8px" : 0 }}>{line.replace(/\*\*/g, '')}</strong>;
                          }
                          if (line === '---') {
                            return <hr key={i} style={{ margin: "12px 0", border: "none", borderTop: "1px solid #e2e8f0" }} />;
                          }
                          if (line.startsWith('•')) {
                            return <div key={i} style={{ marginLeft: "16px", marginTop: "4px" }}>{line}</div>;
                          }
                          return <div key={i}>{line}</div>;
                        })}
                      </div>
                    )}

                    {msg.sender === "bot" && !msg.isTyping && (
                      <div style={{
                        display: "flex",
                        gap: "6px",
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #e2e8f0"
                      }}>
                        <button
                          title="Copy message"
                          onClick={() => copyToClipboard(msg.text, index)}
                          style={{
                            padding: "6px 10px",
                            background: "transparent",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#64748b",
                            fontSize: "12px",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                            e.currentTarget.style.borderColor = "#3b82f6";
                            e.currentTarget.style.color = "#3b82f6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.color = "#64748b";
                          }}
                        >
                          <Copy size={12} />
                          {copiedIndex === index ? "Copied!" : "Copy"}
                        </button>
                        <button
                          title="Helpful"
                          style={{
                            padding: "6px 10px",
                            background: "transparent",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#64748b",
                            fontSize: "12px",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#dcfce7";
                            e.currentTarget.style.borderColor = "#22c55e";
                            e.currentTarget.style.color = "#22c55e";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.color = "#64748b";
                          }}
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          title="Not helpful"
                          style={{
                            padding: "6px 10px",
                            background: "transparent",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#64748b",
                            fontSize: "12px",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#fee2e2";
                            e.currentTarget.style.borderColor = "#dc2626";
                            e.currentTarget.style.color = "#dc2626";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.color = "#64748b";
                          }}
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <span style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    paddingLeft: msg.sender === "user" ? "0" : "36px",
                    paddingRight: msg.sender === "user" ? "4px" : "0"
                  }}>
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        padding: "16px 24px",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            flex: 1,
            backgroundColor: "#f9fafb",
            border: "2px solid #e2e8f0",
            borderRadius: "14px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "all 0.2s"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <Sparkles size={18} style={{ color: "#94a3b8", flexShrink: 0 }} />
            <textarea
              ref={inputRef}
              placeholder="Ask me to verify news, images, or claims..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
              rows={1}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "none",
                backgroundColor: "transparent",
                color: "#1f2937",
                lineHeight: "1.5"
              }}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: "12px 20px",
              backgroundColor: loading || !input.trim() 
                ? "#e5e7eb" 
                : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.3s",
              minWidth: "90px",
              justifyContent: "center",
              boxShadow: !loading && input.trim() ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none"
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }
            }}
          >
            {loading ? (
              <>
                <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
                Sending
              </>
            ) : (
              <>
                Send
                <Send size={16} />
              </>
            )}
          </button>
        </div>
        
        <p style={{
          fontSize: "11px",
          color: "#9ca3af",
          marginTop: "8px",
          textAlign: "center"
        }}>
          Press <kbd style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>Enter</kbd> to send • <kbd style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>Shift + Enter</kbd> for new line
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        textarea::placeholder {
          color: #9ca3af;
        }

        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        strong {
          color: #1e293b;
          font-weight: 700;
        }

        hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 12px 0;
        }
      `}</style>
    </div>
  );
};

export default UpgradedChatbotPage;