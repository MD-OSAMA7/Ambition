import {
  FileText,
  Upload,
  Trash2,
  Save,
  Download,
  LoaderCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const BrochureManagement = () => {
  // =========================================
  // CURRENT BROCHURE
  // =========================================
  const [brochure, setBrochure] = useState(null);

  // =========================================
  // SELECTED FILE
  // =========================================
  const [selectedFile, setSelectedFile] = useState(null);

  // =========================================
  // LOADING STATES
  // =========================================
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // =========================================
  // FETCH CURRENT BROCHURE
  // =========================================
  const fetchBrochure = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/brochure`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch brochure"
        );
      }

      setBrochure(data.brochure || null);
    } catch (error) {
      console.error(
        "Fetch brochure error:",
        error.message
      );

      setBrochure(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD BROCHURE
  // =========================================
  useEffect(() => {
    fetchBrochure();
  }, []);

  // =========================================
  // FILE CHANGE
  // =========================================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // PDF validation
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    // 10 MB validation
    if (file.size > 10 * 1024 * 1024) {
      alert("Brochure size must be less than 10 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  // =========================================
  // SAVE / UPLOAD BROCHURE
  // =========================================
  const handleSave = async () => {
    if (!selectedFile) {
      alert("Please select a new brochure first.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      const formData = new FormData();

      formData.append(
        "brochure",
        selectedFile
      );

      formData.append(
        "title",
        "Ambition Classes Brochure"
      );

      const response = await fetch(
        `${API_URL}/api/brochure`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload brochure"
        );
      }

      setBrochure(data.brochure);
      setSelectedFile(null);

      // Reset file input
      const fileInput =
        document.getElementById(
          "brochure-upload"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      alert("Brochure uploaded successfully.");
    } catch (error) {
      console.error(
        "Upload brochure error:",
        error.message
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE BROCHURE
  // =========================================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brochure?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/brochure`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete brochure"
        );
      }

      setBrochure(null);
      setSelectedFile(null);

      alert("Brochure deleted successfully.");
    } catch (error) {
      console.error(
        "Delete brochure error:",
        error.message
      );

      alert(error.message);
    } finally {
      setDeleting(false);
    }
  };

  // =========================================
  // FILE SIZE
  // =========================================
  const formatFileSize = (size) => {
    if (!size) return "0 MB";

    return `${(
      size /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div>
        {/* Page Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Brochure
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Upload and manage the brochure available on the website.
          </p>
        </div>

        <div className="flex min-h-[250px] items-center justify-center">
          <LoaderCircle
            size={28}
            className="animate-spin text-[#00563f]"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Brochure
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Upload and manage the brochure available on the website.
        </p>
      </div>

      {/* Current Brochure */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
        {brochure ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-4 sm:px-5">
              <FileText
                size={20}
                className="text-[#00563f]"
              />

              <div>
                <h2 className="text-sm font-bold text-gray-800">
                  Current Brochure
                </h2>

                <p className="text-[10px] text-gray-500">
                  This file is used by the Download Brochure button.
                </p>
              </div>
            </div>

            {/* File Details */}
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-red-50">
                  <FileText
                    size={22}
                    className="text-red-500"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-700">
                    {brochure.fileName}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-400">
                    PDF
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`${API_URL}${brochure.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-[#00563f] hover:text-[#00563f]"
                >
                  <Download size={14} />
                  View
                </a>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-red-500 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete brochure"
                >
                  {deleting ? (
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <FileText
              size={32}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-semibold text-gray-600">
              No brochure available
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Upload a PDF brochure below.
            </p>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold text-gray-800">
          Upload New Brochure
        </h2>

        <p className="mt-1 text-[10px] text-gray-500">
          Only PDF files are accepted.
        </p>

        <label
          htmlFor="brochure-upload"
          className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-5 py-10 text-center transition hover:border-[#00563f] hover:bg-[#f5faf8]"
        >
          <Upload
            size={30}
            className="text-[#00563f]"
          />

          <p className="mt-3 text-sm font-semibold text-gray-700">
            Choose Brochure PDF
          </p>

          <p className="mt-1 text-[10px] text-gray-400">
            Click to browse your computer
          </p>

          <span className="mt-3 rounded-md bg-[#00563f] px-4 py-2 text-xs font-semibold text-white">
            Select PDF
          </span>
        </label>

        <input
          id="brochure-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Selected File */}
        {selectedFile && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-[#f5faf8] px-3 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <FileText
                size={17}
                className="shrink-0 text-red-500"
              />

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-gray-700">
                  {selectedFile.name}
                </p>

                <p className="text-[9px] text-gray-400">
                  {formatFileSize(
                    selectedFile.size
                  )}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-[9px] font-semibold text-green-600">
              Selected
            </span>
          </div>
        )}

        {/* Save */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-[#00563f] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#004832] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle
                size={15}
                className="animate-spin"
              />
            ) : (
              <Save size={15} />
            )}

            {saving
              ? "Uploading..."
              : "Save Brochure"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrochureManagement;