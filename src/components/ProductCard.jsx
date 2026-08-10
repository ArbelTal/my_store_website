import React from 'react';
import { ShoppingBag, Eye, Check, Star, Download, Cpu, Code, Layers, Box } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart, isInCart }) {
  const {
    title,
    categoryName,
    badge,
    badgeColor,
    price,
    currency,
    priceLabel,
    isService,
    revitVersions,
    shortDescription,
    image,
    tags
  } = product;

  return (
    <div className="group relative flex flex-col bg-slate-900/80 rounded-2xl border border-cyan-500/15 overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      
      {/* Thumbnail Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
          {badge && (
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border backdrop-blur-md shadow-sm ${badgeColor}`}>
              {badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/80 border border-slate-800 text-slate-300 backdrop-blur-md">
            Revit {revitVersions?.[0] ? `${revitVersions[0]}+` : '2025'}
          </span>
        </div>

        {/* Category Pill overlay bottom */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/90 border border-cyan-800/80 px-2.5 py-1 rounded-md">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Title */}
        <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-300/90 leading-relaxed mb-4 flex-1 line-clamp-3">
          {shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Row: Price & Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-auto">
          
          {/* Price */}
          <div>
            {isService ? (
              <div className="text-xs font-bold text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">
                {priceLabel || 'הצעת מחיר'}
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{price}</span>
                <span className="text-xs font-bold text-slate-400">{currency}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Quick View Button */}
            <button
              onClick={() => onQuickView(product)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              title="פרטים מלאים והתקנה"
            >
              <Eye className="h-4 w-4" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
                isInCart
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>בסל הקניות</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>{isService ? 'הוסף לבקשה' : 'הוסף לסל'}</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
