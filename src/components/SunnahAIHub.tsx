import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpenCheck,
  Check,
  Copy,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SUNNAH_AI_STARTER_TOPICS, SunnahAIStarterItem } from '../data/adabAndQuiz';
import { findSunnahAiFallback } from '../data/sunnahAiFallback';
import { ReaderSettings, SunnahAIChatMessage } from '../types';

interface SunnahAIHubProps {
  settings: ReaderSettings;
}

interface ExtendedChatMessage extends SunnahAIChatMessage {
  canRetryLive?: boolean;
  sourceQuestion?: string;
}

function renderFormattedInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#092A1B] dark:text-[#F3E5AB]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic text-[#092A1B] dark:text-[#FAF6EB]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function FormattedScholarlyResponse({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`${keyPrefix}-list`} className="space-y-1.5 pl-4 my-2">
        {listItems.map((item, idx) => (
          <li
            key={idx}
            className="text-sm leading-relaxed text-[#365645] dark:text-[#CEC5AD] flex items-start gap-2"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span>{renderFormattedInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`empty-${index}`);
      return;
    }

    if (line.startsWith('### ') || line.startsWith('## ')) {
      flushList(`head-${index}`);
      const headingText = line.replace(/^#{2,3}\s+/, '');
      blocks.push(
        <div
          key={`h-${index}`}
          className="mt-4 first:mt-0 pt-3 first:pt-0 border-t first:border-t-0 border-[#B0891E]/20 dark:border-[#D4AF37]/20"
        >
          <h3 className="font-display text-sm sm:text-base font-bold text-[#B0891E] dark:text-[#F3E5AB] flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 shrink-0" />
            <span>{headingText}</span>
          </h3>
        </div>
      );
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      listItems.push(line.slice(2).trim());
      return;
    }

    flushList(`para-${index}`);
    blocks.push(
      <p
        key={`p-${index}`}
        className="text-sm leading-relaxed text-[#18201C] dark:text-[#FAF6EB]/92 mt-2 first:mt-0"
      >
        {renderFormattedInline(line)}
      </p>
    );
  });

  flushList('end');
  return <div className="space-y-1">{blocks}</div>;
}

