import {
  ArrowRight,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

const defaultSettings = {
  address:
    "Ranibagh, Bakhtiyarpur, Saharsa (Bihar) - 852127",
  mapUrl: "",
  phone: "+91 99550 53555",
  email: "info@ambitionclasses.org",
  facebook: "",
  youtube: "",
  instagram: "",
  linkedin: "",
};

const quickLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Ambition Classes",
    path: "/coaching",
  },
  {
    name: "Ambition Prestige School",
    path: "/school",
  },
  {
    name: "Trust",
    path: "/trust",
  },
];

const programLinks = [
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

const portalLinks = [
  {
    name: "Student Login",
    path: "https://earthix.in/portal/login",
    external: true,
  },
  {
    name: "Staff Login",
    path: "https://earthix.in/staff-portal/login",
    external: true,
  },
];

const FooterColumn = ({
  title,
  links,
  titleColor = "text-amber-500",
}) => {
  return (
    <div>
      <h3
        className={`font-sans text-sm font-bold sm:text-base ${titleColor}`}
      >
        {title}
      </h3>

      <div className="mt-3 flex flex-col gap-2">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.name}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans text-[10px] text-white/75 transition hover:text-white sm:text-xs"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className="w-fit font-sans text-[10px] text-white/75 transition hover:text-white sm:text-xs"
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const SocialIcon = ({
  href,
  label,
  className,
  children,
}) => {
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={label}
      onClick={(event) => {
        if (!href) {
          event.preventDefault();
        }
      }}
      className={`flex h-7 w-7 items-center justify-center rounded transition hover:scale-110 ${className}`}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  const [settings, setSettings] =
    useState(defaultSettings);

  // =========================================
  // FETCH SETTINGS
  // =========================================
  const fetchSettings = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/settings/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch settings"
        );
      }

      if (data.success && data.settings) {
        setSettings({
          ...defaultSettings,
          ...data.settings,
        });
      }
    } catch (error) {
      console.error(
        "Footer settings error:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const phoneNumber =
    settings.phone?.replace(/\s+/g, "");

  return (
    <footer className="font-sans text-white">

      {/* ================= CTA ================= */}
      <section className="mb-1 bg-emerald-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1550px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* CTA Left */}
          <div className="flex items-center gap-3">
           

            <div>
              <h2 className="font-sans text-lg font-extrabold leading-tight sm:text-xl lg:text-2xl">
                <span className="text-white">
                  Your Goal. Your Ambition. Your Success.
                </span>{" "}
                
                  
                
              </h2>

              <p className="mt-1 font-sans text-[10px] text-white/85 sm:text-sm">
                Start your journey with Ambition Classes.
              </p>
            </div>
          </div>

          {/* CTA Right */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            {/* Enquire */}
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2.5 font-sans text-xs font-bold text-emerald-800 transition hover:bg-amber-400"
            >
              <span className="font-sans">
                Enquire Now
              </span>

              <ArrowRight size={15} />
            </Link>

            {/* Phone */}
            <a
              href={
                phoneNumber
                  ? `tel:${phoneNumber}`
                  : "#"
              }
              onClick={(event) => {
                if (!phoneNumber) {
                  event.preventDefault();
                }
              }}
              className="flex items-center gap-2 rounded-md border border-white/60 px-4 py-2.5 font-sans text-xs font-semibold transition hover:bg-white/10"
            >
              <Phone size={15} />

              <span className="font-sans">
                {settings.phone}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= MAIN FOOTER ================= */}
      <section className="bg-emerald-800 px-4 py-7 sm:px-6">
        <div className="mx-auto max-w-[1550px]">

          {/* Footer Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-5 lg:gap-x-6">

            {/* ================= BRAND ================= */}
            <div className="col-span-2 lg:col-span-1 lg:border-r lg:border-white/20 lg:pr-5">

              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Ambition Classes Logo"
                  className="h-14 w-14 object-contain"
                />

                <div>
                  <h2 className="font-sans text-lg font-extrabold sm:text-l">
                    <span className="font-sans text-white">
                      AMBITION
                    </span>{" "}
                    <span className="font-sans text-red-500">
                      CLASSES
                    </span>
                  </h2>

                  <p className="mt-1 font-sans text-[10px] font-bold tracking-wide text-white/90">
                    SCHOOL | COACHING | TRUST
                  </p>

                  <p className="mt-1 font-sans text-[8px] text-white/70 sm:text-[9px]">
                    We Convert Your Potential into Success...
                  </p>
                </div>
              </div>

              {/* Address */}
              <a
                href={settings.mapUrl || "#"}
                target={
                  settings.mapUrl
                    ? "_blank"
                    : undefined
                }
                rel={
                  settings.mapUrl
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(event) => {
                  if (!settings.mapUrl) {
                    event.preventDefault();
                  }
                }}
                className="mt-4 flex items-start gap-2 font-sans text-[10px] leading-relaxed text-white/80 transition hover:text-white sm:text-xs"
              >
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span className="font-sans">
                  {settings.address}
                </span>
              </a>

              {/* Email */}
              <a
                href={
                  settings.email
                    ? `mailto:${settings.email}`
                    : "#"
                }
                onClick={(event) => {
                  if (!settings.email) {
                    event.preventDefault();
                  }
                }}
                className="mt-3 block font-sans text-[10px] text-white/75 transition hover:text-white sm:text-xs"
              >
                {settings.email}
              </a>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div className="border-r border-white/20 pr-4 lg:pr-5">
              <FooterColumn
                title="Quick Links"
                links={quickLinks}
              />
            </div>

            {/* ================= OUR PROGRAMS ================= */}
            <div className="lg:border-r lg:border-white/20 lg:pr-5">
              <FooterColumn
                title="Our Programs"
                links={programLinks}
                titleColor="text-amber-500"
              />
            </div>

            {/* ================= STUDENT & STAFF ================= */}
            <div className="border-r border-white/20 pr-4 lg:pr-5">
              <FooterColumn
                title="Student & Staff"
                links={portalLinks}
              />
            </div>

            {/* ================= FOLLOW US ================= */}
            <div>
              <h3 className="font-sans text-sm font-bold text-amber-500 sm:text-base">
                Follow Us
              </h3>

              {/* Horizontal Social Icons */}
              <div className="mt-3 flex items-center gap-2">

                <SocialIcon
                  label="Facebook"
                  href={settings.facebook}
                  className="bg-[#1877f2]"
                >
                  <FaFacebookF size={12} />
                </SocialIcon>

                <SocialIcon
                  label="YouTube"
                  href={settings.youtube}
                  className="bg-[#ff0000]"
                >
                  <FaYoutube size={13} />
                </SocialIcon>

                <SocialIcon
                  label="Instagram"
                  href={settings.instagram}
                  className="bg-[#e4405f]"
                >
                  <FaInstagram size={13} />
                </SocialIcon>

                <SocialIcon
                  label="LinkedIn"
                  href={settings.linkedin}
                  className="bg-[#0a66c2]"
                >
                  <FaLinkedinIn size={12} />
                </SocialIcon>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COPYRIGHT ================= */}
      <div className="bg-emerald-800 px-4 py-2">
        <div className="mx-auto flex max-w-[1550px] flex-col gap-2 font-sans text-[9px] text-white/75 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">

          <p className="font-sans">
            © 2024 Ambition Classes. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 font-sans">

            <Link
              to="/privacy-policy"
              className="font-sans transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <span className="font-sans">|</span>

            <Link
              to="/terms"
              className="font-sans transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <span className="font-sans">|</span>

            <span className="font-sans">
              Designed with ❤️ for Education
            </span>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;