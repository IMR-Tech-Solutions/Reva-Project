import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ title: customTitle }) => {
  const location = useLocation();

  // Route title mapping - synced with your Header & Footer
  const routeTitleMap = {
    // Main Navigation
    '/': 'Home',
    '/about': 'About us',
    '/news': 'Latest News',
    '/contact': 'Contact us',
    
    // Services (from Header dropdown)
    '/services': 'Our Services',
    '/services/feasibility': 'Feasibility & Pilot Plant Study',
    '/services/basic-engineering': 'Basic Engineering',
    '/services/detailed': 'Detailed Engineering',
    '/services/procurement': 'Procurement',
    '/services/basic': 'EPC Project Management',
    '/services/site': 'Manufacturing & Site Services',
    '/services/project': 'Project Management',
    
    // Footer Links - Company
    '/career': 'Careers',
    
    // Footer Links - Services
    '/consulting': 'Consulting',
    '/engineering': 'Engineering',
    '/sustainability': 'Sustainability',
    '/digital': 'Digital solutions',
    
    // Footer Links - Resources
    '/case-studies': 'Case studies',
    '/insights': 'Insights',
    '/locations': 'Locations',
    '/suppliers': 'Suppliers',
    
    // Legal Pages
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms & Conditions',
    '/cookies': 'Cookie Policy',
    '/sitemap': 'Sitemap',

    '/amine':'Amine System',
    '/biogas':'Bio-Gas Upgradation System',
    '/environmental':'Environmental Assessment Studies',
    '/permits':'Engineering Assistance for Project Permits',
    '/flue-gas':'Flue Gas Scrubber, Caustic Scrubber',
    '/fly-ash':'Fly Ash Disposal',
    '/hazardous':'Hazardous Chemical Treatment',
    '/hydrotreatment':'Hydrotreatment',
    '/iset':'ISET Technologies',
    '/evaporate':'REVAP Technology',
    '/resin':'Resin Manufacturing Plant',
    '/technology/bioremediation': 'Bioremediation',
  };

  // Get title from mapping or auto-format
  const getTitle = (path) => {
    // Check exact match first
    if (routeTitleMap[path]) {
      return routeTitleMap[path];
    }
    
    // Check case-insensitive match for the full path
    const lowerPath = path.toLowerCase();
    const exactMatch = Object.keys(routeTitleMap).find(key => key.toLowerCase() === lowerPath);
    if (exactMatch) {
      return routeTitleMap[exactMatch];
    }

    // Check if it's a dynamic route (e.g., /technology/amine)
    const segment = path.split('/').pop();
    const segmentPath = `/${segment}`;
    const segmentMatch = Object.keys(routeTitleMap).find(key => key.toLowerCase() === segmentPath.toLowerCase());
    if (segmentMatch) {
      return routeTitleMap[segmentMatch];
    }
    
    // Auto-format if no match (fallback)
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Split pathname and filter
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Get current page title
  const currentPageTitle = customTitle || (pathnames.length > 0 
    ? getTitle(location.pathname)
    : 'Home');

  const serviceDetailPaths = [
    '/services/feasibility', '/services/basic-engineering', '/services/detailed', '/services/procurement', '/services/basic', '/services/site', '/services/project'
  ];

  const isTechnologyPage = location.pathname.toLowerCase().startsWith('/technology/');
  const isProductPage = location.pathname.toLowerCase().startsWith('/product/');
  const isNewsDetailPage = location.pathname.toLowerCase().startsWith('/news/') && location.pathname.toLowerCase() !== '/news';

  const isServiceDetailPage = 
    serviceDetailPaths.some(path => location.pathname.toLowerCase().includes(path.toLowerCase()));

  return (
    <section className="relative w-full h-[250px] md:h-[250px] lg:h-[350px] flex items-center justify-center overflow-hidden">
      {/* Background Image Optimized */}
      <div className="absolute inset-0 bg-primary/20" /> {/* Base color while loading */}
      <img
        src="/bgbg2.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: 0 }}
        onLoad={(e) => (e.currentTarget.style.opacity = "1")}
        loading="lazy"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 text-center pt-20">
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {currentPageTitle}
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center space-x-2 text-sm md:text-base text-white/90">
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FiHome className="w-5 h-5" />
          </Link>

          <FiChevronRight className="w-4 h-4 text-white/60" />

          {/* Inject "Our Services" if it's a detail page */}
          {isServiceDetailPage && (
            <>
              <Link
                to="/services"
                className="hover:text-white transition-colors duration-300 hover:underline"
              >
                Our Services
              </Link>
              <FiChevronRight className="w-4 h-4 text-white/60" />
            </>
          )}

          {/* Inject "Technologies" if it's a technology page */}
          {isTechnologyPage && (
            <>
              <span className="text-white/90">
                Technologies
              </span>
              <FiChevronRight className="w-4 h-4 text-white/60" />
            </>
          )}

          {/* Inject "Products" if it's a product page */}
          {isProductPage && (
            <>
              <span className="text-white/90">
                Products
              </span>
              <FiChevronRight className="w-4 h-4 text-white/60" />
            </>
          )}

          {/* Inject "News" if it's a news detail page */}
          {isNewsDetailPage && (
            <>
              <Link
                to="/news"
                className="hover:text-white transition-colors duration-300 hover:underline"
              >
                News
              </Link>
              <FiChevronRight className="w-4 h-4 text-white/60" />
            </>
          )}

          {/* Current Page Title */}
          {pathnames.length > 0 && (
             <span className="text-white font-semibold bg-primary/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {currentPageTitle}
             </span>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
