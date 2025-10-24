import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Filter, Search, ShoppingCart } from 'lucide-react';
import { getProducts, getProductCategories } from '../services/woocommerceApi';
import { Link, useNavigate } from 'react-router-dom';
import { isEcommerceEnabled, isProductSearchEnabled, isFeatureEnabled } from '../config/features';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // E-ticaret özellikleri devre dışıysa ana sayfaya yönlendir
    if (!isEcommerceEnabled()) {
      navigate('/');
      return;
    }

    fetchProducts();
    fetchCategories();
  }, [selectedCategory, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        per_page: 12,
        _embed: true,
      };
      
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      const { data } = await getProducts(params);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Ürünler yüklenirken hata oluştu:', err);
      setError('Ürünler yüklenirken bir hata oluştu.');
      // Demo verileri
      setProducts([
        {
          id: 1,
          name: 'Paslanmaz Çelik Levha',
          slug: 'paslanmaz-celik-levha',
          price: '150',
          regular_price: '200',
          sale_price: '150',
          on_sale: true,
          images: [{ src: '/placeholder-product.jpg', alt: 'Paslanmaz Çelik Levha' }],
          short_description: 'Yüksek kaliteli paslanmaz çelik levha, çeşitli boyutlarda.',
        },
        {
          id: 2,
          name: 'Galvanizli Sac',
          slug: 'galvanizli-sac',
          price: '120',
          images: [{ src: '/placeholder-product.jpg', alt: 'Galvanizli Sac' }],
          short_description: 'Dayanıklı galvanizli sac, korozyon direnci yüksek.',
        },
        {
          id: 3,
          name: 'Alüminyum Profil',
          slug: 'aluminyum-profil',
          price: '180',
          images: [{ src: '/placeholder-product.jpg', alt: 'Alüminyum Profil' }],
          short_description: 'Hafif ve güçlü alüminyum profil, çeşitli uygulamalar için.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getProductCategories({ per_page: 20 });
      setCategories(data);
    } catch (err) {
      console.error('Kategoriler yüklenirken hata oluştu:', err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <section className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ürünlerimiz
            </span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Metal işleme ürünlerimizi keşfedin ve ihtiyaçlarınıza uygun olanı seçin.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-foreground/50" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl backdrop-blur-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center"
          >
            <p className="text-sm text-foreground/70">{error}</p>
            <p className="text-xs text-foreground/50 mt-2">Demo verileri gösteriliyor</p>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <Link to={`/products/${product.slug}`}>
                <div className="relative h-full p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                  {/* Noisy Background */}
                  <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />

                  {/* Sale Badge */}
                  {product.on_sale && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      İndirim
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-muted">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-foreground/30">
                        <ShoppingCart className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-foreground/70 mb-4 text-sm line-clamp-2">
                      {stripHtml(product.short_description || '')}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.on_sale && product.regular_price && (
                        <span className="text-sm text-foreground/50 line-through">
                          {product.regular_price} ₺
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        {product.price} ₺
                      </span>
                    </div>
                  </div>

                  {/* Decorative Corner Gradient */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-foreground/70">Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

