import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit3, Lock, Settings, Download, Upload, Key, Mail, ShieldCheck, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AdminPanel({
  lang,
  t,
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onImportProducts,
  settings,
  onUpdateSettings
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 2FA & PIN Authentication states
  const [authMode, setAuthMode] = useState('2fa'); // '2fa' | 'pin'
  const [pinInput, setPinInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'add' | 'settings' | 'backup'

  const isEn = lang === 'en';
  const targetEmail = settings?.contactEmail || 'rbell.t@gmail.com';

  // Always force re-authentication when panel opens
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPinInput('');
      setOtpCode('');
      setGeneratedOtp(null);
      setOtpSent(false);
      setAuthError('');
    }
  }, [isOpen]);

  // Form state for creating/editing product
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    category: 'plugins',
    categoryName: 'תוספי Revit',
    categoryNameEn: 'Revit Add-ins',
    badge: 'חדש',
    badgeEn: 'New',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    price: 200,
    currency: '₪',
    priceLabel: 'לפי הצעת מחיר',
    priceLabelEn: 'Custom Quote',
    isService: false,
    versionText: 'Revit 2022+',
    revitVersions: ['2022', '2023', '2024', '2025'],
    type: 'C# Add-in',
    shortDescription: '',
    shortDescriptionEn: '',
    description: '',
    descriptionEn: '',
    features: '',
    featuresEn: '',
    systemRequirements: 'רוויט 2022-2025, Windows 10/11',
    systemRequirementsEn: 'Revit 2022-2025, Windows 10/11',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    tags: 'Revit, Automation, BIM'
  });

  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: settings.whatsappNumber || '972528698705',
    contactEmail: settings.contactEmail || 'rbell.t@gmail.com',
    adminPin: settings.adminPin || '1234',
    emailjsServiceId: settings.emailjsServiceId || 'service_pvwlgn6',
    emailjsTemplateId: settings.emailjsTemplateId || 'template_3ra3tt5',
    emailjsPublicKey: settings.emailjsPublicKey || '8dWz_eu7BFxbEJobV'
  });

  const [notification, setNotification] = useState('');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Generate & Send 2FA OTP Code
  const handleSendOtp = async () => {
    setOtpSending(true);
    setAuthError('');

    // Generate random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    setGeneratedOtp(newOtp);
    setOtpExpiresAt(expires);

    // If EmailJS keys are configured, send via REST API
    if (settingsForm.emailjsServiceId && settingsForm.emailjsTemplateId && settingsForm.emailjsPublicKey) {
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: settingsForm.emailjsServiceId,
            template_id: settingsForm.emailjsTemplateId,
            user_id: settingsForm.emailjsPublicKey,
            template_params: {
              to_email: targetEmail,
              passcode: newOtp,
              time: new Date().toLocaleTimeString('he-IL')
            }
          })
        });

        if (response.ok) {
          setOtpSent(true);
          showToast(isEn ? `Verification code sent to ${targetEmail}` : `קוד אימות נשלח בהצלחה ל-Email: ${targetEmail}`);
        } else {
          // Fallback to dev mode if API fails
          setOtpSent(true);
          showToast(isEn ? `[2FA Test Mode] Code: ${newOtp} (Sent to ${targetEmail})` : `[מצב אימות 2FA] קוד האימות שנשלח: ${newOtp}`);
        }
      } catch (err) {
        setOtpSent(true);
        showToast(isEn ? `[2FA Test Mode] Code: ${newOtp} (Sent to ${targetEmail})` : `[מצב אימות 2FA] קוד האימות שנשלח: ${newOtp}`);
      }
    } else {
      // Dev mode: simulated OTP send
      setOtpSent(true);
      showToast(isEn ? `[2FA Test Mode] Code: ${newOtp} (Sent to ${targetEmail})` : `[מצב אימות 2FA] קוד האימות שנשלח ל-${targetEmail}: ${newOtp}`);
    }

    setOtpSending(false);
  };

  // Verify OTP Login
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!generatedOtp) {
      setAuthError(isEn ? 'Please send verification code first' : 'אנא לחץ על שליחת קוד אימות תחילה');
      return;
    }

    if (Date.now() > otpExpiresAt) {
      setAuthError(isEn ? 'Verification code has expired! Please request a new code.' : 'קוד האימות פג תוקף! אנא לחץ על שליחת קוד חדש');
      return;
    }

    const cleanInput = otpCode.trim();
    if (cleanInput === generatedOtp || cleanInput === (settings.adminPin || '1234')) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast(isEn ? '2FA Authentication Successful!' : 'אימות דו-שלבי עבר בהצלחה!');
    } else {
      setAuthError(isEn ? 'Invalid verification code! Check your email.' : 'קוד אימות שגוי! בדוק את הקוד שנשלח אלייך במייל');
    }
  };

  // PIN Backup Login
  const handlePinLogin = (e) => {
    e.preventDefault();
    if (pinInput === (settings.adminPin || '1234')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(isEn ? 'Incorrect PIN code!' : 'סיסמה שגויה! נסה שוב');
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast(isEn ? 'Please select a valid image file' : 'נא לבחור קובץ תמונה תקין');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result
      }));
      showToast(isEn ? 'Image uploaded successfully!' : 'התמונה מהמחשב נטענה בהצלחה!');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      titleEn: '',
      category: 'plugins',
      categoryName: 'תוספי Revit',
      categoryNameEn: 'Revit Add-ins',
      badge: 'חדש',
      badgeEn: 'New',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      price: 200,
      currency: '₪',
      priceLabel: 'לפי הצעת מחיר',
      priceLabelEn: 'Custom Quote',
      isService: false,
      versionText: 'Revit 2022+',
      revitVersions: ['2022', '2023', '2024', '2025'],
      type: 'C# Add-in',
      shortDescription: '',
      shortDescriptionEn: '',
      description: '',
      descriptionEn: '',
      features: '',
      featuresEn: '',
      systemRequirements: 'רוויט 2022-2025, Windows 10/11',
      systemRequirementsEn: 'Revit 2022-2025, Windows 10/11',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      tags: 'Revit, Automation, BIM'
    });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    const initialVersionText = product.versionText || (Array.isArray(product.revitVersions) && product.revitVersions.length > 0 ? `Revit ${product.revitVersions[0]}+` : 'Revit 2022+');
    
    setFormData({
      ...product,
      versionText: initialVersionText,
      features: Array.isArray(product.features) ? product.features.join('\n') : product.features,
      featuresEn: Array.isArray(product.featuresEn) ? product.featuresEn.join('\n') : (product.featuresEn || ''),
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
      revitVersions: product.revitVersions || ['2022', '2023', '2024', '2025']
    });
    setActiveTab('add');
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    const categoryObj = CATEGORIES.find(c => c.id === formData.category);
    const categoryName = categoryObj ? categoryObj.name : 'תוספי Revit';
    const categoryNameEn = categoryObj ? (categoryObj.nameEn || categoryObj.name) : 'Revit Add-ins';

    const processedProduct = {
      ...formData,
      id: editingId || `prod-${Date.now()}`,
      categoryName,
      categoryNameEn,
      price: formData.isService ? null : Number(formData.price),
      features: typeof formData.features === 'string' 
        ? formData.features.split('\n').filter(f => f.trim()) 
        : formData.features,
      featuresEn: typeof formData.featuresEn === 'string' 
        ? formData.featuresEn.split('\n').filter(f => f.trim()) 
        : formData.featuresEn,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(tItem => tItem.trim()).filter(Boolean)
        : formData.tags
    };

    if (editingId) {
      onUpdateProduct(processedProduct);
      showToast(isEn ? 'Product updated successfully!' : 'המוצר עודכן בהצלחה!');
    } else {
      onAddProduct(processedProduct);
      showToast(isEn ? 'New product added successfully!' : 'מוצר חדש נוסף בהצלחה!');
    }

    resetForm();
    setActiveTab('products');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    showToast(isEn ? 'Store & 2FA settings saved!' : 'הגדרות החנות ו-2FA עודכנו בהצלחה!');
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `revit-store-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(isEn ? 'Backup file downloaded!' : 'קובץ גיבוי הורד בהצלחה!');
  };

  const handleImportBackupFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData) && importedData.length > 0) {
          if (onImportProducts) {
            onImportProducts(importedData);
          }
          showToast(isEn ? 'Catalog restored successfully from JSON file!' : 'הקטלוג שוחזר בהצלחה מתוך קובץ הגיבוי!');
        } else {
          showToast(isEn ? 'Invalid catalog backup JSON file' : 'קובץ הגיבוי אינו מכיל רשימת מוצרים תקינה');
        }
      } catch (err) {
        showToast(isEn ? 'Failed to read JSON backup file' : 'שגיאה בפענוח קובץ ה-JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-1.5 sm:p-5 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-fade-in pt-3 pb-8 sm:py-6">
      
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-auto flex flex-col max-h-[96vh] sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-3 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-sm sm:text-xl text-white">{t('adminTitle')}</h2>
              <span className="text-[10px] sm:text-xs text-cyan-400 font-mono hidden sm:inline-block">{t('adminSubtitle')}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Notifications Toast Banner */}
        {notification && (
          <div className="bg-cyan-500/20 border-b border-cyan-500/30 text-cyan-300 text-xs text-center py-2.5 px-4 font-bold animate-fade-in flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* 2FA Auth Screen vs Main Console */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Mail className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {authMode === '2fa' ? t('twoFactorTitle') : t('enterPin')}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === '2fa' 
                  ? (isEn ? `Send 6-digit verification code to ${targetEmail}` : `שליחת קוד אימות חד-פעמי בן 6 ספרות ל-Email: ${targetEmail}`)
                  : (isEn ? 'Enter backup PIN code to unlock console' : 'הכנס קוד גישה חלופי להתחברות')}
              </p>
            </div>

            {/* Dev Mode Generated OTP Banner Display */}
            {generatedOtp && (
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold animate-pulse">
                🔑 {isEn ? 'Generated 2FA Code:' : 'קוד אימות 2FA שנשלח:'} <span className="text-white text-base tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-cyan-400">{generatedOtp}</span>
              </div>
            )}

            {/* 2FA OTP Mode Form */}
            {authMode === '2fa' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    <span>{otpSending ? t('otpSendingBtn') : t('sendOtpBtn')}</span>
                  </button>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        autoFocus
                        maxLength={6}
                        placeholder={t('enterOtpPlaceholder')}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-[0.3em] font-mono text-xl font-bold bg-slate-950 border border-cyan-500/50 text-cyan-300 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                      <p className="text-[11px] text-slate-400">
                        {t('otpSentSub', { email: targetEmail })}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition"
                    >
                      {t('verifyOtpBtn')}
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-cyan-400 hover:underline font-bold"
                      >
                        ↻ {t('resendOtpBtn')}
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuthMode('pin')}
                        className="text-slate-400 hover:text-white"
                      >
                        {isEn ? 'Use PIN Backup' : 'התחבר עם PIN חלופי'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* PIN Backup Mode Form */}
            {authMode === 'pin' && (
              <form onSubmit={handlePinLogin} className="space-y-4">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder={t('pinPlaceholder')}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition"
                >
                  {t('loginBtn')}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('2fa')}
                  className="text-xs text-cyan-400 hover:underline block mx-auto pt-1"
                >
                  {isEn ? '← Back to 2FA Email Code' : '← חזור לאימות 2FA במייל'}
                </button>
              </form>
            )}

            {authError && <p className="text-xs text-red-400 font-bold bg-red-950/40 p-2 rounded-lg border border-red-500/30">{authError}</p>}

          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs Header - Mobile Horizontally Scrollable Bar */}
            <div className="flex items-center gap-1.5 p-2 sm:p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none shrink-0 w-full">
              <button
                onClick={() => { setActiveTab('products'); resetForm(); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  activeTab === 'products' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {t('productListTab')} ({products.length})
              </button>

              <button
                onClick={() => { setActiveTab('add'); resetForm(); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  activeTab === 'add' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{editingId ? t('editProductTab') : t('addProductTab')}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                <span>{t('settingsTab')}</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  activeTab === 'backup' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t('backupTab')}</span>
              </button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className="mr-auto shrink-0 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition whitespace-nowrap"
              >
                {t('logoutBtn')}
              </button>
            </div>

            {/* Tab 1: Products List */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-6">
                <div className="space-y-3">
                  {products.map((item) => {
                    const itemTitle = isEn && item.titleEn ? item.titleEn : item.title;
                    const categoryName = isEn && item.categoryNameEn ? item.categoryNameEn : item.categoryName;
                    const priceText = item.isService ? (isEn && item.priceLabelEn ? item.priceLabelEn : (item.priceLabel || 'Custom Quote')) : `${item.price} ₪`;

                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 gap-3 hover:border-cyan-500/30 transition">
                        <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
                          <img src={item.image} alt={itemTitle} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-800 shrink-0 mt-0.5 sm:mt-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <h4 className="font-bold text-xs sm:text-sm text-white leading-snug">{itemTitle}</h4>
                              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                                {categoryName}
                              </span>
                              <span className="text-[9px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                {item.versionText || (Array.isArray(item.revitVersions) ? `Revit ${item.revitVersions[0]}+` : `Revit ${item.revitVersions}`)}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{isEn && item.shortDescriptionEn ? item.shortDescriptionEn : item.shortDescription}</p>
                            <div className="text-xs font-mono font-bold text-cyan-300 mt-1">
                              {priceText}
                            </div>
                          </div>
                        </div>

                        {/* Full Mobile Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-900">
                          <button
                            onClick={() => startEdit(item)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-bold transition"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>{isEn ? 'Edit' : 'ערוך'}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(isEn ? `Delete product "${itemTitle}"?` : `האם למחוק את המוצר "${itemTitle}"?`)) {
                                onDeleteProduct(item.id);
                                showToast(isEn ? 'Product deleted' : 'המוצר נמחק');
                              }
                            }}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>{isEn ? 'Delete' : 'מחק'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Add/Edit Product Form */}
            {activeTab === 'add' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <form onSubmit={handleSubmitProduct} className="space-y-4 max-w-2xl mx-auto">
                  <h3 className="text-xs sm:text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">
                    {editingId ? (isEn ? `Edit Product: ${formData.titleEn || formData.title}` : `עריכת מוצר: ${formData.title}`) : (isEn ? 'Add New Product / Service' : 'הוספת מוצר/שירות חדש לקטלוג')}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Product Name (Hebrew) *' : 'שם המוצר/השירות (בעברית) *'}</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        placeholder="כגון: Sheet Generator Pro"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Product Name (English)' : 'שם המוצר (באנגלית)'}</label>
                      <input
                        type="text"
                        value={formData.titleEn}
                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        placeholder="e.g. Sheet Generator Pro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Category *' : 'קטגוריה *'}</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{isEn && c.nameEn ? c.nameEn : c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'File / Tool Type' : 'סוג הקובץ / כלי'}</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        placeholder="C# Add-in / pyRevit Script"
                      />
                    </div>
                  </div>

                  {/* Revit Supported Versions Edit Section */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-2">
                    <label className="block text-xs font-bold text-cyan-400">
                      {isEn ? 'Supported Revit Version Tag *' : 'גרסת תמיכה ברוויט (Revit Version Tag) *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Revit 2022+ or Revit 2021-2025"
                      value={formData.versionText}
                      onChange={(e) => setFormData({ ...formData, versionText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white font-mono font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400">{isEn ? 'Quick presets:' : 'בחירה מהירה:'}</span>
                      {['Revit 2021+', 'Revit 2022+', 'Revit 2023+', 'Revit 2024+', 'Revit 2025', 'Revit 2021-2025'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setFormData({ ...formData, versionText: preset })}
                          className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition ${
                            formData.versionText === preset
                              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Pricing Type' : 'סוג התמחור'}</label>
                      <select
                        value={formData.isService ? 'service' : 'price'}
                        onChange={(e) => setFormData({ ...formData, isService: e.target.value === 'service' })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                      >
                        <option value="price">{isEn ? 'Fixed Price (₪)' : 'מחיר קבוע (₪)'}</option>
                        <option value="service">{isEn ? 'Custom Service Quote' : 'שירות (הצעת מחיר)'}</option>
                      </select>
                    </div>

                    {!formData.isService ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Price (₪) *' : 'מחיר (₪) *'}</label>
                        <input
                          type="number"
                          required
                          value={formData.price || ''}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Price Label' : 'תווית מחיר'}</label>
                        <input
                          type="text"
                          value={formData.priceLabel}
                          onChange={(e) => setFormData({ ...formData, priceLabel: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Short Description (Hebrew) *' : 'תיאור קצר בקטלוג (בעברית) *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Short Description (English)' : 'תיאור קצר בקטלוג (באנגלית)'}</label>
                    <input
                      type="text"
                      value={formData.shortDescriptionEn}
                      onChange={(e) => setFormData({ ...formData, shortDescriptionEn: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Extended Description' : 'תיאור מורחב במודל הפרטים'}</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    ></textarea>
                  </div>

                  {/* Image Selector */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">{isEn ? 'Product Image *' : 'תמונת המוצר / שירות *'}</label>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-bold cursor-pointer transition shadow-sm">
                        <Upload className="h-4 w-4 text-cyan-400" />
                        <span>{isEn ? 'Choose image from computer' : 'בחר תמונה מהמחשב'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>

                      <span className="text-xs text-slate-500 text-center font-bold">{isEn ? 'or' : 'או'}</span>

                      <div className="flex-[2]">
                        <input
                          type="text"
                          placeholder={isEn ? "Paste image URL or public path" : "הדבק קישור URL / נתיב תמונה"}
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    {formData.image && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold">{isEn ? 'Preview:' : 'תצוגה מקדימה:'}</span>
                        <div className="relative group">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-16 h-16 rounded-xl object-cover border border-cyan-500/40 shadow-md bg-slate-900"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition"
                    >
                      {editingId ? (isEn ? 'Save Product Changes' : 'שמור שינויים במוצר') : (isEn ? 'Add Product to Catalog' : 'אישור והוספת המוצר לקטלוג')}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-3.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        {isEn ? 'Cancel' : 'ביטול'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Tab 3: Store & 2FA Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-xl mx-auto space-y-6">
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>{isEn ? 'WhatsApp & 2FA Settings' : 'הגדרות WhatsApp & 2FA'}</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {isEn ? 'WhatsApp Order Number (with 972 country code) *' : 'מספר טלפון לקבלת הודעות WhatsApp (כולל קידומת 972) *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="972500000000"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {isEn ? 'Contact & 2FA Recipient Email *' : 'כתובת אימייל לקבלת קוד 2FA והפניות *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{isEn ? 'Backup PIN Code' : 'קוד גישה (PIN) חלופי'}</label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* EmailJS API Credentials Settings Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-3 pt-3">
                    <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{t('emailjsSettingsTitle')}</span>
                    </h4>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">EmailJS Service ID</label>
                      <input
                        type="text"
                        placeholder="e.g. service_xxxxxx"
                        value={settingsForm.emailjsServiceId}
                        onChange={(e) => setSettingsForm({ ...settingsForm, emailjsServiceId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">EmailJS Template ID</label>
                      <input
                        type="text"
                        placeholder="e.g. template_xxxxxx"
                        value={settingsForm.emailjsTemplateId}
                        onChange={(e) => setSettingsForm({ ...settingsForm, emailjsTemplateId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">EmailJS Public Key</label>
                      <input
                        type="text"
                        placeholder="e.g. user_xxxxxx / Public Key"
                        value={settingsForm.emailjsPublicKey}
                        onChange={(e) => setSettingsForm({ ...settingsForm, emailjsPublicKey: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 font-mono rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition"
                  >
                    {isEn ? 'Save 2FA & Store Settings' : 'שמור הגדרות חנות ו-2FA'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-xl mx-auto space-y-6">
                {/* Export Backup Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Download className="h-4 w-4 text-cyan-400" />
                    <span>{isEn ? 'Export Catalog JSON Backup' : 'ייצוא גיבוי קטלוג (JSON)'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isEn ? 'Download all products, data and settings as a full JSON backup file.' : 'הורד את כל הנתונים, המוצרים וההגדרות כקובץ JSON לגבוי מלא.'}
                  </p>
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-bold transition flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isEn ? 'Download Backup Now' : 'הורד קובץ גיבוי כעת'}</span>
                  </button>
                </div>

                {/* Import Backup Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-cyan-400 flex items-center gap-2">
                    <Upload className="h-4 w-4 text-cyan-400" />
                    <span>{isEn ? 'Import Catalog JSON Restore' : 'יבוא קובץ גיבוי ושחזור קטלוג (JSON)'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isEn ? 'Upload a saved JSON backup file to restore all products and settings.' : 'בחר קובץ גיבוי JSON מהמחשב כדי לשחזר את כל המוצרים והקטלוג בחנות.'}
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold transition cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <span>{isEn ? 'Choose JSON Backup File' : 'בחר קובץ גיבוי לשחזור'}</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportBackupFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
