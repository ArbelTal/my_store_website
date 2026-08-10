import React from 'react';
import { Mail, Phone, MessageSquare, MapPin, ExternalLink, Code, Layers, Box, Cpu } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="relative bg-slate-950 border-t border-cyan-500/15 pt-16 pb-12 overflow-hidden text-slate-400">
      
      {/* Subtle Background Watermark */}
      <div className="absolute right-0 bottom-0 opacity-[0.06] pointer-events-none select-none max-w-sm hidden md:block">
        <img src="/watermark.png" alt="Footer Logo Watermark" className="w-80 h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Revit Tools Logo" className="h-10 w-auto" />
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-wide">
                  REVIT<span className="text-cyan-400">TOOLS</span>
                </span>
                <p className="text-[10px] text-cyan-300/70 font-mono">PLUGINS & BIM SERVICES</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              הפתרון המקיף לתוספי רוויט, אוטומציות pyRevit, תבניות משרדיות תקניות, משפחות פרמטריות ושירותי מידול BIM מותאמים אישית.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">מוצרים ואוטומציות</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onSelectCategory('plugins')} className="hover:text-cyan-400 transition">
                  תוספי Revit (Add-ins)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pyrevit')} className="hover:text-cyan-400 transition">
                  אוטומציות pyRevit
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('templates-families')} className="hover:text-cyan-400 transition">
                  תבניות משרדיות ומשפחות
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('services')} className="hover:text-cyan-400 transition">
                  שירותי מידול BIM
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Professional Services */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">שירותים מותאמים</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#custom-service" className="hover:text-cyan-400 transition">פיתוח אוטומציה מותאמת אישית</a></li>
              <li><a href="#custom-service" className="hover:text-cyan-400 transition">בניית תבנית רוויט משרדית</a></li>
              <li><a href="#custom-service" className="hover:text-cyan-400 transition">פיתוח ספריות משפחות (Families)</a></li>
              <li><a href="#custom-service" className="hover:text-cyan-400 transition">שירותי מידול אדריכלי ו-MEP</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">צור קשר</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>פנייה ישירה ב-WhatsApp</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>contact@revit-tools.co.il</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>ישראל</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Revit Tools & BIM Services. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition">תנאי שימוש</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition">מדיניות פרטיות</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
