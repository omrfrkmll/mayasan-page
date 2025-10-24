import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CreditCard, MapPin, User, Mail, Phone, Check } from 'lucide-react';
import { getCart, createOrder } from '../services/woocommerceApi';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    paymentMethod: 'bacs', // Havale/EFT
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await getCart();
      
      if (!data || !data.items || data.items.length === 0) {
        navigate('/cart');
        return;
      }
      
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Sepet yüklenirken hata oluştu:', err);
      setError('Sepet yüklenirken bir hata oluştu.');
      // Demo sepet verisi
      setCart({
        items: [
          {
            id: 1,
            name: 'Paslanmaz Çelik Levha',
            quantity: 2,
            prices: {
              price: '15000',
              currency_code: 'TRY',
            },
          },
        ],
        totals: {
          total_price: '30000',
          currency_code: 'TRY',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      setSubmitting(true);
      
      const orderData = {
        payment_method: formData.paymentMethod,
        payment_method_title: formData.paymentMethod === 'bacs' ? 'Havale/EFT' : 'Kredi Kartı',
        set_paid: false,
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: 'TR',
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: 'TR',
        },
        line_items: cart.items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const { data } = await createOrder(orderData);
      
      // Sipariş başarılı, onay sayfasına yönlendir
      navigate(`/order-confirmation/${data.id}`);
    } catch (err) {
      console.error('Sipariş oluşturulurken hata oluştu:', err);
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price, currencyCode = 'TRY') => {
    const amount = parseInt(price) / 100;
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

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
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
              Ödeme
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
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Kişisel Bilgiler</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Soyad *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Teslimat Adresi</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adres *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Şehir *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Posta Kodu</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Ödeme Yöntemi</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bacs"
                    checked={formData.paymentMethod === 'bacs'}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="font-medium">Havale / EFT</div>
                    <div className="text-sm text-foreground/70">Banka hesabımıza havale yapabilirsiniz</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="font-medium">Kapıda Ödeme</div>
                    <div className="text-sm text-foreground/70">Ürün tesliminde nakit ödeme</div>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Sipariş Özeti</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cart?.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(parseInt(item.prices.price) * item.quantity, item.prices.currency_code)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border/50 mb-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-foreground/70">
                  <span>Ara Toplam</span>
                  <span>{formatPrice(cart?.totals?.total_price, cart?.totals?.currency_code)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="h-px bg-border/50" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Toplam</span>
                  <span className="text-primary">
                    {formatPrice(cart?.totals?.total_price, cart?.totals?.currency_code)}
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Siparişi Tamamla
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

