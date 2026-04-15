import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../Component/Breadcrumb';
import api from '../api/api';
import { Link } from 'react-router-dom';

const Terms = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getLegalContent("terms");
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch terms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1.5 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-5">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-5">
              {content.title || "Terms & Conditions"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              {content.description || "These Terms and Conditions govern your use of Reva's website and services."}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              <strong>Last Updated:</strong> {content.last_updated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            {(content.sections || []).map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-10 md:mb-12"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="text-secondary font-bold text-sm">{index + 1}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary pt-0.5">
                    {section.title}
                  </h2>
                </div>
                
                <div className="pl-12 space-y-3">
                  {(section.content || []).map((paragraph, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Important Notice Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 p-6 bg-red-50 border-l-4 border-secondary rounded-r-2xl shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-black text-secondary mb-3 flex items-center gap-2">
                <span>⚠️</span> Important Notice
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                These general Terms and Conditions are supplemented by project-specific contracts, purchase orders, and service agreements. In case of conflict, the specific contract terms shall prevail.
              </p>
              <p className="text-sm sm:text-base text-gray-700 font-medium italic">
                Professional legal advice should be sought for interpretation of these terms in specific circumstances or jurisdictions.
              </p>
            </motion.div>

            {/* Contact Information */}
            {content.contact_email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-gray-50 border-l-4 border-primary rounded-r-2xl"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  For questions regarding these Terms and Conditions or to request contract documents, please contact our legal team:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📧</span>
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Legal Email</div>
                      <a href={`mailto:${content.contact_email}`} className="text-sm font-bold text-secondary hover:underline transition-all">
                        {content.contact_email}
                      </a>
                    </div>
                  </div>
                  
                  {content.contact_phone && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📞</span>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Phone</div>
                        <a href={`tel:${content.contact_phone}`} className="text-sm font-bold text-secondary hover:underline transition-all">
                          {content.contact_phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {content.contact_address && (
                    <div className="flex items-start gap-3 md:col-span-2">
                      <span className="text-lg">📍</span>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Registered Address</div>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                          {content.contact_address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* Acknowledgment Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tight">
                Acknowledgment of Terms
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                By using Reva's website and services, you acknowledge that you have read these Terms and Conditions, understand them, and agree to be bound by them. If you do not agree, please discontinue use of our services immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center bg-secondary text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/10"
                >
                  Contact Legal Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
