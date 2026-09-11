import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Upload,
  Plus,
  LoaderCircle,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const emptyForm = {
  name: "",
  subject: "",
  order: 0,
};

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // TOKEN
  // =========================================
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================
  // FETCH FACULTY
  // =========================================
  const fetchFaculty = async () => {
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
        `${API_URL}/api/faculty`,
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
          data.message || "Failed to fetch faculty"
        );
      }

      setFaculty(data.faculty || []);
    } catch (err) {
      console.error("Faculty fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
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
  // IMAGE CHANGE
  // =========================================
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5 MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    setError("");
    setMessage("");
  };

  // =========================================
  // RESET FORM
  // =========================================
  const resetForm = () => {
    setForm(emptyForm);

    setImageFile(null);
    setImagePreview("");

    setEditingId(null);
  };

  // =========================================
  // ADD / UPDATE
  // =========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.name.trim()) {
      setError("Faculty name is required.");
      return;
    }

    if (!form.subject.trim()) {
      setError("Subject is required.");
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

      formData.append("name", form.name.trim());
      formData.append("subject", form.subject.trim());
      formData.append("order", String(form.order));

      // Image is optional during edit.
      // Existing image will remain when no new image is selected.
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingId
        ? `${API_URL}/api/faculty/${editingId}`
        : `${API_URL}/api/faculty`;

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
          data.message || "Failed to save faculty"
        );
      }

      // =====================================
      // UPDATE EXISTING
      // =====================================
      if (editingId) {
        setFaculty((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? data.faculty
              : item
          )
        );

        setMessage(
          "Faculty updated successfully."
        );
      }

      // =====================================
      // ADD NEW
      // =====================================
      else {
        setFaculty((prev) => [
          ...prev,
          data.faculty,
        ]);

        setMessage(
          "Faculty added successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error("Faculty save error:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (member) => {
    setEditingId(member._id);

    setForm({
      name: member.name || "",
      subject: member.subject || "",
      order: member.order || 0,
    });

    setImageFile(null);

    if (member.image) {
      setImagePreview(
        member.image.startsWith("http")
          ? member.image
          : `${API_URL}${member.image}`
      );
    } else {
      setImagePreview("");
    }

    setError("");
    setMessage("");

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
        `${API_URL}/api/faculty/${id}`,
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
          data.message || "Failed to delete faculty"
        );
      }

      setFaculty((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage(
        "Faculty deleted successfully."
      );
    } catch (err) {
      console.error("Faculty delete error:", err);
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
          Faculty Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage faculty name, subject, image and display
          order.
        </p>
      </div>

      {/* =====================================
          SUCCESS
      ====================================== */}
      {message && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      {/* =====================================
          ERROR
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
                ? "Edit Faculty"
                : "Add Faculty"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a new image only when you want to
              replace the existing one.
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
          className="space-y-5"
        >
          {/* =================================
              IMAGE
          ================================== */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Faculty Image
            </label>

            <label className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition hover:border-[#00563f] hover:bg-green-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Faculty preview"
                  className="mb-3 h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <ImageIcon
                  size={42}
                  className="mb-3 text-gray-400"
                />
              )}

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Upload size={17} />
                {editingId
                  ? "Choose New Image"
                  : "Choose Image"}
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="mt-2 text-xs text-gray-500">
              JPG, JPEG, PNG or WEBP. Maximum 5 MB.
            </p>
          </div>

          {/* =================================
              NAME
          ================================== */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Faculty Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Er. Wazir Zaheer"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* =================================
              SUBJECT
          ================================== */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Physics"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* =================================
              ORDER
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
              SAVE
          ================================== */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-lg bg-[#00563f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004733] disabled:cursor-not-allowed disabled:opacity-60"
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
                  {editingId ? (
                    <Save size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                  {editingId
                    ? "Update Faculty"
                    : "Add Faculty"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =====================================
          EXISTING FACULTY
      ====================================== */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Existing Faculty
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {faculty.length} faculty member
            {faculty.length !== 1 ? "s" : ""} found.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <LoaderCircle
              size={32}
              className="animate-spin text-[#00563f]"
            />
          </div>
        ) : faculty.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="font-semibold text-gray-800">
              No faculty found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first faculty member above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {faculty.map((member) => {
              const imageUrl = member.image
                ? member.image.startsWith("http")
                  ? member.image
                  : `${API_URL}${member.image}`
                : "";

              return (
                <div
                  key={member._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={member.name}
                      className="h-52 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-gray-100">
                      <ImageIcon
                        size={40}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-[#00563f]">
                      {member.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Order: {member.order}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(member)
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
                            member._id
                          )
                        }
                        disabled={
                          deletingId === member._id
                        }
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === member._id ? (
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <>
                            <Trash2 size={15} />
                            Delete
                          </>
                        )}
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

export default FacultyManagement;