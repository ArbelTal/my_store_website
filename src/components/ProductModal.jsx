import React from 'react';
import { X, CheckCircle2, ShieldCheck, Download, ShoppingBag, Cpu, Sparkles, AlertCircle, FileCode } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, isInCart }) {
  if (!product) return null;

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
    type,
    description,
    features,
    systemRequirements,
    image,
    tags
  } = product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Card Box */}
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          {/* Badges on banner */}
          <div className="absolute bottom-6 right-6 left-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/90 border border-cyan-800 px-3 py-1 rounded-full">
                  {categoryName}
                </span>
                {badge && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
                    {badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            {/* Price Badge */}
            <div className="shrink-0 bg-slate-950/90 border border-cyan-500/30 p-3 rounded-2xl text-right">
              {isService ? (
                <span className="text-sm font-bold text-cyan-400">{priceLabel || 'הצעת מחיר'}</span>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono">{price}</span>
                  <span className="text-sm font-bold text-slate-400">{currency}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Version Compatibility & Type Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-cyan-400" />
              <span className="text-xs text-slate-400">סוג הקובץ/כלי:</span>
              <span className="text-xs font-bold text-slate-200 font-mono">{type}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">גרסאות Revit נתמכות:</span>
              <div className="flex items-center gap-1">
                {['2021', '2022', '2023', '2024', '2025'].map((ver) => {
                  const isSupported = revitVersions?.includes(ver) || revitVersions?.includes('2021-2025');
                  return (
                    <span
                      key={ver}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isSupported
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {ver}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">תיאור מורחב</h3>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Key Features Checklist */}
          <div>
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>יכולות ותכונות מרכזיות</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Requirements & Installation instructions */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>דרישות מערכת והתקנה</span>
            </h4>
            <p className="text-xs text-slate-300">
              {systemRequirements}
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            * תמיכה טכנית מלאה בהתקנה והדרכה כלולה בכל רכישה
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
            >
              סגור
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`w-1/2 sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold shadow-lg transition ${
                isInCart
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{isInCart ? 'כבר בסל הקניות' : isService ? 'הוסף לבקשת הצעת מחיר' : 'הוסף לסל הקניות'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
