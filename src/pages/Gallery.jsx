import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  LoaderCircle,
  X,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // =====================================================
  // FETCH GALLERY
  // =====================================================
  const fetchGallery = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/gallery/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch gallery"
        );
      }

      const items = (data.gallery || []).sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      setGallery(items);
    } catch (error) {
      console.error(
        "Gallery fetch error:",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // =====================================================
  // LIGHTBOX
  // =====================================================
  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }

      return current === 0
        ? gallery.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }

      return current === gallery.length - 1
        ? 0
        : current + 1;
    });
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <TopBar />
        <Navbar />

        <div className="flex min-h-[500px] items-center justify-center">
          <LoaderCircle
            size={36}
            className="animate-spin text-[#00553f]"
          />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#00553f]">
        {gallery.length > 0 && (
          <div className="absolute inset-0">
            <img
              src={gallery[0].image}
              alt={gallery[0].title || "Ambition Classes Gallery"}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#003d2d]/95 via-[#00553f]/80 to-[#00553f]/20" />
          </div>
        )}

        {gallery.length === 0 && (
          <div className="absolute inset-0 bg-[#00553f]" />
        )}

        <div className="relative mx-auto grid min-h-[420px] max-w-[1550px] items-center px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10">

          {/* Left */}
          <div className="max-w-2xl text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
              Memories That Inspire
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="text-amber-500">
                Gallery
              </span>
            </h1>

            <p className="mt-4 text-lg font-semibold text-white/95 sm:text-xl">
              Moments of learning, celebration and togetherness.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Explore memories from Ambition Classes and
              discover the people, activities and moments that
              make our journey special.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Images
                  size={16}
                  className="text-amber-500"
                />

                <span className="text-xs font-bold">
                  {gallery.length} Photos
                </span>
              </div>
            </div>

            <a
              href="#gallery"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
            >
              Explore Photos
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          GALLERY HEADER
      ===================================================== */}
      <section
        id="gallery"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto max-w-[1450px]">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
                Our Memories
              </p>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                <span className="text-[#00553f]">
                  Moments That
                </span>{" "}
                <span className="text-amber-500">
                  Matter
                </span>
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                A glimpse into learning, activities,
                celebrations and everyday moments at
                Ambition Classes.
              </p>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-2 rounded-md bg-[#eef8f5] px-4 py-2.5">
                <Images
                  size={17}
                  className="text-[#00553f]"
                />

                <span className="text-xs font-bold text-[#00553f]">
                  {gallery.length} Photos
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================== */}
          {gallery.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#dcece6] bg-[#f5fbf8] px-5 py-16 text-center">
              <Images
                size={40}
                className="mx-auto text-[#00553f]"
              />

              <h3 className="mt-4 text-lg font-bold text-[#00553f]">
                No Photos Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Gallery photos will appear here once they are
                added.
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  MAIN GALLERY GRID
              ================================================== */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item, index) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group relative overflow-hidden rounded-xl border border-[#dcece6] bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#eef8f5]">
                      <img
                        src={item.image}
                        alt={
                          item.title ||
                          "Ambition Classes Gallery"
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                      {/* Number */}
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-[10px] font-bold text-white backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Bottom content */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white sm:text-base">
                              {item.title ||
                                "Ambition Classes"}
                            </p>

                            <p className="mt-1 text-[10px] font-medium text-white/75 sm:text-xs">
                              View Full Photo
                            </p>
                          </div>

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur-sm transition duration-300 group-hover:bg-amber-500 group-hover:text-[#00553f]">
                            <ArrowRight size={15} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          MEMORY CTA
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Images
              size={23}
              className="text-[#00553f]"
            />
          </div>

          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            <span className="text-[#00553f]">
              Every Moment
            </span>{" "}
            <span className="text-amber-500">
              Tells a Story
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            From classrooms and activities to celebrations
            and achievements, every memory reflects our
            journey of learning and growth.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#00553f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#004532] sm:text-sm"
          >
            Connect With Us
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}
      {selectedIndex !== null &&
        gallery[selectedIndex] && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
            
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-[#00553f]"
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>

            {/* Previous */}
            {gallery.length > 1 && (
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-[#00553f] sm:left-6"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Image */}
            <div className="flex max-h-[90vh] max-w-[1200px] flex-col items-center">
              <img
                src={gallery[selectedIndex].image}
                alt={
                  gallery[selectedIndex].title ||
                  "Ambition Classes Gallery"
                }
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />

              <div className="mt-4 text-center">
                <h3 className="font-sans text-base font-bold text-white sm:text-lg">
                  {gallery[selectedIndex].title ||
                    "Ambition Classes"}
                </h3>

                <p className="mt-1 font-sans text-xs text-white/60">
                  {selectedIndex + 1} / {gallery.length}
                </p>
              </div>
            </div>

            {/* Next */}
            {gallery.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-[#00553f] sm:right-6"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export default Gallery;