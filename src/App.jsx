import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CustomServiceForm from './components/CustomServiceForm';
import CartDrawer from './components/CartDrawer';
import AboutServices from './components/AboutServices';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { PRODUCTS as INITIAL_PRODUCTS } from './data/products';
import { translations } from './i18n/translations';

export default function App() {
  // Language state ('he' | 'en')
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('revit_store_lang') || 'he';
    } catch (e) {
      return 'he';
    }
  });

  // Sync document text direction (RTL for Hebrew, LTR for English)
  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('revit_store_lang', lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  }, [lang]);

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('revit_store_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Sync theme class on HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('revit_store_theme', theme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  }, [theme]);

  // Translation lookup helper
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.he?.[key] || key;
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(`{{${paramKey}}}`, params[paramKey]);
    });
    return text;
  };

  // Load products from localStorage or default with latest English translations merged
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('revit_store_products_v3') || localStorage.getItem('revit_store_products');
      if (!saved) return INITIAL_PRODUCTS;
      const parsed = JSON.parse(saved);
      return parsed.map((savedProd) => {
        const initialMatch = INITIAL_PRODUCTS.find((p) => p.id === savedProd.id);
        if (initialMatch) {
          return {
            ...savedProd,
            image: initialMatch.image || savedProd.image,
            titleEn: initialMatch.titleEn || savedProd.titleEn || savedProd.title,
            categoryNameEn: initialMatch.categoryNameEn || savedProd.categoryNameEn || savedProd.categoryName,
            badgeEn: initialMatch.badgeEn || savedProd.badgeEn || savedProd.badge,
            shortDescriptionEn: initialMatch.shortDescriptionEn || savedProd.shortDescriptionEn || savedProd.shortDescription,
            descriptionEn: initialMatch.descriptionEn || savedProd.descriptionEn || savedProd.description,
            featuresEn: initialMatch.featuresEn || savedProd.featuresEn || savedProd.features,
            systemRequirementsEn: initialMatch.systemRequirementsEn || savedProd.systemRequirementsEn || savedProd.systemRequirements,
            typeEn: initialMatch.typeEn || savedProd.typeEn || savedProd.type,
            priceLabelEn: initialMatch.priceLabelEn || savedProd.priceLabelEn || savedProd.priceLabel
          };
        }
        return savedProd;
      });
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Load settings from localStorage or default
  const [settings, setSettings] = useState(() => {
    const DEFAULT_SETTINGS = {
      whatsappNumber: '972528698705', 
      contactEmail: 'rbell.t@gmail.com', 
      adminPin: '1234',
      emailjsServiceId: 'service_pvwlgn6',
      emailjsTemplateId: 'template_3ra3tt5',
      emailjsPublicKey: '8dWz_eu7BFxbEJobV'
    };
    try {
      const saved = localStorage.getItem('revit_store_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Save products to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('revit_store_products_v3', JSON.stringify(products));
      localStorage.setItem('revit_store_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Save settings to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('revit_store_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const titleText = (lang === 'en' && product.titleEn ? product.titleEn : product.title).toLowerCase();
      const descText = (lang === 'en' && product.shortDescriptionEn ? product.shortDescriptionEn : product.shortDescription).toLowerCase();
      const categoryText = (lang === 'en' && product.categoryNameEn ? product.categoryNameEn : product.categoryName).toLowerCase();

      const matchesSearch =
        !q ||
        titleText.includes(q) ||
        descText.includes(q) ||
        categoryText.includes(q) ||
        (product.tags && product.tags.some((tKey) => tKey.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery, lang]);

  // Cart helper actions
  const handleAddToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity || 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Product Admin actions
  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    setCartItems(cartItems.filter(p => p.id !== productId));
  };

  const handleResetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('revit_store_products');
  };

  const handleImportProducts = (importedProducts) => {
    if (Array.isArray(importedProducts) && importedProducts.length > 0) {
      setProducts(importedProducts);
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomForm = () => {
    const el = document.getElementById('custom-service');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartItemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300 overflow-x-hidden w-full max-w-full relative">
      
      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Banner */}
      <Hero
        lang={lang}
        t={t}
        onExploreClick={scrollToCatalog}
        onRequestCustomClick={scrollToCustomForm}
      />

      {/* Category Filter & Catalog Grid */}
      <main className="flex-1 pb-20">
        <CategoryFilter
          lang={lang}
          t={t}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
              <p className="text-slate-400 text-base font-medium">{t('noResults')}</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-bold text-cyan-400 hover:underline"
              >
                {t('resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  lang={lang}
                  t={t}
                  product={product}
                  onQuickView={(p) => setSelectedProductModal(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  isInCart={cartItems.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Custom Service Request Form */}
        <CustomServiceForm lang={lang} t={t} settings={settings} />

        {/* About & Testimonials */}
        <AboutServices lang={lang} t={t} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        t={t}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Interactive Detail Modal */}
      <ProductModal
        lang={lang}
        t={t}
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        isInCart={cartItems.some((item) => item?.id === selectedProductModal?.id)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        lang={lang}
        t={t}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
      />

      {/* Admin Management Panel */}
      <AdminPanel
        lang={lang}
        t={t}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        onImportProducts={handleImportProducts}
        settings={settings}
        onUpdateSettings={setSettings}
      />

    </div>
  );
}
