import React from 'react';
import { Sparkles, Code, Cpu, Layers, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { STATS } from '../data/products';

export default function Hero({ onExploreClick, onRequestCustomClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-cyan-500/10">
      
      {/* Background Blueprint Logo Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none max-w-xl hidden xl:block z-0">
        <img src="/watermark.png" alt="Revit Blueprint Watermark" className="w-[580px] h-auto filter drop-shadow-[0_0_25px_rgba(0,163,255,0.4)]" />
      </div>

      {/* Hero Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Headline & Text */}
          <div className="lg:col-span-7 text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>תומך בגרסאות Revit 2021-2025 & pyRevit</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
              חנות התוספים והאוטומציות <br />
              <span className="bg-gradient-to-l from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                לתוכנת Autodesk Revit
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              הפוך את עבודת המידול ברוויט למהירה, מדויקת ואוטומטית לחלוטין. תוספי C# מוכנים, סקריפטים ל-pyRevit, תבניות משרדיות תקניות ושירותי מידול BIM מותאמים אישית.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center mb-12">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition transform hover:-translate-y-0.5 group"
              >
                <span>עיין בקטלוג התוספים</span>
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestCustomClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-bold text-base hover:bg-slate-800 transition"
              >
                <Code className="h-5 w-5 text-cyan-400" />
                <span>הזמן פיתוח מותאם אישית</span>
              </button>
            </div>

            {/* Features Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>התקנה מהירה ברוויט</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>תמיכה בעברית מלאה</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>תקן BIM ישראלי מותאם</span>
              </div>
            </div>

          </div>

          {/* Graphic Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 animate-pulse-glow"></div>

              {/* Main Showcase Panel */}
              <div className="relative bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Blueprint Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800">
                    Revit API & pyRevit Engine
                  </span>
                </div>

                {/* Main Logo & Graphic Feature */}
                <div className="flex flex-col items-center text-center p-6 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-6">
                  <img 
                    src="/logo.png" 
                    alt="Logo Feature" 
                    className="w-24 h-24 object-contain mb-4 drop-shadow-[0_0_15px_rgba(0,163,255,0.6)] animate-float"
                  />
                  <h3 className="font-heading font-bold text-xl text-white mb-1">
                    REVIT<span className="text-cyan-400">TOOLS</span> PLATFORM
                  </h3>
                  <p className="text-xs text-slate-400">
                    פיתוח תוספים ב-C#, אוטומציות pyRevit ומידול BIM מתקדם
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((stat, idx) => (
                    <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 text-right">
                      <div className="text-xl font-extrabold text-cyan-400 font-mono">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