export const SunnahAIHub: React.FC<SunnahAIHubProps> = ({ settings }) => {
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const handleStarterSelect = (starter: SunnahAIStarterItem) => {
    setErrorMsg(null);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ExtendedChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: starter.question,
      timestamp: now,
    };
    const assistantMsg: ExtendedChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: 'assistant',
      content: starter.answer,
      timestamp: now,
      isOfflineVerified: true,
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const streamSunnahAiResponse = async (
    historyForApi: { role: 'user' | 'model'; text: string }[],
    onChunk: (accumulatedText: string) => void
  ): Promise<string> => {
    let lastErr: Error | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch('/api/sunnah-ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({
            language: settings.translationDisplay,
            stream: true,
            messages: historyForApi,
          }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('text/event-stream') && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let fullText = '';

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split('\n\n');
            buffer = events.pop() || '';
            for (const ev of events) {
              const line = ev
                .split('\n')
                .find((l) => l.startsWith('data:'));
              if (!line) continue;
              const rawJson = line.slice(5).trim();
              if (!rawJson) continue;
              try {
                const parsed = JSON.parse(rawJson);
                if (typeof parsed.chunk === 'string') {
                  fullText += parsed.chunk;
                  onChunk(fullText);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (parseErr) {
                if (parseErr instanceof Error && parseErr.message !== 'Unexpected end of JSON input') {
                  // ignore malformed partial frame
                }
              }
            }
          }

          if (fullText.trim()) {
            return fullText.trim();
          }
          throw new Error('Empty stream response received.');
        }

        const payload = await res.json().catch(() => ({}));
        if (res.ok && typeof payload?.reply === 'string' && payload.reply.trim()) {
          onChunk(payload.reply.trim());
          return payload.reply.trim();
        }
        const rawErr =
          typeof payload?.error === 'string'
            ? payload.error
            : `Sunnah AI request failed (${res.status}).`;
        lastErr = new Error(rawErr);
        if (res.status === 400 || res.status === 403) break;
      } catch (e) {
        lastErr = e instanceof Error ? e : new Error('Network connection error.');
      }
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
    throw lastErr || new Error('Sunnah AI service temporarily busy.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setErrorMsg(null);
    setInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const nextUserMsg: ExtendedChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: now,
    };

    const streamingMsgId = `a-${Date.now() + 1}`;
    const updatedHistory = [...messages, nextUserMsg];
    setMessages(updatedHistory);
    setLoading(true);

    let insertedStreamCard = false;

    try {
      const apiMessages = updatedHistory.map((m) => ({
        role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
        text: m.content,
      }));

      await streamSunnahAiResponse(apiMessages, (accumulated) => {
        if (!insertedStreamCard) {
          insertedStreamCard = true;
          const streamCard: ExtendedChatMessage = {
            id: streamingMsgId,
            role: 'assistant',
            content: accumulated,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, streamCard]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === streamingMsgId ? { ...m, content: accumulated } : m))
          );
        }
      });
    } catch {
      if (!insertedStreamCard) {
        setErrorMsg(
          'Live AI connection was temporarily busy — showing our verified offline scholarly reference below. You can retry the live query anytime.'
        );
        const fallbackContent = findSunnahAiFallback(trimmed, settings.translationDisplay);
        const fallbackMsg: ExtendedChatMessage = {
          id: `a-fb-${Date.now() + 1}`,
          role: 'assistant',
          content: fallbackContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOfflineVerified: true,
          canRetryLive: true,
          sourceQuestion: trimmed,
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetryLiveMessage = async (msgId: string, question: string) => {
    if (loading) return;
    setErrorMsg(null);
    setLoading(true);
    try {
      await streamSunnahAiResponse([{ role: 'user', text: question }], (accumulated) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  content: accumulated,
                  isOfflineVerified: false,
                  canRetryLive: false,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                }
              : m
          )
        );
      });
    } catch {
      setErrorMsg(
        'Live AI service is still experiencing temporary high demand. Please retry again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (msg: SunnahAIChatMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // ignore clipboard blocks
    }
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Sunnah AI Branded Banner */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/40 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sunnah AI · Authentic Scholarly Assistant</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
              Ask About Quran, Sunnah, Salaf &amp; the Four Imams
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] max-w-2xl leading-relaxed">
              Structured four-part guidance rooted strictly in verified Quranic verses, authentic
              Hadith collections, the understanding of the Salaf as-Salih, and the consensus and
              positions of the Four Great Imams.
            </p>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setErrorMsg(null);
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F3E5AB] text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Session</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#CEC5AD] pt-2 border-t border-[#D4AF37]/20">
          <span className="inline-flex items-center gap-1.5 text-[#F3E5AB]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Citations · Zero Fabricated Hadith</span>
          </span>
          <span>·</span>
          <span>4-Stage Scholarly Method</span>
          <span>·</span>
          <span>Follows Global Settings Language</span>
        </div>
      </section>

      {/* Pre-Verified Quick-Tap Starter Questions */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
            Verified Scholarly Starter Guides (Instant Offline Access)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUNNAH_AI_STARTER_TOPICS.map((starter) => (
            <button
              key={starter.id}
              type="button"
              onClick={() => handleStarterSelect(starter)}
              className="min-h-[40px] px-3.5 py-2 rounded-xl border border-[#B0891E]/30 dark:border-[#D4AF37]/30 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs sm:text-sm font-medium text-[#092A1B] dark:text-[#FAF6EB] transition-colors text-left cursor-pointer"
            >
              {starter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Conversation Thread */}
      <section className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-6 sm:p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl mx-auto bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Begin Your Question in Peace &amp; Sincerity
            </h2>
            <p className="text-xs sm:text-sm text-[#43574C] dark:text-[#CEC5AD] max-w-xl mx-auto leading-relaxed">
              Tap any verified starter question above or ask your own question below. Every answer
              presents Quran &amp; Sunnah evidence, Salaf understanding, views of the Four Imams,
              and respectful scholarly Adab.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <article
                key={msg.id}
                className={`rounded-2xl border p-4 sm:p-5 space-y-2.5 ${
                  msg.role === 'user'
                    ? 'ml-auto max-w-2xl border-[#D4AF37]/50 bg-[#D4AF37]/12 dark:bg-[#1D1D22]'
                    : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] flex items-center gap-1.5">
                    {msg.role === 'assistant' && <Sparkles className="w-3.5 h-3.5" />}
                    <span>{msg.role === 'user' ? 'Your Question' : 'Sunnah AI'}</span>
                    {msg.isOfflineVerified && (
                      <span className="text-[11px] font-medium text-[#43574C] dark:text-[#CEC5AD]">
                        · Pre-Verified Reference Guide
                      </span>
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#43574C] dark:text-[#CEC5AD] tabular-nums">
                      {msg.timestamp}
                    </span>
                    {msg.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg)}
                        aria-label="Copy answer"
                        className="min-h-[34px] px-2.5 py-1 rounded-lg border border-[#B0891E]/25 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] text-[11px] font-medium text-[#365645] dark:text-[#CEC5AD] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                    {msg.role === 'user' ? (
                  <p className="text-sm sm:text-base font-medium text-[#092A1B] dark:text-[#FAF6EB] leading-relaxed">
                    {msg.content}
                  </p>
                ) : (
                  <div className="space-y-3">
                    <FormattedScholarlyResponse content={msg.content} />
                    {msg.canRetryLive && msg.sourceQuestion && (
                      <div className="pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRetryLiveMessage(msg.id, msg.sourceQuestion!)}
                          disabled={loading}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/12 hover:bg-[#D4AF37]/25 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry Live Answer</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}

            {loading && (
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-white dark:bg-[#141417] p-5 flex items-center gap-3.5 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] animate-spin" />
                </span>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                      Sunnah AI is researching Quran &amp; Sunnah...
                    </p>
                    <span className="inline-flex items-center gap-1" aria-hidden="true">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                  <p className="text-xs text-[#43574C] dark:text-[#CEC5AD]">
                    Synthesizing Quranic references, Sahih Hadith, Salaf &amp; Four Imams
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {errorMsg && (
          <div className="rounded-2xl border border-amber-500/45 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-[#092A1B] dark:text-[#F3E5AB]">
                Sunnah AI Notice
              </p>
              <p className="text-[#365645] dark:text-[#CEC5AD] leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        <div ref={scrollAnchorRef} />
      </section>

      {/* Ask Input Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#B0891E]/35 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sunnah AI about Quran, Hadith, Aqeedah, Worship, Salaf or 4 Imams..."
          className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] dark:bg-[#09090B] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-sm text-[#092A1B] dark:text-[#FAF6EB] placeholder:text-[#6B7F73] dark:placeholder:text-[#8E9B93] focus:outline-none focus:border-[#D4AF37]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] disabled:opacity-50 text-[#09090B] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Ask Sunnah AI</span>
        </button>
      </form>
    </div>
  );
};
