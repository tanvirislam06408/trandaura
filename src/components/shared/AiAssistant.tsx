"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 🍊 I'm your fruit assistant. Ask me about seasonal picks, prices, or what pairs well together!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // One-time attention tooltip, shown a couple seconds after first visit this session
  useEffect(() => {
    const seen = sessionStorage.getItem("ai-tooltip-seen");
    if (!seen) {
      const showTimer = setTimeout(() => setShowTooltip(true), 2200);
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        sessionStorage.setItem("ai-tooltip-seen", "1");
      }, 7500);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      sessionStorage.setItem("ai-tooltip-seen", "1");
      setTimeout(() => inputRef.current?.focus(), 250);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function sendMessage(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong — mind trying that again?",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  const suggestions = ["What's in season?", "Best fruit for smoothies?", "Show me citrus"];

  return (
    <>
      {/* Attention tooltip */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-5 z-50 animate-tooltip-pop sm:bottom-28 sm:right-8">
          <div className="relative rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm font-medium text-[#1F2937] shadow-[0_8px_24px_rgba(31,41,55,0.15)]">
            🍓 Need help picking fruit?
            <button
              onClick={() => {
                setShowTooltip(false);
                sessionStorage.setItem("ai-tooltip-seen", "1");
              }}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1F2937] text-white shadow"
              aria-label="Dismiss tip"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2F9E44] to-[#268A3B] px-5 py-3.5 text-white shadow-[0_6px_20px_rgba(47,158,68,0.4)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 animate-idle-bounce"
        }`}
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 -z-10 animate-juice-ring rounded-full bg-[#2F9E44]/40" />
        <MessageCircle className="h-5 w-5" />
        <span className="hidden text-sm font-semibold sm:inline">Fruit Assistant</span>
      </button>

      {/* Backdrop (mobile bottom-sheet feel) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] animate-fade-in sm:bg-transparent sm:backdrop-blur-0"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-[#FFFBF3] shadow-2xl animate-sheet-up sm:inset-x-auto sm:bottom-8 sm:right-8 sm:h-[600px] sm:w-[400px] sm:rounded-3xl sm:animate-card-in"
          role="dialog"
          aria-modal="true"
          aria-label="Fruit AI Assistant chat"
        >
          {/* Mobile drag handle */}
          <div className="flex justify-center pt-2.5 sm:hidden">
            <div className="h-1.5 w-10 rounded-full bg-[#1F2937]/15" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2F9E44]/10 bg-gradient-to-r from-[#2F9E44]/10 to-[#FF8A3D]/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2F9E44] to-[#268A3B] text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1F2937]">Fruit Assistant</h2>
                <p className="text-xs text-[#1F2937]/60">Fresh picks, fast answers</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1F2937]/50 transition-colors hover:bg-[#1F2937]/5 hover:text-[#1F2937]"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  style={{ animationDelay: `${Math.min(i, 4) * 40}ms` }}
                  className={`flex animate-msg-in gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                      msg.role === "user"
                        ? "bg-[#FF8A3D]/15 text-[#FF8A3D]"
                        : "bg-[#2F9E44]/15 text-[#2F9E44]"
                    }`}
                  >
                    {msg.role === "user" ? "🙂" : "🍊"}
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-[#FF8A3D] text-white"
                        : "rounded-tl-sm bg-white text-[#1F2937]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex animate-msg-in gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2F9E44]/15 text-xs text-[#2F9E44]">
                    🍊
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-dot-bounce rounded-full bg-[#1F2937]/40 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-dot-bounce rounded-full bg-[#1F2937]/40 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-dot-bounce rounded-full bg-[#1F2937]/40 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested prompts */}
          {messages.length <= 2 && !isTyping && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-[#2F9E44]/25 bg-white px-3 py-1.5 text-xs font-medium text-[#2F9E44] transition-colors hover:bg-[#2F9E44]/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-[#1F2937]/10 bg-[#FFFBF3] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about a fruit..."
                className="flex-1 rounded-full border border-[#1F2937]/10 bg-white px-4 py-2.5 text-sm text-[#1F2937] outline-none transition-all placeholder:text-[#1F2937]/40 focus:border-[#2F9E44] focus:ring-2 focus:ring-[#2F9E44]/15"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F9E44] to-[#268A3B] text-white transition-all duration-200 hover:brightness-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes idle-bounce {
          0%, 88%, 100% { transform: translateY(0); }
          92% { transform: translateY(-6px); }
          96% { transform: translateY(0); }
        }
        .animate-idle-bounce { animation: idle-bounce 6s ease-in-out infinite; }

        @keyframes juice-ring {
          0% { transform: scale(1); opacity: 0.55; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-juice-ring { animation: juice-ring 2.4s ease-out infinite; }

        @keyframes tooltip-pop {
          0% { opacity: 0; transform: translateY(8px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-tooltip-pop { animation: tooltip-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out both; }

        @keyframes sheet-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-sheet-up { animation: sheet-up 0.35s cubic-bezier(0.32, 0.72, 0, 1) both; }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-in { animation: card-in 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) both; }

        @keyframes msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-msg-in { animation: msg-in 0.25s ease-out both; }

        @keyframes dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .animate-dot-bounce { animation: dot-bounce 1s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-idle-bounce,
          .animate-juice-ring,
          .animate-tooltip-pop,
          .animate-fade-in,
          .animate-sheet-up,
          .animate-card-in,
          .animate-msg-in,
          .animate-dot-bounce {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}