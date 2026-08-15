import React from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryFilter({ lang, t, activeCategory, onSelectCategory, searchQuery, setSearchQuery, totalResults }) {
  const isEn = lang === 'en';

  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 transition-colors">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <LayoutGrid className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-500 dark:text-cyan-400" />
            <span>{isEn ? 'Plugins, Automations & Services Catalog' : 'קטלוג תוספים, אוטומציות ושירותים'}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            {isEn ? 'Filter by category, search by tool name or feature' : 'סנן לפי קטגוריה או חפש לפי תכונה, גרסת רוויט וסוג כלי'}
          </p>
        </div>

        {/* Search Bar Mobile/Desktop */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 rounded-xl py-2.5 sm:py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition shadow-sm"
          />
          <Search className="absolute right-3.5 top-3 sm:top-3.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Mobile & Desktop Responsive Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-900 mb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isEn && cat.nameEn ? cat.nameEn : cat.name}
          </button>
        ))}
      </div>

      {/* Results Count indicator */}
      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between pt-1">
        <span>{t('showingResults', { count: totalResults })}</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {t('resetFilters')}
          </button>
        )}
      </div>

    </div>
  );
}
