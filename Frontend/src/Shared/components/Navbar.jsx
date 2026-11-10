import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { BookOpen, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/roadmap", label: "Roadmap" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#EBE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D48C70] text-white shadow-sm group-hover:shadow-md transition-all">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-[#1A1816] tracking-tight">
              LearnFlow
            </span>
          </Link>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-[#706A63]" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-full border border-[#EBE5D9] bg-[#F9F6F0] py-2 pl-9 pr-4 text-sm text-[#1A1816] placeholder:text-[#706A63] focus:border-[#D48C70] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D48C70] transition-all"
              />
            </div>
          </form>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  location.pathname === link.to
                    ? "bg-[#F9F6F0] text-[#1A1816]"
                    : "text-[#706A63] hover:bg-[#F9F6F0] hover:text-[#1A1816]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#706A63] hover:bg-[#F9F6F0] hover:text-[#1A1816] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#EBE5D9] bg-white">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-[#706A63]" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-full border border-[#EBE5D9] bg-[#F9F6F0] py-2 pl-9 pr-4 text-sm text-[#1A1816] placeholder:text-[#706A63] focus:border-[#D48C70] focus:bg-white focus:outline-none"
                />
              </div>
            </form>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    location.pathname === link.to
                      ? "bg-[#F9F6F0] text-[#1A1816]"
                      : "text-[#706A63] hover:bg-[#F9F6F0] hover:text-[#1A1816]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;