# Manuel Test Senaryoları

Bu döküman, web sitesinin temel işlevselliğini ve görsel tutarlılığını doğrulamak için manuel test adımlarını içerir.

## Genel Testler

### 1. Tarayıcı Uyumluluğu

- **Amaç:** Web sitesinin farklı tarayıcılarda doğru şekilde görüntülendiğini ve çalıştığını kontrol etmek.
- **Adımlar:**
  1. Google Chrome, Mozilla Firefox ve Microsoft Edge tarayıcılarında siteyi açın.
  2. Tüm sayfaları gezinin ve görsel bir bozulma olup olmadığını kontrol edin.
  3. Temel etkileşimleri (düğme tıklama, menü açma) test edin.

### 2. Responsive Tasarım

- **Amaç:** Web sitesinin farklı ekran boyutlarında (mobil, tablet, masaüstü) düzgün çalıştığını doğrulamak.
- **Adımlar:**
  1. Tarayıcınızın geliştirici araçlarını kullanarak farklı cihaz boyutlarını simüle edin (iPhone, iPad, vb.).
  2. Sayfa düzeninin bozulmadığından, metinlerin okunabilir olduğundan ve tüm öğelerin erişilebilir olduğundan emin olun.
  3. Mobil menünün doğru şekilde açılıp kapandığını test edin.

## Bileşen Testleri

### 1. Header ve Navigasyon

- **Amaç:** Header bileşeninin ve navigasyon menüsünün doğru çalıştığını test etmek.
- **Adımlar:**
  1. Logo'ya tıklandığında ana sayfaya yönlendirme yapıldığını doğrulayın.
  2. Navigasyon linklerine tıklandığında ilgili bölümlere yumuşak bir şekilde kaydırma yapıldığını kontrol edin.
  3. Sayfa aşağı kaydırıldığında header'ın sabit kaldığını ve arka planının bulanıklaştığını gözlemleyin.

### 2. Koyu/Açık Mod Değiştirici

- **Amaç:** Tema değiştirme işlevinin doğru çalıştığını doğrulamak.
- **Adımlar:**
  1. Header'daki tema değiştirme düğmesine (Güneş/Ay ikonu) tıklayın.
  2. Sitenin renk paletinin anında koyu/açık mod arasında geçiş yaptığını doğrulayın.
  3. Sayfayı yenilediğinizde seçilen temanın korunduğunu kontrol edin (localStorage kontrolü).

### 3. Hero Section

- **Amaç:** Ana karşılama bölümünün animasyonlarını ve etkileşimlerini test etmek.
- **Adımlar:**
  1. Sayfa yüklendiğinde başlık, metin ve düğmelerin animasyonlu bir şekilde göründüğünü gözlemleyin.
  2. 

  2. CTA düğmelerine (Hemen Başla, Daha Fazla Bilgi) tıklandığında beklenen aksiyonların (örneğin, bir bölüme kaydırma veya harici bir bağlantıya gitme) gerçekleştiğini kontrol edin.
  3. Scroll göstergesinin animasyonlu olduğunu ve sayfa kaydırıldığında kaybolduğunu/göründüğünü doğrulayın.

### 4. Ürün Kartları (Product Cards)

- **Amaç:** Ürün kartlarının görsel efektlerini ve etkileşimlerini test etmek.
- **Adımlar:**
  1. Kartların sayfa yüklendiğinde veya scroll ile görünür hale geldiğinde animasyonlu bir şekilde belirdiğini gözlemleyin.
  2. Her bir kartın üzerine gelindiğinde (hover) `y` ekseninde hafifçe yukarı hareket ettiğini ve görsel efektlerin (shadow, border değişimi) tetiklendiğini doğrulayın.
  3. Kartların içeriğinin (başlık, açıklama, ikon) doğru görüntülendiğini kontrol edin.

### 5. Blog Bölümü (Blog Section)

