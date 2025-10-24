# Özellik Yapılandırma Rehberi

Bu rehber, projenin modüler yapısını kullanarak farklı özellikleri (e-ticaret, blog, hizmetler, 3D hikaye anlatımı vb.) nasıl etkinleştireceğinizi veya devre dışı bırakacağınızı açıklar.

Projenin `src/config/features.js` dosyasında, her bir ana özellik için bir yapılandırma nesnesi bulunur. Bu nesnelerdeki `enabled` anahtarını `true` veya `false` olarak ayarlayarak ilgili özelliği açıp kapatabilirsiniz.

## `src/config/features.js` Dosyası

```javascript
const features = {
  ecommerce: {
    enabled: true, // E-ticaret özelliklerini (ürünler, sepet, ödeme) etkinleştirir/devre dışı bırakır.
    search: true,  // Ürün arama özelliğini etkinleştirir/devre dışı bırakır.
    filters: true, // Ürün filtreleme özelliğini etkinleştirir/devre dışı bırakır.
    userProfile: true, // Kullanıcı profili ve sipariş geçmişi sayfalarını etkinleştirir/devre dışı bırakır.
    wishlist: false, // İstek listesi özelliğini etkinleştirir/devre dışı bırakır (şu an için uygulanmadı, gelecekte eklenebilir).
  },
  blog: {
    enabled: true, // Blog bölümünü etkinleştirir/devre dışı bırakır.
  },
  services: {
    enabled: true, // Hizmetler bölümünü ve detay sayfalarını etkinleştirir/devre dışı bırakır.
  },
  storytellingModule: {
    enabled: true, // Ana sayfadaki 3D scroll-driven hikaye anlatımı modülünü etkinleştirir/devre dışı bırakır.
  },
  // Gelecekte eklenebilecek diğer özellikler...
};

export default features;
```

## Özellikleri Etkinleştirme/Devre Dışı Bırakma

Bir özelliği etkinleştirmek veya devre dışı bırakmak için:

1.  `src/config/features.js` dosyasını açın.
2.  İlgili özellik nesnesini bulun (örneğin, `ecommerce` veya `storytellingModule`).
3.  `enabled` anahtarının değerini `true` (etkinleştir) veya `false` (devre dışı bırak) olarak değiştirin.
4.  Bazı özellikler, alt özelliklere sahip olabilir (örneğin, `ecommerce.search`). Bu alt özellikleri de aynı şekilde yönetebilirsiniz.
5.  Değişiklikleri kaydedin.

**Örnek:** E-ticaret özelliklerini tamamen devre dışı bırakmak için:

```javascript
  ecommerce: {
    enabled: false, // Tüm e-ticaret özellikleri devre dışı bırakıldı
    // ...
  },
```

Bu ayar ile:
*   Ürünler sayfası (`/products`) erişilemez hale gelir
*   Sepet ikonu header'dan kaldırılır
*   Ödeme ve sipariş sayfaları devre dışı kalır
*   Kullanıcı profili ve sipariş geçmişi özellikleri çalışmaz

### Örnek 2: Kullanıcı Hesap Özelliklerini Devre Dışı Bırakma

Eğer misafir kullanıcıların alışveriş yapmasını istiyorsanız ancak kullanıcı hesabı oluşturulmasını istemiyorsanız:

```javascript
ecommerce: {
  enabled: true,
  // ...
  user: {
    enabled: false, // Kullanıcı hesap özellikleri devre dışı
    registration: false,
    login: false,
    profile: false,
    orderHistory: false,
    wishlist: false,
  },
  // ...
}
```

Bu ayar ile:
*   Kullanıcı profili ikonu header'dan kaldırılır
*   Kullanıcı profili sayfası (`/profile`) erişilemez hale gelir
*   Favori ürünler özelliği çalışmaz
*   Sipariş geçmişi görüntülenemez

### Örnek 3: Favori Ürünler Özelliğini Devre Dışı Bırakma

Eğer kullanıcı hesapları aktif ancak favori ürünler özelliğini kullanmak istemiyorsanız:

```javascript
ecommerce: {
  enabled: true,
  // ...
  user: {
    enabled: true,
    // ...
    wishlist: false, // Favori ürünler devre dışı
  },
  // ...
}
```

