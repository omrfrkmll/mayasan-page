
import { motion } from 'framer-motion';

const companies = [
  { name: 'Company A', logo: 'logos/company-a.svg' },
  { name: 'Company B', logo: 'logos/company-b.svg' },
  { name: 'Company C', logo: 'logos/company-c.svg' },
  { name: 'Company D', logo: 'logos/company-d.svg' },
  { name: 'Company E', logo: 'logos/company-e.svg' },
  { name: 'Company F', logo: 'logos/company-f.svg' },
];

export const ReferenceCompaniesSection = () => {
  return (
    <div className="py-16 sm:py-24 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12"
        >
          Bize Güvenen Firmalar
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

