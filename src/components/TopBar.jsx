import { MapPin, Phone, Mail, Megaphone } from "lucide-react";

import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const defaultSettings = {
  address: "Simri Bakhtiyarpur, Saharsa (Bihar)",
  mapUrl: "",
  phone: "+91 99550 53555",
  email: "info@ambitionclasses.org",
  facebook: "",
  youtube: "",
  instagram: "",
  linkedin: "",
};

const TopBar = () => {
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);

  // =========================================
  // FETCH OFFERS
  // =========================================
  const fetchOffers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/offers/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch offers"
        );
      }

      setOffers(data.offers || []);
    } catch (error) {
      console.error(
        "Offer fetch error:",
        error.message
      );
    }
  };

  // =========================================
  // FETCH WEBSITE SETTINGS
  // =========================================
  const fetchSettings = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/settings/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch settings"
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
        "Settings fetch error:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchSettings();
  }, []);

  return (
    <div className="w-full bg-[#00563f] font-sans text-white">
      <div className="mx-auto flex h-7 max-w-[1550px] items-center gap-2 px-3 text-[9px] sm:h-8 sm:px-4 sm:text-[10px]">

        {/* =====================================
            LEFT SIDE
        ====================================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* Address / Map */}
          <a
            href={settings.mapUrl || "#"}
            target={settings.mapUrl ? "_blank" : undefined}
            rel={
              settings.mapUrl
                ? "noopener noreferrer"
                : undefined
            }
            className="flex shrink-0 items-center gap-1 font-sans text-[9px] font-medium transition hover:text-yellow-300 sm:text-[10px]"
            onClick={(event) => {
              if (!settings.mapUrl) {
                event.preventDefault();
              }
            }}
          >
            <MapPin size={11} />

            <span className="hidden sm:inline">
              {settings.address}
            </span>

            <span className="sm:hidden">
              Simri Bakhtiyarpur
            </span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, "")}`}
            className="hidden items-center gap-1 font-sans text-[9px] font-medium transition hover:text-yellow-300 md:flex sm:text-[10px]"
          >
            <Phone size={11} />

            <span>{settings.phone}</span>
          </a>
        </div>

        {/* =====================================
            OFFER TICKER
        ====================================== */}
        {offers.length > 0 && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="overflow-hidden whitespace-nowrap">
              <div
                className="flex w-max items-center"
                style={{
                  animation:
                    "offer-scroll 12s linear infinite",
                }}
              >
                {offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="flex shrink-0 items-center gap-1.5 pr-16 font-sans text-[9px] sm:gap-2 sm:text-[10px]"
                  >
                    {/* Announcement Icon */}
                    <Megaphone
                      size={11}
                      strokeWidth={2.2}
                      className="shrink-0 text-yellow-300 sm:h-3.5 sm:w-3.5"
                    />

                    {/* Yellow Title */}
                    <span className="font-sans font-bold text-yellow-300">
                      {offer.title || offer.text}
                    </span>

                    {/* White Description */}
                    {offer.description && (
                      <span className="font-sans text-[8px] font-medium text-white/90 sm:text-[9px]">
                        {offer.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================
            RIGHT SIDE
        ====================================== */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Email */}
          <a
            href={`mailto:${settings.email}`}
            className="hidden items-center gap-1 font-sans text-[9px] font-medium transition hover:text-yellow-300 xl:flex sm:text-[10px]"
          >
            <Mail size={11} />

            <span>{settings.email}</span>
          </a>

          {/* Separator */}
          <span className="hidden font-sans text-[10px] text-white/40 xl:inline">
            |
          </span>

          {/* Social Icons */}
          <div className="flex items-center gap-1">

            {/* Facebook */}
            <a
              href={settings.facebook || "#"}
              target={settings.facebook ? "_blank" : undefined}
              rel={
                settings.facebook
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label="Facebook"
              onClick={(event) => {
                if (!settings.facebook) {
                  event.preventDefault();
                }
              }}
              className="flex h-[18px] w-[18px] items-center justify-center rounded bg-[#1877f2] font-sans transition hover:scale-110 sm:h-5 sm:w-5"
            >
              <FaFacebook size={10} />
            </a>

            {/* YouTube */}
            <a
              href={settings.youtube || "#"}
              target={settings.youtube ? "_blank" : undefined}
              rel={
                settings.youtube
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label="YouTube"
              onClick={(event) => {
                if (!settings.youtube) {
                  event.preventDefault();
                }
              }}
              className="flex h-[18px] w-[18px] items-center justify-center rounded bg-[#ff0000] font-sans transition hover:scale-110 sm:h-5 sm:w-5"
            >
              <FaYoutube size={11} />
            </a>

            {/* Instagram */}
            <a
              href={settings.instagram || "#"}
              target={
                settings.instagram
                  ? "_blank"
                  : undefined
              }
              rel={
                settings.instagram
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label="Instagram"
              onClick={(event) => {
                if (!settings.instagram) {
                  event.preventDefault();
                }
              }}
              className="flex h-[18px] w-[18px] items-center justify-center rounded bg-[#e4405f] font-sans transition hover:scale-110 sm:h-5 sm:w-5"
            >
              <FaInstagram size={10} />
            </a>

            {/* LinkedIn */}
            <a
              href={settings.linkedin || "#"}
              target={
                settings.linkedin
                  ? "_blank"
                  : undefined
              }
              rel={
                settings.linkedin
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label="LinkedIn"
              onClick={(event) => {
                if (!settings.linkedin) {
                  event.preventDefault();
                }
              }}
              className="flex h-[18px] w-[18px] items-center justify-center rounded bg-[#0a66c2] font-sans transition hover:scale-110 sm:h-5 sm:w-5"
            >
              <FaLinkedin size={10} />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;