- **Amaç:** WordPress API entegrasyonunun ve blog gönderilerinin doğru görüntülendiğini test etmek.
- **Adımlar:**
  1. Blog bölümünün yüklendiğinde WordPress API'den çekilen gönderileri (veya demo verilerini) gösterdiğini doğrulayın.
  2. Her bir blog kartının üzerine gelindiğinde (hover) `y` ekseninde hafifçe yukarı hareket ettiğini ve görsel efektlerin tetiklendiğini kontrol edin.
  3. Blog kartlarındaki başlık, özet, tarih ve yazar bilgilerinin doğru ve okunabilir olduğunu doğrulayın.
  4. API bağlantısı başarısız olduğunda demo verilerinin gösterildiğini ve hata mesajının görüntülendiğini kontrol edin.
  5. "Tüm Yazıları Görüntüle" düğmesinin beklenen sayfaya yönlendirdiğini doğrulayın.

### 6. Footer

- **Amaç:** Footer bileşeninin doğru görüntülendiğini ve bağlantıların çalıştığını test etmek.
- **Adımlar:**
  1. Footer içeriğinin (logo, açıklama, sosyal medya ikonları, linkler, telif hakkı bilgisi) doğru görüntülendiğini kontrol edin.
  2. Sosyal medya ikonlarının üzerine gelindiğinde animasyonlu tepki verdiğini ve tıklanabilir olduğunu doğrulayın.
  3. Footer linklerine tıklandığında doğru sayfalara/bölümlere yönlendirme yapıldığını kontrol edin.

## Otomatik Testler (Örnekler ve Yönergeler)

Proje, temel otomatik testler için Jest veya Cypress gibi araçlarla genişletilebilir. Aşağıda örnek bir yapı ve yönergeler bulunmaktadır.

### Jest (Unit/Component Testing)

- **Kurulum:** `pnpm add -D jest @testing-library/react @babel/preset-env @babel/preset-react`
- **Örnek Test (src/components/__tests__/Header.test.jsx):**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { ThemeProvider } from '../ThemeProvider';

