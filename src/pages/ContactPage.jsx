import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Bize Ulaşın
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-start space-x-4 bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 shadow-lg"
          >
            <Mail className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">E-posta</h3>
              <p className="text-foreground/70">info@metalmvp.com</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-start space-x-4 bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 shadow-lg"
          >
            <Phone className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Telefon</h3>
              <p className="text-foreground/70">+90 555 123 45 67</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-start space-x-4 bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 shadow-lg"
          >
            <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Adres</h3>
              <p className="text-foreground/70">Örnek Mah. Örnek Cad. No: 123, Sanayi Bölgesi, İstanbul, Türkiye</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Mesaj Gönderin</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">Adınız Soyadınız</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">E-posta Adresiniz</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">Mesajınız</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Gönder
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
