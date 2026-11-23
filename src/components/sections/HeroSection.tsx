import { useLanguage } from '../../hooks/useLanguage';
import React, { useState, useEffect, useRef } from 'react';
import { askPortfolioChat, PortfolioChatError, type ChatMessage as Message } from '../../chatClient';
import { motion } from 'framer-motion';
import GradientText from '../ui/GradientText';
import { ArrowRightIcon } from '../icons';

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll within chat container only (not the page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setChatError(null);

    try {
      const responseText = await askPortfolioChat([...messages, userMessage], language);

      const modelMessage: Message = {
        role: 'model',
        parts: [{ text: responseText }],
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error('Portfolio chat failed:', err);
      const status = err instanceof PortfolioChatError ? err.status : undefined;
      setMessages((prev) => prev.slice(0, -1));
      setInputValue((current) => current || text);
      setChatError(status === 429
        ? 'Chat is busy right now. Wait a moment and try again.'
        : status === 503
          ? 'Chat is currently unavailable. Please try again later.'
          : 'Chat could not reply. Your message is ready to resend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: t("Work"), query: t("Tell me about your recent projects and work experience") },
    { label: t("About me"), query: t("Tell me about yourself and your background") },
    { label: t("Skills"), query: t("What are your main technical skills?") },
    { label: t("Contact"), query: t("How can I contact you for a project?") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--gradient-end) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(var(--muted) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <motion.div
        className="section relative z-10 pt-28 md:pt-36 pb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1 className="text-center mb-3 text-3xl md:text-4xl font-bold ">
          <span className="text-[var(--foreground)]">{t("Hi, I'm")} </span>
          <GradientText as="span" shimmer>Oussama Matboua</GradientText>
        </h1>
        <p className="text-center text-[var(--muted)]">{t("Cybersecurity and cloud graduate seeking a system integration apprenticeship in Germany")}</p>
      </motion.div>

      {/* Chat Container - Outside .section for full width control */}
      <motion.div
        className="relative z-10 px-4 md:px-8 lg:px-16 pb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="
              rounded-3xl
              border border-[var(--card-border)]
              bg-[var(--card)]/20
              backdrop-blur-sm
              overflow-hidden
            "
          >
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="p-6 min-h-[280px] max-h-[350px] overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {messages.length === 0 ? (
                // Empty state placeholder
                <div className="flex items-center justify-center h-full min-h-[220px]">
                  <p className="text-[var(--muted)] text-lg">
                    {t("Ask me anything about Oussama...")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[85%] px-5 py-3 rounded-2xl
                          ${message.role === 'user'
                            ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white'
                            : 'bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)]'
                          }
                        `}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.parts[0].text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[var(--background)] border border-[var(--card-border)] px-5 py-3 rounded-2xl">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap justify-center gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.query)}
                    disabled={isLoading}
                    className="
                      px-4 py-2 text-sm font-medium
                      rounded-full
                      border border-[var(--card-border)]
                      bg-[var(--background)]/80
                      text-[var(--muted)] hover:text-[var(--foreground)]
                      hover:border-[var(--foreground)]/30
                      hover:bg-[var(--background)]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200
                    "
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {chatError && (
              <p role="status" className="px-6 pb-3 text-sm text-[var(--muted)]">
                {t(chatError)}
              </p>
            )}

            {/* Input Area */}
            <div className="px-6 pb-6">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={2000}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("Ask anything about Oussama...")}
                  disabled={isLoading}
                  className="
                    w-full px-5 py-4 pr-14
                    bg-[var(--background)] border border-[var(--card-border)]
                    text-[var(--foreground)] placeholder-[var(--muted)]
                    rounded-2xl
                    focus:outline-none focus:border-[var(--foreground)]/30
                    transition-colors duration-200
                    disabled:opacity-50
                  "
                />
                <button
                  onClick={() => sendMessage()}
                  aria-label={t("Send message")}
                  disabled={!inputValue.trim() || isLoading}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    p-2.5 rounded-xl
                    bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                    text-white
                    hover:opacity-90
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  <ArrowRightIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span className="text-sm">{t("Scroll to explore")}</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;