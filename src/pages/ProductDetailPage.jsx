import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShoppingCart, ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { getProductBySlug, addToCart } from '../services/woocommerceApi';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProductBySlug(slug);
      
      if (data && data.length > 0) {
        setProduct(data[0]);
        setError(null);
      } else {
        setError('Ürün bulunamadı.');
      }
    } catch (err) {
      console.error('Ürün yüklenirken hata oluştu:', err);
      setError('Ürün yüklenirken bir hata oluştu.');
      // Demo verisi
      setProduct({
        id: 1,
        name: 'Paslanmaz Çelik Levha',
        slug: slug,
        price: '150',
        regular_price: '200',
        sale_price: '150',
        on_sale: true,
        images: [
          { src: '/placeholder-product.jpg', alt: 'Paslanmaz Çelik Levha' },
        ],
        description: '<p>Yüksek kaliteli paslanmaz çelik levha, çeşitli boyutlarda mevcuttur. Korozyon direnci yüksek, uzun ömürlü kullanım için idealdir.</p><p>Özellikler:</p><ul><li>304 kalite paslanmaz çelik</li><li>Çeşitli kalınlık seçenekleri</li><li>Özel kesim hizmeti</li></ul>',
        short_description: 'Yüksek kaliteli paslanmaz çelik levha, çeşitli boyutlarda.',
        stock_status: 'instock',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err) {
      console.error('Sepete eklenirken hata oluştu:', err);
      alert('Sepete eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <section className="py-24 sm:py-32 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="py-24 sm:py-32 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-foreground/70 mb-4">{error || 'Ürün bulunamadı.'}</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Ürünlere Dön
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 mb-8 text-foreground/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Ürünlere Dön
        </motion.button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-muted mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]?.src || product.images[0].src}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/30">
                  <ShoppingCart className="w-24 h-24" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {/* Sale Badge */}
            {product.on_sale && (
              <div className="inline-flex items-center gap-2 mb-4 w-fit">
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  İndirimli
                </span>
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4 text-foreground">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {product.on_sale && product.regular_price && (
                <span className="text-xl text-foreground/50 line-through">
                  {product.regular_price} ₺
                </span>
              )}
              <span className="text-4xl font-bold text-primary">{product.price} ₺</span>
            </div>

            {/* Short Description */}
            <p className="text-lg text-foreground/70 mb-6">{stripHtml(product.short_description || '')}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock_status === 'instock' ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">Stokta Mevcut</span>
                </>
              ) : (
                <span className="text-destructive font-medium">Stokta Yok</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-foreground/70">Miktar:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock_status !== 'instock'}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {addingToCart ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ekleniyor...
                </>
              ) : addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Sepete Eklendi
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Sepete Ekle
                </>
              )}
            </motion.button>

            {/* Full Description */}
            <div className="mt-8 p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Ürün Açıklaması</h2>
              <div
                className="prose prose-sm max-w-none text-foreground/70"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