describe('Header Component', () => {
  it('renders logo and navigation links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('MVP')).toBeInTheDocument();
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Hakkımızda')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    const themeToggleButton = screen.getByLabelText('Tema değiştir');
    fireEvent.click(themeToggleButton);
    // Tema değişimini doğrulamak için body class'ını kontrol edebiliriz
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    fireEvent.click(themeToggleButton);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
```

- **Yönergeler:**
  - Her bir React bileşeni için ayrı bir test dosyası oluşturun (`.test.jsx` uzantısı).
  - `react-testing-library` kullanarak bileşenleri render edin ve DOM üzerinde sorgulama yapın.
  - Kullanıcı etkileşimlerini (`fireEvent`) simüle edin.
  - `expect` ifadeleriyle beklenen sonuçları doğrulayın.

### Cypress (End-to-End Testing)

- **Kurulum:** `pnpm add -D cypress`
- **Örnek Test (cypress/e2e/spec.cy.js):**

```javascript
describe('MVP Website E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Uygulamanızın çalıştığı URL
  });

  it('should display the header and navigate to sections', () => {
    cy.get('header').should('be.visible');
    cy.contains('Ana Sayfa').click();
    cy.url().should('include', '#home');
    cy.contains('Ürünler').click();
    cy.url().should('include', '#products');
  });

  it('should toggle dark/light mode', () => {
    cy.get('html').should('have.class', 'light'); // Varsayılan tema
    cy.get('[aria-label="Tema değiştir"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[aria-label="Tema değiştir"]').click();
    cy.get('html').should('have.class', 'light');
  });

  it('should display blog posts or demo data', () => {
    cy.get('#blog').scrollIntoView();
    cy.get('#blog h2').should('contain', 'Son Blog Yazıları');
    cy.get('article').should('have.length.at.least', 1); // En az bir blog yazısı olmalı
  });
});
```

- **Yönergeler:**
  - `cypress/e2e` klasörü altında test dosyaları oluşturun.
  - `cy.visit()` ile uygulamanızın URL'sine gidin.
  - `cy.get()` ile DOM öğelerini seçin ve `should()` ile beklentileri doğrulayın.
  - Kullanıcı akışlarını (`click`, `type`, `scrollIntoView`) simüle edin.

## Performans ve Hata Ayıklama Önerileri

### Performans Optimizasyonu

- **Görsel Optimizasyonu:** Tüm görselleri WebP formatına dönüştürün ve `lazy loading` uygulayın.
- **Kod Bölümleme (Code Splitting):** React Router ile sayfa bazında kod bölümleme yaparak ilk yükleme boyutunu azaltın.
- **Önbellekleme (Caching):** API çağrıları için client-side önbellekleme stratejileri uygulayın.
- **CDN Kullanımı:** Statik dosyalarınızı (CSS, JS, görseller) bir CDN üzerinden sunarak yükleme hızını artırın.
- **Minifikasyon ve Sıkıştırma:** Build sürecinde tüm kod ve varlıkların minifiye edildiğinden ve sıkıştırıldığından emin olun (Vite bunu otomatik yapar).

### Hata Ayıklama (Debugging)

- **Tarayıcı Geliştirici Araçları:** Console, Network, Elements ve Performance sekmelerini aktif olarak kullanın.
- **React Developer Tools:** React bileşen hiyerarşisini, state ve prop'larını incelemek için tarayıcı eklentisini kullanın.
- **Hata İzleme Servisleri:** Sentry veya Bugsnag gibi araçları entegre ederek production ortamındaki hataları izleyin ve raporlayın.
- **Loglama:** Geliştirme sürecinde `console.log` kullanın, ancak production build'de bunları kaldırın veya bir loglama servisine yönlendirin.

Bu test senaryoları ve öneriler, projenin kalitesini ve sürdürülebilirliğini artırmaya yardımcı olacaktır.



## WooCommerce Entegrasyon Testleri

Bu bölüm, WooCommerce entegrasyonunun doğru çalıştığından emin olmak için manuel test senaryolarını içermektedir.

### Ürün Listeleme ve Detay Sayfaları

1.  **Ürünler Sayfasına Erişim:**
    *   Tarayıcıda `/products` adresine gidin veya navigasyon menüsünden "Ürünler" bağlantısına tıklayın.
    *   Tüm ürünlerin listelendiğini, görsellerinin, isimlerinin ve fiyatlarının doğru görüntülendiğini doğrulayın.
    *   Koyu/açık mod geçişinde ürün kartlarının stilinin doğru değiştiğini kontrol edin.

2.  **Ürün Detay Sayfasına Erişim:**
    *   Bir ürün kartına tıklayarak ürün detay sayfasına gidin.
    *   Ürün adının, açıklamasının, fiyatının, görsellerinin ve stok durumunun doğru görüntülendiğini doğrulayın.
    *   Birden fazla görsel varsa, küçük resimlere tıklayarak ana görselin değiştiğini kontrol edin.
    *   "Sepete Ekle" butonunun aktif olduğunu ve doğru çalıştığını doğrulayın.
    *   Miktar artırma/azaltma butonlarının çalıştığını ve miktarın güncellendiğini kontrol edin.

### Sepet Yönetimi

1.  **Ürün Ekleme:**
    *   Bir ürün detay sayfasından "Sepete Ekle" butonuna tıklayın.
    *   Butonun durumunun "Ekleniyor..." ve ardından "Sepete Eklendi" olarak değiştiğini doğrulayın.
    *   Navigasyon çubuğundaki sepet ikonuna tıklayarak sepet sayfasına gidin.
    *   Eklediğiniz ürünün sepet sayfasında doğru miktar ve fiyatla göründüğünü doğrulayın.

2.  **Sepet İçeriğini Güncelleme:**
    *   Sepet sayfasında bir ürünün miktarını artırın/azaltın.
    *   Miktarın ve toplam fiyatın anında güncellendiğini doğrulayın.
    *   "Ürünü Sil" butonuna tıklayarak bir ürünü sepetten çıkarın.
    *   Ürünün sepetten başarıyla kaldırıldığını ve toplam fiyatın güncellendiğini doğrulayın.

3.  **Boş Sepet Durumu:**
    *   Tüm ürünleri sepetten çıkarın.
    *   "Sepetiniz Boş" mesajının ve "Ürünleri İncele" butonunun görüntülendiğini doğrulayın.
    *   "Ürünleri İncele" butonuna tıklayarak ürünler sayfasına yönlendirildiğinizi kontrol edin.

### Ödeme Süreci

1.  **Ödeme Sayfasına Erişim:**
    *   Sepet sayfasında "Ödemeye Geç" butonuna tıklayın.
    *   Ödeme formunun yüklendiğini ve sipariş özetinin doğru görüntülendiğini doğrulayın.

2.  **Form Doldurma ve Sipariş Oluşturma:**
    *   Kişisel bilgiler ve teslimat adresi alanlarını geçerli verilerle doldurun.
    *   Ödeme yöntemini seçin.
    *   "Siparişi Tamamla" butonuna tıklayın.
    *   Siparişin başarıyla oluşturulduğunu ve sipariş onay sayfasına yönlendirildiğinizi doğrulayın.

### Sipariş Onay Sayfası

1.  **Sipariş Detaylarını Görüntüleme:**
    *   Sipariş onay sayfasında sipariş numarasının, durumunun, tarihinin ve toplam tutarın doğru görüntülendiğini doğrulayın.
    *   Teslimat adresi ve sipariş edilen ürünlerin listesinin doğru olduğunu kontrol edin.
    *   "Alışverişe Devam Et" ve "Ana Sayfaya Dön" butonlarının doğru çalıştığını doğrulayın.

### Otomatik Testler (Örnekler)

WooCommerce entegrasyonu için Jest (unit/component testleri) ve Cypress (uçtan uca testler) ile aşağıdaki gibi testler yazılabilir:

**Jest (Örnek: `woocommerceApi.test.js`)**

```javascript
import { getProducts, getProductBySlug, addToCart, getCart } from './woocommerceApi';

