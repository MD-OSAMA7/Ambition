import {
  Save,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Map,
  LoaderCircle,
} from "lucide-react";

import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const defaultSettings = {
  address: "Ranibagh, Bakhtiyarpur, Saharsa (Bihar) - 852127",
  mapUrl: "",
  phone: "+91 99550 53555",
  email: "info@ambitionclasses.org",
  facebook: "",
  youtube: "",
  instagram: "",
  linkedin: "",
};

const SettingsManagement = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // TOKEN
  // =========================================
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================
  // FETCH SETTINGS
  // =========================================
  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch settings"
        );
      }

      setSettings({
        address:
          data.settings?.address ||
          defaultSettings.address,

        mapUrl:
          data.settings?.mapUrl || "",

        phone:
          data.settings?.phone ||
          defaultSettings.phone,

        email:
          data.settings?.email ||
          defaultSettings.email,

        facebook:
          data.settings?.facebook || "",

        youtube:
          data.settings?.youtube || "",

        instagram:
          data.settings?.instagram || "",

        linkedin:
          data.settings?.linkedin || "",
      });
    } catch (err) {
      console.error(
        "Fetch settings error:",
        err
      );

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =========================================
  // SAVE SETTINGS
  // =========================================
  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save settings"
        );
      }

      setSettings({
        ...defaultSettings,
        ...data.settings,
      });

      setMessage(
        "Website settings saved successfully."
      );
    } catch (err) {
      console.error(
        "Save settings error:",
        err
      );

      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // RESET
  // =========================================
  const handleReset = () => {
    setSettings(defaultSettings);
    setMessage("");
    setError("");
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle
          size={32}
          className="animate-spin text-[#00563f]"
        />
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Website Settings
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Manage contact information and social media links.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-6 space-y-5"
      >

        {/* SUCCESS */}
        {message && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        {/* ===================================
            CONTACT INFORMATION
        ==================================== */}
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex items-center gap-2">
            <Phone
              size={18}
              className="text-[#00563f]"
            />

            <h2 className="text-sm font-bold text-gray-800">
              Contact Information
            </h2>
          </div>

          <div className="mt-5 space-y-4">

            {/* Address */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter website address"
                  className="w-full resize-none rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* Map Link */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Google Maps Link
              </label>

              <div className="relative">
                <Map
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="url"
                  name="mapUrl"
                  value={settings.mapUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Mobile Number
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  placeholder="+91 99550 53555"
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="info@ambitionclasses.org"
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ===================================
            SOCIAL MEDIA
        ==================================== */}
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex items-center gap-2">
            <FaInstagram
              size={18}
              className="text-[#00563f]"
            />

            <h2 className="text-sm font-bold text-gray-800">
              Social Media Links
            </h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            {/* Facebook */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Facebook URL
              </label>

              <div className="relative">
                <FaFacebook
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                />

                <input
                  type="url"
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                YouTube URL
              </label>

              <div className="relative">
                <FaYoutube
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                />

                <input
                  type="url"
                  name="youtube"
                  value={settings.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Instagram URL
              </label>

              <div className="relative">
                <FaInstagram
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500"
                />

                <input
                  type="url"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                LinkedIn URL
              </label>

              <div className="relative">
                <FaLinkedin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                />

                <input
                  type="url"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/..."
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ===================================
            BUTTONS
        ==================================== */}
        <div className="flex flex-col-reverse gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-md bg-[#00563f] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#004832] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={14}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Settings
              </>
            )}
          </button>

        </div>
      </form>
    </div>
  );
};

export default SettingsManagement;