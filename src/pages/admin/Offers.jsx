import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Power,
  LoaderCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const emptyForm = {
  title: "",
  description: "",
  active: true,
};

const Offers = () => {
  const [offers, setOffers] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================
  // TOKEN
  // =========================================
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================
  // FETCH OFFERS
  // =========================================
  const fetchOffers = async () => {
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
        `${API_URL}/api/offers`,
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
          data.message || "Failed to fetch offers"
        );
      }

      setOffers(data.offers || []);
    } catch (err) {
      console.error("Offer fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================
  // RESET
  // =========================================
  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (offer) => {
    setEditingId(offer._id);

    setForm({
      title:
        offer.title ||
        offer.text ||
        "",
      description:
        offer.description || "",
      active:
        offer.active !== false,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // SAVE / UPDATE
  // =========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.title.trim()) {
      setError("Offer title is required.");
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
        ? `${API_URL}/api/offers/${editingId}`
        : `${API_URL}/api/offers`;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description:
            form.description.trim(),
          active: form.active,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save offer"
        );
      }

      if (editingId) {
        setOffers((prev) =>
          prev.map((offer) =>
            offer._id === editingId
              ? data.offer
              : offer
          )
        );

        setMessage(
          "Offer updated successfully."
        );
      } else {
        setOffers((prev) => [
          data.offer,
          ...prev,
        ]);

        setMessage(
          "Offer added successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Offer save error:",
        err
      );

      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // TOGGLE
  // =========================================
  const handleToggle = async (id) => {
    try {
      setTogglingId(id);
      setMessage("");
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/offers/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to toggle offer"
        );
      }

      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === id
            ? data.offer
            : offer
        )
      );

      setMessage(data.message);
    } catch (err) {
      console.error(
        "Offer toggle error:",
        err
      );

      setError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this offer?"
      );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setMessage("");
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/offers/${id}`,
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
            "Failed to delete offer"
        );
      }

      setOffers((prev) =>
        prev.filter(
          (offer) => offer._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage(
        "Offer deleted successfully."
      );
    } catch (err) {
      console.error(
        "Offer delete error:",
        err
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
          Offers Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage the title and description
          displayed in the top offer ticker.
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
                ? "Edit Offer"
                : "Add Offer"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Set the yellow title and white
              description for the ticker.
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

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Offer Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Admissions Open for 2026-27"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Offer Description
            </label>

            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Classes IV-XII available"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
            />
          </div>

          {/* Active */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-4 w-4 accent-[#00563f]"
            />

            <span className="text-sm font-medium text-gray-700">
              Show this offer in top bar
            </span>
          </label>

          {/* Button */}
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
                    ? "Update Offer"
                    : "Add Offer"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =====================================
          EXISTING OFFERS
      ====================================== */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Existing Offers
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {offers.length} offer
            {offers.length !== 1
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
        ) : offers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="font-semibold text-gray-800">
              No offers found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first offer above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {offers.map((offer) => (
              <div
                key={offer._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >

                {/* Preview */}
                <div className="rounded-lg bg-[#00563f] px-4 py-3">
                  <p className="text-sm font-bold text-yellow-300">
                    {offer.title ||
                      offer.text}
                  </p>

                  {offer.description && (
                    <p className="mt-1 text-[11px] text-white">
                      {offer.description}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {offer.title ||
                          offer.text}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {offer.description ||
                          "No description"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        offer.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {offer.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-3 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(offer)
                      }
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          offer._id
                        )
                      }
                      disabled={
                        togglingId ===
                        offer._id
                      }
                      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        offer.active
                          ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {togglingId ===
                      offer._id ? (
                        <LoaderCircle
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Power size={14} />
                      )}

                      {offer.active
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          offer._id
                        )
                      }
                      disabled={
                        deletingId ===
                        offer._id
                      }
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId ===
                      offer._id ? (
                        <LoaderCircle
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={14} />
                      )}

                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;