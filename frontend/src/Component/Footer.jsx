import React, { useState, useEffect } from "react";
import { getAllTechnologies } from "../services/technologiesApi";
import { getAllProducts } from "../services/productsApi";
import { Link } from "react-router-dom";
import { getContactSettings } from "../services/contactApi";
import api from "../api/api";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      // { name: "News", href: "/news" },
      { name: "Services", href: "/services" },

      { name: "Career", href: "/career" },
      { name: "Contact Us", href: "/contact" },
    ],
    services: [
      { name: "Feasibility & Pilot Plant Study", href: "/services/feasibility" },
      { name: "Basic Engineering", href: "/services/BasicEngineering" },
      { name: "Detailed Engineering", href: "/services/detailed" },
      { name: "Procurement", href: "/services/procurement" },
      { name: "EPC Project Management", href: "/services/basic" },
      { name: "Manufacturing & Site Services", href: "/services/site" },

    ],
    technologies: [
      { name: "Bioremediation", href: "/technology/bioremediation" },
      { name: "Amine System", href: "/amine" },
      { name: "Bio-gas Upgradation", href: "/biogas" },
      { name: "Crude Distillation Unit", href: "/crude-distillation" },
      { name: "Environmental Assessment", href: "/environmental" },
      { name: "Flue Gas Scrubbers", href: "/flue-gas" },
      { name: "Hydrotreatment", href: "/hydrotreatment" },
    ],
    products: [
      { name: "Boilers", href: "/product/boilers" },
      { name: "Heat Exchangers", href: "/product/heat-exchangers" },
      { name: "Pressure Vessels", href: "/product/pressure-vessels" },
      { name: "Reactors", href: "/product/reactors" },
      { name: "Storage Tanks", href: "/product/storage-tanks" },
      { name: "Distillation Column", href: "/product/distillation-column" },
    ],
  };

  const [techLinks, setTechLinks] = useState(footerLinks.technologies);
  const [productLinks, setProductLinks] = useState(footerLinks.products);
  const [settings, setSettings] = useState(null);
  const [generalSettings, setGeneralSettings] = useState(null);

  useEffect(() => {
    const fetchFooterTechs = async () => {
      try {
        const data = await getAllTechnologies(0, 6);
        if (data && data.length > 0) {
          const apiTechs = data.map(t => ({ name: t.title, href: `/technology/${t.slug}` }));
          setTechLinks([{ name: "Bioremediation", href: "/technology/bioremediation" }, ...apiTechs]);
        }
      } catch (err) {
        console.error("Failed to load footer technologies:", err);
      }
    };
    const fetchFooterProducts = async () => {
      try {
        const data = await getAllProducts(0, 6);
        if (data && data.length > 0) {
          setProductLinks(data.map(p => ({ name: p.title, href: `/product${p.path}` })));
        }
      } catch (err) {
        console.error("Failed to load footer products:", err);
      }
    };
    const fetchContactSettings = async () => {
      try {
        const data = await getContactSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load contact settings:", err);
      }
    };
    const fetchGeneralSettings = async () => {
      try {
        const data = await api.getSettings();
        setGeneralSettings(data);
      } catch (err) {
        console.error("Failed to load general settings:", err);
      }
    };
    fetchFooterTechs();
    fetchFooterProducts();
    fetchContactSettings();
    fetchGeneralSettings();
  }, []);

  return (
    <footer className="w-full bg-gradient-to-br from-primary via-[#1e2d6f] to-primary text-white relative overflow-hidden">
      {/* Animated Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(244, 180, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 180, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Decorative Glowing Elements */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 md:py-6 relative z-10">
        {/* Top Section */}
        <div className="flex flex-wrap lg:flex-nowrap gap-x-2 gap-y-6 mb-4">
          {/* Logo & Company Info Column */}
          <div className="w-full lg:w-[28%] shrink-0 flex flex-col">
            <div className="mb-0">
              <img
                src="/logo5.png"
                alt="ISO Certified: 9001, 14001, 45001"
                className="h-25 md:h-25 w-auto object-contain transition-transform duration-500 hover:scale-105 -ml-11 -mt-20"
                style={{ clipPath: 'inset(2px)' }}
              />
            </div>

            <p className="text-white/90 leading-relaxed -mt-10 mb-2 max-w-sm font-light text-sm -ml-2 text-justify">
              {generalSettings?.site_description || "Leading provider of innovative process engineering and technology solutions worldwide."}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 -ml-2">
              <a
                href={settings?.social_linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-all duration-300 border border-white/10 group"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={settings?.social_twitter || "https://twitter.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-all duration-300 border border-white/10 group"
                aria-label="Twitter"
              >
                <FaTwitter className="text-base text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={settings?.social_facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-all duration-300 border border-white/10 group"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-base text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={settings?.social_instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-all duration-300 border border-white/10 group"
                aria-label="Instagram"
              >
                <FaInstagram className="text-base text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Links Sections Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-0 gap-y-6">
            {/* Company */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-gradient-to-b from-secondary to-secondary/50 rounded-full" />
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Company
                </h4>
              </div>
              <ul className="space-y-1">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="relative text-white/70 hover:text-secondary transition-all duration-300 text-sm inline-block group/link"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-gradient-to-b from-secondary to-secondary/50 rounded-full" />
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Services
                </h4>
              </div>
              <ul className="space-y-1.5">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="relative text-white/70 hover:text-secondary transition-all duration-300 text-sm inline-block group/link"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-gradient-to-b from-secondary to-secondary/50 rounded-full" />
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Technologies
                </h4>
              </div>
              <ul className="space-y-1.5">
                {techLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="relative text-white/70 hover:text-secondary transition-all duration-300 text-sm inline-block group/link"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 bg-secondary w-0 group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-secondary to-secondary/50 rounded-full" />
                <h4 className="text-base font-bold text-white tracking-wide">
                  Products
                </h4>
              </div>
              <ul className="space-y-1.5">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="relative text-white/70 hover:text-secondary transition-all duration-300 text-sm inline-block group/link"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/70 text-sm text-center md:text-left font-light">
            © {new Date().getFullYear()} REVA Process Technologies. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <Link
              to="/privacy"
              className="hover:text-secondary transition-colors duration-300 relative group/bottom"
            >
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary group-hover/bottom:w-full transition-all duration-300" />
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/terms"
              className="hover:text-secondary transition-colors duration-300 relative group/bottom"
            >
              Terms & Conditions
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary group-hover/bottom:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
