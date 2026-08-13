import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit3, Save, Lock, Settings, Download, Upload, Check, RefreshCw, Key, ShieldCheck, PhoneCall, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  settings,
  onUpdateSettings
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'add' | 'settings' | 'backup'

  // Always force authentication when the panel opens
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPinInput('');
      setAuthError('');
    }
  }, [isOpen]);

  // Form state for creating/editing product
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'plugins',
    categoryName: 'תוספי Revit',
    badge: 'חדש',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    price: 200,
    currency: '₪',
    priceLabel: 'לפי הצעת מחיר',
    isService: false,
    versionText: 'Revit 2022+',
    revitVersions: ['2022', '2023', '2024', '2025'],
    type: 'C# Add-in',
    shortDescription: '',
    description: '',
    features: '',
    systemRequirements: 'רוויט 2022-2025, Windows 10/11',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    tags: 'Revit, Automation, BIM'
  });

  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: settings.whatsappNumber || '',
    contactEmail: settings.contactEmail || '',
    adminPin: settings.adminPin || '1234'
  });

  const [notification, setNotification] = useState('');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('נא לבחור קובץ תמונה תקין');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result
      }));
      showToast('התמונה מהמחשב נטענה בהצלחה!');
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === (settings.adminPin || '1234')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('סיסמה שגויה! נסה שוב (ברירת מחדל: 1234)');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'plugins',
      categoryName: 'תוספי Revit',
      badge: 'חדש',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      price: 200,
      currency: '₪',
      priceLabel: 'לפי הצעת מחיר',
      isService: false,
      versionText: 'Revit 2022+',
      revitVersions: ['2022', '2023', '2024', '2025'],
      type: 'C# Add-in',
      shortDescription: '',
      description: '',
      features: '',
      systemRequirements: 'רוויט 2022-2025, Windows 10/11',
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
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
      revitVersions: product.revitVersions || ['2022', '2023', '2024', '2025']
    });
    setActiveTab('add');
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    const categoryObj = CATEGORIES.find(c => c.id === formData.category);
    const categoryName = categoryObj ? categoryObj.name : 'תוספי Revit';

    const processedProduct = {
      ...formData,
      id: editingId || `prod-${Date.now()}`,
      categoryName,
      price: formData.isService ? null : Number(formData.price),
      features: typeof formData.features === 'string' 
        ? formData.features.split('\n').filter(f => f.trim()) 
        : formData.features,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags
    };

    if (editingId) {
      onUpdateProduct(processedProduct);
      showToast('המוצר עודכן בהצלחה!');
    } else {
      onAddProduct(processedProduct);
      showToast('מוצר חדש נוסף בהצלחה!');
    }

    resetForm();
    setActiveTab('products');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    showToast('הגדרות החנות עודכנו בהצלחה!');
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `revit-store-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('קובץ גיבוי הורד בהצלחה!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white">פאנל ניהול החנות (Admin Console)</h2>
              <span className="text-xs text-cyan-400 font-mono">ניהול קטלוג, מוצרים, גרסאות Revit ו-WhatsApp</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notifications Toast */}
        {notification && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 text-xs text-center py-2 font-bold animate-fade-in">
            {notification}
          </div>
        )}

        {/* Auth Screen or Main Admin Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Key className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">כניסה למערכת הניהול</h3>
              <p className="text-xs text-slate-400">הכנס את קוד הגישה (PIN) כדי לערוך את החנות</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                autoFocus
                placeholder="קוד גישה (ברירת מחדל: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500"
              />

              {authError && <p className="text-xs text-red-400 font-medium">{authError}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition"
              >
                כניסה למנגנון הניהול
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs Header */}
            <div className="flex items-center gap-2 p-3 bg-slate-950/80 border-b border-slate-800 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('products'); resetForm(); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'products' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                רשימת מוצרים ({products.length})
              </button>

              <button
                onClick={() => { setActiveTab('add'); resetForm(); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'add' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{editingId ? 'עריכת מוצר' : 'הוסף מוצר חדש'}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'settings' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                <span>הגדרות WhatsApp & PIN</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'backup' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>גיבוי ואיפוס</span>
              </button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className="mr-auto px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition"
              >
                יציאה מניהול
              </button>
            </div>

            {/* Tab 1: Products Table */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {products.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 gap-4 hover:border-cyan-500/30 transition">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{item.title}</h4>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                              {item.categoryName}
                            </span>
                            <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {item.versionText || (Array.isArray(item.revitVersions) ? `Revit ${item.revitVersions[0]}+` : `Revit ${item.revitVersions}`)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.shortDescription}</p>
                          <div className="text-xs font-mono font-bold text-slate-200 mt-1">
                            {item.isService ? 'לפי הצעת מחיר' : `${item.price} ₪`}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => startEdit(item)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-bold transition"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>ערוך</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`האם למחוק את המוצר "${item.title}"?`)) {
                              onDeleteProduct(item.id);
                              showToast('המוצר נמחק');
                            }
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>מחק</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Add/Edit Product Form */}
            {activeTab === 'add' && (
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmitProduct} className="space-y-4 max-w-2xl mx-auto">
                  <h3 className="text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">
                    {editingId ? `עריכת מוצר: ${formData.title}` : 'הוספת מוצר/שירות חדש לקטלוג'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">שם המוצר/השירות *</label>
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
                      <label className="block text-xs font-bold text-slate-300 mb-1">קטגוריה *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Revit Supported Versions Edit Section */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-2">
                    <label className="block text-xs font-bold text-cyan-400">
                      גרסת תמיכה ברוויט (Revit Version Tag) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="למשל: Revit 2022+ או Revit 2021-2025"
                      value={formData.versionText}
                      onChange={(e) => setFormData({ ...formData, versionText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white font-mono font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400">בחירה מהירה:</span>
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">סוג התמחור</label>
                      <select
                        value={formData.isService ? 'service' : 'price'}
                        onChange={(e) => setFormData({ ...formData, isService: e.target.value === 'service' })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                      >
                        <option value="price">מחיר קבוע (₪)</option>
                        <option value="service">שירות (הצעת מחיר)</option>
                      </select>
                    </div>

                    {!formData.isService ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">מחיר (₪) *</label>
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
                        <label className="block text-xs font-bold text-slate-300 mb-1">תווית מחיר</label>
                        <input
                          type="text"
                          value={formData.priceLabel}
                          onChange={(e) => setFormData({ ...formData, priceLabel: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">סוג הקובץ / כלי</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        placeholder="C# Add-in / pyRevit Script"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">תיאור קצר בקטלוג *</label>
                    <input
                      type="text"
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">תיאור מורחב במודל הפרטים</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">תכונות מרכזיות (שורה נפרדת לכל תכונה)</label>
                    <textarea
                      rows={3}
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                    ></textarea>
                  </div>

                  {/* Image Selector: File Upload + URL input + Live Preview */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">תמונת המוצר / שירות *</label>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* File Upload Input Button */}
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-bold cursor-pointer transition shadow-sm">
                        <Upload className="h-4 w-4 text-cyan-400" />
                        <span>בחר תמונה מהמחשב</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>

                      <span className="text-xs text-slate-500 text-center font-bold">או</span>

                      {/* URL input */}
                      <div className="flex-[2]">
                        <input
                          type="text"
                          placeholder="הדבק קישור URL / נתיב תמונה"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    {formData.image && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold">תצוגה מקדימה:</span>
                        <div className="relative group">
                          <img
                            src={formData.image}
                            alt="תצוגה מקדימה"
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
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-lg transition"
                    >
                      {editingId ? 'שמור שינויים במוצר' : 'אישור והוספת המוצר לקטלוג'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        ביטול
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Tab 3: Store Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto space-y-6">
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>הגדרות איש קשר ו-WhatsApp</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      מספר טלפון לקבלת הודעות WhatsApp (כולל קידומת 972) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="972500000000"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      למשל: עבור 050-1234567 רשום: 972501234567 (ללא מניפסט וללא מוקף).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">כתובת אימייל ליצירת קשר</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">שינוי קוד גישה (PIN) לניהול</label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg transition"
                  >
                    שמור הגדרות חנות
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Backup & Reset */}
            {activeTab === 'backup' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="h-4 w-4 text-cyan-400" />
                    <span>ייצוא גיבוי קטלוג (JSON)</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    הורד את כל הנתונים, המוצרים וההגדרות כקובץ JSON לגבוי מלא.
                  </p>
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-bold transition flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>הורד קובץ גיבוי כעת</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
                  <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>איפוס לברירת מחדל</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    איפוס הקטלוג חזרה לרשימת המוצרים וההגדרות המקוריות של האתר.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('האם אתה בטוח שברצונך לאפס את כל המוצרים לברירת המחדל?')) {
                        onResetProducts();
                        showToast('הנתונים אופסו לברירת המחדל');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 text-xs font-bold transition"
                  >
                    אפס קטלוג לברירת מחדל
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
