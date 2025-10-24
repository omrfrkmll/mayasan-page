## Yeni Gereksinimler ve Analizi

Kullanıcının son geri bildirimleri doğrultusunda projenin mevcut durumu ve yapılması gereken revizyonlar aşağıda detaylandırılmıştır.

### 1. Video Storytelling Modülü İyileştirmeleri

*   **Progress Bar Konumu:** Videoların altındaki ilerleme çubukları (`VideoStorytellingModule` içindeki `progress_bar` elementi) şu anda sayfanın en altında sabit durmaktadır. Bu çubukların, ilgili video modülünün içinde, yani video ile birlikte kaydırma hareketiyle görünür/görünmez olması gerekmektedir. Bu, `VideoStorytellingModule` bileşeninin içindeki konumlandırmanın `position: absolute` veya `relative` ile ayarlanması ve `overflow` özelliklerinin kontrol edilmesiyle sağlanacaktır.

*   **Sola Kaydırma Animasyonu ve Sticky Davranışı:** Kullanıcı, videoların sayfayı aşağı kaydırdıkça sağdan sola doğru kaymasını ve uzun bir şerit gibi yan yana ilerlemesini talep etmektedir. Ayrıca bu bölümün `sticky` olarak ayarlanması istenmektedir. Bu, `VideoStorytellingModule` bileşeninin `x` eksenindeki kaydırma animasyonunun `scroll-driven` bir şekilde Framer Motion veya GSAP ile yeniden yapılandırılmasını gerektirir. `sticky` özelliği, modülün belirli bir süre ekranda sabit kalmasını sağlayacaktır.

*   **Opera Tarayıcı Desteği:** Videoların Opera tarayıcısında görünmeme sorunu bildirilmiştir. Bu durum, video formatı uyumsuzluğu (örn. `mp4` yerine `webm` veya `ogv` alternatifleri), tarayıcıya özgü CSS/JavaScript kısıtlamaları veya video elementinin `autoplay` veya `muted` özellikleri ile ilgili olabilir. `Video` elementinin `controls`, `autoplay`, `muted`, `playsinline` ve `loop` gibi özelliklerinin kontrol edilmesi ve farklı formatlarda video kaynakları sunulması gerekebilir.

*   **Mobil Uyumluluk (Kartlar):** Video üzerine yerleştirilen kartların mobil cihazlarda sayfa dışına taştığı belirtilmiştir. Bu, kartların `responsive` tasarımının `media query`'ler veya Tailwind CSS'in `responsive utility` sınıfları kullanılarak düzeltilmesini gerektirir. Kartların konumlandırması (`absolute` veya `relative`) ve genişlik/yükseklik ayarları mobil ekran boyutlarına göre optimize edilmelidir.

### 2. Icon Güncellemesi

*   **Pembe-Mor Gradyan Iconlar:** Mevcut iconların (videolar ve kayan keyword şeridindeki) pembe-mor gradyan stilinin temaya uymadığı belirtilmiştir. Kullanıcı, kendi sağlayacağı icon setinden uygun olanlarla değiştirilmesini talep etmektedir. `GlassmorphismIcon.jsx` bileşeninin kaldırılması ve yerine doğrudan kullanıcının sağlayacağı iconların entegre edilmesi gerekmektedir. Bu, `KeywordMarquee` ve `VideoStorytellingModule` içindeki icon kullanımlarını etkileyecektir. Iconların SVG formatında olması ve Tailwind CSS ile stilize edilebilir olması tercih edilir.

### 3. Header ve Navbar İyileştirmeleri

*   **3 Div Yapısı:** Header, `logo`, `navbar` ve `kullanıcı/sepet/tema değiştirici` olmak üzere üç ana bölüme ayrılacaktır. Bu, `Header.jsx` bileşeninin yapısının yeniden düzenlenmesini gerektirir.

*   **Sticky Logo/Kullanıcı:** `logo` ve `kullanıcı/sepet/tema değiştirici` bölümleri sayfanın en üstünde sabit kalacaktır (`position: fixed; top: 0;`).

*   **Akıllı Navbar:** `navbar` (ana navigasyon menüsü) sayfa ile birlikte kayacak, aşağı kaydırıldığında gizlenecek ve biraz yukarı kaydırıldığında tekrar görünür hale gelecektir. Bu, `scroll event listener` ve `GSAP` veya `Framer Motion` ile bir `hide/show` animasyonu entegrasyonu gerektirir. Navbar'ın `float` olması, diğer içeriklerin akışını etkilemeyecek şekilde konumlandırılmasını ifade eder.

### 4. Koyu/Açık Mod Uyumluluğu

*   Tüm metinler ve iconların koyu/açık mod desteği kontrol edilecek ve eksik olan yerler `Tailwind CSS` veya `CSS değişkenleri` kullanılarak düzeltilecektir. Özellikle yeni eklenen iconların ve `KeywordMarquee` metinlerinin tema geçişlerine uyumlu olması sağlanacaktır.

### 5. Hizmet Detay Sayfaları

*   Hizmet detay sayfalarındaki (`ServiceDetailPage.jsx`) mevcut resimler, ilgili metal işleme videoları ile değiştirilecektir. Bu, `Video` bileşeninin bu sayfalara entegrasyonunu ve her hizmet için doğru videonun yüklenmesini gerektirir.

### 6. Footer İyileştirmeleri

*   Sayfa içeriği kısa olduğunda footer'ın yukarıda kalması sorunu giderilecektir. `min-height: 100vh` ve `flex-grow` gibi CSS özellikleriyle sayfa içeriği her zaman tarayıcı ekranının en az yüksekliği kadar olacak şekilde ayarlanacak, böylece footer her zaman en altta kalacaktır. Footer içeriği dikeyde ortalanacaktır.

### 7. Referans Firmalar Bölümü

*   Ana sayfaya (`HomePage.jsx`), iş yapılan referans firmaları göstermek için placeholder bir bölüm eklenecektir. Bu bölüm için basit bir `grid` veya `flex` yapısı kullanılabilir, daha sonra logolar ve firma bilgileri kolayca eklenebilir.

### 8. Buton Stilleri

*   Hizmet detay sayfalarındaki "Hizmetlerimiz hakkında teklif alın" butonunun stilinin, ana sayfadaki "Teklif Al" butonuyla aynı olması ve koyu modda daha iyi görünmesi sağlanacaktır. Bu, `Button` bileşeninin veya ilgili CSS sınıflarının güncellenmesini gerektirir.

### 9. Ana Sayfaya Ek İçerik Türleri

*   Ana sayfaya daha fazla türde içerik eklenmesi istenmiştir. Bu, mevcut bölümlerin arasına yeni `section`'lar eklenerek veya mevcut `section`'lar zenginleştirilerek yapılabilir. Örneğin, "Neden Bizi Seçmelisiniz?" veya "Teknoloji Parkurumuz" gibi bölümler eklenebilir. Bu aşamada placeholder içerikler kullanılacaktır.

### 10. Footer Linkleri

*   Footer'daki linklerin çalışmadığı belirtilmiştir. Bu linklerin doğru sayfalara yönlendirme yaptığından emin olunacak ve gerekirse `React Router Link` bileşenleri kullanılarak düzeltilecektir.

Bu detaylı analiz doğrultusunda, projenin her bir aşamasını titizlikle ele alarak mükemmel bir sonuç elde edeceğimize inanıyorum. İlk olarak video storytelling modülündeki geçiş animasyonunu ve Opera uyumluluğunu ele alacağım.
