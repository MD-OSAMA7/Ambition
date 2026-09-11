import { useEffect, useState } from "react";
import {
  CheckCircle2,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitiatives = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/initiatives/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch initiatives"
        );
      }

      setInitiatives(
        (data.initiatives || []).slice(0, 3)
      );
    } catch (error) {
      console.error(
        "Initiatives fetch error:",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <section className="bg-white px-3 py-8 font-sans sm:px-5 lg:px-8">
        <div className="flex min-h-[300px] items-center justify-center">
          <LoaderCircle
            size={32}
            className="animate-spin text-[#00563f]"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-2.5 py-6 font-sans sm:px-4 lg:px-7">
      <div className="mx-auto max-w-[1600px]">

        {/* =========================
            HEADING
        ========================== */}
        <div className="mb-4 text-center sm:mb-5">
          <p className="font-sans text-[9px] font-bold uppercase tracking-[0.24em] text-[#0057a8] sm:text-[10px]">
            ONE VISION · THREE INITIATIVES
          </p>

          <h2 className="mt-1 font-sans text-[25px] font-extrabold leading-tight sm:text-[29px] md:text-[32px] lg:text-[35px]">
            <span className="text-[#00553f]">Ambition for a</span>{" "}
            <span className="text-amber-500">Brighter Tomorrow.</span>
          </h2>
        </div>

        {/* =========================
            CARDS
        ========================== */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {initiatives.map((initiative, index) => {
            const logoUrl = initiative.logo
              ? `${API_URL}${initiative.logo}`
              : "";

            const imageUrl = initiative.image
              ? `${API_URL}${initiative.image}`
              : "";

            const theme =
              index === 0
                ? {
                    title: "#ef202b",
                    year: "#285d94",
                    subtitle: "#3c658b",
                    check: "#ef202b",
                    bg: "#fff8f8",
                    accent: "#ef202b",
                  }
                : index === 1
                ? {
                    title: "#0759aa",
                    year: "#285d94",
                    subtitle: "#3c658b",
                    check: "#1478d0",
                    bg: "#f6fbff",
                    accent: "#1478d0",
                  }
                : {
                    title: "#065f46",
                    year: "#3b6487",
                    subtitle: "#416c8e",
                    check: "#148954",
                    bg: "#f7fcf8",
                    accent: "#148954",
                  };

            return (
              <article
                key={initiative._id}
                className="group relative min-h-[260px] overflow-hidden rounded-lg border border-[#e1e7e4] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:min-h-[275px]"
                style={{
                  backgroundColor: theme.bg,
                }}
              >
                {/* =====================================
                    IMAGE - BOTTOM RIGHT
                ====================================== */}
                {imageUrl && (
                  <div className="absolute bottom-0 right-0 z-0 h-[72%] w-[62%] overflow-hidden rounded-tl-[28px] rounded-tr-[28px] border-l border-r border-t border-white/80 shadow-sm transition duration-300 group-hover:scale-[1.01]">
                    <img
                      src={imageUrl}
                      alt={initiative.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                )}

                {/* =====================================
                    SOFT WHITE FADE
                ====================================== */}
                <div className="pointer-events-none absolute inset-0 z-10">

                  {/* Top */}
                  <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white via-white/95 to-transparent" />

                  {/* Left */}
                  <div className="absolute inset-y-0 left-0 w-[92%] bg-gradient-to-r from-white via-white/90 to-transparent" />

                  {/* Center */}
                  <div className="absolute bottom-0 left-[16%] h-[60%] w-[55%] bg-gradient-to-r from-white/90 via-white/55 to-transparent" />
                </div>

                {/* =====================================
                    CONTENT
                ====================================== */}
                <div className="relative z-20 p-3.5 sm:p-4">

                  {/* Logo + Title */}
                  <div className="flex items-start gap-2.5">

                    {/* Logo */}
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm ring-1 ring-white/70 sm:h-[62px] sm:w-[62px]">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${initiative.title} logo`}
                          className="h-full w-full rounded-full object-contain"
                        />
                      ) : (
                        <div className="h-full w-full rounded-full border border-gray-200 bg-white" />
                      )}
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1 pt-0.5">

                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="font-sans text-[18px] font-extrabold leading-[1.05] sm:text-[19px]"
                          style={{
                            color: theme.title,
                          }}
                        >
                          {initiative.title}
                        </h3>

                        <span className="mt-0.5 shrink-0 opacity-40 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70">
                          <ArrowUpRight
                            size={15}
                            style={{
                              color: theme.accent,
                            }}
                          />
                        </span>
                      </div>

                      {initiative.year && (
                        <p
                          className="mt-0.5 font-sans text-[10px] font-semibold leading-4 sm:text-[11px]"
                          style={{
                            color: theme.year,
                          }}
                        >
                          {initiative.year}
                        </p>
                      )}

                      {initiative.subtitle && (
                        <p
                          className="font-sans text-[10px] font-medium leading-3.5 sm:text-[11px]"
                          style={{
                            color: theme.subtitle,
                          }}
                        >
                          {initiative.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* =================================
                      POINTS
                  ================================== */}
                  <div className="mt-3 space-y-1.5">
                    {initiative.points
                      ?.slice(0, 5)
                      .map((point, pointIndex) => (
                        <div
                          key={`${initiative._id}-${pointIndex}`}
                          className="flex items-start gap-1.5"
                        >
                          <CheckCircle2
                            size={12}
                            strokeWidth={3}
                            className="mt-[1px] shrink-0"
                            style={{
                              color: theme.check,
                            }}
                          />

                          <span className="font-sans text-[10px] font-semibold leading-relaxed text-[#466079] sm:text-[12px]">
                            {point}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Small accent line */}
                <div
                  className="absolute bottom-0 left-0 z-20 h-1 w-0 transition-all duration-300 group-hover:w-20"
                  style={{
                    backgroundColor: theme.accent,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;