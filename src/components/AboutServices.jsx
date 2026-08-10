import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { ShieldCheck, Zap, Award, Users, Star, ArrowLeft } from 'lucide-react';

export default function AboutServices() {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-cyan-500/10 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            למה לבחור בפתרונות ה-Revit & BIM שלנו?
          </h2>
          <p className="text-slate-300 text-base">
            שילוב ייחודי של נסיון מעשי במידול אדריכלי ו-BIM יחד עם מומחיות בפיתוח תוכנה ב-C# ו-Python ל-Revit API.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-cyan-500/20 relative group hover:border-cyan-500/50 transition">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-5">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">אוטומציה המבוססת על ניסיון מהשטח</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              הכלים והאוטומציות נפתחו מתוך הבנת הקשיים והזמן המבוזבז בעבודה היומיומית בשרטוט ומידול ברוויט.
            </p>
          </div>

          <div className="bg-slate-900/80 p-8 rounded-2xl border border-cyan-500/20 relative group hover:border-cyan-500/50 transition">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">תאימות מלאה לתקן BIM ישראלי</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              כל המשפחות, התבניות המשרדיות והתוספים נבנים תוך התאמה מושלמת לדרישות הגשת היתרים והדפסה בעברית.
            </p>
          </div>

          <div className="bg-slate-900/80 p-8 rounded-2xl border border-cyan-500/20 relative group hover:border-cyan-500/50 transition">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">תמיכה טכנית והדרכה צמודה</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              אנחנו לא רק מספקים את התוסף או התבנית – אנו מלווים ומדריכים את צוות המשרד להטמעה מלאה ומהירה.
            </p>
          </div>

        </div>

        {/* Testimonials */}
        <div className="pt-10 border-t border-slate-900">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">מה אומרים הלקוחות</span>
            <h3 className="text-2xl font-extrabold text-white mt-1">משרדים ואדריכלים ממליצים</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic mb-4">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <div className="font-bold text-sm text-white">{item.name}</div>
                  <div className="text-xs text-cyan-400">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
