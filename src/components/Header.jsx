import React from 'react';
import { ShoppingBag, Search, Lock, Globe } from 'lucide-react';

export default function Header({ lang, setLang, t, cartCount, onOpenCart, activeCategory, onSelectCategory, searchQuery, setSearchQuery, onOpenAdmin }) {
  const isRtl = lang === 'he';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/15 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => onSelectCategory('all')}>
            <img 
              src="/logo.png" 
              alt="Revit Tools Logo" 
              className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,163,255,0.4)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg text-white tracking-wide leading-tight group-hover:text-cyan-300 transition-colors">
                REVIT<span className="text-cyan-400">TOOLS</span>
              </span>
              <span className="text-[10px] text-cyan-300/70 font-mono tracking-wider whitespace-nowrap">
                PLUGINS & BIM SERVICES
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 shrink-0">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('cat_all')}
            </button>
            <button
              onClick={() => onSelectCategory('plugins')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'plugins'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('cat_plugins')}
            </button>
            <button
              onClick={() => onSelectCategory('pyrevit')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'pyrevit'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('cat_pyrevit')}
            </button>
            <button
              onClick={() => onSelectCategory('templates-families')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'templates-families'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('cat_templates')}
            </button>
            <button
              onClick={() => onSelectCategory('services')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'services'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('cat_services')}
            </button>
          </nav>

          {/* Quick Search, Language Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Input */}
            <div className="relative hidden xl:block w-48 xl:w-56">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-full py-2 ${
                  isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'
                } focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition`}
              />
              <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-2.5 h-4 w-4 text-slate-400`} />
            </div>

            {/* Language Switcher Toggle */}
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800 text-xs font-mono font-extrabold transition shadow-sm"
              title={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            >
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>{lang === 'he' ? 'עב' : 'EN'}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition group"
              title={t('cart')}
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Panel Trigger */}
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition"
              title={t('admin')}
            >
              <Lock className="h-5 w-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
