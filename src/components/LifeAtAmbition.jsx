import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
} from "lucide-react";

const API_URL = "http://localhost:5000";

// =========================================
// IMAGE URL HELPER
// =========================================
const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("/uploads")) {
    return `${API_URL}${image}`;
  }

  return image;
};

// =========================================
// LIFE CARD
// =========================================
const LifeCard = ({ title, image }) => {
  const imageUrl = getImageUrl(image);

  return (
    <a
      href="/gallery"
      className="group relative h-[120px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 font-sans shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:h-[150px] lg:h-[165px]"
    >
      {/* Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
          <Camera size={24} />
        </div>
      )}

      {/* Dark Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Small Camera Icon */}
      <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 font-sans text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
        <Camera size={13} />
      </div>

      {/* Bottom Overlay */}
      <div className="absolute inset-x-0 bottom-0 px-3 py-2.5">
        <p className="font-sans text-center text-[10px] font-bold text-white sm:text-xs">
          {title}
        </p>
      </div>
    </a>
  );
};

// =========================================
// LIFE AT AMBITION
// =========================================
const LifeAtAmbition = () => {
  const [lifeCards, setLifeCards] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/gallery/public`
        );

        const data = await response.json();

        if (data.success) {
          setLifeCards(
            data.gallery || []
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch gallery:",
          error
        );
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="bg-white px-4 py-4 font-sans sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[1550px]">

        {/* =========================
            HEADING
        ========================== */}
        <div className="mb-4 flex items-end justify-between gap-3">

          <div>
            <div className="flex items-center gap-2">

              <span className="h-6 w-1 rounded-full bg-[#00563f]" />

              <h2 className="font-sans text-xl font-extrabold sm:text-2xl">
                <span className="font-sans text-[#00553f]">
                  Life at{" "}
                </span>

                <span className="font-sans text-amber-500">
                  Ambition
                </span>
              </h2>

            </div>

            <p className="mt-1 font-sans text-[10px] text-gray-500 sm:text-xs">
              Learning Beyond the Classroom.
            </p>
          </div>

          {/* View Gallery */}
          <a
            href="/gallery"
            className="group flex shrink-0 items-center gap-1.5 rounded-full border border-[#00563f]/25 bg-white px-4 py-2 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white sm:px-5 sm:py-2.5 sm:text-xs"
          >
            <span className="font-sans">
              View Gallery
            </span>

            <ArrowRight
              size={15}
              className="transition duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* =========================
            ONE ROW - ONLY 4 IMAGES
        ========================== */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {lifeCards.slice(0, 4).map((card) => (
            <LifeCard
              key={card._id}
              title={card.title}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAtAmbition;