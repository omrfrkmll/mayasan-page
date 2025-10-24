## WooCommerce Kurulum ve API Ayarları Rehberi

Bu rehber, React frontend uygulamanızla entegre olacak bir WooCommerce backend'i kurmak ve yapılandırmak için gerekli adımları içermektedir.

### 1. WordPress ve WooCommerce Kurulumu

1.  **WordPress Kurulumu**: Eğer henüz bir WordPress siteniz yoksa, bir hosting sağlayıcısında (örneğin Hostinger) veya yerel sunucunuzda (XAMPP, MAMP, Local by Flywheel gibi araçlarla) WordPress kurulumunu tamamlayın.
2.  **WooCommerce Eklentisini Kurma**: WordPress yönetici panelinize giriş yapın.
    *   Sol menüden `Eklentiler > Yeni Ekle` seçeneğine gidin.
    *   Arama kutusuna "WooCommerce" yazın ve aratın.
    *   WooCommerce eklentisini bulun ve `Şimdi Kur` butonuna tıklayın.
    *   Kurulum tamamlandıktan sonra `Etkinleştir` butonuna tıklayın.
    *   WooCommerce kurulum sihirbazı başlayacaktır. Mağaza detaylarınızı (adres, sektör, ürün türleri vb.) girerek sihirbazı tamamlayın. Bu adımları atlayabilir ve daha sonra ayarlardan yapılandırabilirsiniz.

### 2. WooCommerce REST API Anahtarlarını Oluşturma

React uygulamasının WooCommerce verilerine güvenli bir şekilde erişebilmesi için API anahtarları oluşturmanız gerekmektedir.

1.  WordPress yönetici panelinizde sol menüden `WooCommerce > Ayarlar` seçeneğine gidin.
2.  `Gelişmiş` sekmesine tıklayın.
3.  `REST API` alt menüsüne tıklayın.
4.  `API anahtarı ekle` butonuna tıklayın.
5.  **Açıklama**: API anahtarınız için bir açıklama girin (örneğin, "React Frontend").
6.  **Kullanıcı**: API'yi kullanacak kullanıcıyı seçin (genellikle yönetici yetkilerine sahip bir kullanıcı).
7.  **İzinler**: `Okuma/Yazma` iznini seçin. Bu, React uygulamasının ürünleri okuyabilmesi ve sepet/sipariş oluşturabilmesi için gereklidir.
8.  `API anahtarı oluştur` butonuna tıklayın.
9.  Oluşturulan **Tüketici Anahtarı (Consumer Key)** ve **Tüketici Sırrı (Consumer Secret)** değerlerini kopyalayın. Bu değerler sadece bir kez gösterilecektir, bu yüzden güvenli bir yere kaydettiğinizden emin olun.

### 3. React Uygulamasında API Bilgilerini Yapılandırma

`wordpress-react-mvp` projenizin kök dizininde bulunan `.env.example` dosyasını `.`env` olarak kopyalayın ve aşağıdaki değişkenleri kopyaladığınız Tüketici Anahtarı ve Tüketici Sırrı ile güncelleyin:

```dotenv
VITE_WC_API_BASE_URL=https://your-wordpress-site.com/wp-json/wc/v3
VITE_WC_CONSUMER_KEY=ck_your_consumer_key_here
VITE_WC_CONSUMER_SECRET=cs_your_consumer_secret_here
```

*   `VITE_WC_API_BASE_URL`: WordPress sitenizin WooCommerce REST API endpoint'i olmalıdır. Genellikle `https://your-domain.com/wp-json/wc/v3` şeklindedir.
*   `VITE_WC_CONSUMER_KEY`: Oluşturduğunuz Tüketici Anahtarı.
*   `VITE_WC_CONSUMER_SECRET`: Oluşturduğunuz Tüketici Sırrı.

### 4. Örnek Ürünler Ekleme (Opsiyonel)

E-ticaret sitenizi test etmek için WooCommerce'e birkaç örnek ürün ekleyebilirsiniz:

1.  WordPress yönetici panelinizde sol menüden `Ürünler > Yeni Ekle` seçeneğine gidin.
2.  Ürün adı, açıklama, kısa açıklama, fiyat, stok durumu ve ürün görseli gibi bilgileri girin.
3.  Ürünü bir kategoriye atayın (örneğin, "Metal Levhalar", "Kaynak Malzemeleri").
4.  `Yayınla` butonuna tıklayarak ürünü kaydedin.
5.  React uygulamanızda bu ürünlerin göründüğünden emin olmak için `ProductsPage`'i ziyaret edin.

Bu adımları tamamladıktan sonra React uygulamanız WooCommerce backend'inizle başarılı bir şekilde iletişim kurabilecektir.
