import {
  CalendarDays,
  Newspaper,
  FileText,
  ArrowRight,
  Download,
  LoaderCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

// =========================================
// DATE BOX
// =========================================
const DateBox = ({ day, month }) => {
  return (
    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-[#00563f]/10 bg-[#eff9f7] font-sans shadow-sm transition duration-200 group-hover:border-[#00563f]/20 group-hover:bg-[#e5f5ef]">
      <span className="font-sans text-sm font-extrabold leading-none text-[#00563f]">
        {day}
      </span>

      <span className="mt-0.5 font-sans text-[8px] font-semibold uppercase tracking-wide text-gray-500">
        {month}
      </span>
    </div>
  );
};

// =========================================
// EVENTS NEWS
// =========================================
const EventsNews = () => {
  // ========================================
  // EVENTS
  // ========================================
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] =
    useState(true);
  const [eventsError, setEventsError] =
    useState("");

  // ========================================
  // NEWS
  // ========================================
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] =
    useState(true);
  const [newsError, setNewsError] =
    useState("");

  // ========================================
  // BROCHURE
  // ========================================
  const [brochure, setBrochure] = useState(null);
  const [brochureLoading, setBrochureLoading] =
    useState(true);

  // =========================================
  // FETCH EVENTS
  // =========================================
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      setEventsError("");

      const response = await fetch(
        `${API_URL}/api/events/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch events"
        );
      }

      setEvents(
        (data.events || [])
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateA - dateB;
          })
          .slice(0, 3)
      );
    } catch (error) {
      console.error(
        "Events fetch error:",
        error.message
      );

      setEventsError(error.message);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  // =========================================
  // FETCH NEWS
  // =========================================
  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError("");

      const response = await fetch(
        `${API_URL}/api/news/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch news"
        );
      }

      setNews(
        (data.news || [])
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateB - dateA;
          })
          .slice(0, 3)
      );
    } catch (error) {
      console.error(
        "News fetch error:",
        error.message
      );

      setNewsError(error.message);
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  // =========================================
  // FETCH BROCHURE
  // =========================================
  const fetchBrochure = async () => {
    try {
      setBrochureLoading(true);

      const response = await fetch(
        `${API_URL}/api/brochure/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch brochure"
        );
      }

      setBrochure(data.brochure || null);
    } catch (error) {
      console.error(
        "Brochure fetch error:",
        error.message
      );

      setBrochure(null);
    } finally {
      setBrochureLoading(false);
    }
  };

  // =========================================
  // LOAD ALL DATA
  // =========================================
  useEffect(() => {
    fetchEvents();
    fetchNews();
    fetchBrochure();
  }, []);

  // =========================================
  // FORMAT DATE
  // =========================================
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
    };
  };

  return (
    <section className="bg-white px-4 py-4 font-sans sm:px-6 sm:py-6">
      <div className="mx-auto grid max-w-[1550px] gap-4 lg:grid-cols-3">

        {/* =====================================
            UPCOMING EVENTS
        ====================================== */}
        <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white font-sans shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#00563f]/15 hover:shadow-md">

          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-3">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff9f7]">
                <CalendarDays
                  size={17}
                  className="text-[#00563f]"
                />
              </div>

              <h2 className="font-sans text-base font-extrabold sm:text-lg">
                <span className="font-sans text-[#00553f]">
                  Upcoming{" "} Events
                </span>

           
                 
                
              </h2>
            </div>

            <a
              href="#"
              className="group/link flex items-center gap-1.5 rounded-full border border-[#00563f]/20 bg-white px-3 py-1.5 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white sm:text-xs"
            >
              <span className="font-sans">
                View All
              </span>

              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>

          <div className="divide-y divide-gray-100 px-4">

            {/* Loading */}
            {eventsLoading && (
              <div className="flex min-h-[150px] items-center justify-center">
                <LoaderCircle
                  size={24}
                  className="animate-spin text-[#00563f]"
                />
              </div>
            )}

            {/* Error */}
            {!eventsLoading && eventsError && (
              <div className="px-2 py-8 text-center">
                <p className="font-sans text-xs text-red-500">
                  Unable to load events.
                </p>
              </div>
            )}

            {/* Empty */}
            {!eventsLoading &&
              !eventsError &&
              events.length === 0 && (
                <div className="px-2 py-8 text-center">
                  <p className="font-sans text-xs text-gray-400">
                    No upcoming events.
                  </p>
                </div>
              )}

            {/* Events */}
            {!eventsLoading &&
              !eventsError &&
              events.map((event) => {
                const date = formatDate(event.date);

                return (
                  <a
                    href="#"
                    key={event._id}
                    className="group flex items-center gap-3 rounded-md px-1 py-3 font-sans transition duration-200 hover:bg-[#f8fbfa]"
                  >
                    <DateBox
                      day={date.day}
                      month={date.month}
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate font-sans text-[10px] font-semibold text-gray-700 transition group-hover:text-[#00563f] sm:text-[11px]">
                        {event.title}
                      </h3>

                      {event.subtitle && (
                        <p className="mt-0.5 truncate font-sans text-[9px] text-gray-500 sm:text-[10px]">
                          {event.subtitle}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      size={13}
                      className="shrink-0 text-gray-300 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:text-[#00563f] group-hover:opacity-100"
                    />
                  </a>
                );
              })}
          </div>
        </div>

        {/* =====================================
            NEWS & UPDATES
        ====================================== */}
        <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white font-sans shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#00563f]/15 hover:shadow-md">

          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-3">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff9f7]">
                <Newspaper
                  size={17}
                  className="text-[#00563f]"
                />
              </div>

              <h2 className="font-sans text-base font-extrabold sm:text-lg">
                
                <span className="font-sans text-[#00553f]">
                  News &{" "}  Updates
                </span>
              </h2>
            </div>

            <a
              href="#"
              className="group/link flex items-center gap-1.5 rounded-full border border-[#00563f]/20 bg-white px-3 py-1.5 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white sm:text-xs"
            >
              <span className="font-sans">
                View All
              </span>

              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>

          <div className="divide-y divide-gray-100 px-4">

            {/* Loading */}
            {newsLoading && (
              <div className="flex min-h-[150px] items-center justify-center">
                <LoaderCircle
                  size={24}
                  className="animate-spin text-[#00563f]"
                />
              </div>
            )}

            {/* Error */}
            {!newsLoading && newsError && (
              <div className="px-2 py-8 text-center">
                <p className="font-sans text-xs text-red-500">
                  Unable to load news.
                </p>
              </div>
            )}

            {/* Empty */}
            {!newsLoading &&
              !newsError &&
              news.length === 0 && (
                <div className="px-2 py-8 text-center">
                  <p className="font-sans text-xs text-gray-400">
                    No news available.
                  </p>
                </div>
              )}

            {/* News */}
            {!newsLoading &&
              !newsError &&
              news.map((item) => {
                const date = formatDate(item.date);

                return (
                  <a
                    href="#"
                    key={item._id}
                    className="group flex items-center gap-3 rounded-md px-1 py-3 font-sans transition duration-200 hover:bg-[#f8fbfa]"
                  >
                    <DateBox
                      day={date.day}
                      month={date.month}
                    />

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate font-sans text-[10px] font-semibold text-gray-700 transition group-hover:text-[#00563f] sm:text-[11px]">
                          {item.title}
                        </h3>

                        {item.isNew && (
                          <span className="shrink-0 rounded-full bg-red-500 px-1.5 py-0.5 font-sans text-[7px] font-bold text-white shadow-sm">
                            New
                          </span>
                        )}
                      </div>

                      {item.subtitle && (
                        <p className="mt-0.5 truncate font-sans text-[9px] text-gray-500 sm:text-[10px]">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      size={13}
                      className="shrink-0 text-gray-300 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:text-[#00563f] group-hover:opacity-100"
                    />
                  </a>
                );
              })}
          </div>
        </div>

        {/* =====================================
            DOWNLOAD BROCHURE
        ====================================== */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-blue-100 bg-[#eaf6ff] p-5 font-sans shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/60" />

          <div className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-blue-100/60" />

          <div className="relative">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <FileText
                size={24}
                className="text-[#00563f]"
              />
            </div>

            <h2 className="mt-3 font-sans text-lg font-extrabold sm:text-xl">
             

              <span className="font-sans text-[#00553f]">
                  Download{" "}  Brochure
                </span>
            </h2>

            <p className="mt-1 font-sans text-[10px] leading-relaxed text-gray-600 sm:text-xs">
              Get detailed information about our Coaching Programs,
              Courses, Faculty, Facilities and more.
            </p>
          </div>

          {/* Brochure Button */}
          {brochureLoading ? (
            <div className="relative mt-4 flex w-fit items-center gap-2 rounded-full bg-[#00563f] px-4 py-2.5 font-sans text-[10px] font-bold text-white sm:text-xs">
              <LoaderCircle
                size={14}
                className="animate-spin"
              />

              <span className="font-sans">
                Loading...
              </span>
            </div>
          ) : brochure ? (
            <a
              href={`${API_URL}${brochure.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              download={brochure.fileName}
              className="group/button relative mt-4 flex w-fit items-center gap-2 rounded-full bg-[#00563f] px-4 py-2.5 font-sans text-[10px] font-bold text-white shadow-sm transition duration-200 hover:bg-[#004832] sm:text-xs"
            >
              <span className="font-sans">
                Download Now
              </span>

              <Download
                size={14}
                className="transition-transform duration-200 group-hover/button:translate-y-0.5"
              />
            </a>
          ) : (
            <span className="relative mt-4 flex w-fit items-center gap-2 rounded-full bg-gray-400 px-4 py-2.5 font-sans text-[10px] font-bold text-white sm:text-xs">
              Brochure Not Available
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsNews;