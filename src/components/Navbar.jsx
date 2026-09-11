import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "School",
    path: "/school",
  },
  {
    name: "Coaching",
    path: "/coaching",
  },
  {
    name: "Trust",
    path: "/trust",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "News & Events",
    path: "/news-events",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Current browser URL
  const location = useLocation();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white font-sans">
      <div className="mx-auto flex min-h-[50px] max-w-[1550px] items-center justify-between px-4 lg:px-6">

        {/* ==================================================
            LOGO
        ================================================== */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex shrink-0 items-center"
        >
          <div className="hidden h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full sm:flex">
            <img
              src="/logo.png"
              alt="Ambition Classes Logo"
              className="mt-0.5 h-full w-full object-contain"
            />
          </div>

          <div className="ml-2 leading-none">
            <h1 className="font-sans text-[16px] font-extrabold tracking-tight sm:text-[24px]">
              <span className="font-sans text-emerald-800">
                AMBITION
              </span>{" "}
              <span className="font-sans text-red-700">
                CLASSES
              </span>
            </h1>

            <p className="mt-1 font-sans text-[6px] font-extrabold tracking-wide text-emerald-800 sm:text-[10px]">
              SCHOOL | COACHING | TRUST
            </p>
          </div>
        </Link>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <div
                key={link.name}
                className="relative"
              >
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`whitespace-nowrap font-sans text-[12px] transition ${
                    isActive
                      ? "font-bold text-[#006341]"
                      : "font-medium text-gray-700"
                  } hover:text-[#006341]`}
                >
                  {link.name}
                </Link>

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#006341]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* ==================================================
            ENQUIRE BUTTON
        ================================================== */}
        <Link
          to="/contact"
          onClick={handleLinkClick}
          className="hidden shrink-0 items-center gap-2 rounded-md bg-[#00563f] px-4 py-2.5 font-sans text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#004832] xl:flex"
        >
          <span className="font-sans">
            Enquire Now
          </span>

          <ArrowRight size={15} />
        </Link>

        {/* ==================================================
            MOBILE MENU BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* ==================================================
          MOBILE NAVIGATION
      ================================================== */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-2 lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path;

              return (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`block border-b border-gray-100 py-3 font-sans text-sm ${
                      isActive
                        ? "font-bold text-[#006341]"
                        : "font-medium text-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}

            {/* Mobile Enquire Button */}
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="my-3 flex items-center justify-center gap-2 rounded-md bg-[#00563f] px-4 py-3 font-sans text-sm font-semibold text-white"
            >
              <span className="font-sans">
                Enquire Now
              </span>

              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;