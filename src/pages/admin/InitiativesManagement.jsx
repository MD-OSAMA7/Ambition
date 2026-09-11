import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Plus,
  LoaderCircle,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const createEmptyForm = () => ({
  title: "",
  year: "",
  subtitle: "",
  points: ["", "", "", ""],
  order: 0,
});

const InitiativesManagement = () => {
  const [initiatives, setInitiatives] = useState([]);

  const [form, setForm] = useState(createEmptyForm());

  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [logoPreview, setLogoPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // GET ADMIN TOKEN
  // =========================================
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================
  // FETCH INITIATIVES
  // =========================================
  const fetchInitiatives = async () => {
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
        `${API_URL}/api/initiatives`,
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
          data.message || "Failed to load initiatives"
        );
      }

      setInitiatives(data.initiatives || []);
    } catch (err) {
      console.error(
        "Initiatives fetch error:",
        err.message
      );

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // POINT CHANGE
  // =========================================
  const handlePointChange = (index, value) => {
    setForm((prev) => {
      const updatedPoints = [...prev.points];

      updatedPoints[index] = value;

      return {
        ...prev,
        points: updatedPoints,
      };
    });
  };

  // =========================================
  // ADD POINT
  // =========================================
  const addPoint = () => {
    setForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  // =========================================
  // REMOVE POINT
  // =========================================
  const removePoint = (index) => {
    setForm((prev) => ({
      ...prev,
      points: prev.points.filter(
        (_, pointIndex) => pointIndex !== index
      ),
    }));
  };

  // =========================================
  // LOGO CHANGE
  // =========================================
  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Logo must be less than 5 MB.");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setError("");
  };

  // =========================================
  // IMAGE CHANGE
  // =========================================
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5 MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  // =========================================
  // RESET
  // =========================================
  const resetForm = () => {
    setForm(createEmptyForm());

    setLogoFile(null);
    setImageFile(null);

    setLogoPreview("");
    setImagePreview("");

    setEditingId(null);
  };

  // =========================================
  // SAVE / UPDATE
  // =========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.year.trim()) {
      setError("Year is required.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("year", form.year);
      formData.append("subtitle", form.subtitle);

      formData.append(
        "points",
        JSON.stringify(
          form.points
            .map((point) => point.trim())
            .filter(Boolean)
        )
      );

      formData.append("order", form.order);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingId
        ? `${API_URL}/api/initiatives/${editingId}`
        : `${API_URL}/api/initiatives`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save initiative"
        );
      }

      if (editingId) {
        setInitiatives((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? data.initiative
              : item
          )
        );

        setMessage(
          "Initiative updated successfully."
        );
      } else {
        setInitiatives((prev) => [
          ...prev,
          data.initiative,
        ]);

        setMessage(
          "Initiative added successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Initiative save error:",
        err.message
      );

      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (initiative) => {
    const existingPoints =
      Array.isArray(initiative.points) &&
      initiative.points.length > 0
        ? initiative.points
        : ["", "", "", ""];

    setForm({
      title: initiative.title || "",
      year: initiative.year || "",
      subtitle: initiative.subtitle || "",
      points: existingPoints,
      order: initiative.order || 0,
    });

    setEditingId(initiative._id);

    setLogoFile(null);
    setImageFile(null);

    setLogoPreview(
      initiative.logo
        ? `${API_URL}${initiative.logo}`
        : ""
    );

    setImagePreview(
      initiative.image
        ? `${API_URL}${initiative.image}`
        : ""
    );

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      setError("");
      setMessage("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/initiatives/${id}`,
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
          data.message || "Failed to delete initiative"
        );
      }

      setInitiatives((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setMessage(
        "Initiative deleted successfully."
      );
    } catch (err) {
      console.error(
        "Initiative delete error:",
        err.message
      );

      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ====================================== */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Initiatives Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage logo, image, title, year, subtitle and all
          points of the three initiative cards.
        </p>
      </div>

      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}
      {message && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      {/* =====================================
          ERROR MESSAGE
      ====================================== */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* =====================================
          FORM
      ====================================== */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {editingId
                ? "Edit Initiative"
                : "Add Initiative"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Everything visible in the initiative card can
              be managed from here.
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* =================================
              LOGO + IMAGE
          ================================== */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LOGO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Initiative Logo
              </label>

              <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition hover:border-[#00563f] hover:bg-green-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="mb-3 h-24 w-24 object-contain"
                  />
                ) : (
                  <ImageIcon
                    size={40}
                    className="mb-3 text-gray-400"
                  />
                )}

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Upload size={17} />
                  Choose Logo
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>

              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG, WEBP or SVG. Maximum 5 MB.
              </p>
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Bottom Left Image
              </label>

              <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition hover:border-[#00563f] hover:bg-green-50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Initiative preview"
                    className="mb-3 h-24 w-full rounded-lg object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={40}
                    className="mb-3 text-gray-400"
                  />
                )}

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Upload size={17} />
                  Choose Image
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG or WEBP. Maximum 5 MB.
              </p>
            </div>
          </div>

          {/* =================================
              TITLE + YEAR
          ================================== */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ambition Classes"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Year
              </label>

              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="Since 2016"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
              />
            </div>
          </div>

          {/* =================================
              SUBTITLE
          ================================== */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Competitive & Academic Excellence"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* =================================
              POINTS
          ================================== */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Points
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  These will appear with check icons.
                </p>
              </div>

              <button
                type="button"
                onClick={addPoint}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#00563f] px-3 py-2 text-xs font-semibold text-[#00563f] transition hover:bg-green-50"
              >
                <Plus size={15} />
                Add Point
              </button>
            </div>

            <div className="space-y-3">
              {form.points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={point}
                    onChange={(event) =>
                      handlePointChange(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Point ${index + 1}`}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  />

                  {form.points.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removePoint(index)
                      }
                      className="rounded-lg border border-red-200 px-3 text-red-500 transition hover:bg-red-50"
                      aria-label={`Remove point ${
                        index + 1
                      }`}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* =================================
              DISPLAY ORDER
          ================================== */}
          <div className="max-w-xs">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* =================================
              SAVE BUTTON
          ================================== */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-w-[175px] items-center justify-center gap-2 rounded-lg bg-[#00563f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004733] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />

                  {editingId
                    ? "Update Initiative"
                    : "Add Initiative"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =====================================
          EXISTING INITIATIVES
      ====================================== */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Existing Initiatives
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {initiatives.length} initiative
            {initiatives.length !== 1 ? "s" : ""} found.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <LoaderCircle
              size={32}
              className="animate-spin text-[#00563f]"
            />
          </div>
        ) : initiatives.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <ImageIcon
              size={40}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 font-semibold text-gray-800">
              No initiatives found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first initiative using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {initiatives.map((initiative) => {
              const logoUrl = initiative.logo
                ? `${API_URL}${initiative.logo}`
                : "";

              const imageUrl = initiative.image
                ? `${API_URL}${initiative.image}`
                : "";

              return (
                <div
                  key={initiative._id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Logo + title */}
                  <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${initiative.title} logo`}
                        className="h-14 w-14 object-contain"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <ImageIcon
                          size={22}
                          className="text-gray-400"
                        />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-gray-900">
                        {initiative.title}
                      </h3>

                      <p className="text-xs text-[#00563f]">
                        {initiative.year}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={initiative.title}
                      className="h-36 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-36 items-center justify-center bg-gray-100">
                      <ImageIcon
                        size={34}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {initiative.subtitle && (
                      <p className="text-sm font-semibold text-gray-700">
                        {initiative.subtitle}
                      </p>
                    )}

                    <div className="mt-3 space-y-1.5">
                      {initiative.points
                        ?.slice(0, 5)
                        .map((point, index) => (
                          <p
                            key={index}
                            className="text-xs leading-5 text-gray-500"
                          >
                            ✓ {point}
                          </p>
                        ))}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(initiative)
                        }
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            initiative._id
                          )
                        }
                        disabled={
                          deletingId ===
                          initiative._id
                        }
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId ===
                        initiative._id ? (
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}

                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiativesManagement;