import { useEffect, useState } from "react";
import {
  Upload,
  Save,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_IMAGES = ["", "", "", ""];

/* =========================================
   IMAGE URL HELPER
========================================= */
const getImageUrl = (image) => {
  if (!image) return "";

  // New Cloudinary format
  if (typeof image === "object") {
    return image.url || "";
  }

  // Old string format
  if (typeof image === "string") {
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return image;
  }

  return "";
};

const HeroManagement = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(
    Array(4).fill(null)
  );
  const [previews, setPreviews] = useState(
    Array(4).fill("")
  );

  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState(null);

  const token = localStorage.getItem("adminToken");

  /* =========================================
     FETCH HERO
  ========================================= */
  const fetchHero = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/hero`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch hero"
        );
      }

      const apiImages = data.hero?.images || [];

      const formattedImages = Array.from(
        { length: 4 },
        (_, index) => apiImages[index] || ""
      );

      setImages(formattedImages);

      setPreviews(
        formattedImages.map((image, index) => {
          return (
            getImageUrl(image) ||
            DEFAULT_IMAGES[index]
          );
        })
      );

      setSelectedFiles(Array(4).fill(null));
    } catch (error) {
      console.error("Fetch hero error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  /* =========================================
     FILE SELECT
  ========================================= */
  const handleFileChange = (index, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");

      event.target.value = "";
      return;
    }

    // Save selected file
    setSelectedFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    // Local preview
    const objectUrl = URL.createObjectURL(file);

    setPreviews((prev) => {
      const updated = [...prev];
      updated[index] = objectUrl;
      return updated;
    });
  };

  /* =========================================
     SAVE ONE IMAGE
  ========================================= */
  const handleSave = async (index) => {
    const file = selectedFiles[index];

    if (!file) {
      alert("Please select a new image first.");
      return;
    }

    try {
      setSavingIndex(index);

      const formData = new FormData();

      // VERY IMPORTANT
      // Backend expects req.file from "image"
      formData.append("image", file);

      const response = await fetch(
        `${API_URL}/api/hero/image/${index}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update hero image"
        );
      }

      alert("Hero image updated successfully.");

      // Refresh data from server
      await fetchHero();
    } catch (error) {
      console.error("Save hero error:", error);
      alert(error.message);
    } finally {
      setSavingIndex(null);
    }
  };

  /* =========================================
     RESET ONE IMAGE
  ========================================= */
  const handleReset = (index) => {
    setSelectedFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setPreviews((prev) => {
      const updated = [...prev];

      updated[index] =
        getImageUrl(images[index]) ||
        DEFAULT_IMAGES[index];

      return updated;
    });
  };

  return (
    <div className="space-y-6">

      {/* =========================================
          HEADER
      ========================================= */}
      <div>
        <div className="flex items-center gap-2">
          <ImageIcon
            size={24}
            className="text-[#00553f]"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            Hero Section Management
          </h1>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Manage exactly your four hero images.
        </p>

        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700">
          You can manage exactly your hero images. Uploading
          a new image will replace the selected image slot.
        </div>
      </div>

      {/* =========================================
          LOADING
      ========================================= */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading hero images...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >

              {/* =========================================
                  IMAGE PREVIEW
              ========================================= */}
              <div className="aspect-[16/8] overflow-hidden bg-gray-100">
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={`Hero Image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <ImageIcon size={42} />
                  </div>
                )}
              </div>

              {/* =========================================
                  CONTENT
              ========================================= */}
              <div className="p-5">

                <h2 className="text-lg font-bold text-gray-900">
                  Hero Image {index + 1}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Slot {index + 1} of 4
                </p>

                {/* =========================================
                    FILE INPUT
                ========================================= */}
                <label
                  htmlFor={`hero-image-${index}`}
                  className="mt-4 block cursor-pointer"
                >
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 px-4 py-3 transition hover:border-[#00553f] hover:bg-gray-50">
                    <Upload
                      size={19}
                      className="shrink-0 text-gray-500"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">
                        {selectedFiles[index]
                          ? selectedFiles[index].name
                          : "Choose a new image"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        JPG, JPEG, PNG or WEBP — Max 5 MB
                      </p>
                    </div>
                  </div>

                  <input
                    id={`hero-image-${index}`}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                      handleFileChange(index, event)
                    }
                    className="hidden"
                  />
                </label>

                {/* =========================================
                    ACTIONS
                ========================================= */}
                <div className="mt-4 flex gap-3">

                  <button
                    type="button"
                    onClick={() => handleSave(index)}
                    disabled={
                      savingIndex === index ||
                      !selectedFiles[index]
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#00553f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004331] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingIndex === index ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReset(index)}
                    disabled={
                      savingIndex === index
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    <RotateCcw size={17} />
                    Reset
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default HeroManagement;