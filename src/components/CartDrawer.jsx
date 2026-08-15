import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageSquare } from 'lucide-react';

export default function CartDrawer({ lang, t, isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart, settings }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  if (!isOpen) return null;

  const isEn = lang === 'en';

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
        const itemTitle = isEn && item.titleEn ? item.titleEn : item.title;
        if (item.isService) {
          return `${idx + 1}. ${itemTitle} (${t('customQuote')})`;
        }
        const isPlugin = item.category === 'plugins';
        if (isPlugin) {
          const qty = item.quantity || 1;
          const itemTotal = (item.price || 0) * qty;
          return `${idx + 1}. ${itemTitle} - ${qty} ${t('workstations')} (${item.price} ₪ x ${qty} = ${itemTotal} ₪)`;
        } else {
          return `${idx + 1}. ${itemTitle} (${item.price} ₪)`;
        }
      })
      .join('\n');

    const message = isEn ? `Hello! I would like to order the following items from the store:

${itemsList}

${totalFixedPrice > 0 ? `Total Products Subtotal: ${totalFixedPrice} ₪` : ''}

Customer Details:
Name: ${customerInfo.name || 'N/A'}
Phone: ${customerInfo.phone || 'N/A'}
Email: ${customerInfo.email || 'N/A'}
Notes: ${customerInfo.notes || 'None'}` : `שלום! אני מעוניין להזמין את המוצרים/השירותים הבאים מהאתר:

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className={`fixed inset-y-0 ${isEn ? 'right-0 pr-0 sm:pr-10' : 'left-0 pl-0 sm:pl-10'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-cyan-500/20 shadow-2xl flex flex-col transition-colors">
          
          {/* Cart Drawer Header */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">{t('cartTitle')}</h2>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{t('cartCountItems', { count: cartItems.length })}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-slate-400 dark:text-slate-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30 text-cyan-500 dark:text-cyan-400" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-400">{t('cartEmpty')}</p>
                <p className="text-xs mt-1 text-slate-500 dark:text-slate-600">{t('cartEmptySub')}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span>{t('selectedItems')}</span>
                  <button onClick={onClearCart} className="text-cyan-600 dark:text-cyan-400 hover:underline text-[11px]">
                    {t('clearCart')}
                  </button>
                </div>

                {cartItems.map((item) => {
                  const isPlugin = !item.isService && item.category === 'plugins';
                  const qty = isPlugin ? (item.quantity || 1) : 1;
                  const itemSubtotal = (item.price || 0) * qty;
                  const itemTitle = isEn && item.titleEn ? item.titleEn : item.title;
                  const categoryName = isEn && item.categoryNameEn ? item.categoryNameEn : item.categoryName;

                  return (
                    <div key={item.id} className="flex flex-col p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 gap-3 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <img src={item.image} alt={itemTitle} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{itemTitle}</h4>
                          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">{categoryName}</span>
                        </div>

                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price & Workstation Controls (ONLY FOR REVIT PLUGINS) */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        {isPlugin ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{t('workstations')}:</span>
                            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 shadow-sm">
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty - 1)}
                                className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold transition"
                              >
                                -
                              </button>
                              <span className="w-7 text-center text-xs font-mono font-bold text-cyan-600 dark:text-cyan-300">{qty}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty + 1)}
                                className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold transition"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.isService ? t('customServiceTag') : t('singleItem')}
                          </span>
                        )}

                        <div className="text-right">
                          {item.isService ? (
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{t('customQuote')}</span>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{itemSubtotal} ₪</span>
                              {isPlugin && qty > 1 && (
                                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">({item.price} ₪ {t('perWorkstation')})</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Customer Details Form */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('customerDetailsHeader')}</h4>
                  
                  <input
                    type="text"
                    placeholder={t('fullName')}
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />

                  <input
                    type="tel"
                    placeholder={t('phoneWhatsapp')}
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />

                  <input
                    type="email"
                    placeholder={t('emailAddress')}
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Cart Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-4">
              
              {/* Total Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{t('totalForProducts')}</span>
                  <span className="font-mono text-slate-900 dark:text-white text-base font-black">{totalFixedPrice} ₪</span>
                </div>
                {hasServices && (
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400">
                    {t('includesCustomServices')}
                  </div>
                )}
              </div>

              {/* Checkout Button WhatsApp */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t('sendOrderWhatsApp')}</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
