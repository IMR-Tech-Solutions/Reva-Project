import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContactSettings } from "../services/contactApi";
import api from "../api/api";

import {
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [generalSettings, setGeneralSettings] = useState(null);

  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Career", href: "/career" },
      { name: "Contact Us", href: "/contact" },
    ],
    services: [
      { name: "Feasibility Study", href: "/services/feasibility" },
      { name: "Basic Engineering", href: "/services/BasicEngineering" },
      { name: "Detailed Engineering", href: "/services/detailed" },
      { name: "Procurement", href: "/services/procurement" },
      { name: "EPC Management", href: "/services/basic" },
      { name: "Site Services", href: "/services/site" },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activeServices, contact, general] = await Promise.all([
          api.getActiveServices().catch(() => []),
          getContactSettings().catch(() => null),
          api.getSettings().catch(() => null),
        ]);

        if (activeServices?.length) {
          setServices(
            activeServices.map((s) => ({
              name: s.title,
              href: s.href
                ? (s.href.startsWith("/") && !s.href.startsWith("/services")
                  ? `/services${s.href}`
                  : s.href)
                : `/services/${s.slug}`,
            }))
          );
        } else {
          setServices(footerLinks.services);
        }

        setSettings(contact);
        setGeneralSettings(general);
      } catch (err) {
        console.error("Footer fetch error:", err);
        setServices(footerLinks.services);
      }
    };
    fetchData();
  }, []);

  // Contact Fallbacks
  const address =
    generalSettings?.address ||
    settings?.address_hq ||
    "REVA Process Technologies, Pune, India";
  const email =
    generalSettings?.contact_email ||
    settings?.email_inquiry ||
    "info@revaprocess.com";
  const phone =
    generalSettings?.contact_phone ||
    settings?.phone_primary ||
    "+91 20 1234 5678";

  // Social Fallbacks
  const facebookUrl =
    generalSettings?.facebook ||
    settings?.social_facebook ||
    "https://facebook.com";

  // WhatsApp — number stored as E.164 digits (e.g. 919999999999)
  const whatsappNumber = generalSettings?.whatsapp || "";
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
    : "https://wa.me/";

  const linkedinUrl =
    generalSettings?.linkedin ||
    settings?.social_linkedin ||
    "https://linkedin.com";
  const instagramUrl =
    generalSettings?.instagram ||
    settings?.social_instagram ||
    "https://instagram.com";

  return (
    <footer className="bg-[#1c2857] text-white pt-6 pb-2 relative overflow-hidden font-sans">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-5 items-start">
          {/* 1. BRANDING SECTION */}
          <div className="lg:col-span-4 space-y-2">
            <img
              src="/iso1.png"
              alt="ISO Certification"
              className="h-20 w-auto object-contain brightness-110"
            />

            <p className="text-white/70 text-[15px] leading-relaxed mb-2 pr-2">
              {generalSettings?.site_description ||
                "Leading provider of innovative process engineering and technology solutions worldwide."}
            </p>

            <div className="flex items-center gap-2.5">
              {[
                { icon: <FaLinkedinIn />, href: linkedinUrl },
                { icon: <FaWhatsapp />, href: whatsappUrl },
                { icon: <FaFacebookF />, href: facebookUrl },
                { icon: <FaInstagram />, href: instagramUrl },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/50 hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                  <span className="text-xs">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. LINKS SECTIONS */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
              {/* COLUMN: COMPANY */}
              <div className="space-y-3 lg:col-span-3">
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                  <span className="w-1 h-3 bg-secondary rounded-full" />
                  Company
                </h4>
                <ul className="space-y-1.5">
                  {footerLinks.company.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="text-white/50 text-[15px] hover:text-secondary inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN: SERVICES */}
              <div className="space-y-3 lg:col-span-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                  <span className="w-1 h-3 bg-secondary rounded-full" />
                  Services
                </h4>
                <ul className="space-y-1.5">
                  {services.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="text-white/50 text-[15px] hover:text-secondary inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN: REACH US */}
              <div className="space-y-3 lg:col-span-5">
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                  <span className="w-1 h-3 bg-secondary rounded-full" />
                  Reach Us
                </h4>
                <ul className="space-y-3 text-white/50 text-[15px]">
                  <li className="flex items-start gap-2.5">
                    <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">{address}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaEnvelope className="text-secondary flex-shrink-0" />
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaPhoneAlt className="text-secondary flex-shrink-0" />
                    <a
                      href={`tel:${phone}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm tracking-wide">
            © {new Date().getFullYear()} REVA Process Technologies. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-white/30 text-sm">
            <Link
              to="/privacy"
              className="hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;