import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CalendarDays,
  LoaderCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

const emptyForm = {
  date: "",
  title: "",
  subtitle: "",
};

const EventsManagement = () => {
  const [events, setEvents] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

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
  // FETCH EVENTS
  // =========================================
  const fetchEvents = async () => {
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
        `${API_URL}/api/events`,
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
          data.message || "Failed to fetch events"
        );
      }

      setEvents(data.events || []);
    } catch (err) {
      console.error("Event fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =========================================
  // ADD FORM
  // =========================================
  const openAddForm = () => {
    setEditingEvent(null);
    setFormData(emptyForm);

    setMessage("");
    setError("");

    setShowForm(true);
  };

  // =========================================
  // EDIT FORM
  // =========================================
  const openEditForm = (event) => {
    setEditingEvent(event);

    setFormData({
      date: event.date || "",
      title: event.title || "",
      subtitle: event.subtitle || "",
    });

    setMessage("");
    setError("");

    setShowForm(true);
  };

  // =========================================
  // CLOSE FORM
  // =========================================
  const closeForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData(emptyForm);

    setMessage("");
    setError("");
  };

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!formData.date) {
      setError("Event date is required.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Event title is required.");
      return;
    }

    if (!formData.subtitle.trim()) {
      setError("Subtitle is required.");
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

      const url = editingEvent
        ? `${API_URL}/api/events/${editingEvent._id}`
        : `${API_URL}/api/events`;

      const method = editingEvent ? "PUT" : "POST";

      const body = {
        date: formData.date,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        order: editingEvent
          ? editingEvent.order || 0
          : events.length + 1,
      };

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save event"
        );
      }

      if (editingEvent) {
        setEvents((current) =>
          current.map((event) =>
            event._id === editingEvent._id
              ? data.event
              : event
          )
        );

        setMessage("Event updated successfully.");
      } else {
        setEvents((current) => [
          ...current,
          data.event,
        ]);

        setMessage("Event added successfully.");
      }

      closeForm();

      // Message disappears after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error("Event save error:", err.message);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE
  // =========================================
  const deleteEvent = async (id) => {
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
        `${API_URL}/api/events/${id}`,
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
          data.message || "Failed to delete event"
        );
      }

      setEvents((current) =>
        current.filter((event) => event._id !== id)
      );

      if (editingEvent?._id === id) {
        closeForm();
      }

      setMessage("Event deleted successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error("Event delete error:", err.message);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================
  // DATE FORMAT
  // =========================================
  const formatDate = (date) => {
    const eventDate = new Date(date);

    return {
      day: eventDate.getDate(),

      month: eventDate.toLocaleString("en-US", {
        month: "short",
      }),

      year: eventDate.getFullYear(),
    };
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Upcoming Events
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Manage events displayed on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex w-fit items-center gap-2 rounded-md bg-[#00563f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#004832]"
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Event List */}
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <LoaderCircle
              size={30}
              className="animate-spin text-[#00563f]"
            />
          </div>
        ) : events.length === 0 ? (
          <div className="p-10 text-center">
            <CalendarDays
              size={30}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-semibold text-gray-600">
              No events available
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Add your first upcoming event.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {events.map((event) => {
              const date = formatDate(event.date);

              return (
                <div
                  key={event._id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
                >
                  {/* Date */}
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-[#eef8f5]">
                    <span className="text-lg font-extrabold leading-none text-[#00563f]">
                      {date.day}
                    </span>

                    <span className="mt-1 text-[9px] font-bold uppercase text-gray-500">
                      {date.month}
                    </span>

                    <span className="text-[8px] text-gray-400">
                      {date.year}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-gray-700">
                      {event.title}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {event.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditForm(event)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-[#00563f] hover:text-[#00563f]"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteEvent(event._id)
                      }
                      disabled={
                        deletingId === event._id
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-red-500 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === event._id ? (
                        <LoaderCircle
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {editingEvent
                    ? "Edit Event"
                    : "Add Event"}
                </h2>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  Enter event date and details.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >
              {/* Date */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Event Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Parent-Teacher Meeting"
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Subtitle
                </label>

                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Session 2025-26"
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-md border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
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

                      {editingEvent
                        ? "Update Event"
                        : "Add Event"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManagement;