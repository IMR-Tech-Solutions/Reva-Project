import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { getAllProducts } from "../../services/productsApi";

const ProcessEngineeringProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (data && data.length > 0) {
          // Map dynamic data to the structure expected by the component
          // Limit to first 3 as requested
          const mappedProducts = data.slice(0, 3).map((p) => {
            let imageUrl = "./distillation-column.jpg";
            if (p.img) {
              if (p.img.startsWith("http")) {
                imageUrl = p.img;
              } else if (p.img.startsWith("/api/uploads")) {
                imageUrl = `http://localhost:8000${p.img}`;
              } else {
                imageUrl = p.img; // Public folder images like /productimages/...
              }
            }
            
            return {
              title: p.title,
              subtitle: p.herosub || "Premium Quality",
              description: p.paragraph1 || "High-performance process equipment engineered for industrial excellence.",
              specs: p.features ? p.features.slice(0, 4).map(f => typeof f === 'string' ? f : f.title) : ["ASME Certified", "ISO Compliant", "Custom Engg", "High Perf"],
              image: imageUrl,
              counter: "100+",
              metric: "Units Built",
            };
          });
          setProducts(mappedProducts);
        } else {
          // Fallback static products if no dynamic data exists
          setProducts([
            {
              title: "Packed Distillation Columns",
              subtitle: "1200 MT/day Capacity",
              description: "Structured packing fractionation columns for high-purity petrochemical separations. Low pressure drop design.",
              specs: ["Diameter: 4.5m", "Height: 45m", "Efficiency: 95%", "SS316L + Clad"],
              image: "./distillation-column.jpg",
              counter: "250+",
              metric: "Columns Built",
            },
            {
              title: "Shell & Tube Heat Exchangers",
              subtitle: "TEMA BEU Design",
              description: "Fixed tube sheet exchangers for crude preheat trains and process cooling. Enhanced anti-fouling surfaces.",
              specs: ["Area: 1500 m²", "Pressure: 35 bar", "Temp: 350°C", "U-value: 800 W/m²K"],
              image: "./heat-exchanger.jpg",
              counter: "800+",
              metric: "Units Delivered",
            },
            {
              title: "Agitated Reactor Vessels",
              subtitle: "ASME VIII Certified",
              description: "Continuous stirred tank reactors with anchor agitator for polymerization and batch synthesis processes.",
              specs: ["Volume: 50 m³", "Power: 75 kW", "Pressure: 16 bar", "Half-Pipe Jacket"],
              image: "./reactor-vessel.jpg",
              counter: "120+",
              metric: "Reactors Fabricated",
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 AUTO SLIDE EVERY 3 SECONDS
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === products.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  // Animation variants for header
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-primary to-gray-900 py-8 lg:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-800/50 [background-size:4rem_4rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-8xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h3
            variants={itemVariants}
            className="text-sm md:text-base lg:text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2"
          >
            Featured Equipment
          </motion.h3>
          

          <motion.h2 
            variants={itemVariants}
            className="text-2xl lg:text-3xl font-black text-white mb-4"
          >
            PROCESS PLANT <span className="text-secondary block">EQUIPMENT</span>
            
          </motion.h2>
          

          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            ASME certified equipment for refineries, petrochemicals, and
            pharmaceutical manufacturing.
          </motion.p>
        </motion.div>

        {/* Slider */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-10 items-center mb-12"
            >
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-2xl font-black text-white">
                    {products[activeIndex].title}
                  </h3>
                  <p className="text-secondary font-bold text-lg">
                    {products[activeIndex].subtitle}
                  </p>
                </div>

                <p className="text-gray-300">
                  {products[activeIndex].description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {products[activeIndex].specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-300"
                    >
                      {spec}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-secondary">
                    {products[activeIndex].counter}
                  </span>
                  <span className="text-white font-semibold">
                    {products[activeIndex].metric}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={products[activeIndex].image}
                  alt={products[activeIndex].title}
                  className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl border border-white/20 shadow-xl"
                />
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mb-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-secondary"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessEngineeringProducts;
