import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  const footerLinks = [
    {
      title: 'Ürün',
      links: [
        { label: 'Hizmetler', href: '/services' },
        { label: 'Ürünler', href: '/products' },
        { label: 'Dokümantasyon', href: '#' },
      ],
    },
    {
      title: 'Şirket',
      links: [
        { label: 'Hakkımızda', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Kariyer', href: '#' },
      ],
    },
    {
      title: 'Destek',
      links: [
        { label: 'Yardım Merkezi', href: '#' },
        { label: 'İletişim', href: '/contact' },
        { label: 'Gizlilik Politikası', href: '/privacy-policy' },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-sm">
      {/* Noisy Background */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MA-YA-SAN
              </h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/70 mb-6 max-w-sm"
            >
              Metal işleme sektöründe hassas ve kaliteli çözümler sunuyoruz.
            </motion.p>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground/70" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (sectionIndex + 1) }}
            >
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-foreground/60 flex items-center">
            © 2025 MA-YA-SAN. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            ile Türkiye'de yapıldı
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

