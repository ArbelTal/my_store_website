import React from 'react';
import { Search, LayoutGrid } from 'lucide-react';

export default function CategoryFilter({ lang, t, activeCategory, onSelectCategory, searchQuery, setSearchQuery, totalResults }) {
  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <LayoutGrid className="h-7 w-7 text-cyan-400" />
            <span>{lang === 'he' ? 'קטלוג תוספים, אוטומציות ושירותים' : 'Plugins, Automations & Services Catalog'}</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {lang === 'he' ? 'חפש לפי תכונה, גרסת רוויט או סוג כלי' : 'Search by feature, Revit version, or tool type'}
          </p>
        </div>

        {/* Search Bar Mobile/Desktop */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition shadow-inner"
          />
          <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Results Count indicator */}
      <div className="mt-4 text-xs text-slate-400 font-mono flex items-center justify-between border-t border-slate-900 pt-3">
        <span>{t('showingResults', { count: totalResults })}</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-cyan-400 hover:underline"
          >
            {t('resetFilters')}
          </button>
        )}
      </div>

    </div>
  );
}
