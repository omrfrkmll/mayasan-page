import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { getCart, removeFromCart, updateCartItem } from '../services/woocommerceApi';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await getCart();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Sepet yüklenirken hata oluştu:', err);
      setError('Sepet yüklenirken bir hata oluştu.');
      // Demo sepet verisi
      setCart({
        items: [
          {
            key: '1',
            id: 1,
            name: 'Paslanmaz Çelik Levha',
            quantity: 2,
            prices: {
              price: '15000',
              currency_code: 'TRY',
            },
            images: [{ src: '/placeholder-product.jpg', alt: 'Paslanmaz Çelik Levha' }],
          },
        ],
        totals: {
          total_items: '30000',
          total_price: '30000',
          currency_code: 'TRY',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemKey) => {
    try {
      setUpdatingItem(itemKey);
      await removeFromCart(itemKey);
      await fetchCart();
    } catch (err) {
      console.error('Ürün silinirken hata oluştu:', err);
      alert('Ürün silinirken bir hata oluştu.');
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleUpdateQuantity = async (itemKey, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdatingItem(itemKey);
      await updateCartItem(itemKey, newQuantity);
      await fetchCart();
    } catch (err) {
      console.error('Miktar güncellenirken hata oluştu:', err);
      alert('Miktar güncellenirken bir hata oluştu.');
    } finally {
      setUpdatingItem(null);
    }
  };

  const formatPrice = (price, currencyCode = 'TRY') => {
    const amount = parseInt(price) / 100; // WooCommerce fiyatları cent cinsinden döner
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  if (loading) {
    return (
      <section className="py-24 sm:py-32 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Sepetim
            </span>
          </h1>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center"
          >
            <p className="text-sm text-foreground/70">{error}</p>
            <p className="text-xs text-foreground/50 mt-2">Demo verileri gösteriliyor</p>
          </motion.div>
        )}

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-foreground/30" />
            <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
            <p className="text-foreground/70 mb-8">Alışverişe başlamak için ürünlerimizi inceleyin.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold"
            >
              Ürünleri İncele
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg"
                >
                  {/* Noisy Background */}
                  <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none rounded-2xl" />

                  <div className="relative flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].src}
                          alt={item.images[0].alt || item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/30">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        {formatPrice(item.prices.price, item.prices.currency_code)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
                          disabled={updatingItem === item.key}
                          className="w-8 h-8 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
                          disabled={updatingItem === item.key}
                          className="w-8 h-8 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.key)}
                      disabled={updatingItem === item.key}
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      {updatingItem === item.key ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5 text-destructive" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Sipariş Özeti</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-foreground/70">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(cart.totals.total_items, cart.totals.currency_code)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Kargo</span>
                    <span>Hesaplanacak</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Toplam</span>
                    <span className="text-primary">
                      {formatPrice(cart.totals.total_price, cart.totals.currency_code)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                >
                  Ödemeye Geç
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <button
                  onClick={() => navigate('/products')}
                  className="w-full mt-4 py-3 text-foreground/70 hover:text-primary transition-colors text-center"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

