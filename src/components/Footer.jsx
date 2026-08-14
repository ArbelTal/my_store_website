import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer({ lang, t }) {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
          
          {/* Brand Col */}
          <div className="space-y-3">
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

          {/* Contact Details Col */}
          <div className="space-y-3 md:text-right">
            <h4 className="font-bold text-white text-sm tracking-wide">{isEn ? 'Contact Us' : 'יצירת קשר'}</h4>
            <div className="flex flex-col space-y-2.5">
              
              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/972528698705"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition group"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-xs font-bold">{isEn ? 'Phone / WhatsApp:' : 'טלפון / WhatsApp:'} 052-8698705</span>
              </a>

              {/* Email */}
              <a
                href="mailto:rbell.t@gmail.com"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition group"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-xs font-bold">{isEn ? 'Email:' : 'אימייל:'} rbell.t@gmail.com</span>
              </a>

            </div>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {t('rightsReserved', { year: new Date().getFullYear() })}
          </div>
        </div>

      </div>
    </footer>
  );
}