Bu ayar ile:
*   Kullanıcı profili sayfasında "Favorilerim" sekmesi görünmez
*   Ürün detay sayfalarında "Favorilere Ekle" butonu görünmez

### Örnek 4: Ürün Arama ve Filtreleme Özelliklerini Devre Dışı Bırakma

Eğer basit bir ürün listeleme sayfası istiyorsanız:

```javascript
ecommerce: {
  enabled: true,
  products: {
    enabled: true,
    search: false, // Ürün arama devre dışı
    filters: false, // Filtreleme devre dışı
    sorting: false, // Sıralama devre dışı
  },
  // ...
}
```

Bu ayar ile:
*   Ürünler sayfasında arama kutusu görünmez
*   Kategori ve fiyat filtreleri görünmez
*   Sıralama seçenekleri görünmez

## Yardımcı Fonksiyonlar

`src/config/features.js` dosyası, özelliklerin durumunu kontrol etmek için yardımcı fonksiyonlar sağlar:

*   **`isFeatureEnabled(featurePath)`**: Belirli bir özelliğin etkin olup olmadığını kontrol eder.
    ```javascript
    import { isFeatureEnabled } from '../config/features';
    
    if (isFeatureEnabled('ecommerce.products.search')) {
      // Arama özelliği etkin
    }
    ```

*   **`isEcommerceEnabled()`**: E-ticaret özelliklerinin genel olarak etkin olup olmadığını kontrol eder.
    ```javascript
    import { isEcommerceEnabled } from '../config/features';
    
    if (isEcommerceEnabled()) {
      // E-ticaret özellikleri etkin
    }
    ```

*   **`isUserFeaturesEnabled()`**: Kullanıcı hesap özelliklerinin etkin olup olmadığını kontrol eder.
    ```javascript
    import { isUserFeaturesEnabled } from '../config/features';
    
    if (isUserFeaturesEnabled()) {
      // Kullanıcı hesap özellikleri etkin
    }
    ```

*   **`isProductSearchEnabled()`**: Ürün arama ve filtreleme özelliklerinin etkin olup olmadığını kontrol eder.
*   **`isWishlistEnabled()`**: Favori ürünler özelliğinin etkin olup olmadığını kontrol eder.

## Bileşenlerde Kullanım

Bileşenlerinizde özellik kontrolü yapmak için bu fonksiyonları kullanabilirsiniz:

```javascript
import { isUserFeaturesEnabled } from '../config/features';
import { useNavigate } from 'react-router-dom';

export const UserProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı özellikleri devre dışıysa ana sayfaya yönlendir
    if (!isUserFeaturesEnabled()) {
      navigate('/');
      return;
    }
  }, [navigate]);

  // ...
};
```

## Önemli Notlar

1.  **Bağımlılıklar**: Bazı özellikler diğerlerine bağımlıdır. Örneğin, `ecommerce.user.wishlist` özelliği çalışması için `ecommerce.enabled` ve `ecommerce.user.enabled` değerlerinin `true` olması gerekir.

2.  **Navigasyon**: Bir özellik devre dışı bırakıldığında, ilgili sayfa route'ları hala tanımlıdır ancak sayfa bileşenleri kullanıcıyı ana sayfaya yönlendirir.

3.  **UI Elemanları**: Devre dışı bırakılan özelliklere ait UI elemanları (butonlar, linkler, vb.) otomatik olarak gizlenir.

4.  **Performans**: Kullanmadığınız özellikleri devre dışı bırakmak, uygulamanın performansını artırmaz ancak kullanıcı deneyimini basitleştirir.

## Varsayılan Yapılandırma

Proje, varsayılan olarak tüm özelliklerin etkin olduğu bir yapılandırma ile gelir. İhtiyaçlarınıza göre `src/config/features.js` dosyasını düzenleyebilirsiniz.

---

Bu rehber, projenizin özellik yapılandırmasını yönetmenize yardımcı olacaktır. Herhangi bir sorunuz olursa, lütfen dokümantasyonu inceleyin veya destek ekibiyle iletişime geçin.

