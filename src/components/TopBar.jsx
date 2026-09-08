import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram} from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="w-full bg-[#00563f] text-white">
      <div className="mx-auto flex max-w-[1550px] items-center justify-between gap-3 px-3 py-1.5 text-[10px] sm:px-4 sm:text-[11px]">

        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">

          {/* Location */}
          <div className="flex shrink-0 items-center gap-1">
            <MapPin size={12} />
            <span className="hidden sm:inline">
              Simri Bakhtiyarpur, Saharsa (Bihar)
            </span>
            <span className="sm:hidden">
              Simri Bakhtiyarpur
            </span>
          </div>

          {/* Phone 1 */}
          <div className="hidden items-center gap-1 md:flex">
            <Phone size={12} />
            <span>+91 99550 53555</span>
          </div>

          {/* Phone 2 */}
          <div className="hidden items-center gap-1 lg:flex">
            <Phone size={12} />
            <span>8797626348</span>
          </div>

          {/* Email */}
          <div className="hidden items-center gap-1 xl:flex">
            <Mail size={12} />
            <span>info@ambitionclasses.org</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Login Links */}
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="#"
              className="transition hover:text-yellow-300"
            >
              Student Login
            </a>

            <span className="text-white/40">|</span>

            <a
              href="#"
              className="transition hover:text-yellow-300"
            >
              Staff Login
            </a>

            <span className="text-white/40">|</span>
          </div>

          {/* Enquiry */}
          <a
            href="#"
            className="transition hover:text-yellow-300"
          >
            Enquiry
          </a>

          {/* Social Icons */}
          <div className="hidden items-center gap-1 md:flex">

            {/* Facebook-like */}
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-5 w-5 items-center justify-center rounded bg-[#1877f2] transition hover:scale-110"
            >
             
              <FaFacebook />
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="flex h-5 w-5 items-center justify-center rounded bg-[#ff0000] transition hover:scale-110"
            >
             <FaYoutube />
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-5 w-5 items-center justify-center rounded bg-[#e4405f] transition hover:scale-110"
            >
              <FaInstagram />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-5 w-5 items-center justify-center rounded bg-[#0a66c2] transition hover:scale-110"
            >
              <FaLinkedin />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;