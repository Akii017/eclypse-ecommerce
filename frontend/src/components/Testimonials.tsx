import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="bg-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="text-sm uppercase tracking-wider">Our Customers</h2>

          <div className="relative">
            <blockquote className="text-3xl md:text-4xl font-light max-w-3xl">
              "Understated, but unforgettable. It feels like it was made for me"
            </blockquote>

            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-dark overflow-hidden"
                  >
                    <img
                      src={`/customer-${index}.jpg`}
                      alt={`Customer ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium">Random Woman</p>
                <p className="text-sm text-gray-400">NY, USA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
