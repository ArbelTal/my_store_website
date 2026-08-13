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

export default function App() {
  // Load products from localStorage or default
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('revit_store_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Load settings from localStorage or default
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('revit_store_settings');
      return saved ? JSON.parse(saved) : { whatsappNumber: '', contactEmail: '', adminPin: '1234' };
    } catch (e) {
      return { whatsappNumber: '', contactEmail: '', adminPin: '1234' };
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
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        (product.categoryName && product.categoryName.toLowerCase().includes(q)) ||
        (product.tags && product.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
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
        onExploreClick={scrollToCatalog}
        onRequestCustomClick={scrollToCustomForm}
      />

      {/* Category Filter & Catalog Grid */}
      <main className="flex-1 pb-20">
        <CategoryFilter
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
              <p className="text-slate-400 text-base font-medium">לא נמצאו תוצאות המתאימות לחיפוש שלך.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-bold text-cyan-400 hover:underline"
              >
                אפס את כל המסננים
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
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
        <CustomServiceForm settings={settings} />

        {/* About & Testimonials */}
        <AboutServices />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Interactive Detail Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        isInCart={cartItems.some((item) => item?.id === selectedProductModal?.id)}
      />

      {/* Cart Drawer */}
      <CartDrawer
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
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        settings={settings}
        onUpdateSettings={setSettings}
      />

    </div>
  );
}
