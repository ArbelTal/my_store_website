import React from 'react';
import { CATEGORIES } from '../data/products';
import { Search, Filter, Cpu, Code, Box, Layers, LayoutGrid } from 'lucide-react';

const ICON_MAP = {
  Cpu: Cpu,
  Code: Code,
  Box: Box,
  Layers: Layers,
};

export default function CategoryFilter({ activeCategory, onSelectCategory, searchQuery, setSearchQuery, totalResults }) {
  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <LayoutGrid className="h-7 w-7 text-cyan-400" />
            <span>קטלוג תוספים, אוטומציות ושירותים</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            בחר קטגוריה או חפש לפי תכונה, גרסת רוויט או סוג כלי
          </p>
        </div>

        {/* Search Bar Mobile/Desktop */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="חפש תוסף, pyRevit, משפחה או שירות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition shadow-inner"
          />
          <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2.5 pb-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon ? ICON_MAP[cat.icon] : null;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {IconComponent && <IconComponent className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count indicator */}
      <div className="mt-4 text-xs text-slate-400 font-mono flex items-center justify-between border-t border-slate-900 pt-3">
        <span>מציג {totalResults} פריטים</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-cyan-400 hover:underline"
          >
            איפוס חיפוש
          </button>
        )}
      </div>

    </div>
  );
}
