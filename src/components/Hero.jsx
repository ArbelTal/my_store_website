import React from 'react';
import { Sparkles, Code, Cpu, Layers, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Hero({ lang, t, onExploreClick, onRequestCustomClick }) {
  const isRtl = lang === 'he';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-cyan-500/10">
      
      {/* Background Blueprint Logo Watermark */}
      <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none max-w-xl hidden xl:block z-0`}>
        <img src="/watermark.png" alt="Revit Blueprint Watermark" className="w-[580px] h-auto filter drop-shadow-[0_0_25px_rgba(0,163,255,0.4)]" />
      </div>

      {/* Hero Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
            {t('heroTitleLine1')} <br />
            <span className="bg-gradient-to-l from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              {t('heroTitleLine2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition transform hover:-translate-y-0.5 group"
            >
              <span>{t('exploreCatalog')}</span>
              {isRtl ? (
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <button
              onClick={onRequestCustomClick}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-bold text-base hover:bg-slate-800 transition"
            >
              <Code className="h-5 w-5 text-cyan-400" />
              <span>{t('requestCustom')}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
