import {
  FiSearch,
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowUp,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { searchData } from "../data/searchData";
import { getAllTechnologies } from "../services/technologiesApi";
import { getAllProducts } from "../services/productsApi";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [dynamicTechnologies, setDynamicTechnologies] = useState([]);
  const [dynamicProducts, setDynamicProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const isHomePage = location.pathname === "/";

  // FIX: Close ALL on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setMobileServicesOpen(false);
    setMobileTechOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const data = await getAllTechnologies(0, 50);
        setDynamicTechnologies(data);
      } catch (err) {
        console.error("Failed to fetch technologies for header:", err);
      }
    };
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(0, 50);
        setDynamicProducts(data);
      } catch (err) {
        console.error("Failed to fetch products for header:", err);
      }
    };
    fetchTechs();
    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
      );
    });
    setSearchResults(results);
  };

  const handleResultClick = (url) => {
    navigate(url);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].url);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isScrolled || !isHomePage
          ? "bg-white/85 shadow-md"
          : "bg-gradient-to-b from-black/40 to-transparent"
          }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* LOGO */}
            <Link to="/" className="relative z-10">
              <img
                src="/logo11.png"
                alt="REVA"
                className={`transition-all duration-400 ${isScrolled || !isHomePage
                  ? "h-12 lg:h-14"
                  : "h-16 lg:h-20"
                  }`}
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink
                text="Home"
                href="/"
                active={location.pathname === "/"}
                isTransparent={!isScrolled && isHomePage}
              />
              <NavLink
                text="About"
                href="/about"
                active={location.pathname === "/about"}
                isTransparent={!isScrolled && isHomePage}
              />
              <NavLink
                text="Services"
                href="/services"
                active={location.pathname === "/services"}
                isTransparent={!isScrolled && isHomePage}
              />

              <TechnologiesDropdown
                active={location.pathname.startsWith("/technology")}
                isTransparent={!isScrolled && isHomePage}
                technologies={dynamicTechnologies}
              />
              <ProductsDropdown
                active={location.pathname.startsWith("/product")}
                isTransparent={!isScrolled && isHomePage}
                products={dynamicProducts}
              />
              {/* <NavLink
                text="News"
                href="/news"
                active={location.pathname === "/news"}
                isTransparent={!isScrolled && isHomePage}
              /> */}
              <NavLink
                text="Career"
                href="/career"
                active={location.pathname === "/career"}
                isTransparent={!isScrolled && isHomePage}
              />
              <NavLink
                text="Contact"
                href="/contact"
                active={location.pathname === "/contact"}
                isTransparent={!isScrolled && isHomePage}
              />
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              {/* SEARCH */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`text-xl transition-colors ${isScrolled || !isHomePage
                  ? "text-primary hover:text-secondary"
                  : "text-white hover:text-secondary"
                  }`}
                aria-label="Search"
              >
                <FiSearch />
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden text-2xl transition-colors ${isScrolled || !isHomePage
                  ? "text-primary hover:text-secondary"
                  : "text-white hover:text-secondary"
                  }`}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH DROPDOWN */}
      {searchOpen && (
        <div
          ref={searchDropdownRef}
          className="fixed top-24 right-4 lg:right-16 z-50 w-[calc(100%-2rem)] sm:w-96"
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-200">
            <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-12 pl-10 pr-10 border-2 border-gray-200 rounded-lg focus:border-secondary outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </form>

            {searchResults.length > 0 && (
              <div className="max-h-80 overflow-y-auto border-t border-gray-200">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <h4 className="text-sm font-semibold text-primary mb-1">
                      {result.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="p-6 text-center border-t border-gray-200">
                <p className="text-sm text-gray-600">No results found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary lg:hidden">
          <div className="h-full overflow-y-auto pt-28 px-6 pb-10">
            <MobileNavLink
              text="Home"
              href="/"
              active={location.pathname === "/"}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavLink
              text="About"
              href="/about"
              active={location.pathname === "/about"}
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="border-t border-white/20 mt-2 pt-2">
              <MobileNavLink
                text="Services"
                href="/services"
                active={location.pathname === "/services"}
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>



            {/* Technologies */}
            <div className="border-t border-white/20 mt-2 pt-2">
              <button
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
                className="w-full flex items-center justify-between py-3 text-white font-semibold"
              >
                Technologies
                <FiChevronDown className={mobileTechOpen ? 'rotate-180' : ''} />
              </button>
              {mobileTechOpen && (
                <div className="pl-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                  <MobileDropdownItem
                    label="Bioremediation"
                    href="/technology/bioremediation"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  {dynamicTechnologies.map((tech) => (
                    <MobileDropdownItem
                      key={tech.id}
                      label={tech.title}
                      href={`/technology/${tech.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                  {dynamicTechnologies.length === 0 && (
                    <span className="text-white/50 text-xs italic py-2 block">No technologies found...</span>
                  )}
                </div>
              )}
            </div>

            {/* Products */}
            <div className="border-t border-white/20 mt-2 pt-2">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between py-3 text-white font-semibold"
              >
                Products
                <FiChevronDown className={mobileProductsOpen ? 'rotate-180' : ''} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                  {dynamicProducts.map((product) => (
                    <MobileDropdownItem
                      key={product.id}
                      label={product.title}
                      href={`/product${product.path}`}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                  {dynamicProducts.length === 0 && (
                    <span className="text-white/50 text-xs italic py-2 block">No products found...</span>
                  )}
                </div>
              )}
            </div>
            {/* <div className="border-t border-white/20 mt-2 pt-2">
              <MobileNavLink
                text="News"
                href="/news"
                active={location.pathname === "/news"}
                onClick={() => setMobileMenuOpen(false)}
              />
            </div> */}

            <div className="border-t border-white/20 mt-2 pt-2">
              <MobileNavLink
                text="Career"
                href="/career"
                active={location.pathname === "/career"}
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            <div className="border-t border-white/20 mt-2 pt-2">
              <MobileNavLink
                text="Contact"
                href="/contact"
                active={location.pathname === "/contact"}
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-secondary text-white rounded-lg shadow-lg hover:bg-secondary/90 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="mx-auto text-xl" />
        </button>
      )}
    </>
  );
};

