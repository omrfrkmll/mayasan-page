import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Phone, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { getOrderById } from '../services/woocommerceApi';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await getOrderById(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      console.error('Sipariş yüklenirken hata oluştu:', err);
      setError('Sipariş bilgileri yüklenirken bir hata oluştu.');
      // Demo sipariş verisi
      setOrder({
        id: orderId,
        number: `#${orderId}`,
        status: 'processing',
        date_created: new Date().toISOString(),
        billing: {
          first_name: 'Demo',
          last_name: 'Kullanıcı',
          email: 'demo@example.com',
          phone: '+90 555 123 45 67',
          address_1: 'Örnek Mah. Örnek Cad. No: 123',
          city: 'İstanbul',
          postcode: '34000',
        },
        line_items: [
          {
            id: 1,
            name: 'Paslanmaz Çelik Levha',
            quantity: 2,
            total: '300.00',
          },
        ],
        total: '300.00',
        currency: 'TRY',
        payment_method_title: 'Havale/EFT',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Ödeme Bekliyor',
      processing: 'İşleniyor',
      'on-hold': 'Beklemede',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
      refunded: 'İade Edildi',
      failed: 'Başarısız',
    };
    return statusMap[status] || status;
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

  if (error || !order) {
    return (
      <section className="py-24 sm:py-32 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-foreground/70 mb-4">{error || 'Sipariş bulunamadı.'}</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-green-500/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent">
              Siparişiniz Alındı!
            </span>
          </h1>
          <p className="text-lg text-foreground/70">
            Sipariş numaranız: <span className="font-bold text-primary">{order.number}</span>
          </p>
          <p className="text-sm text-foreground/60 mt-2">
            Sipariş detayları e-posta adresinize gönderildi.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Order Info */}
          <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Sipariş Bilgileri</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Sipariş Tarihi</p>
                <p className="font-medium">{formatDate(order.date_created)}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70 mb-1">Sipariş Durumu</p>
                <p className="font-medium text-primary">{getStatusText(order.status)}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70 mb-1">Ödeme Yöntemi</p>
                <p className="font-medium">{order.payment_method_title}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70 mb-1">Toplam Tutar</p>
                <p className="font-medium text-2xl text-primary">{order.total} {order.currency}</p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Teslimat Adresi</h2>
            </div>

            <div className="space-y-2">
              <p className="font-medium">
                {order.billing.first_name} {order.billing.last_name}
              </p>
              <p className="text-foreground/70">{order.billing.address_1}</p>
              <p className="text-foreground/70">
                {order.billing.city} {order.billing.postcode}
              </p>
              <div className="flex items-center gap-2 text-foreground/70 mt-4">
                <Mail className="w-4 h-4" />
                <span>{order.billing.email}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Phone className="w-4 h-4" />
                <span>{order.billing.phone}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Sipariş İçeriği</h2>

            <div className="space-y-3">
              {order.line_items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-foreground/70">Miktar: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">{item.total} {order.currency}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Toplam</span>
                <span className="text-primary">{order.total} {order.currency}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold"
          >
            Alışverişe Devam Et
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl backdrop-blur-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-colors font-bold"
          >
            Ana Sayfaya Dön
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

