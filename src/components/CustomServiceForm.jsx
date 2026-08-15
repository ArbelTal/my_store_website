import React, { useState } from 'react';
import { Wrench, Code, Layers, Box, FileSpreadsheet, MessageSquare } from 'lucide-react';

export default function CustomServiceForm({ lang, t, settings }) {
  const [serviceType, setServiceType] = useState('pyrevit');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    revitVersion: '2027',
    details: '',
  });

  const isEn = lang === 'en';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceNames = {
      pyrevit: isEn ? 'Custom pyRevit / Python Automation Development' : 'פיתוח אוטומציה / סקריפט pyRevit מותאם אישית',
      template: isEn ? 'Custom Office Revit Template' : 'בניית תבנית משרדית (Revit Template)',
      families: isEn ? 'Parametric Family Library Development' : 'פיתוח ספרית משפחות פרמטריות (Families)',
      bim: isEn ? 'BIM Modeling & CAD Conversion Services' : 'שירותי מידול BIM / המרת CAD ל-Revit'
    };

    const message = `Hello! I would like a custom quote for: ${serviceNames[serviceType]}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Revit Version: ${formData.revitVersion}
Project Details:
${formData.details}`;

    const encodedMessage = encodeURIComponent(message);
    const waNum = settings?.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = waNum 
      ? `https://wa.me/${waNum}?text=${encodedMessage}` 
      : `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="custom-service" className="py-16 md:py-24 relative overflow-hidden border-t border-cyan-500/10">
      
      {/* Background Accent */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3">
            <Wrench className="h-3.5 w-3.5" />
            <span>{isEn ? 'Custom Development' : 'התאמה אישית מלאה'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('customFormTitle')}
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto mt-3">
            {t('customFormSubtitle')}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/90 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Select Service Type */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-3">
                {t('serviceType')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                <button
                  type="button"
                  onClick={() => setServiceType('pyrevit')}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                    serviceType === 'pyrevit'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Code className="h-7 w-7 text-cyan-400 mb-2" />
                  <span className="text-xs font-bold">{isEn ? 'pyRevit Automation' : 'אוטומציית pyRevit'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('template')}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                    serviceType === 'template'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <FileSpreadsheet className="h-7 w-7 text-cyan-400 mb-2" />
                  <span className="text-xs font-bold">{isEn ? 'Office Template' : 'תבנית משרדית'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('families')}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                    serviceType === 'families'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Box className="h-7 w-7 text-cyan-400 mb-2" />
                  <span className="text-xs font-bold">{isEn ? 'Revit Families' : 'משפחות Revit'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('bim')}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                    serviceType === 'bim'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Layers className="h-7 w-7 text-cyan-400 mb-2" />
                  <span className="text-xs font-bold">{isEn ? 'BIM Modeling' : 'מידול BIM'}</span>
                </button>

              </div>
            </div>

            {/* Step 2: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('phoneWhatsapp')}</label>
                <input
                  type="tel"
                  required
                  placeholder="+1-555-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('emailAddress')}</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Step 3: Project Details */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">{isEn ? 'Project Details & Specifications *' : 'תאור הפרויקט / הדרישות *'}</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Revit Version:</span>
                  <select
                    value={formData.revitVersion}
                    onChange={(e) => setFormData({ ...formData, revitVersion: e.target.value })}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>
              
              <textarea
                required
                rows={4}
                placeholder={isEn ? "Describe your manual task to automate, requested template specifications, or family details..." : "תאר את הפעולה הידנית שברצונך לאוטומט, סוג התבנית המבוקשת או מפרט המשפחה..."}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3.5 text-sm focus:outline-none focus:border-cyan-500 transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                {isEn ? '* Inquiry will be sent directly via WhatsApp for quick response' : '* הפנייה תשלח ישירות ל-WhatsApp לקבלת מענה מהיר'}
              </span>
              
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t('submitRequestWhatsApp')}</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
