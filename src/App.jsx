import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import useSmoothScroll from './hooks/useSmoothScroll';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { Moon, Sun, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { isUserFeaturesEnabled, isEcommerceEnabled } from './config/features';
import './App.css';

import { useAutoHideNavbar } from './hooks/useAutoHideNavbar';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  // useSmoothScroll(); // Smooth scroll hook'unu çağırın

  return (
    <div id="smooth-wrapper" className="flex flex-col min-h-screen">
      <div id="smooth-content" className="relative flex-grow bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <Header />
          <div className="flex items-center space-x-4">
            {isUserFeaturesEnabled() && (
              <Link to="/profile">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Profil"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            )}

            {isEcommerceEnabled() && (
              <Link to="/cart">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                    aria-label="Sepet"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            )}

            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Tema değiştir"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
        <Navbar onHeightChange={() => {}} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

