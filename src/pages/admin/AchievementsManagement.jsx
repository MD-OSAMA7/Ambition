import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  LoaderCircle,
  Plus,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const createEmptyForm = () => ({
  value: "",
  descriptionLine1: "",
  descriptionLine2: "",
  order: 0,
});

const AchievementsManagement = () => {
  const [achievements, setAchievements] = useState([]);

  const [form, setForm] = useState(
    createEmptyForm()
  );

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================
  // FETCH
  // =========================================
  const fetchAchievements = async () => {
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
        `${API_URL}/api/achievements`,
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
          data.message ||
            "Failed to fetch achievements"
        );
      }

      setAchievements(data.achievements || []);
    } catch (err) {
      console.error(
        "Achievement fetch error:",
        err.message
      );

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // =========================================
  // INPUT
  // =========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // RESET
  // =========================================
  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
  };

  // =========================================
  // SAVE / UPDATE
  // =========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.value.trim()) {
      setError("Achievement value is required.");
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

      const url = editingId
        ? `${API_URL}/api/achievements/${editingId}`
        : `${API_URL}/api/achievements`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save achievement"
        );
      }

      if (editingId) {
        setAchievements((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? data.achievement
              : item
          )
        );

        setMessage(
          "Achievement updated successfully."
        );
      } else {
        setAchievements((prev) => [
          ...prev,
          data.achievement,
        ]);

        setMessage(
          "Achievement added successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Achievement save error:",
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
  const handleEdit = (achievement) => {
    setEditingId(achievement._id);

    /*
      Old records compatibility:
      If old record has "label", use it as line 1.
    */
    setForm({
      value: achievement.value || "",

      descriptionLine1:
        achievement.descriptionLine1 ||
        achievement.label ||
        "",

      descriptionLine2:
        achievement.descriptionLine2 || "",

      order: achievement.order || 0,
    });

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
        `${API_URL}/api/achievements/${id}`,
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
            "Failed to delete achievement"
        );
      }

      setAchievements((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage(
        "Achievement deleted successfully."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Achievements Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage value and each description line
          separately.
        </p>
      </div>

      {/* SUCCESS */}
      {message && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* FORM */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {editingId
                ? "Edit Achievement"
                : "Add Achievement"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Each description line can be changed
              independently.
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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

          {/* VALUE */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Achievement Value
            </label>

            <input
              type="text"
              name="value"
              value={form.value}
              onChange={handleChange}
              placeholder="500+"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f]"
            />
          </div>

          {/* LINE 1 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description Line 1
            </label>

            <input
              type="text"
              name="descriptionLine1"
              value={form.descriptionLine1}
              onChange={handleChange}
              placeholder="Selections in IIT-JEE &"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f]"
            />
          </div>

          {/* LINE 2 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description Line 2
            </label>

            <input
              type="text"
              name="descriptionLine2"
              value={form.descriptionLine2}
              onChange={handleChange}
              placeholder="Other Competitive Exams"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f]"
            />
          </div>

          {/* ORDER */}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f]"
            />
          </div>

          {/* SAVE */}
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
                  {editingId ? (
                    <Save size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                  {editingId
                    ? "Update Achievement"
                    : "Add Achievement"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* EXISTING */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Existing Achievements
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {achievements.length} achievement
            {achievements.length !== 1
              ? "s"
              : ""}{" "}
            found.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <LoaderCircle
              size={32}
              className="animate-spin text-[#00563f]"
            />
          </div>
        ) : achievements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="font-semibold text-gray-800">
              No achievements found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first achievement above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                {/* Value */}
                <p className="text-3xl font-extrabold text-[#00563f]">
                  {achievement.value}
                </p>

                {/* Line 1 */}
                {achievement.descriptionLine1 && (
                  <p className="mt-2 text-sm font-semibold leading-5 text-gray-700">
                    {achievement.descriptionLine1}
                  </p>
                )}

                {/* Line 2 */}
                {achievement.descriptionLine2 && (
                  <p className="text-sm font-semibold leading-5 text-gray-700">
                    {achievement.descriptionLine2}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-400">
                  Order: {achievement.order}
                </p>

                {/* Buttons */}
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(achievement)
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        achievement._id
                      )
                    }
                    disabled={
                      deletingId ===
                      achievement._id
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-60"
                  >
                    {deletingId ===
                    achievement._id ? (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsManagement;