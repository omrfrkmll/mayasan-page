/**
 * E-ticaret Özellik Yapılandırması
 * 
 * Bu dosya, projedeki e-ticaret özelliklerinin etkinleştirilmesi veya devre dışı bırakılması için kullanılır.
 * Her bir özellik için `enabled` değerini `true` veya `false` olarak ayarlayabilirsiniz.
 */

export const features = {
  // WooCommerce E-ticaret Özellikleri
  ecommerce: {
    enabled: true, // Ana e-ticaret özelliklerini etkinleştir/devre dışı bırak
    products: {
      enabled: true, // Ürün listeleme ve detay sayfaları
      search: true, // Ürün arama özelliği
      filters: true, // Kategori, fiyat, vb. filtreleme
      sorting: true, // Fiyat, popülerlik vb. sıralama
    },
    cart: {
      enabled: true, // Sepet işlevselliği
      guestCheckout: true, // Misafir kullanıcı ödeme
    },
    checkout: {
      enabled: true, // Ödeme sayfası
      multiplePaymentMethods: true, // Çoklu ödeme yöntemleri
    },
    user: {
      enabled: true, // Kullanıcı hesap özellikleri
      registration: true, // Kullanıcı kaydı
      login: true, // Kullanıcı girişi
      profile: true, // Kullanıcı profili
      orderHistory: true, // Sipariş geçmişi
      wishlist: true, // Favori ürünler
    },
    reviews: {
      enabled: true, // Ürün yorumları ve değerlendirmeleri
    },
  },

  // WordPress Blog Özellikleri
  blog: {
    enabled: true, // Blog sayfası
    categories: true, // Kategori filtreleme
    search: true, // Blog yazısı arama
  },

  // Hizmetler Bölümü
  services: {
    enabled: true, // Hizmetler sayfası
    detailPages: true, // Hizmet detay sayfaları
  },

  // İletişim Özellikleri
  contact: {
    enabled: true, // İletişim sayfası
    form: true, // İletişim formu
    map: true, // Harita entegrasyonu
  },

  // Tema Özellikleri
  theme: {
    darkMode: true, // Koyu/Açık mod değiştirici
  },
};

/**
 * Bir özelliğin etkin olup olmadığını kontrol eder
 * @param {string} featurePath - Özellik yolu (örn: 'ecommerce.products.enabled')
 * @returns {boolean}
 */
export const isFeatureEnabled = (featurePath) => {
  const keys = featurePath.split('.');
  let current = features;

  for (const key of keys) {
    if (current[key] === undefined) {
      return false;
    }
    current = current[key];
  }

  return current === true;
};

/**
 * E-ticaret özelliklerinin genel olarak etkin olup olmadığını kontrol eder
 * @returns {boolean}
 */
export const isEcommerceEnabled = () => {
  return features.ecommerce.enabled;
};

/**
 * Kullanıcı hesap özelliklerinin etkin olup olmadığını kontrol eder
 * @returns {boolean}
 */
export const isUserFeaturesEnabled = () => {
  return features.ecommerce.enabled && features.ecommerce.user.enabled;
};

/**
 * Ürün arama ve filtreleme özelliklerinin etkin olup olmadığını kontrol eder
 * @returns {boolean}
 */
export const isProductSearchEnabled = () => {
  return (
    features.ecommerce.enabled &&
    features.ecommerce.products.enabled &&
    features.ecommerce.products.search
  );
};

/**
 * Favori ürünler özelliğinin etkin olup olmadığını kontrol eder
 * @returns {boolean}
 */
export const isWishlistEnabled = () => {
  return (
    features.ecommerce.enabled &&
    features.ecommerce.user.enabled &&
    features.ecommerce.user.wishlist
  );
};

