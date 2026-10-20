import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { SpecialCatering } from './components/SpecialCatering';
import { AIPlannerSection } from './components/AIPlannerSection';
import { StatsBar } from './components/StatsBar';
import { PlanEvent } from './components/PlanEvent';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { AppDownload } from './components/AppDownload';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { KatalogPage } from './pages/KatalogPage';
import { PricingPage } from './pages/PricingPage';
import { AIPlannerPage } from './pages/AIPlannerPage';
import { DashboardPage } from './pages/DashboardPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { api, clearStoredAuth, getStoredUser } from './services/api';
import type { CartItem, MenuItem, User } from './types';

/* ───────── Scroll-to-top on route change ───────── */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* ───────── Landing Page (Home) ───────── */
interface HomeProps {
  onAddToCart: (dish: MenuItem) => void;
  onSelectPlan: (plan: string, price: number) => void;
}

const HomePage: React.FC<HomeProps> = ({ onAddToCart, onSelectPlan }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* 1. Hero Section with Hand-drawn Doodle and Floating Curved Cards */}
      <HeroSection
        onOpenOrder={() => navigate('/katalog')}
      />

    {/* 2. How It Works (4 Step Green Cards) */}
    <HowItWorks />

    {/* 3. Our Special Catering (Circular Dish Cards & Filter) */}
    <SpecialCatering onAddToCart={onAddToCart} />

    {/* 4. AI Smart Planner Core Feature (PRD V3 Integration) */}
    <AIPlannerSection />

    {/* 5. Statistics Bar (10K+ Total customers, etc.) */}
    <StatsBar />

    {/* 6. Plan Event With Us (Mosaic Collage & Book a call) */}
    <PlanEvent />

    {/* 7. Pricing & Subscription (Weekly vs Monthly) */}
    <PricingSection onSelectPlan={onSelectPlan} />

    {/* 8. Customer Thoughts (Testimonials & Star Ratings) */}
    <Testimonials />

    {/* 9. Download Mobile App Banner (Chef Oval Graphic & Live Status Mockup) */}
    <AppDownload />

    {/* 10. Newsletter Subscription Bar */}
    <Newsletter />
  </>
  );
};

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check saved session on mount
  useEffect(() => {
    const savedUser = getStoredUser();
    if (savedUser) {
      setUser(savedUser);
    }

    // Check backend health
    api
      .checkHealth()
      .then((res) => {
        if (res.data?.status === 'ONLINE' || res.success) {
          setBackendOnline(true);
        }
      })
      .catch(() => {
        // Backend might be offline currently or starting up
        setBackendOnline(false);
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    showToast(`Selamat datang, ${loggedUser.name}! (${loggedUser.role})`);
  };

  const handleLoginDemo = (role: 'CLIENT' | 'VENDOR') => {
    const demoUser: User = {
      id: role === 'VENDOR' ? 'usr_demo_vendor' : 'usr_demo_client',
      email: role === 'VENDOR' ? 'chef.haryo@kurniaboga.com' : 'sarah.wijaya@telkom.co.id',
      name: role === 'VENDOR' ? 'Chef Haryo (Kurnia Boga)' : 'Sarah Wijaya (PT Telkom Indonesia)',
      role,
      namaToko: role === 'VENDOR' ? 'Kurnia Boga Mandiri' : undefined,
      alamatToko: role === 'VENDOR' ? 'Jl. Kemang Raya No. 42, Jakarta Selatan' : undefined,
      createdAt: new Date().toISOString(),
    };
    handleAuthSuccess(demoUser);
  };

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
    showToast('Anda telah keluar akun.');
  };

  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    showToast(`✓ Ditambahkan: ${dish.name}`);
  };

  const handleUpdateQty = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleSelectPlan = (plan: string, price: number) => {
    showToast(`Paket ${plan} (Rp ${price.toLocaleString('id-ID')}) siap diproses.`);
    setIsAuthOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#f7f9ff] text-[#171c21] flex flex-col font-sans selection:bg-[#82c46c]/40 selection:text-[#125104]">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#171c21] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200 border border-white/10">
            <span className="material-symbols-outlined text-[18px] text-[#82c46c]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Navigation Bar */}
        <Navbar
          user={user}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
          backendOnline={backendOnline}
        />

        {/* Main Content Sections */}
        <main className="w-full pt-20 flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onSelectPlan={handleSelectPlan}
                />
              }
            />
            <Route
              path="/katalog"
              element={
                <KatalogPage
                  onAddToCart={handleAddToCart}
                  cartItemCount={totalCartCount}
                  cartSubtotal={cartSubtotal}
                  onOpenCart={() => setIsCartOpen(true)}
                />
              }
            />
            <Route
              path="/pricing"
              element={
                <PricingPage
                  onSelectPlan={handleSelectPlan}
                  cartSubtotal={cartSubtotal}
                  cartItemCount={totalCartCount}
                  cartItems={cartItems}
                />
              }
            />
            <Route
              path="/ai-planner"
              element={
                <AIPlannerPage
                  onSelectPlan={handleSelectPlan}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  user={user}
                  onOpenAuth={handleOpenAuth}
                  onLoginDemo={handleLoginDemo}
                />
              }
            />
            <Route
              path="/tracking"
              element={<OrderTrackingPage />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-over Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCartItems([])}
        />

        {/* Auth Modal (Login / Register Multi-role) */}
        <AuthModal
          isOpen={isAuthOpen}
          initialTab={authInitialTab}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />

      </div>
    </BrowserRouter>
  );
};

export default App;
