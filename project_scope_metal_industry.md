# Metal İşleri Firması Web Sitesi Proje Kapsamı ve İçerik Taslağı

Bu belge, mevcut MVP web sitesinin metal işleri sektörüne özel, çok sayfalı bir yapıya dönüştürülmesi için kapsamı ve içerik taslağını detaylandırmaktadır.

## 1. Genel Tasarım ve UX Hedefleri

-   **Sektöre Özel Estetik:** Metal işlerinin sağlamlığını, hassasiyetini ve modernliğini yansıtan bir tasarım dili.
-   **Görsel Odaklılık:** Hizmetleri ve ürünleri sergileyen yüksek kaliteli görseller ve videolar.
-   **Kullanıcı Dostu Navigasyon:** Çok sayfalı yapıda kolay ve sezgisel gezinme.
-   **Mevcut MVP Özellikleri:** Minimalist, şık tasarım, koyu/açık mod, yuvarlatılmış köşeler, hover animasyonları, paralaks efektler, yumuşak geçişler ve noisy blur efektleri korunacak ve geliştirilecektir.
-   **Performans ve Responsive:** Tüm cihazlarda yüksek performans ve uyumlu görünüm.

## 2. Sayfa Yapısı

Web sitesi aşağıdaki ana sayfalardan oluşacaktır:

1.  **Ana Sayfa (Home):**
    -   **Hero Section:** Firmanın ana sloganı, yüksek kaliteli metal işleme görseli (örn. CNC lazer kesim makinesi çalışırken), CTA düğmeleri (Hizmetlerimizi Keşfet, Teklif Al).
    -   **Hakkımızda Kısa Bilgi:** Firmanın kısa tanıtımı, misyonu ve vizyonu.
    -   **Hizmetlere Genel Bakış:** Ana hizmetlerin (Apkant, CNC Lazer Kesim, Gaz Altı Kaynak) kısa açıklamaları ve ilgili sayfalara yönlendiren kartlar/linkler.
    -   **Neden Bizi Seçmelisiniz?** (Mevcut ProductsSection benzeri): Kalite, deneyim, teknoloji, müşteri memnuniyeti gibi vurgular.
    -   **Referanslar/Projeler:** Tamamlanmış projelerden seçkiler (görsel ağırlıklı).
    -   **İletişim CTA:** Hızlı iletişim formu veya iletişim sayfasına yönlendirme.

2.  **Hakkımızda Sayfası (About Us):**
    -   **Firma Tarihçesi:** Kuruluş, gelişim süreci.
    -   **Misyon ve Vizyon:** Firmanın değerleri ve hedefleri.
    -   **Ekibimiz:** Anahtar personel tanıtımı (opsiyonel).
    -   **Kalite Politikası/Sertifikalar:** Firmanın kalite standartları ve sahip olduğu belgeler.

3.  **Hizmetlerimiz Sayfası (Services):**
    -   Tüm hizmetlerin listesi ve kısa açıklamaları.
    -   Her bir hizmet için detay sayfalarına yönlendirme.

4.  **Hizmet Detay Sayfaları (Service Detail Pages):**
    -   **Apkant Büküm:**
        -   Hizmetin tanımı ve önemi.
        -   Kullanılan makine ve teknoloji (örn. CNC Apkant).
        -   Uygulama alanları ve avantajları.
        -   Örnek görseller/videolar.
        -   Teklif alma formu veya CTA.
    -   **CNC Lazer Kesim:**
        -   Hizmetin tanımı ve hassasiyeti.
        -   Kullanılan lazer kesim makineleri ve kapasiteleri.
        -   Kesilebilen malzeme türleri ve kalınlıkları.
        -   Örnek görseller/videolar.
        -   Teklif alma formu veya CTA.
    -   **Gaz Altı Kaynak (MIG/MAG):**
        -   Hizmetin tanımı ve uygulama alanları.
        -   Kullanılan kaynak teknikleri ve ekipmanları.
        -   Kaynak yapılan malzeme türleri.
        -   Örnek görseller/videolar.
        -   Teklif alma formu veya CTA.
    -   *(Gerektiğinde diğer hizmetler için de benzer sayfalar eklenebilir.)*

5.  **Projeler/Referanslar Sayfası (Projects/References):**
    -   Tamamlanmış projelerin bir galerisi.
    -   Her proje için kısa açıklama, kullanılan hizmetler ve görseller.
    -   Filtreleme ve sıralama seçenekleri (opsiyonel).

6.  **İletişim Sayfası (Contact):**
    -   İletişim formu.
    -   Adres, telefon, e-posta bilgileri.
    -   Harita (Google Maps entegrasyonu).
    -   Çalışma saatleri.

7.  **Blog Sayfası (Blog):**
    -   Sektörel haberler, ipuçları, firma duyuruları.
    -   Mevcut BlogSection bileşeni bu sayfada kullanılacak.

## 3. İçerik ve Görsel Varlıklar İçin Notlar

-   **Görseller:** Yüksek çözünürlüklü, profesyonel çekimler tercih edilmelidir. Metal işleme süreçlerini (kesim, büküm, kaynak), bitmiş ürünleri ve makineleri gösteren görseller kullanılacaktır.
-   **Metinler:** Her hizmetin faydalarını, teknik detaylarını ve firmanın uzmanlığını vurgulayan açıklayıcı ve ikna edici metinler hazırlanacaktır.
-   **SEO:** Her sayfa için anahtar kelime araştırması yapılacak ve meta açıklamaları, başlıklar optimize edilecektir.

## 4. WordPress Backend Yapılandırması

-   **Custom Post Types (CPT):** Hizmetler ve Projeler için özel yazı tipleri oluşturulacaktır (örn. `services`, `projects`).
-   **Custom Fields:** Her CPT için gerekli özel alanlar (örn. hizmet detayları, proje görselleri, teknik özellikler) tanımlanacaktır.
-   **REST API Entegrasyonu:** Yeni CPT ve özel alanların React uygulaması tarafından erişilebilir olması sağlanacaktır.

## 5. React Frontend Geliştirme

-   **React Router DOM:** Çok sayfalı navigasyon için kullanılacaktır.
-   **Yeni Bileşenler:** Her sayfa için özel bileşenler (örn. `ServiceDetailPage`, `ProjectGallery`) oluşturulacaktır.
-   **Mevcut Bileşenlerin Uyarlanması:** `HeroSection`, `ProductCard` gibi mevcut bileşenler, yeni içerik ve görsellere göre güncellenecektir.
-   **API Çağrıları:** `wordpressApi.js` servisi, yeni CPT ve özel alanları çekecek şekilde genişletilecektir.

Bu kapsam ve taslak doğrultusunda projenin bir sonraki aşamalarına geçilecektir.
