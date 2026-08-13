import React from 'react';
import { CATEGORIES } from '../data/products';

export default function Footer({ lang, t, onSelectCategory }) {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Revit Tools Logo" className="h-8 w-auto object-contain" />
              <span className="font-heading font-extrabold text-lg text-white">
                REVIT<span className="text-cyan-400">TOOLS</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Categories Navigation */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{isEn ? 'Categories' : 'קטגוריות מוצרים'}</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-cyan-400 transition"
                  >
                    {isEn && cat.nameEn ? cat.nameEn : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{isEn ? 'Platform & Support' : 'פלטפורמה ותמיכה'}</h4>
            <ul className="space-y-2 text-slate-400">
              <li>{isEn ? 'Autodesk Revit API 2021-2025' : 'תמיכה בגרסאות Revit 2021-2025'}</li>
              <li>{isEn ? 'pyRevit Open Source Engine' : 'מנוע pyRevit חופשי'}</li>
              <li>{isEn ? 'Full Technical Installation Support' : 'תמיכה טכנית בהתקנה'}</li>
              <li>{isEn ? 'Custom Add-in Development' : 'פיתוח תוספים מותאם אישית'}</li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {t('rightsReserved', { year: new Date().getFullYear() })}
          </div>
          <div className="flex items-center gap-4">
            <span>Autodesk®, Revit® and pyRevit are registered trademarks.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
