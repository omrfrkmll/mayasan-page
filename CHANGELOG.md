# Değişiklik Günlüğü - MA-YA-SAN Web Sitesi

## Son Güncelleme: 14 Ekim 2025

### 🎥 Video Storytelling Modülü Eklendi

**3D objeler yerine gerçek videolar kullanılarak yeniden tasarlandı:**

- ✅ 4 adet gerçek makine videosu eklendi:
  - `cnc_laser_cut.mp4` - CNC Lazer Kesim
  - `apkant.mp4` - Apkant Büküm
  - `cnc_torna.mp4` - CNC Torna
  - `cnc_freze.mp4` - CNC Freze

- ✅ Video özellikleri:
  - Tam genişlik, monitör yüksekliğinin yarısı kadar
  - Yavaşlatılmış oynatma (playbackRate: 0.7)
  - Karartı ve noisy blur filtreleri (koyu/açık mod uyumlu)
  - Scroll-driven animasyonlar
  - Video üzerinde glassmorphism kartlar

- ✅ Bileşen: `src/components/VideoStorytellingModule.jsx`

### 🏷️ Animasyonlu Keyword Şeridi Eklendi

**Metal işleme ile ilgili keywordler ve iconlar:**

- ✅ 10 adet keyword + icon çifti
- ✅ Sağdan sola sürekli kayma animasyonu
- ✅ Lucide React iconları kullanıldı
- ✅ Koyu/açık mod uyumlu tasarım
- ✅ Bileşen: `src/components/KeywordMarquee.jsx`

### 🏢 Marka İsmi Güncellendi

**"MVP" → "MA-YA-SAN":**

- ✅ Header bileşeninde güncellendi
- ✅ Footer bileşeninde güncellendi
- ✅ Logo placeholder eklendi (Header'da `showLogo` değişkeni ile kontrol edilebilir)
- ✅ Logo kullanımı için hazır kod yapısı

### 📦 Mevcut Özellikler

#### E-ticaret (WooCommerce Entegrasyonu)
- Ürün listeleme ve detay sayfaları
- Sepet yönetimi
- Ödeme süreci
- Kullanıcı profili ve sipariş geçmişi
- Ürün arama ve filtreleme

#### Blog (WordPress Entegrasyonu)
- WordPress REST API ile blog yazıları
- Kategori filtreleme
- Arama özelliği

#### Hizmetler
- Apkant Büküm
- CNC Lazer Kesim
- Gaz Altı Kaynak
- Özel İmalat
- Detay sayfaları

#### Tema ve Tasarım
- Koyu/Açık mod desteği
- Noisy blur efektleri
- Glassmorphism kartlar
- Smooth animasyonlar (Framer Motion)
- Responsive tasarım

### 🛠️ Teknik Detaylar

**Kullanılan Teknolojiler:**
- React 19.1.0
- Vite 6.3.5
- Framer Motion (animasyonlar)
- Lucide React (iconlar)
- Tailwind CSS
- Axios (API istekleri)

**Video Formatları:**
- MP4 formatı
- H.264 codec
- Toplam boyut: ~132MB

**Performans:**
- Lazy loading
- Code splitting
- Optimized images
- Responsive videos

### 📝 Kullanım Notları

#### Logo Ekleme

Header bileşeninde logo'yu aktif etmek için:

```javascript
// src/components/Header.jsx
const showLogo = true; // false → true yapın
```

Logo dosyasını `public/logo.svg` veya `public/logo.png` olarak ekleyin.

#### Özellik Yönetimi

Özellikleri etkinleştirmek/devre dışı bırakmak için:

```javascript
// src/config/features.js
const features = {
  ecommerce: { enabled: true },
  blog: { enabled: true },
  services: { enabled: true },
  storytellingModule: { enabled: true },
};
```

### 🚀 Deployment

**Desteklenen Platformlar:**
- GitHub Pages
- Vercel
- Netlify
- Hostinger (cPanel)

Detaylı deployment talimatları için `README.md` ve `hosting_deployment_notes.md` dosyalarına bakın.

### 📚 Dokümantasyon

- `README.md` - Genel proje bilgisi ve kurulum
- `TESTING.md` - Test senaryoları
- `FEATURES_CONFIGURATION.md` - Özellik yapılandırma rehberi
- `woocommerce_setup_guide.md` - WooCommerce kurulum rehberi
- `hosting_deployment_notes.md` - Deployment rehberi

---

**Geliştirici Notları:**

Proje, metal işleme sektörüne özel olarak tasarlanmış, modern ve profesyonel bir web sitesidir. Tüm bileşenler modüler yapıda olup, kolayca özelleştirilebilir ve genişletilebilir.

