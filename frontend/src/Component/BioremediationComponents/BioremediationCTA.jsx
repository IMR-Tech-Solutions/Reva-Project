import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, ArrowRight } from "lucide-react";

const BioremediationCTA = () => {
  return (
    <section className="bg-white overflow-hidden">
      {/* FINAL CTA - Sleek Typography Focus */}
      <div className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-secondary animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tight">
              Ready to Deploy <br />
              <span className="text-secondary italic">Biological Excellence?</span>
            </h2>
            
            <p className="text-gray-500 text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium">
              Join leading industrial partners in adopting sustainable, high-performance bioremediation strategies tailored for complex environments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="group px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary hover:text-primary transition-all duration-300 flex items-center gap-3 shadow-lg shadow-primary/10"
              >
                Start Project Discussion
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors py-4 px-6"
              >
                <Mail className="w-4 h-4" /> engineering@reva.com
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Contact Info Strip - Minimalist */}
      <div className="bg-slate-50/50 py-10">
        <div className="container mx-auto px-4 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-secondary" />
              <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">Global Engineering Partner</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Connect</span>
                </div>
                <span className="text-primary font-bold text-sm">+49 (0) XXX XXX XXX</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Digital</span>
                </div>
                <span className="text-primary font-bold text-sm">reva-process.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioremediationCTA;

