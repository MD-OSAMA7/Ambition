import { useEffect, useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Download,
  FileText,
  LoaderCircle,
  Newspaper,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000";

// =====================================================
// DATE BOX
// =====================================================
const DateBox = ({ day, month }) => {
  return (
    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-[#00553f]/10 bg-[#eff9f7] shadow-sm">
      <span className="font-sans text-xl font-extrabold leading-none text-[#00553f]">
        {day}
      </span>

      <span className="mt-1 font-sans text-[9px] font-bold uppercase tracking-wide text-gray-500">
        {month}
      </span>
    </div>
  );
};

// =====================================================
// FORMAT DATE
// =====================================================
const formatDate = (dateString) => {
  const date = new Date(dateString);

  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", {
      month: "short",
    }),
    full: date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };
};

const NewsEvents = () => {
  // =====================================================
  // EVENTS
  // =====================================================
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  // =====================================================
  // NEWS
  // =====================================================
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");

  // =====================================================
  // BROCHURE
  // =====================================================
  const [brochure, setBrochure] = useState(null);
  const [brochureLoading, setBrochureLoading] = useState(true);

  // =====================================================
  // FETCH EVENTS
  // =====================================================
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
          data.message || "Failed to fetch events"
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

  // =====================================================
  // FETCH NEWS
  // =====================================================
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
          data.message || "Failed to fetch news"
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

  // =====================================================
  // FETCH BROCHURE
  // =====================================================
  const fetchBrochure = async () => {
    try {
      setBrochureLoading(true);

      const response = await fetch(
        `${API_URL}/api/brochure/public`
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
        "Brochure fetch error:",
        error.message
      );

      setBrochure(null);
    } finally {
      setBrochureLoading(false);
    }
  };

  // =====================================================
  // LOAD ALL DATA
  // =====================================================
  useEffect(() => {
    fetchEvents();
    fetchNews();
    fetchBrochure();
  }, []);

  return (
    <div className="bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#00553f]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003c2d] via-[#00553f] to-[#00745a]" />

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-amber-500/5" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1550px] items-center px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-3xl text-white">

            <div className="flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-amber-500" />

              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
                Stay Updated
              </p>
            </div>

            <h1 className="mt-4 font-sans text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
              News &{" "}
              <span className="text-amber-500">
                Events
              </span>
            </h1>

            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
              Stay informed about the latest activities,
              announcements, events and important updates
              from Ambition Classes.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                <CalendarDays
                  size={15}
                  className="text-amber-500"
                />

                <span className="font-sans text-xs font-semibold">
                  Upcoming Events
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                <Newspaper
                  size={15}
                  className="text-amber-500"
                />

                <span className="font-sans text-xs font-semibold">
                  Latest Updates
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 font-sans text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
              >
                View Events
                <ArrowRight size={15} />
              </a>

              <a
                href="#news"
                className="inline-flex items-center gap-2 rounded-md border border-white/50 px-5 py-2.5 font-sans text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                Read News
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENTS + NEWS
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] gap-7 lg:grid-cols-2">

          {/* =================================================
              EVENTS
          ================================================== */}
          <div id="events">
            <div className="flex items-end justify-between gap-3">

              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f] sm:text-xs">
                  What's Happening
                </p>

                <h2 className="mt-2 font-sans text-3xl font-extrabold sm:text-4xl">
                  <span className="text-[#00553f]">
                    Upcoming
                  </span>{" "}
                  <span className="text-amber-500">
                    Events
                  </span>
                </h2>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#eef8f5] sm:flex">
                <CalendarDays
                  size={21}
                  className="text-[#00553f]"
                />
              </div>
            </div>

            {/* Loading */}
            {eventsLoading && (
              <div className="mt-6 flex min-h-[250px] items-center justify-center rounded-xl border border-[#dcece6] bg-[#f7fcfa]">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-[#00553f]"
                />
              </div>
            )}

            {/* Error */}
            {!eventsLoading && eventsError && (
              <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-5 py-12 text-center">
                <p className="font-sans text-sm font-semibold text-red-500">
                  Unable to load events.
                </p>

                <p className="mt-1 font-sans text-xs text-red-400">
                  Please check the server connection.
                </p>
              </div>
            )}

            {/* Empty */}
            {!eventsLoading &&
              !eventsError &&
              events.length === 0 && (
                <div className="mt-6 rounded-xl border border-[#dcece6] bg-[#f7fcfa] px-5 py-14 text-center">
                  <CalendarDays
                    size={36}
                    className="mx-auto text-[#00553f]"
                  />

                  <h3 className="mt-4 font-sans text-base font-bold text-[#00553f]">
                    No Upcoming Events
                  </h3>

                  <p className="mt-2 font-sans text-xs text-slate-500 sm:text-sm">
                    New events and announcements will appear
                    here.
                  </p>
                </div>
              )}

            {/* Events */}
            {!eventsLoading &&
              !eventsError &&
              events.length > 0 && (
                <div className="mt-6 space-y-3">
                  {events.map((event) => {
                    const date = formatDate(event.date);

                    return (
                      <article
                        key={event._id}
                        className="group rounded-xl border border-[#dcece6] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">

                          <DateBox
                            day={date.day}
                            month={date.month}
                          />

                          <div className="min-w-0 flex-1">
                            <p className="font-sans text-[9px] font-bold uppercase tracking-wide text-[#00553f] sm:text-[10px]">
                              {date.full}
                            </p>

                            <h3 className="mt-1 font-sans text-sm font-bold leading-snug text-slate-800 sm:text-base">
                              {event.title}
                            </h3>

                            {event.subtitle && (
                              <p className="mt-1.5 font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                                {event.subtitle}
                              </p>
                            )}
                          </div>

                          <ArrowRight
                            size={17}
                            className="mt-1 shrink-0 text-[#00553f] opacity-40 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
          </div>

          {/* =================================================
              NEWS
          ================================================== */}
          <div id="news">
            <div className="flex items-end justify-between gap-3">

              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f] sm:text-xs">
                  Latest Updates
                </p>

                <h2 className="mt-2 font-sans text-3xl font-extrabold sm:text-4xl">
                  <span className="text-[#00553f]">
                    News &
                  </span>{" "}
                  <span className="text-amber-500">
                    Updates
                  </span>
                </h2>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#eef8f5] sm:flex">
                <Newspaper
                  size={21}
                  className="text-[#00553f]"
                />
              </div>
            </div>

            {/* Loading */}
            {newsLoading && (
              <div className="mt-6 flex min-h-[250px] items-center justify-center rounded-xl border border-[#dcece6] bg-[#f7fcfa]">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-[#00553f]"
                />
              </div>
            )}

            {/* Error */}
            {!newsLoading && newsError && (
              <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-5 py-12 text-center">
                <p className="font-sans text-sm font-semibold text-red-500">
                  Unable to load news.
                </p>

                <p className="mt-1 font-sans text-xs text-red-400">
                  Please check the server connection.
                </p>
              </div>
            )}

            {/* Empty */}
            {!newsLoading &&
              !newsError &&
              news.length === 0 && (
                <div className="mt-6 rounded-xl border border-[#dcece6] bg-[#f7fcfa] px-5 py-14 text-center">
                  <Newspaper
                    size={36}
                    className="mx-auto text-[#00553f]"
                  />

                  <h3 className="mt-4 font-sans text-base font-bold text-[#00553f]">
                    No News Available
                  </h3>

                  <p className="mt-2 font-sans text-xs text-slate-500 sm:text-sm">
                    Latest updates will appear here.
                  </p>
                </div>
              )}

            {/* News */}
            {!newsLoading &&
              !newsError &&
              news.length > 0 && (
                <div className="mt-6 space-y-3">
                  {news.map((item) => {
                    const date = formatDate(item.date);

                    return (
                      <article
                        key={item._id}
                        className="group rounded-xl border border-[#dcece6] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">

                          <DateBox
                            day={date.day}
                            month={date.month}
                          />

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-sans text-[9px] font-bold uppercase tracking-wide text-[#00553f] sm:text-[10px]">
                                {date.full}
                              </p>

                              {item.isNew && (
                                <span className="rounded-full bg-red-500 px-2 py-0.5 font-sans text-[7px] font-bold uppercase tracking-wide text-white shadow-sm sm:text-[8px]">
                                  New
                                </span>
                              )}
                            </div>

                            <h3 className="mt-1 font-sans text-sm font-bold leading-snug text-slate-800 transition group-hover:text-[#00553f] sm:text-base">
                              {item.title}
                            </h3>

                            {item.subtitle && (
                              <p className="mt-1.5 font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                                {item.subtitle}
                              </p>
                            )}
                          </div>

                          <ArrowRight
                            size={17}
                            className="mt-1 shrink-0 text-[#00553f] opacity-40 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONNECTED DATABASE INFO
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] rounded-2xl border border-[#dcece6] bg-white p-5 shadow-sm sm:p-7">

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f7f2]">
              <BellRing
                size={20}
                className="text-[#00553f]"
              />
            </div>

            <div>
              <h3 className="font-sans text-base font-bold text-[#00553f] sm:text-lg">
                Stay Connected With Ambition Classes
              </h3>

              <p className="mt-1.5 font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                This page automatically displays the latest
                events and news published from the Ambition
                Classes management system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BROCHURE
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1100px]">

          <div className="overflow-hidden rounded-2xl bg-[#00553f]">
            <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <FileText
                    size={23}
                    className="text-amber-500"
                  />
                </div>

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-amber-500">
                    Information
                  </p>

                  <h2 className="mt-2 font-sans text-2xl font-extrabold text-white sm:text-3xl">
                    Download{" "}
                    <span className="text-amber-500">
                      Brochure
                    </span>
                  </h2>

                  <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-white/75">
                    Get detailed information about our
                    programs, courses, faculty and facilities.
                  </p>
                </div>
              </div>

              {/* Brochure Button */}
              {brochureLoading ? (
                <div className="flex w-fit shrink-0 items-center gap-2 rounded-md bg-white/10 px-5 py-3 font-sans text-xs font-bold text-white/70 sm:text-sm">
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />

                  Loading...
                </div>
              ) : brochure?.fileUrl ? (
                <a
                  href={`${API_URL}${brochure.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={brochure.fileName}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-amber-500 px-5 py-3 font-sans text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
                >
                  <Download size={16} />
                  Download Now
                </a>
              ) : (
                <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white/10 px-5 py-3 font-sans text-xs font-semibold text-white/60 sm:text-sm">
                  Brochure Not Available
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />
    </div>
  );
};

export default NewsEvents;