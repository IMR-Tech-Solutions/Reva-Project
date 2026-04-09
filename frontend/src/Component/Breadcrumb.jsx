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
    '/services': 'Services',
    '/Feasibility': 'Feasibility & Pilot Plant Study',
    '/basic': 'EPC Project Management',
    '/detailed': 'Detailed Engineering Package',
    '/procurement': 'Procurement',
    '/project':"Project Management",
    '/site':"Manufacturing & site Services",
    
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
    '/environmental':'Environmental assesment studies',
    '/permits':'Engineering assistance for project permits',
    '/flue-gas':'Flue Gas Scrubber, Caustic Scrubber',
    '/fly-ash':'Fly ash disposal',
    '/hazardous':'Hazardous chemical treatment',
    '/hydrotreatment':'Hydrotreatment',
    '/iset':'ISET Technologies',
    '/evaporate':'REVAP Technology',
    '/resin':'Resin Manufacturing Plant',



  };

  // Get title from mapping or auto-format
  const getTitle = (path) => {
    // Check exact match first
    if (routeTitleMap[path]) {
      return routeTitleMap[path];
    }
    
    // Auto-format if no match (fallback)
    const segment = path.split('/').pop();
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Split pathname and filter, removing 'technology' to skip it in breadcrumbs
  const pathnames = location.pathname.split('/').filter(x => x && x.toLowerCase() !== 'technology' && x.toLowerCase() !== 'product');
  
  // Get current page title
  const currentPageTitle = customTitle || (pathnames.length > 0 
    ? getTitle(location.pathname)
    : 'Home');

  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bgbg2.jpg')",
        }}
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
        <nav className="flex items-center justify-center space-x-2 text-sm md:text-base">
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center text-white/90 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FiHome className="w-5 h-5" />
          </Link>

          {pathnames.length > 0 && (
            <FiChevronRight className="w-4 h-4 text-white/60" />
          )}

          {/* Dynamic Breadcrumb Links */}
          {pathnames.map((segment, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const title = getTitle(routeTo);

            return (
              <React.Fragment key={routeTo}>
                {isLast ? (
                  <span className="text-white font-semibold bg-primary/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    {title}
                  </span>
                ) : (
                  <>
                    <Link
                      to={routeTo}
                      className="text-white/90 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {title}
                    </Link>
                    <FiChevronRight className="w-4 h-4 text-white/60" />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
