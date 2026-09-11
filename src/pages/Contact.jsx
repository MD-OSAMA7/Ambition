import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
  Send,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const defaultSettings = {
  address: "Ranibagh, Bakhtiyarpur, Saharsa (Bihar) - 852127",
  mapUrl: "",
  phone: "+91 99550 53555",
  email: "info@ambitionclasses.org",
};

const Contact = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH SETTINGS
  // =========================================
  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/settings/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch contact details"
        );
      }

      if (data.success && data.settings) {
        setSettings({
          ...defaultSettings,
          ...data.settings,
        });
      }
    } catch (error) {
      console.error("Contact settings error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =========================================
  // FORM CHANGE
  // =========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // FORM SUBMIT
  // =========================================
  const handleSubmit = (event) => {
    event.preventDefault();

    const subject =
      form.subject.trim() || "Website Enquiry";

    const body = `
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Message:
${form.message}
    `;

    const mailtoUrl =
      `mailto:${settings.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  const phoneNumber = settings.phone?.replace(/\s+/g, "");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* ================= TOP BAR ================= */}
      <TopBar />

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-[#eff9f7] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1550px]">
          <div className="max-w-3xl">
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Get In Touch
            </p>

            <h1 className="font-sans text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              <span className="text-[#00553f]">
                Contact
              </span>{" "}
              <span className="text-amber-500">
                Us
              </span>
            </h1>

            <p className="mt-4 max-w-2xl font-sans text-sm leading-7 text-gray-600 sm:text-base">
              Have a question about admissions, coaching
              programs or our educational initiatives? Get in
              touch with Ambition Classes.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1550px]">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* ================= LEFT INFO ================= */}
            <div className="lg:col-span-2">
              <div className="mb-7">
                <h2 className="font-sans text-2xl font-extrabold sm:text-3xl">
                  <span className="text-[#00553f]">
                    Let's
                  </span>{" "}
                  <span className="text-amber-500">
                    Connect
                  </span>
                </h2>

                <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-gray-600">
                  We are here to help you with admissions,
                  courses, guidance and other enquiries.
                </p>
              </div>

              {/* ADDRESS */}
              <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff9f7] text-[#00553f]">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-bold text-gray-900 sm:text-base">
                      Address
                    </h3>

                    <p className="mt-1 font-sans text-sm leading-6 text-gray-600">
                      {loading
                        ? "Loading..."
                        : settings.address}
                    </p>

                    {settings.mapUrl && (
                      <a
                        href={settings.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#00553f] transition hover:text-amber-500"
                      >
                        View on Map
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* PHONE */}
              <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff9f7] text-[#00553f]">
                    <Phone size={20} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-bold text-gray-900 sm:text-base">
                      Phone
                    </h3>

                    <a
                      href={
                        phoneNumber
                          ? `tel:${phoneNumber}`
                          : "#"
                      }
                      className="mt-1 block font-sans text-sm text-gray-600 transition hover:text-[#00553f]"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff9f7] text-[#00553f]">
                    <Mail size={20} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-bold text-gray-900 sm:text-base">
                      Email
                    </h3>

                    <a
                      href={`mailto:${settings.email}`}
                      className="mt-1 block break-all font-sans text-sm text-gray-600 transition hover:text-[#00553f]"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* OFFICE HOURS */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff9f7] text-[#00553f]">
                    <Clock size={20} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-bold text-gray-900 sm:text-base">
                      Office Hours
                    </h3>

                    <p className="mt-1 font-sans text-sm leading-6 text-gray-600">
                      Monday - Saturday
                      <br />
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="mb-6">
                  <h2 className="font-sans text-2xl font-extrabold sm:text-3xl">
                    <span className="text-[#00553f]">
                      Send Us a
                    </span>{" "}
                    <span className="text-amber-500">
                      Message
                    </span>
                  </h2>

                  <p className="mt-2 font-sans text-sm leading-6 text-gray-600">
                    Fill in the details below and we will get
                    back to you.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* NAME + PHONE */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block font-sans text-xs font-semibold text-gray-700"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-sans text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block font-sans text-xs font-semibold text-gray-700"
                      >
                        Mobile Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-sans text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                      />
                    </div>
                  </div>

                  {/* EMAIL + SUBJECT */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block font-sans text-xs font-semibold text-gray-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-sans text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1.5 block font-sans text-xs font-semibold text-gray-700"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-sans text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                      />
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block font-sans text-xs font-semibold text-gray-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      rows={6}
                      required
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 font-sans text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00553f] px-5 py-3 font-sans text-sm font-bold text-white transition hover:bg-[#004331]"
                  >
                    <Send size={16} />
                    Send Message
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      {settings.mapUrl && (
        <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1550px]">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <h2 className="font-sans text-xl font-extrabold">
                    <span className="text-[#00553f]">
                      Find
                    </span>{" "}
                    <span className="text-amber-500">
                      Us
                    </span>
                  </h2>

                  <p className="mt-1 font-sans text-sm text-gray-600">
                    View our location on Google Maps.
                  </p>
                </div>

                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#00553f] px-4 py-2.5 font-sans text-xs font-bold text-white transition hover:bg-[#004331]"
                >
                  Open Map
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="flex h-72 items-center justify-center bg-[#eff9f7] px-6 text-center sm:h-80">
                <div>
                  <MapPin
                    size={42}
                    className="mx-auto text-[#00553f]"
                  />

                  <p className="mt-3 font-sans text-sm font-semibold text-gray-700">
                    Ambition Classes
                  </p>

                  <p className="mt-1 max-w-md font-sans text-xs leading-5 text-gray-500">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Contact;