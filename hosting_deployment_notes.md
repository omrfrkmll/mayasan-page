# Hosting ve Deployment Stratejileri

## Deployment Platformları Karşılaştırması

### Modern Platformlar (JAMstack)
- **Vercel**: React için optimize, otomatik build, CDN, serverless functions
- **Netlify**: Continuous deployment, form handling, serverless functions
- **GitHub Pages**: Ücretsiz, statik site hosting, GitHub entegrasyonu

### Geleneksel Hosting Platformları
- **Hostinger**: Shared hosting, VPS, cPanel erişimi, WordPress hosting
- **cPanel Hosting**: FTP/SFTP erişimi, dosya yöneticisi, domain yönetimi
- **Shared Hosting**: Ekonomik, sınırlı kaynak, çoğu provider tarafından sunuluyor

## Hostinger'da React App Deployment

### Yöntem 1: Shared Hosting ile Statik Deployment
1. **Build Oluşturma**: `npm run build` komutu ile production build
2. **FTP/SFTP ile Upload**: FileZilla veya cPanel File Manager ile build klasörünü yükleme
3. **public_html Dizini**: Build içeriğini public_html veya subdomain klasörüne kopyalama
4. **.htaccess Yapılandırması**: React Router için URL rewriting

### Yöntem 2: VPS ile Node.js Deployment
1. **VPS Satın Alma**: Hostinger VPS planı (Node.js desteği için)
2. **Node.js Kurulumu**: PM2 ile process management
3. **Nginx/Apache Reverse Proxy**: Port yönlendirme ve SSL
4. **Continuous Deployment**: GitHub Actions veya webhook ile otomatik deployment

### Yöntem 3: WordPress + React Hybrid
1. **WordPress Backend**: Hostinger WordPress hosting
2. **React Frontend**: Ayrı subdomain veya klasörde build edilmiş React app
3. **API Entegrasyonu**: WordPress REST API ile veri çekme
4. **CORS Yapılandırması**: WordPress'te CORS headers ayarlama

## cPanel Deployment Adımları

### Hazırlık
1. React projesinde `package.json` içine homepage ekle: `"homepage": "https://yourdomain.com"`
2. Build oluştur: `npm run build`
3. Build klasörünü zip'le (opsiyonel, upload hızlandırma için)

### Upload ve Yapılandırma
1. **cPanel File Manager**: public_html dizinine gidin
2. **Upload**: Build klasöründeki tüm dosyaları yükleyin (index.html, static/, assets/ vb.)
3. **.htaccess Oluşturma**: React Router için URL rewriting
4. **Test**: Domain üzerinden siteyi test edin

### .htaccess Örneği (React Router için)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## WordPress + React Entegrasyon Stratejileri

### Senaryo 1: Headless CMS (Önerilen)
- **WordPress**: Backend ve admin panel (wp.yourdomain.com veya yourdomain.com/wp-admin)
- **React**: Frontend (yourdomain.com)
- **Avantajlar**: Tam kontrol, performans, modern UX
- **Dezavantajlar**: İki ayrı deployment, daha karmaşık setup

### Senaryo 2: WordPress Theme ile React
- **React**: WordPress theme içine entegre
- **Build**: React build'i theme klasörüne kopyalama
- **Avantajlar**: Tek deployment, WordPress ekosistemi
- **Dezavantajlar**: Performans sınırlamaları, karmaşık geliştirme

### Senaryo 3: Subdomain Ayrımı
- **WordPress**: blog.yourdomain.com (içerik yönetimi)
- **React**: yourdomain.com (ana site)
- **API**: WordPress REST API ile veri paylaşımı
- **Avantajlar**: Temiz ayrım, bağımsız ölçeklendirme
- **Dezavantajlar**: İki ayrı hosting/domain yönetimi

## Sürdürülebilirlik ve Bakım

### Otomatik Deployment (CI/CD)
- **GitHub Actions**: Push sonrası otomatik FTP upload
- **Webhooks**: Git push sonrası server'da otomatik pull ve build
- **FTP Deploy Action**: cPanel FTP ile otomatik deployment

### Monitoring ve Güncelleme
- **Uptime Monitoring**: UptimeRobot, Pingdom gibi servisler
- **Error Tracking**: Sentry, LogRocket gibi araçlar
- **Analytics**: Google Analytics, Plausible
- **Backup**: cPanel otomatik backup, manuel backup stratejisi

### Performans Optimizasyonu
- **CDN**: Cloudflare (ücretsiz plan mevcut)
- **Caching**: Browser caching, service workers
- **Image Optimization**: WebP formatı, lazy loading
- **Code Splitting**: React.lazy ile dinamik import

## Hostinger Özel Notlar

### Shared Hosting Sınırlamaları
- Node.js çalıştırılamaz (sadece statik build)
- Server-side rendering (SSR) desteklenmez
- Serverless functions kullanılamaz
- Çözüm: VPS planına geçiş veya statik build kullanımı

### WordPress Hosting Avantajları
- Otomatik WordPress kurulumu
- Yönetilen güvenlik ve güncellemeler
- LiteSpeed Cache desteği
- Staging environment

### VPS Avantajları
- Tam root erişimi
- Node.js ve PM2 kurulumu
- Custom server yapılandırması
- Daha yüksek performans ve kaynak

Bu notlar, projenin dokümantasyonunda detaylı bir şekilde ele alınacak ve adım adım kılavuzlar hazırlanacaktır.
