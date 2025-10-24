import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { isUserFeaturesEnabled, isWishlistEnabled } from '../config/features';
import { useNavigate } from 'react-router-dom';

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kullanıcı özellikleri devre dışıysa ana sayfaya yönlendir
    if (!isUserFeaturesEnabled()) {
      navigate('/');
      return;
    }

    // Demo kullanıcı verisi
    setUser({
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      phone: '+90 555 123 45 67',
      address: 'Örnek Mah. Örnek Cad. No: 123',
      city: 'İstanbul',
      postcode: '34000',
    });
  }, [navigate]);

  const tabs = [
    { id: 'orders', label: 'Siparişlerim', icon: Package },
    ...(isWishlistEnabled() ? [{ id: 'wishlist', label: 'Favorilerim', icon: Heart }] : []),
    { id: 'profile', label: 'Profil Bilgileri', icon: User },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  if (!isUserFeaturesEnabled()) {
    return null;
  }

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Hesabım
            </span>
          </h1>
          <p className="text-lg text-foreground/70">
            Hoş geldiniz, {user?.firstName} {user?.lastName}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-foreground/70">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg min-h-[500px]">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
                  <div className="space-y-4">
                    {/* Demo sipariş verisi */}
                    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-lg">Sipariş #12345</p>
                          <p className="text-sm text-foreground/70">15 Mart 2024</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">
                          Teslim Edildi
                        </span>
                      </div>
                      <p className="text-foreground/70 mb-2">2 ürün</p>
                      <p className="text-xl font-bold text-primary">₺300.00</p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-lg">Sipariş #12344</p>
                          <p className="text-sm text-foreground/70">10 Mart 2024</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium">
                          Kargoda
                        </span>
                      </div>
                      <p className="text-foreground/70 mb-2">1 ürün</p>
                      <p className="text-xl font-bold text-primary">₺150.00</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && isWishlistEnabled() && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Favorilerim</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Demo favori ürün */}
                    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="w-full h-48 bg-muted rounded-lg mb-4" />
                      <h3 className="font-bold mb-2">Paslanmaz Çelik Levha</h3>
                      <p className="text-xl font-bold text-primary">₺150.00</p>
                      <button className="w-full mt-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profil Bilgileri</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ad</label>
                        <input
                          type="text"
                          value={user?.firstName || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Soyad</label>
                        <input
                          type="text"
                          value={user?.lastName || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">E-posta</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefon</label>
                        <input
                          type="tel"
                          value={user?.phone || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Adres</label>
                      <textarea
                        value={user?.address || ''}
                        readOnly
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Şehir</label>
                        <input
                          type="text"
                          value={user?.city || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Posta Kodu</label>
                        <input
                          type="text"
                          value={user?.postcode || ''}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-border/50"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Bilgileri Güncelle
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Ayarlar</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold mb-3">Bildirimler</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" defaultChecked />
                          <span>E-posta bildirimleri</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" defaultChecked />
                          <span>Sipariş güncellemeleri</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" />
                          <span>Promosyon ve kampanyalar</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-3">Gizlilik</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" defaultChecked />
                          <span>Profil görünürlüğü</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" defaultChecked />
                          <span>Sipariş geçmişi görünürlüğü</span>
                        </label>
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Ayarları Kaydet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

