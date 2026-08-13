import React from 'react';
import { ShoppingBag, Search, Wrench, Sparkles, Layers, Box, Code, Lock } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, activeCategory, onSelectCategory, searchQuery, setSearchQuery, onOpenAdmin }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/15 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => onSelectCategory('all')}>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex items-center gap-3 bg-slate-900 border border-cyan-500/30 px-3.5 py-2 rounded-xl">
                <img 
                  src="/logo.png" 
                  alt="Revit Tools Logo" 
                  className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]" 
                />
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-lg text-white tracking-wide leading-tight">
                    REVIT<span className="text-cyan-400">TOOLS</span>
                  </span>
                  <span className="text-[10px] text-cyan-300/70 font-mono tracking-wider">
                    PLUGINS & BIM SERVICES
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              הכל
            </button>
            <button
              onClick={() => onSelectCategory('plugins')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'plugins'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              תוספי Revit
            </button>
            <button
              onClick={() => onSelectCategory('pyrevit')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'pyrevit'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              אוטומציות pyRevit
            </button>
            <button
              onClick={() => onSelectCategory('templates-families')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'templates-families'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              תבניות ומשפחות
            </button>
            <button
              onClick={() => onSelectCategory('services')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'services'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              שירותים מקצועיים
            </button>
          </nav>

          {/* Quick Search & Cart Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Search Input */}
            <div className="relative hidden lg:block w-48 xl:w-64">
              <input
                type="text"
                placeholder="חפש תוסף או סקריפט..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 rounded-full py-2 pr-9 pl-4 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition group"
              title="עגלת קניות ובקשת הצעת מחיר"
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
              title="ניהול חנות (מנהל)"
            >
              <Lock className="h-5 w-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
