import {
  LayoutDashboard,
  Megaphone,
  Image,
  GraduationCap,
  Trophy,
  Users,
  CalendarDays,
  Newspaper,
  Images,
  FileText,
  Settings,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Offers",
    path: "/admin/offers",
    icon: Megaphone,
  },
  {
    name: "Hero Section",
    path: "/admin/hero",
    icon: Image,
  },
  {
    name: "Initiatives",
    path: "/admin/initiatives",
    icon: GraduationCap,
  },
  {
    name: "Achievements",
    path: "/admin/achievements",
    icon: Trophy,
  },
  {
    name: "Faculty",
    path: "/admin/faculty",
    icon: Users,
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    name: "News",
    path: "/admin/news",
    icon: Newspaper,
  },
  {
    name: "Gallery",
    path: "/admin/gallery",
    icon: Images,
  },
  {
    name: "Brochure",
    path: "/admin/brochure",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-5">
          <img
            src="/logo.png"
            alt="Ambition Classes"
            className="h-10 w-10 object-contain"
          />

          <div className="ml-2">
            <h2 className="text-sm font-extrabold text-[#00563f]">
              AMBITION
            </h2>

            <p className="text-[10px] font-semibold text-red-600">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-[#00563f] font-semibold text-white"
                      : "text-gray-600 hover:bg-[#eef8f5] hover:text-[#00563f]"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Ambition Classes"
              className="h-10 w-10 object-contain"
            />

            <div className="ml-2">
              <h2 className="text-sm font-extrabold text-[#00563f]">
                AMBITION
              </h2>

              <p className="text-[10px] font-semibold text-red-600">
                ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-[#00563f] font-semibold text-white"
                      : "text-gray-600 hover:bg-[#eef8f5] hover:text-[#00563f]"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;