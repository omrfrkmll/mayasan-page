import { motion } from 'framer-motion';

export const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Hakkımızda
      </h1>
      <div className="max-w-3xl mx-auto text-lg text-foreground/80 space-y-6">
        <p>
          Firmamız, metal işleme sektöründe uzun yıllara dayanan tecrübesiyle, hassas ve kaliteli üretim anlayışını benimsemiştir. 
          Kurulduğumuz günden bu yana, müşteri memnuniyetini ön planda tutarak, en son teknolojileri ve yenilikçi çözümleri projelerimize entegre etmekteyiz.
        </p>
        <p>
          Vizyonumuz, metal işleme sektöründe lider bir marka olmak ve global pazarda rekabetçi çözümler sunmaktır. 
          Misyonumuz ise, yüksek mühendislik bilgisi ve tecrübeli ekibimizle, müşterilerimizin beklentilerini aşan, çevreye duyarlı ve sürdürülebilir üretimler gerçekleştirmektir.
        </p>
        <p>
          Modern makine parkurumuz ve uzman kadromuz ile Apkant büküm, CNC lazer kesim ve gaz altı kaynak gibi birçok alanda hizmet vermekteyiz. 
          Her projede titizlikle çalışarak, en karmaşık tasarımları bile gerçeğe dönüştürüyoruz.
        </p>
        <p>
          Kalite standartlarımızdan ödün vermeden, her zaman en iyiyi hedefliyoruz. 
          Sektördeki gelişmeleri yakından takip ederek, kendimizi sürekli yeniliyor ve müşterilerimize en güncel teknolojileri sunuyoruz.
        </p>
      </div>
    </motion.div>
  );
};
