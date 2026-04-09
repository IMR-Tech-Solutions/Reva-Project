import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../Component/Breadcrumb';
import api from '../api/api';

const Privacy = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getLegalContent("privacy");
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch privacy policy:", error);
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
              {content.title || "Privacy Policy"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              {content.description || "At Reva, we are committed to protecting your privacy and ensuring the security of your personal information."}
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

            {/* Contact Information */}
            {content.contact_email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-6 bg-gray-50 border-l-4 border-secondary rounded-r-2xl"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.contact_email && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📧</span>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Email</div>
                        <a href={`mailto:${content.contact_email}`} className="text-sm font-bold text-secondary hover:underline transition-all">
                          {content.contact_email}
                        </a>
                      </div>
                    </div>
                  )}
                  
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
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Office Address</div>
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

      {/* Bottom Notice */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              By using Reva's website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