/* NAV LINK */
const NavLink = ({ text, href, active, isTransparent }) => (
  <Link
    to={href}
    className={`font-semibold text-base pb-1 border-b-2 transition-colors ${isTransparent
      ? active
        ? "text-secondary border-secondary"
        : "text-white border-transparent hover:text-secondary hover:border-secondary"
      : active
        ? "text-secondary border-secondary"
        : "text-primary border-transparent hover:text-secondary hover:border-secondary"
      }`}
  >
    {text}
  </Link>
);


/* TECHNOLOGIES DROPDOWN */
const TechnologiesDropdown = ({ active, isTransparent, technologies = [] }) => {
  return (
    <div className="relative group">
      <button
        className={`font-semibold text-base pb-1 border-b-2 transition-colors flex items-center gap-1 ${isTransparent
          ? active ? "text-secondary border-secondary" : "text-white border-transparent hover:text-secondary hover:border-secondary"
          : active ? "text-secondary border-secondary" : "text-primary border-transparent hover:text-secondary hover:border-secondary"
          }`}
      >
        Technologies
        <FiChevronDown className="text-sm transition-transform duration-200 group-hover:-rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible max-h-[85vh] overflow-y-auto scrollbar-hide border border-gray-200 transition-all duration-200 z-50">
        <div className="grid grid-cols-2 p-2">
          <DropdownItem label="Bioremediation" href="/technology/bioremediation" />
          {technologies.length > 0 ? (
            technologies.map((tech) => (
              <DropdownItem key={tech.id} label={tech.title} href={`/technology/${tech.slug}`} />
            ))
          ) : (
            <div className="col-span-2 p-4 text-center text-gray-500 text-sm italic">
              No technologies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* PRODUCTS DROPDOWN */
const ProductsDropdown = ({ active, isTransparent, products = [] }) => {
  return (
    <div className="relative group">
      <button
        className={`font-semibold text-base pb-1 border-b-2 transition-colors flex items-center gap-1 ${isTransparent
          ? active ? "text-secondary border-secondary" : "text-white border-transparent hover:text-secondary hover:border-secondary"
          : active ? "text-secondary border-secondary" : "text-primary border-transparent hover:text-secondary hover:border-secondary"
          }`}
      >
        Products
        <FiChevronDown className="text-sm transition-transform duration-200 group-hover:-rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible max-h-[85vh] overflow-y-auto scrollbar-hide border border-gray-200 transition-all duration-200 z-50">
        <div className="grid grid-cols-2 p-2">
          {products.length > 0 ? (
            products.map((product) => (
              <DropdownItem key={product.id} label={product.title} href={`/product${product.path}`} />
            ))
          ) : (
            <div className="col-span-2 p-4 text-center text-gray-500 text-sm italic">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* DROPDOWN ITEM */
const DropdownItem = ({ label, href }) => (
  <Link to={href} className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-secondary transition-colors">
    {label}
  </Link>
);

/* MOBILE NAV LINK */
const MobileNavLink = ({ text, href, active, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`block py-3 font-semibold ${active ? "text-secondary" : "text-white"}`}
  >
    {text}
  </Link>
);

/* MOBILE DROPDOWN ITEM */
const MobileDropdownItem = ({ label, href, onClick }) => (
  <Link to={href} onClick={onClick} className="block py-2 text-sm text-white/80 hover:text-white">
    {label}
  </Link>
);

export default Header;
