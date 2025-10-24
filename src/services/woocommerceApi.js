import axios from 'axios';

// WooCommerce API base URL ve kimlik doğrulama bilgileri
// Bu bilgiler .env dosyasından alınmalıdır
const WC_API_BASE_URL = '/wp-json/wc/v3';
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

// Axios instance oluşturma
const woocommerceApiClient = axios.create({
  baseURL: WC_API_BASE_URL,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// WooCommerce Store API (Sepet işlemleri için)
const WC_STORE_API_BASE_URL = '/wp-json/wc/store';

const woocommerceStoreApiClient = axios.create({
  baseURL: WC_STORE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Ürünleri listeleme
 * @param {Object} params - Sorgu parametreleri (per_page, page, category, search, orderby, order)
 * @returns {Promise} - Axios promise
 */
export const getProducts = (params = {}) => {
  return woocommerceApiClient.get('/products', { params });
};

/**
 * Tek bir ürünün detaylarını alma
 * @param {Number} id - Ürün ID'si
 * @returns {Promise} - Axios promise
 */
export const getProductById = (id) => {
  return woocommerceApiClient.get(`/products/${id}`);
};

/**
 * Slug'a göre ürün detaylarını alma
 * @param {String} slug - Ürün slug'ı
 * @returns {Promise} - Axios promise
 */
export const getProductBySlug = (slug) => {
  return woocommerceApiClient.get('/products', { params: { slug } });
};

/**
 * Ürün kategorilerini listeleme
 * @param {Object} params - Sorgu parametreleri
 * @returns {Promise} - Axios promise
 */
export const getProductCategories = (params = {}) => {
  return woocommerceApiClient.get('/products/categories', { params });
};

/**
 * Sepeti alma (WooCommerce Store API)
 * @returns {Promise} - Axios promise
 */
export const getCart = () => {
  return woocommerceStoreApiClient.get('/cart');
};

/**
 * Sepete ürün ekleme (WooCommerce Store API)
 * @param {Number} productId - Ürün ID'si
 * @param {Number} quantity - Miktar
 * @returns {Promise} - Axios promise
 */
export const addToCart = (productId, quantity = 1) => {
  return woocommerceStoreApiClient.post('/cart/add-item', {
    id: productId,
    quantity,
  });
};

/**
 * Sepetten ürün çıkarma (WooCommerce Store API)
 * @param {String} itemKey - Sepet öğesi anahtarı
 * @returns {Promise} - Axios promise
 */
export const removeFromCart = (itemKey) => {
  return woocommerceStoreApiClient.post('/cart/remove-item', {
    key: itemKey,
  });
};

/**
 * Sepetteki ürün miktarını güncelleme (WooCommerce Store API)
 * @param {String} itemKey - Sepet öğesi anahtarı
 * @param {Number} quantity - Yeni miktar
 * @returns {Promise} - Axios promise
 */
export const updateCartItem = (itemKey, quantity) => {
  return woocommerceStoreApiClient.post('/cart/update-item', {
    key: itemKey,
    quantity,
  });
};

/**
 * Sipariş oluşturma
 * @param {Object} orderData - Sipariş verileri
 * @returns {Promise} - Axios promise
 */
export const createOrder = (orderData) => {
  return woocommerceApiClient.post('/orders', orderData);
};

/**
 * Sipariş detaylarını alma
 * @param {Number} orderId - Sipariş ID'si
 * @returns {Promise} - Axios promise
 */
export const getOrderById = (orderId) => {
  return woocommerceApiClient.get(`/orders/${orderId}`);
};

export default {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductCategories,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  createOrder,
  getOrderById,
};

