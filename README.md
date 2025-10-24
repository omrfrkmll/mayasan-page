## MA-YA-SAN Web Sitesi Projesi

Bu proje, metal işleri sektörüne özel olarak tasarlanmış, modern bir WordPress backend ve React frontend entegrasyonuna sahip, çok sayfalı bir web sitesidir. Kullanıcı deneyimini artırmak amacıyla Apple tarzı kaydırmaya duyarlı video hikaye anlatımı ve modüler e-ticaret özellikleri içermektedir.

### Özellikler:

*   **Modern Tasarım ve UX:** Minimalist, şık, kullanıcı dostu arayüz. Koyu/açık mod desteği, yuvarlatılmış köşeler, hover animasyonları, paralaks efektler ve yumuşak geçişler. Görsel derinlik ve ambiyans için noisy blur efektleri.
*   **Çok Sayfalı Yapı:** Ana Sayfa, Hakkımızda, Hizmetler, Hizmet Detayları, Blog, Ürünler, Ürün Detayları, Sepet, Ödeme, Sipariş Onayı, Kullanıcı Profili ve İletişim sayfaları.
*   **Video Storytelling Modülü:** Ana sayfada, metal işleme süreçlerini (Lazer Kesim, Apkant Büküm, CNC Torna, CNC Freze) anlatan, kaydırmaya duyarlı (scroll-driven) videolar. Videolar dikey olarak ortalanmış, hafif karartı ve noisy blur filtreleri uygulanmıştır. Video üzerine yerleştirilmiş glassmorphism tarzı kartlar, asimetrik pozisyonlarda konumlandırılmıştır. Videolar sağdan sola kayma efektiyle geçiş yapmaktadır.
*   **Animasyonlu Keyword Şeridi:** Sayfanın alt kısmında, metal işleme ile ilgili anahtar kelimeler ve glassmorphism tarzı iconlar içeren, sağdan sola kayan sürekli bir animasyon şeridi.
*   **WooCommerce Entegrasyonu:** Perakende ürün satışı için WooCommerce REST API ile entegrasyon. Ürün listeleme, detay sayfaları, sepet ve ödeme süreçleri.
*   **Modüler E-ticaret Özellikleri:** Ürün arama, filtreleme, kullanıcı profili ve sipariş geçmişi gibi genel e-ticaret özellikleri, `src/config/features.js` dosyası üzerinden kolayca etkinleştirilip devre dışı bırakılabilir.
*   **Teknoloji Stack:** React 18+, Typescript, React Router, Axios, Framer Motion (animasyonlar için), Tailwind CSS (mod switcher stiline göre dinamik temalar için), Three.js (3D modeller için altyapı, şu an video ile değiştirildi), GSAP (karmaşık animasyonlar için).
*   **WordPress Entegrasyonu:** WordPress sadece içerik yönetimi (CMS) için kullanılmakta olup, içerikler WordPress REST API veya WPGraphQL (tercihe bağlı) ile React uygulamasına çekilmektedir.
*   **Responsive Tasarım:** Tüm cihazlarda sorunsuz görüntüleme ve kullanım.
*   **Performans Odaklı:** Lazy loading ve API veri çağrılarında önbellekleme ve optimizasyon.
*   **Temiz Kod:** İyi yorumlanmış, anlaşılır, temiz ve standartlara uygun kod yapısı.

### Kurulum Talimatları:

1.  **Gereksinimler:** Node.js (v18+), pnpm (veya npm/yarn), WordPress kurulumu (WooCommerce eklentisi aktif).

2.  **Proje Kurulumu:**

    ```bash
    # Proje dizinine gidin
    cd wordpress-react-mvp
    # Bağımlılıkları yükleyin
    pnpm install
    ```

3.  **Çevre Değişkenleri (`.env`):**

    `.env.example` dosyasını `production` ortamı için `.env.production` olarak kopyalayın ve aşağıdaki değişkenleri güncelleyin:

    ```env
    VITE_WORDPRESS_API_URL=https://example.com/wp-json/wp/v2
    VITE_WOOCOMMERCE_API_URL=https://example.com/wp-json/wc/v3
    VITE_WOOCOMMERCE_CONSUMER_KEY=ck_YOUR_CONSUMER_KEY
    VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_YOUR_CONSUMER_SECRET
    ```

    *   `VITE_WORDPRESS_API_URL`: WordPress sitenizin REST API URL'si.
    *   `VITE_WOOCOMMERCE_API_URL`: WooCommerce REST API URL'si.
    *   `VITE_WOOCOMMERCE_CONSUMER_KEY` ve `VITE_WOOCOMMERCE_CONSUMER_SECRET`: WooCommerce ayarlarından alacağınız API anahtarları. (`woocommerce_setup_guide.md` dosyasına bakın).

4.  **WordPress Backend Kurulumu:**

    *   WordPress kurulumunuzun ve WooCommerce eklentisinin aktif olduğundan emin olun.
    *   WooCommerce REST API'sini etkinleştirin ve yukarıdaki `.env` dosyasında kullanılacak Consumer Key ve Consumer Secret'ı oluşturun. (`woocommerce_setup_guide.md` dosyasına bakın).
    *   Gerekli sayfaları (Hizmetler, Ürünler, Blog vb.) WordPress panelinden oluşturun ve içeriklerini girin.

5.  **Geliştirme Sunucusunu Başlatma:**

    ```bash
    pnpm run dev
    ```

    Tarayıcınızda `http://localhost:5173/` adresini ziyaret edin.

6.  **Üretim İçin Derleme:**

    ```bash
    pnpm run build
    ```

    Bu komut, `dist` klasörüne optimize edilmiş üretim dosyalarını oluşturacaktır.

### Deployment Kılavuzları:

Farklı hosting platformlarında deployment adımları için `hosting_deployment_notes.md` dosyasına bakınız.

### Modüler Özellik Yapılandırması:

E-ticaret ve diğer modüler özelliklerin etkinleştirilmesi/devre dışı bırakılması için `FEATURES_CONFIGURATION.md` dosyasına bakınız.

### Test ve Kalite Kontrol:

Manuel ve otomatik test senaryoları için `TESTING.md` dosyasına bakınız.

### Logo ve Icon Güncellemesi:

*   **Logo:** Header bileşenindeki logo placeholder'ını aktif etmek için `src/components/Header.jsx` dosyasındaki `showLogo` değişkenini `true` yapın ve `public/logo.svg` (veya istediğiniz formatta) dosyanızı yerleştirin.
*   **Glassmorphism Iconlar:** `icons8.com/icons/all--style-liquid-glass` adresinden beğendiğiniz iconları indirip `public/icons` klasörüne yerleştirebilir ve `VideoStorytellingModule.jsx` ile `KeywordMarquee.jsx` dosyalarındaki icon importlarını güncelleyebilirsiniz. Mevcut durumda Lucide React iconları glassmorphism sarmalayıcı ile kullanılmaktadır.


