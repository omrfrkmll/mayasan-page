import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react'
import { getPosts } from '../services/wordpressApi'
import { Button } from '@/components/ui/button'

export const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { data } = await getPosts({ per_page: 3, _embed: true })
        setPosts(data)
        setError(null)
      } catch (err) {
        console.error('Error loading posts:', err)
        setError('Blog yazıları yüklenirken bir hata oluştu.')
        // Demo verisi kullan
        setPosts([
          {
            id: 1,
            title: { rendered: 'Modern Web Tasarımının Geleceği' },
            excerpt: { rendered: 'Web tasarımı sürekli evrim geçiriyor. 2025 yılında bizi bekleyen trendleri keşfedin.' },
            date: new Date().toISOString(),
            _embedded: {
              author: [{ name: 'Admin' }],
            },
          },
          {
            id: 2,
            title: { rendered: 'React ve WordPress Entegrasyonu' },
            excerpt: { rendered: 'Headless CMS yaklaşımı ile WordPress ve React\'i nasıl entegre edebilirsiniz?' },
            date: new Date().toISOString(),
            _embedded: {
              author: [{ name: 'Admin' }],
            },
          },
          {
            id: 3,
            title: { rendered: 'Performans Optimizasyonu İpuçları' },
            excerpt: { rendered: 'Web sitenizin hızını artırmak için uygulayabileceğiniz pratik yöntemler.' },
            date: new Date().toISOString(),
            _embedded: {
              author: [{ name: 'Admin' }],
            },
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  if (loading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Son Blog Yazıları
            </span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            WordPress REST API ile dinamik olarak çekilen içerikler
          </p>
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                {/* Noisy Background */}
                <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />

                {/* Gradient Overlay on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title.rendered}
                  </h3>

                  <p className="text-foreground/70 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {stripHtml(post.excerpt.rendered)}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-foreground/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    {post._embedded?.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post._embedded.author[0].name}</span>
                      </div>
                    )}
                  </div>

                  {/* Read More Link */}
                  <motion.div
                    className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>

                {/* Decorative Corner Gradient */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="px-8 rounded-xl backdrop-blur-sm">
              Tüm Yazıları Görüntüle
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

