import React from 'react';
import { Cpu, ShieldCheck, Zap, Star, Quote } from 'lucide-react';
import { STATS, TESTIMONIALS } from '../data/products';

export default function AboutServices({ lang, t }) {
  const isEn = lang === 'en';

  return (
    <section className="py-16 md:py-24 border-t border-cyan-500/10 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('aboutTitle')}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('feature1Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('feature1Desc')}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('feature2Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('feature2Desc')}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('feature3Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('feature3Desc')}
            </p>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/20 shadow-2xl mb-20 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">{stat.value}</div>
              <div className="text-xs text-slate-300 font-medium">{isEn && stat.labelEn ? stat.labelEn : stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((tItem, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative flex flex-col justify-between">
              <Quote className="h-8 w-8 text-cyan-500/20 mb-3" />
              <p className="text-xs text-slate-300 italic mb-6 leading-relaxed">
                "{isEn && tItem.quoteEn ? tItem.quoteEn : tItem.quote}"
              </p>
              <div className="border-t border-slate-800/80 pt-4">
                <div className="font-bold text-xs text-white">{isEn && tItem.nameEn ? tItem.nameEn : tItem.name}</div>
                <div className="text-[11px] text-cyan-400">{isEn && tItem.roleEn ? tItem.roleEn : tItem.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
