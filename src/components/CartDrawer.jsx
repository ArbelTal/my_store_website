import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, MessageSquare, Check, ArrowRight, Plus, Minus, Monitor } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart, settings }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  if (!isOpen) return null;

  const totalFixedPrice = cartItems.reduce((acc, item) => {
    const isPlugin = !item.isService && item.category === 'plugins';
    const qty = isPlugin ? (item.quantity || 1) : 1;
    return acc + ((item.price || 0) * qty);
  }, 0);

  const hasServices = cartItems.some((item) => item.isService);

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    let itemsList = cartItems
      .map((item, idx) => {
        if (item.isService) {
          return `${idx + 1}. ${item.title} (הצעת מחיר)`;
        }
        const isPlugin = item.category === 'plugins';
        if (isPlugin) {
          const qty = item.quantity || 1;
          const itemTotal = (item.price || 0) * qty;
          return `${idx + 1}. ${item.title} - ${qty} עמדות עבודה (${item.price} ₪ x ${qty} = ${itemTotal} ₪)`;
        } else {
          return `${idx + 1}. ${item.title} (${item.price} ₪)`;
        }
      })
      .join('\n');

    const message = `שלום! אני מעוניין להזמין את המוצרים/השירותים הבאים מהאתר:

${itemsList}

${totalFixedPrice > 0 ? `סה"כ לתשלום עבור מוצרים: ${totalFixedPrice} ₪` : ''}

פרטי מזמין:
שם: ${customerInfo.name || 'לא צוין'}
טלפון: ${customerInfo.phone || 'לא צוין'}
אימייל: ${customerInfo.email || 'לא צוין'}
הערות נוספות: ${customerInfo.notes || 'אין'}`;

    const waNum = settings?.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = waNum
      ? `https://wa.me/${waNum}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-r border-cyan-500/20 shadow-2xl flex flex-col">
          
          {/* Cart Drawer Header */}
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-white">סל הקניות והצעת מחיר</h2>
                <span className="text-xs text-slate-400 font-mono">{cartItems.length} מוצרים בסל</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30 text-cyan-400" />
                <p className="text-sm font-medium">סל הקניות שלך ריק</p>
                <p className="text-xs mt-1 text-slate-600">הוסף תוספים, סקריפטים או שירותים מהקטלוג</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>פריטים שנבחרו</span>
                  <button onClick={onClearCart} className="text-cyan-400 hover:underline text-[11px]">
                    רוקן סל
                  </button>
                </div>

                {cartItems.map((item) => {
                  const isPlugin = !item.isService && item.category === 'plugins';
                  const qty = isPlugin ? (item.quantity || 1) : 1;
                  const itemSubtotal = (item.price || 0) * qty;

                  return (
                    <div key={item.id} className="flex flex-col p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-200 truncate">{item.title}</h4>
                          <span className="text-[10px] text-cyan-400 font-mono">{item.categoryName}</span>
                        </div>

                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition"
                          title="הסר מהסל"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price & Workstation Controls (ONLY FOR REVIT PLUGINS) */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                        {isPlugin ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">עמדות:</span>
                            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty - 1)}
                                className="w-6 h-6 rounded bg-slate-950 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition"
                              >
                                -
                              </button>
                              <span className="w-7 text-center text-xs font-mono font-bold text-cyan-300">{qty}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty + 1)}
                                className="w-6 h-6 rounded bg-slate-950 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            {item.isService ? 'שירות מותאם' : 'פריט יחיד'}
                          </span>
                        )}

                        <div className="text-right">
                          {item.isService ? (
                            <span className="text-xs font-bold text-cyan-400">הצעת מחיר</span>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-black text-white font-mono">{itemSubtotal} ₪</span>
                              {isPlugin && qty > 1 && (
                                <span className="text-[9px] text-slate-400 font-mono">({item.price} ₪ לעמדה)</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Customer Details Form */}
                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">פרטי מזמין / פנייה</h4>
                  
                  <input
                    type="text"
                    placeholder="שם מלא *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />

                  <input
                    type="tel"
                    placeholder="מספר טלפון / WhatsApp *"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />

                  <input
                    type="email"
                    placeholder="כתובת אימייל"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Cart Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              
              {/* Total Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>סה"כ לתשלום (עבור מוצרים):</span>
                  <span className="font-mono text-white text-base font-black">{totalFixedPrice} ₪</span>
                </div>
                {hasServices && (
                  <div className="text-[11px] text-cyan-400">
                    * הסל כולל שירותים לפי הצעת מחיר מותאמת
                  </div>
                )}
              </div>

              {/* Checkout Button WhatsApp */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition"
              >
                <MessageSquare className="h-4 w-4" />
                <span>שלח הזמנה / פנייה ב-WhatsApp</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
