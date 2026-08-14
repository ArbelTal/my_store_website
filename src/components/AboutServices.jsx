import React from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function AboutServices({ lang, t }) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
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

      </div>
    </section>
  );
}
