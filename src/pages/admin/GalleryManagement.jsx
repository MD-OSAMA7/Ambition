import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Images,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // =========================================
  // ADMIN TOKEN
  // =========================================
  const token = localStorage.getItem("adminToken");

  // =========================================
  // FETCH GALLERY
  // =========================================
  const fetchGallery = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/gallery`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch gallery");
      }

      setGallery(data.gallery || []);
    } catch (error) {
      console.error("Fetch gallery error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================================
  // OPEN ADD MODAL
  // =========================================
  const handleAdd = () => {
    setEditingItem(null);
    setTitle("");
    setOrder(0);
    setSelectedFile(null);
    setPreview("");
    setShowModal(true);
  };

  // =========================================
  // OPEN EDIT MODAL
  // =========================================
  const handleEdit = (item) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setOrder(item.order || 0);
    setSelectedFile(null);

    // Cloudinary URL directly
    setPreview(item.image || "");

    setShowModal(true);
  };

  // =========================================
  // CLOSE MODAL
  // =========================================
  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingItem(null);
    setTitle("");
    setOrder(0);
    setSelectedFile(null);
    setPreview("");
  };

  // =========================================
  // FILE SELECT
  // =========================================
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG and WEBP images are allowed.");

      event.target.value = "";
      return;
    }

    // File size validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");

      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Local preview before Cloudinary upload
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // =========================================
  // SAVE / UPDATE
  // =========================================
  const handleSave = async () => {
    // Title validation
    if (!title.trim()) {
      alert("Please enter gallery title.");
      return;
    }

    // Image required only when creating
    if (!editingItem && !selectedFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("order", Number(order) || 0);

      // Important:
      // Backend receives this as req.file
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const url = editingItem
        ? `${API_URL}/api/gallery/${editingItem._id}`
        : `${API_URL}/api/gallery`;

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save gallery");
      }

      alert(
        editingItem
          ? "Gallery updated successfully."
          : "Gallery image uploaded successfully."
      );

      closeModal();

      // Refresh gallery
      await fetchGallery();
    } catch (error) {
      console.error("Save gallery error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete gallery");
      }

      alert("Gallery image deleted successfully.");

      await fetchGallery();
    } catch (error) {
      console.error("Delete gallery error:", error);
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Images
              className="text-[#00553f]"
              size={24}
            />

            <h1 className="text-2xl font-bold text-gray-900">
              Gallery Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage gallery images displayed on the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#00553f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004331]"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {/* =========================================
          GALLERY GRID
      ========================================= */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading gallery...
          </p>
        </div>
      ) : gallery.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <Images
            className="mx-auto text-gray-300"
            size={42}
          />

          <h3 className="mt-4 text-sm font-semibold text-gray-700">
            No gallery images found
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Add your first gallery image.
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#00553f] px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Actions */}
                <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 shadow disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] text-gray-400">
                  Order: {item.order || 0}
                </p>
              </div>

              {/* Mobile Actions */}
              <div className="flex gap-2 border-t border-gray-100 p-3 sm:hidden">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-50 py-2 text-xs font-semibold text-blue-600"
                >
                  <Pencil size={13} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md bg-red-50 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingItem
                    ? "Edit Gallery Image"
                    : "Add Gallery Image"}
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Upload image and add gallery title.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5">

              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Gallery Image
                </label>

                <label
                  htmlFor="gallery-image"
                  className="block cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#00553f]">

                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="aspect-[4/3] w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition hover:opacity-100">
                          <span className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-700">
                            <Upload size={14} />
                            Change Image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf6f2] text-[#00553f]">
                          <Upload size={21} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-gray-700">
                          Upload Image
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          JPG, JPEG, PNG or WEBP — Max 5 MB
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    id="gallery-image"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Classroom Learning"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                />
              </div>

              {/* Order */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Display Order
                </label>

                <input
                  type="number"
                  value={order}
                  onChange={(event) =>
                    setOrder(event.target.value)
                  }
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#00553f] focus:ring-2 focus:ring-[#00553f]/10"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#00553f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004331] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {editingItem ? "Update" : "Add Image"}
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;