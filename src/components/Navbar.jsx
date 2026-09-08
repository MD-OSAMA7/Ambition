import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
  },
  {
    name: "About Us",
  },
  {
    name: "School",
    dropdown: true,
    submenu: ["About School", "School Facilities", "Admission"],
  },
  {
    name: "Coaching",
    dropdown: true,
    submenu: ["Courses", "Faculty", "Study Material"],
  },
  {
    name: "Trust",
  },
  {
    name: "Results",
  },
  {
    name: "Gallery",
  },
  {
    name: "News & Events",
    dropdown: true,
    submenu: ["Latest News", "Upcoming Events"],
  },
  {
    name: "Contact",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setOpenDropdown(null);
    setMenuOpen(false);
  };

  const handleDropdown = (name) => {
    setActiveLink(name);
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1550px] items-center justify-between px-4 lg:px-6">

        {/* Logo Section */}
        <a href="#" className="flex shrink-0 items-center">
          <div className="hidden sm:flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full">
            <img
              src="/logo.svg"
              alt="Ambition Classes Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="ml-2 leading-none">
            <h1 className="text-[16px] font-extrabold tracking-tight sm:text-[24px]">
              <span className="text-[#006341]">AMBITION</span>{" "}
              <span className="text-red-600">CLASSES</span>
            </h1>

            <p className="mt-1  text-[6px] font-extrabold tracking-wide text-[#006341] sm:text-[10px]">
              SCHOOL | COACHING | TRUST
            </p>

            <p className="mt-1 text-[6px] text-[#006341] sm:text-[10px]">
              We Convert Your Potential into Success...
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <button
                  type="button"
                  onClick={() => handleDropdown(link.name)}
                  className={`group flex items-center gap-0.5 whitespace-nowrap text-[12px] transition ${
                    activeLink === link.name
                      ? "font-bold text-[#006341]"
                      : "font-medium text-gray-700"
                  } hover:text-[#006341]`}
                >
                  <span>{link.name}</span>

                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`mt-0.5 transition-transform ${
                      openDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <a
                  href="#"
                  onClick={() => handleLinkClick(link.name)}
                  className={`whitespace-nowrap text-[12px] transition ${
                    activeLink === link.name
                      ? "font-bold text-[#006341]"
                      : "font-medium text-gray-700"
                  } hover:text-[#006341]`}
                >
                  {link.name}
                </a>
              )}

              {/* Desktop Dropdown */}
              {link.dropdown && openDropdown === link.name && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg">
                  {link.submenu.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={() => {
                        setActiveLink(link.name);
                        setOpenDropdown(null);
                      }}
                      className="block border-b border-gray-100 px-4 py-2.5 text-xs text-gray-700 transition last:border-b-0 hover:bg-[#f0f8f5] hover:font-semibold hover:text-[#006341]"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Enquire Button */}
        <a
          href="#"
          className="hidden shrink-0 items-center gap-2 rounded-md bg-[#00563f] px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#004832] xl:flex"
        >
          <span>Enquire Now</span>
          <ArrowRight size={15} />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-2 lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDropdown(link.name)}
                      className={`flex w-full items-center justify-between border-b border-gray-100 py-3 text-sm ${
                        activeLink === link.name
                          ? "font-bold text-[#006341]"
                          : "font-medium text-gray-700"
                      }`}
                    >
                      <span>{link.name}</span>

                      <ChevronDown
                        size={15}
                        className={`transition-transform ${
                          openDropdown === link.name
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {openDropdown === link.name && (
                      <div className="bg-gray-50 pl-4">
                        {link.submenu.map((item) => (
                          <a
                            key={item}
                            href="#"
                            onClick={() => {
                              setActiveLink(link.name);
                              setMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className="block border-b border-gray-200 py-2.5 text-xs text-gray-600 hover:text-[#006341]"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href="#"
                    onClick={() => handleLinkClick(link.name)}
                    className={`block border-b border-gray-100 py-3 text-sm ${
                      activeLink === link.name
                        ? "font-bold text-[#006341]"
                        : "font-medium text-gray-700"
                    }`}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile Enquire Button */}
            <a
              href="#"
              className="my-3 flex items-center justify-center gap-2 rounded-md bg-[#00563f] px-4 py-3 text-sm font-semibold text-white"
            >
              Enquire Now
              <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;