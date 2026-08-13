import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Download, ShoppingBag, Cpu, Sparkles, AlertCircle, FileCode, Plus, Minus, Monitor } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, isInCart }) {
  const [workstations, setWorkstations] = useState(1);

  useEffect(() => {
    setWorkstations(1);
  }, [product]);

  if (!product) return null;

  const {
    category,
    categoryName,
    title,
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

  // Workstations option is ONLY for Revit Plugins (category === 'plugins')
  const supportsWorkstations = !isService && category === 'plugins';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      
      {/* Modal Card Box - Fits screen width & height seamlessly */}
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-20 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Column 1: Image Header + Purchase Actions (md:col-span-5) */}
          <div className="md:col-span-5 bg-slate-950 border-b md:border-b-0 md:border-l border-slate-800/80 flex flex-col justify-between p-5 space-y-4">
            
            {/* Image Banner */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/90 border border-cyan-800 px-2.5 py-1 rounded-full">
                  {categoryName}
                </span>
                {badge && (
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                    {badge}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Workstation Control Block */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">מחיר המוצר:</span>
                {isService ? (
                  <span className="text-sm font-bold text-cyan-400">{priceLabel || 'הצעת מחיר'}</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white font-mono">{price}</span>
                    <span className="text-xs font-bold text-slate-400">{currency} {supportsWorkstations ? '/ עמדה' : ''}</span>
                  </div>
                )}
              </div>

              {/* Workstation Selector (Plugins Only) */}
              {supportsWorkstations && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                    <Monitor className="h-4 w-4 text-cyan-400" />
                    <span>עמדות:</span>
                  </div>

                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button 
                      type="button"
                      onClick={() => setWorkstations(Math.max(1, workstations - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-900 text-slate-300 hover:text-white font-bold flex items-center justify-center transition"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-cyan-300 text-sm">{workstations}</span>
                    <button 
                      type="button"
                      onClick={() => setWorkstations(workstations + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-900 text-slate-300 hover:text-white font-bold flex items-center justify-center transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Total Subtotal (Plugins Only) */}
              {supportsWorkstations && (
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">סה"כ לתשלום:</span>
                  <span className="font-black text-cyan-300 font-mono text-base">{(price || 0) * workstations} {currency}</span>
                </div>
              )}
            </div>

            {/* Action Buttons inside side column */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onAddToCart(product, supportsWorkstations ? workstations : 1);
                  onClose();
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold shadow-lg transition ${
                  isInCart
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>
                  {isInCart 
                    ? 'כבר בסל הקניות' 
                    : isService 
                      ? 'הוסף לבקשת הצעת מחיר' 
                      : supportsWorkstations 
                        ? `הוסף לסל (${workstations} עמדות)` 
                        : 'הוסף לסל הקניות'}
                </span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold hover:bg-slate-800 hover:text-white transition"
              >
                סגורחלון
              </button>
            </div>

          </div>

          {/* Column 2: Detailed Specs & Description (md:col-span-7) */}
          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[75vh] md:max-h-none">
            
            {/* Title & Compatibility Header */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <FileCode className="h-4 w-4 text-cyan-400" />
                  <span className="text-slate-400">סוג:</span>
                  <span className="font-bold text-slate-200 font-mono">{type}</span>
                </div>

                <div className="h-3 w-px bg-slate-800 hidden sm:block"></div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Revit:</span>
                  <div className="flex items-center gap-1">
                    {['2021', '2022', '2023', '2024', '2025'].map((ver) => {
                      const isSupported = revitVersions?.includes(ver) || revitVersions?.includes('2021-2025');
                      return (
                        <span
                          key={ver}
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
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
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">תיאור המוצר</h3>
              <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Key Features Checklist */}
            <div>
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>יכולות מרכזיות</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Requirements Footer Note */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-slate-300 flex items-center gap-2 mt-auto">
              <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{systemRequirements} • תמיכה טכנית בהתקנה כלולה</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
