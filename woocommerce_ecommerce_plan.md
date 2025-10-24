## WooCommerce E-Ticaret Entegrasyon Planı

Bu doküman, mevcut React uygulamasını bir e-ticaret platformuna dönüştürmek için WooCommerce REST API entegrasyonunu detaylandırmaktadır. Amaç, metal işleri firmasının perakende ürün satışlarını destekleyecek, modern ve kullanıcı dostu bir alışveriş deneyimi sunmaktır.

### 1. WooCommerce REST API Temelleri

WooCommerce, WordPress REST API üzerine inşa edilmiştir ve ürünler, siparişler, müşteriler ve sepet gibi e-ticaret verilerine erişim sağlar. Güvenli iletişim için OAuth 1.0a veya Basic Authentication (tüketici anahtarı ve tüketici sırrı ile) kullanılır. React uygulamasından doğrudan API çağrıları yapmak, güvenlik açıkları oluşturabileceğinden, genellikle bir proxy sunucusu veya sunucu tarafı bir katman (örneğin Node.js veya PHP) kullanılması önerilir. Ancak MVP aşamasında, güvenlik riskleri bilincinde olarak doğrudan çağrılar yapılabilir, ancak üretim ortamı için bu durum yeniden değerlendirilmelidir.

**Temel API Uç Noktaları:**

*   `/wp-json/wc/v3/products`: Ürünleri listeleme, detaylarını alma, oluşturma, güncelleme ve silme.
*   `/wp-json/wc/v3/products/categories`: Ürün kategorilerini yönetme.
*   `/wp-json/wc/v3/orders`: Siparişleri yönetme.
*   `/wp-json/wc/store/cart`: Sepet işlemleri (ürün ekleme, çıkarma, güncelleme).

### 2. E-Ticaret Yapısı ve Sayfalar

Uygulamaya aşağıdaki yeni sayfalar ve bileşenler eklenecektir:

*   **Ürünler Sayfası (`/products`)**: Tüm ürünlerin listelendiği, filtrelenebilir ve sıralanabilir bir sayfa. Her ürün için bir `ProductCard` bileşeni kullanılacak.
*   **Ürün Detay Sayfası (`/products/:slug`)**: Seçilen bir ürünün detaylı bilgilerinin (açıklama, fiyat, görseller, varyasyonlar) gösterildiği sayfa. Sepete ekleme butonu bu sayfada yer alacak.
*   **Sepet Sayfası (`/cart`)**: Kullanıcının sepete eklediği ürünleri görüntüleyebileceği, miktarları güncelleyebileceği ve ürünleri çıkarabileceği sayfa.
*   **Ödeme Sayfası (`/checkout`)**: Kullanıcının adres, ödeme bilgileri gibi detayları girerek siparişi tamamlayacağı sayfa.
*   **Sipariş Onay Sayfası (`/order-confirmation`)**: Siparişin başarıyla tamamlandığını bildiren sayfa.

### 3. Veri Yönetimi ve Durum Yönetimi

*   **Axios**: API çağrıları için kullanılacak.
*   **React Query / SWR (Opsiyonel)**: Veri önbellekleme, senkronizasyon ve sunucu durumu yönetimi için değerlendirilebilir. (MVP için başlangıçta basit `useState`/`useEffect` kullanılabilir).
*   **Context API / Redux (Opsiyonel)**: Sepet durumu gibi global durumları yönetmek için kullanılabilir. (MVP için başlangıçta `useState` ve prop drilling ile yönetilebilir).

### 4. Güvenlik ve Kimlik Doğrulama

WooCommerce REST API'ye erişim için tüketici anahtarı ve tüketici sırrı kullanılacaktır. Bu bilgiler `.env` dosyalarında saklanacak ve derleme sırasında uygulamaya dahil edilecektir. Sunucu tarafı bir proxy kullanmak, bu bilgilerin istemci tarafında açığa çıkmasını engellemek için daha güvenli bir yöntemdir, ancak MVP için doğrudan erişim sağlanacaktır.

### 5. UI/UX Geliştirmeleri

*   Mevcut tema (koyu/açık mod) ve stil (noisy blur, yuvarlatılmış köşeler) e-ticaret bileşenlerine uygulanacak.
*   Ürün kartları, sepet ve ödeme formları için modern ve minimalist tasarımlar kullanılacak.
*   Sepete ekleme, ürün miktarı güncelleme gibi işlemler için animasyonlu geri bildirimler sağlanacak.

### 6. WordPress Backend Hazırlığı

*   WooCommerce eklentisinin WordPress'e kurulması ve yapılandırılması.
*   API anahtarlarının oluşturulması (Okuma/Yazma izinleriyle).
*   Örnek ürünlerin (metal işleri ile ilgili) WooCommerce'e eklenmesi.

Bu plan doğrultusunda geliştirme adımları izlenecektir.
