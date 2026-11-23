import { useLanguage } from '../../hooks/useLanguage';
import React, { useState, useEffect, useRef } from 'react';
import { askPortfolioChat, type ChatMessage as Message } from '../../chatClient';
import { SparklesIcon, ArrowRightIcon, CloseIcon } from '../icons';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "Hi! I'm Oussama's AI assistant. Ask me about his skills, projects, or experience." }],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: inputValue.trim() }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const text = await askPortfolioChat([...messages.slice(1), userMessage], language);

      const modelMessage: Message = {
        role: 'model',
        parts: [{ text }],
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to get response');
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          parts: [{ text: "I'm sorry, I encountered an error. Please try again or contact Oussama directly via email." }],
        },
      ]);
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

  const suggestedQuestions = [
    "What are Oussama's main skills?",
    "Tell me about his projects",
    "What's his experience?",
    "Is he available for work?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chat Container */}
      <div
        className="
          relative w-full max-w-lg
          bg-[var(--background)] border border-[var(--card-border)]
          rounded-2xl shadow-2xl
          flex flex-col
          max-h-[80vh] overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
              <SparklesIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">AI Assistant</h3>
              <p className="text-xs text-[var(--muted)]">Ask me about Oussama</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] px-4 py-3 rounded-2xl
                  ${message.role === 'user'
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white'
                    : 'bg-[var(--card)] border border-[var(--card-border)] text-[var(--foreground)]'
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.parts[0].text}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[var(--card)] border border-[var(--card-border)] px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-[var(--muted)]">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="text-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (show only when few messages) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-[var(--muted)] mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    inputRef.current?.focus();
                  }}
                  className="
                    px-3 py-1.5 text-xs
                    bg-[var(--card)] border border-[var(--card-border)]
                    text-[var(--muted)] hover:text-[var(--foreground)]
                    rounded-full
                    hover:border-[var(--accent)]
                    transition-all duration-200
                  "
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
                  maxLength={2000}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="
                flex-1 px-4 py-3
                bg-[var(--card)] border border-[var(--card-border)]
                text-[var(--foreground)] placeholder-[var(--muted)]
                rounded-xl
                focus:outline-none focus:border-[var(--accent)]
                transition-colors duration-200
                disabled:opacity-50
              "
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="
                p-3 rounded-xl
                bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                text-white
                hover:opacity-90
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              <ArrowRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
