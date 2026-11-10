import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import useScrollToTop from "../hooks/useScrollToTop";

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useScrollToTop();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile top bar with hamburger */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-white border-b border-[#EBE5D9] flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#706A63] hover:bg-[#F9F6F0] hover:text-[#1A1816]"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="ml-2 text-sm font-semibold text-[#1A1816]">Admin</span>
      </div>

      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0">
        <div className="min-h-screen bg-white">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;