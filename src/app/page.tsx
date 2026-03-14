"use client";

import React, { useState } from 'react';
import { Sparkles, Instagram, Youtube, Send, Loader2, ArrowRight, Share2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSocialContent } from '../lib/social-engine';
import { getHitStats, incrementHit } from '../lib/counter-store';

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, today: 0 });

  React.useEffect(() => {
    incrementHit();
    setStats(getHitStats());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error || "생성 실패: 서버 응답 오류");
      } else {
        setResult(data.content);
      }
    } catch (error) {
      setResult("생성 실패: 네트워크 연결을 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-12 max-w-5xl mx-auto space-y-12 pb-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          <Sparkles size={16} />
          <span>Social-Maker AI: 소셜 미디어의 새로운 미래</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent"
        >
          AI 콘텐츠 생성 v8.0<br />자동으로 만드세요
        </motion.h1>

        {/* Stats Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <div className="glass-card px-8 py-4 text-left min-w-[200px] border-purple-500/20">
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Total Hits</p>
            <div className="text-3xl font-black text-white flex items-baseline gap-1">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {stats.total.toLocaleString()}
              </motion.span>
              <span className="text-xs text-purple-500/50">+</span>
            </div>
          </div>
          <div className="glass-card px-8 py-4 text-left min-w-[200px] border-pink-500/20">
            <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1">Today's Magic</p>
            <div className="text-3xl font-black text-white">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {stats.today.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Input Section */}
      <section className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative glass-card p-2 flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="블로그 주소나 제품명을 입력하세요..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-gray-500 text-lg"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-2xl transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>
        </form>
      </section>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="glass-card space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-pink-400">
                  <Instagram size={24} />
                  인스타그램 콘텐츠
                </h2>
                <Copy size={18} className="text-gray-500 cursor-pointer hover:text-white transition" />
              </div>
              <div className="p-4 bg-white/5 rounded-2xl text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result.includes("콘텐츠 생성 오류") 
                  ? <span className="text-red-400">{result}</span>
                  : result.split("2.")[0].replace("1.", "").trim()}
              </div>
            </div>

            <div className="glass-card space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
                  <Youtube size={24} />
                  유튜브 쇼츠 대본
                </h2>
                <Copy size={18} className="text-gray-500 cursor-pointer hover:text-white transition" />
              </div>
              <div className="p-4 bg-white/5 rounded-2xl text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result.includes("콘텐츠 생성 오류")
                  ? "데이터 생성 실패"
                  : (result.includes("2.") ? result.split("2.")[1].split("3.")[0].trim() : "생성 중...")}
              </div>
            </div>

            <div className="md:col-span-2 glass-card space-y-4 bg-gradient-to-br from-purple-900/10 to-transparent border-purple-500/10">
              <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
                <Sparkles size={24} />
                AI 비주얼 제안 & 테마
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 uppercase font-medium">이미지 프롬프트</p>
                  <p className="text-gray-400 italic text-sm">
                    {result.includes("4.") ? result.split("4.")[1].trim() : "..."}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 uppercase font-medium">디자인 가이드</p>
                  <p className="text-gray-400">
                   {result.includes("3.") ? result.split("3.")[1].split("4.")[0].trim() : "..."}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="text-center text-gray-600 text-sm pt-24 border-t border-white/5">
        &copy; 2026 Social-Maker AI. Created for your financial freedom.
      </footer>
    </main>
  );
}