describe("WooCommerce API", () => {
  it("should fetch products successfully", async () => {
    const products = await getProducts();
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
  });

  it("should fetch a single product by slug", async () => {
    const product = await getProductBySlug("sample-product-slug");
    expect(product).toBeDefined();
    expect(product.slug).toBe("sample-product-slug");
  });

  // Diğer API fonksiyonları için testler...
});
```

**Cypress (Örnek: `e2e/woocommerce.cy.js`)**

```javascript
describe("WooCommerce E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("should add a product to cart and proceed to checkout", () => {
    cy.get(".product-card").first().click(); // İlk ürüne tıkla
    cy.get("button:contains(\"Sepete Ekle\")").click();
    cy.get("a[href=\"/cart\"]").click(); // Sepet sayfasına git
    cy.contains("Sepetim");
    cy.get("button:contains(\"Ödemeye Geç\")").click();
    cy.contains("Ödeme");
    // Form doldurma ve sipariş tamamlama adımları...
  });

  // Diğer e2e senaryoları...
});
```

Bu testler, WooCommerce entegrasyonunun temel işlevselliğini doğrulamak için bir başlangıç noktası sağlar. Gerçek bir projede, daha kapsamlı test senaryoları ve edge case testleri eklenmelidir.



## 3D Scroll-Driven Storytelling Modülü Testleri

Bu bölüm, ana sayfaya eklenen 3D etkileşimli hikaye anlatımı modülünün doğru çalıştığından emin olmak için manuel test senaryolarını içermektedir.

### 1. WebGL Desteği ve Fallback Mekanizması

1.  **WebGL Destekli Tarayıcıda Test:**
    *   Chrome, Firefox gibi modern bir tarayıcıda ana sayfayı açın.
    *   3D modülün sorunsuz bir şekilde yüklendiğini ve animasyonların çalıştığını doğrulayın.
    *   Tarayıcı konsolunda herhangi bir WebGL hatası olup olmadığını kontrol edin.

2.  **WebGL Desteksiz Tarayıcıda/Ortamda Test (Simülasyon):**
    *   Tarayıcınızın geliştirici araçlarından WebGL'i devre dışı bırakın (varsa) veya eski bir tarayıcı sürümü kullanın.
    *   Modülün yerine statik görsellerin veya video/GIF animasyonunun (fallback içeriği) görüntülendiğini doğrulayın.
    *   Fallback içeriğinin okunabilir ve bilgilendirici olduğunu kontrol edin.

### 2. Scroll-Driven Animasyonlar

1.  **Lazer Kesim Simülasyonu (Faz 1):**
    *   Ana sayfayı açın ve Landing Section'ın hemen altına kaydırın.
    *   Lazer Kesim Makinesi modelinin ekranda belirdiğini doğrulayın.
    *   Sayfayı yavaşça aşağı kaydırırken, lazer kesim kafasının hareket ettiğini ve sac metal üzerinde bir şekil kestiğini gözlemleyin.
    *   Eşlik eden "Lazer Kesim Kabiliyetleri ve Hassasiyeti" metinlerinin görselle senkronize olarak belirdiğini kontrol edin.

2.  **Apkant Büküm Simülasyonu (Faz 2):**
    *   Lazer kesim fazı tamamlandıktan sonra kaydırmaya devam edin.
    *   Kesilen parçanın Apkant Makinesine transfer edildiğini doğrulayın.
    *   Kaydırma ile parçanın makinede bükülme işlemini gerçekleştirdiğini gözlemleyin.
    *   Büküm tamamlandıktan sonra, nihai parçanın mouse hareketlerine duyarlı 3D bir dönüş yaptığını kontrol edin (mouse'u parça üzerinde hareket ettirerek).

3.  **CNC Torna & Freze Simülasyonu (Faz 3):**
    *   Apkant büküm fazı tamamlandıktan sonra kaydırmaya devam edin.
    *   Sahnenin CNC Torna veya Freze Makinesi ile değiştiğini doğrulayın.
    *   Metal kütüğün işlenerek nihai parçaya dönüştüğünü ve talaş kaldırma animasyonunu gözlemleyin.
    *   Eşlik eden "Talaşlı İmalat Kapasitesi" metinlerinin görselle senkronize olarak belirdiğini kontrol edin.

### 3. Duyarlılık ve Performans

1.  **Farklı Ekran Boyutlarında Test:**
    *   Tarayıcınızın geliştirici araçlarını kullanarak farklı mobil ve tablet boyutlarını simüle edin.
    *   3D modülün tüm ekran boyutlarında düzgün bir şekilde görüntülendiğini ve animasyonların akıcı çalıştığını doğrulayın.
    *   Metinlerin okunabilirliğini ve düzenin bozulmadığını kontrol edin.
    *   Mobil cihazlarda mouse etkileşimi yerine cihaz oryantasyonuna dayalı minimal hareketin (varsa) çalıştığını kontrol edin.

2.  **Performans Kontrolü:**
    *   Tarayıcınızın performans monitörünü kullanarak CPU ve GPU kullanımını gözlemleyin.
    *   Animasyonlar sırasında aşırı kaynak tüketimi veya takılmalar olup olmadığını kontrol edin.
    *   Sayfa yükleme süresinin kabul edilebilir sınırlar içinde olduğunu doğrulayın.

### 4. Modülerlik Kontrolü

1.  **Modülü Devre Dışı Bırakma:**
    *   `src/config/features.js` dosyasında `storytellingModule.enabled` (veya benzeri bir bayrak) değerini `false` olarak ayarlayın.
    *   Ana sayfayı yenileyin ve 3D modülün artık görünmediğini, yerine fallback içeriğinin veya bir sonraki bölümün geldiğini doğrulayın.

Bu test senaryoları, 3D scroll-driven storytelling modülünün beklendiği gibi çalıştığından ve projenin genel kalitesine katkıda bulunduğundan emin olmak için önemlidir.
