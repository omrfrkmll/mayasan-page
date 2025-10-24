import axios from 'axios'

// WordPress REST API Base URL
// Geliştirme aşamasında bu URL'yi kendi WordPress sitenizin URL'si ile değiştirin
// Örnek: https://yourdomain.com/wp-json/wp/v2/
const API_BASE_URL = import.meta.env.VITE_WP_API_URL || '/wp-json/wp/v2/'

// Axios instance oluşturma
const wordpressApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 saniye timeout
})

// Request interceptor - Her istekte log tutma veya token ekleme
wordpressApi.interceptors.request.use(
  (config) => {
    // Eğer authentication gerekiyorsa token eklenebilir
    // const token = localStorage.getItem('wp_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Hata yönetimi
wordpressApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Sunucu yanıt verdi ama hata kodu döndü
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      console.error('Network Error:', error.request)
    } else {
      // İstek oluşturulurken hata oluştu
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// API Methods

/**
 * Tüm posts'ları çeker
 * @param {Object} params - Query parametreleri (per_page, page, categories, vb.)
 * @returns {Promise} Posts array
 */
export const getPosts = async (params = {}) => {
  try {
    const response = await wordpressApi.get('/posts', { params })
    return {
      data: response.data,
      total: response.headers['x-wp-total'],
      totalPages: response.headers['x-wp-totalpages'],
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

/**
 * Belirli bir post'u ID ile çeker
 * @param {number} id - Post ID
 * @returns {Promise} Post object
 */
export const getPostById = async (id) => {
  try {
    const response = await wordpressApi.get(`/posts/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error)
    throw error
  }
}

/**
 * Tüm kategorileri çeker
 * @param {Object} params - Query parametreleri
 * @returns {Promise} Categories array
 */
export const getCategories = async (params = {}) => {
  try {
    const response = await wordpressApi.get('/categories', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

/**
 * Tüm pages'leri çeker
 * @param {Object} params - Query parametreleri
 * @returns {Promise} Pages array
 */
export const getPages = async (params = {}) => {
  try {
    const response = await wordpressApi.get('/pages', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching pages:', error)
    throw error
  }
}

/**
 * Belirli bir page'i ID ile çeker
 * @param {number} id - Page ID
 * @returns {Promise} Page object
 */
export const getPageById = async (id) => {
  try {
    const response = await wordpressApi.get(`/pages/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching page ${id}:`, error)
    throw error
  }
}

/**
 * Media (görseller) çeker
 * @param {Object} params - Query parametreleri
 * @returns {Promise} Media array
 */
export const getMedia = async (params = {}) => {
  try {
    const response = await wordpressApi.get('/media', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}

/**
 * Custom post type'ları çeker
 * @param {string} postType - Custom post type slug
 * @param {Object} params - Query parametreleri
 * @returns {Promise} Custom posts array
 */
export const getCustomPosts = async (postType, params = {}) => {
  try {
    const response = await wordpressApi.get(`/${postType}`, { params })
    return response.data
  } catch (error) {
    console.error(`Error fetching ${postType}:`, error)
    throw error
  }
}

/**
 * Arama yapar
 * @param {string} query - Arama terimi
 * @param {Object} params - Ek parametreler
 * @returns {Promise} Search results
 */
export const searchContent = async (query, params = {}) => {
  try {
    const response = await wordpressApi.get('/search', {
      params: { search: query, ...params },
    })
    return response.data
  } catch (error) {
    console.error('Error searching content:', error)
    throw error
  }
}

export default wordpressApi

