# Proje Kapsamı ve Teknik Gereksinimler: Kurumsal Ana Sayfa (Apple Tarzı Scroll-Driven Görsel Şölen Modülü)

Bu doküman, mevcut web sitesi projesine entegre edilecek olan, metal işleri firmasının süreçlerini tanıtan, kaydırmaya duyarlı (Scroll-Driven) ve 3D etkileşimli hikaye anlatımı modülünün kapsamını ve teknik gereksinimlerini detaylandırmaktadır.

## A. Revizyon Alanı ve Entegrasyon

**Yerleşim:** Bu modül, mevcut ana sayfanın `Landing Section`'ının hemen altına (genellikle `About Us`/`Hizmetler` bölümünden önce) yerleştirilecektir.

**Uygulama Metodu:** Bu yoğun etkileşimli ve 3D içerik, ana sayfa düzenleyicisinin (Örn: Elementor, Divi) içerisine gömülen özel bir HTML/JS Modülü (Custom Block/Widget) olarak geliştirilecektir. Bu sayede mevcut temanın CSS/JS yapıları bozulmayacaktır. React uygulaması bağlamında, bu bir React bileşeni olarak geliştirilecek ve ana sayfa bileşenine entegre edilecektir.

**Kullanılacak Kütüphaneler:**

*   **Animasyon Akışı:** GSAP (GreenSock Animation Platform) ve özellikle ScrollTrigger (Kaydırmaya duyarlı senkronizasyon için).
*   **3D Görselleştirme:** Three.js veya benzeri optimize edilmiş bir WebGL kütüphanesi.

## B. Landing Section Güncellemesi (Minimal Değişiklik)

Mevcut `Landing Section`'ın arkasına, görsel şölenin girişini oluşturmak için minimal değişiklikler yapılacaktır:

*   **Arka Plan Katmanı:** Mevcut arkaplan üzerine, koyu/açık mod duyarlı ve hafifçe hareketli bir Grid (Izgara) Deseni katmanı eklenecektir.
*   **Odak Noktası:** Grid üzerine, merkeze odaklanmayı sağlayan, yumuşak kenarlı bir Eliptik Maske (veya radyal degrade) uygulanacaktır.
*   **3D Objeler (Static/Interactive):** Maskelenmiş alanın içine, temayla alakalı, iyi işlenmiş 3D metal parçalar (örneğin bükülmüş bir braket, frezelenmiş bir parça) yerleştirilecektir.
*   **Etkileşim:** Bu 3D objeler, sayfa kaymaya başlamadan önce dahi mouse hareketlerine duyarlı (Paralaks) hafif bir derinlik/eğilme hareketi yapmalıdır.

## C. Scroll-Driven Storytelling Modülü (Ana Revizyon)

Modül, ziyaretçi kaydırdıkça sabit kalan (sticky) bir görsel alanda, hizmetlerimizi aşağıdaki sırayla canlandıracaktır:

### 1. Faz: Lazer Kesim Simülasyonu

*   **Aşama:** CNC Lazer Kesim Makinesi (3D model) ekranda pozisyonlanır. Kaydırma ile sac metal kesim alanına yerleşir.
*   **Animasyon:** Kaydırma ilerledikçe, lazer kesim kafası hareket eder ve sac metal üzerinde belirlenen bir şekli (firmanın logosu veya temsilî bir ürün) 3D olarak keser.
*   **Eşlik Eden İçerik:** Görselin yanında, "Lazer Kesim Kabiliyetleri ve Hassasiyeti" metinleri ekranda yavaşça belirip sabitlenir (GSAP Timeline ile senkronize).

### 2. Faz: Apkant Büküm Simülasyonu

*   **Aşama:** Kesilen parça, ekranda kayarak bir Apkant Makinesine (3D model) transfer edilir.
*   **Animasyon:** Kaydırma ile parça makinede gerçekçi bir bükülme işlemine tabi tutulur.
*   **Özel Etkileşim:** Büküm tamamlandıktan sonra, ortaya çıkan nihai parça sahnenin merkezinde mouse hareketlerine duyarlı, düzensiz 3D bir dönüş yapmalıdır. (Parçanın her açısı görülebilmelidir).

### 3. Faz: CNC Torna & Freze Simülasyonu

*   **Aşama:** Sahne, bir CNC Torna veya Freze Makinesi ile değişir.
*   **Animasyon:** Bir metal kütüğün (hammadde), kesici takımlar kullanılarak yüksek hassasiyetli bir nihai parçaya işlenmesi (talaş kaldırma dahil) canlandırılır.
*   **Eşlik Eden İçerik:** Görselle senkronize olarak "Talaşlı İmalat Kapasitesi (Seri Üretim, Malzeme Çeşitliliği)" bilgileri sunulur.

## D. Performans ve Erişilebilirlik Gereksinimleri

*   **Optimizasyon:** Three.js 3D modelleri olabildiğince optimize edilmeli (Düşük poligon sayısı, sıkıştırılmış dokular) ve yükleme süreleri minimumda tutulmalıdır.
*   **Fallback:** WebGL desteği olmayan veya düşük performanslı cihazlarda, bu modülün yerine yüksek çözünürlüklü bir Video/GIF animasyonuna veya statik görsel setine geçiş (fallback) mekanizması zorunludur.
*   **Duyarlılık:** Tüm metinler ve canlandırmalar, mobil cihazlarda da anlaşılır ve akıcı bir şekilde çalışmalıdır. Mobil cihazlarda, mouse etkileşimi yerine cihaz oryantasyonuna (jiroskop) dayalı minimal bir hareket eklenebilir.

