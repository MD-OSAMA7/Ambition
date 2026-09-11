import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const defaultImages = ["/hero.png", "/hero2.png", "/hero3.png", "/hero4.png"];

/* =========================================
   IMAGE URL HELPER
   Supports:
   1. Old local image string
   2. Cloudinary object { url, publicId }
========================================= */
const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object") {
    return image.url || "";
  }

  return "";
};

/* =========================================
   HERO FEATURES
========================================= */
const features = [
  {
    icon: GraduationCap,
    line1: "Experienced",
    line2: "Faculty",
  },
  {
    icon: BookOpen,
    line1: "Concept Based",
    line2: "Learning",
  },
  {
    icon: BarChart3,
    line1: "Regular Test",
    line2: "Series",
  },
  {
    icon: Users,
    line1: "Personal",
    line2: "Attention",
  },
  {
    icon: Trophy,
    line1: "Proven",
    line2: "Results",
  },
];

const Hero = () => {
  const [images, setImages] = useState(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* =========================================
     FETCH HERO IMAGES
  ========================================= */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(`${API_URL}/api/hero/public`);
        const data = await response.json();

        if (data.success && data.hero?.images?.length) {
          const apiImages = data.hero.images.map(getImageUrl).filter(Boolean);

          if (apiImages.length > 0) {
            setImages(apiImages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero:", error);

        // fallback images
        setImages(defaultImages);
      }
    };

    fetchHero();
  }, []);

  /* =========================================
     AUTO SLIDER
  ========================================= */
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  /* =========================================
     KEEP INDEX SAFE
  ========================================= */
  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  const currentImage = images[currentIndex] || defaultImages[0];

  return (
    <section className="relative overflow-hidden">
      {/* =========================================
          HERO CONTAINER
      ========================================= */}
      <div
        className="
          relative
          h-[430px]
          xs:h-[510px]
          sm:h-[520px]
          md:h-[530px]
          lg:h-[540px]
          xl:h-[550px]
        "
      >
        {/* =========================================
            BACKGROUND IMAGE
        ========================================= */}
        <img
          src={currentImage}
          alt="Ambition Classes"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* =========================================
            IMAGE OVERLAY
        ========================================= */}
        <div className="absolute inset-100 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#003f31]/99 via-[#00553f]/30 to-[#00553f]/10" />

        {/* =========================================
            HERO CONTENT
        ========================================= */}
        <div className="relative z-10 mx-auto flex h-[420px] sm:h-full max-w-[1550px] items-center px-4 sm:px-6 lg:px-8">
          <div
            className="
              w-full
              max-w-[760px]
              py-8
              sm:py-10
              md:py-12
              lg:py-0
            "
          >
            {/* =========================================
                TOP LABEL
            ========================================= */}
            <p
              className="
                text-[9px]
                font-bold
                font-sans
                uppercase
                tracking-[0.16em]
                text-amber-500
                xs:text-[10px]
                sm:text-xs
                md:text-sm
              "
            >
              SIMRI BAKHTIYARPUR'S TRUSTED
            </p>

            <p
              className="
                font-sans
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-amber-500
                xs:text-[9px]
                sm:text-xs
                md:text-sm
              "
            >
              EDUCATIONAL INSTITUTION
            </p>

            {/* =========================================
                MAIN HEADING
            ========================================= */}
            <h1
              className="
                mt-2
                text-[28px]
                font-black
                leading-[0.98]
                text-white

                xs:text-[27px]

                sm:text-[35px]

                md:text-[43px]

                lg:text-[51px]

                xl:text-[55px]
               font-sans
              "
            >
              TURN YOUR
              <br />
              <span className="text-amber-500">POTENTIAL</span>
              <br />
              INTO
              <span className="text-amber-500"> SUCCESS.</span>
            </h1>

            {/* =========================================
                DESCRIPTION
            ========================================= */}
            <p
              className="
                mt-3
                
                text-[9px]
            font-body
                text-white/90

                xs:text-[11px]

                sm:text-sm
                

                md:max-w-[680px]
              "
            >
              We convert your potential into success with
              <br />
              <span>
                quality education, experienced faculty and concept-based
                learning.
              </span>
            </p>

            {/* Small Tagline */}
            <p
              className="
                mt-3
                text-[10px]
                font-medium
               text-amber-500
tracking-wider
                xs:text-[10px]
font-sans
                sm:text-[14px]
              "
            >
              Schooling | Coaching | Competitive Preparation
            </p>

            {/* =========================================
                BUTTONS
            ========================================= */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-1

                sm:mt-5
                sm:gap-3
              "
            >
              <a
                href="#initiatives"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  bg-amber-500
                 
                  px-0.5
                  py-1.5
                  text-[10px]
                  font-bold
                  font-sans
                  text-emerald-800
                  shadow-md
                  transition
                  hover:bg-amber-600

                  xs:px-3.5
                  xs:py-2.5
                  xs:text-[10px]

                  sm:px-4
                  sm:py-2.5
                  sm:text-xs

                  md:px-5
                "
              >
                Explore Ambition Classes
                <ArrowRight size={12} className="sm:size-[14px]" />
              </a>

              <a
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  border
                  border-white/50
                  bg-white
                  px-3
                  py-2
                  text-[10px]
                font-sans
                  font-bold
                  text-emerald-800
                  backdrop-blur-sm
                  transition
                  hover:bg-white-200
                 

                  xs:px-3.5
                  xs:py-2.5
                  xs:text-[10px]

                  sm:px-4
                  sm:py-2.5
                  sm:text-xs

                  md:px-5
                "
              >
                Enquire Now
                <ArrowRight size={13} className="sm:size-[15px]" />
              </a>
            </div>

            {/* =========================================
                FEATURES
                5 ITEMS - SAME ROW
                2 LINE TEXT
            ========================================= */}
            <div
              className="
                mt-5
                flex
                
                gap-5

                xs:mt-6
                xs:gap-1.5
font-sans
                sm:gap-3

                md:gap-5

                lg:max-w-[720px]
              "
            >
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={`${feature.line1}-${feature.line2}`}
                    className="
                      flex
                      min-w-0
                      flex-col
                      items-center
                      text-center
                      gap-0

                    "
                  >
                    {/* =========================================
                        ICON CIRCLE
                    ========================================= */}
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-amber-500

                        text-white

                        xs:h-9
                        xs:w-9

                        sm:h-10
                        sm:w-10

                        md:h-11
                        md:w-11

                        lg:h-11
                        lg:w-11
                      "
                    >
                      <Icon
                        size={14}
                        className="
                          xs:size-[15px]
                          sm:size-[17px]
                          md:size-[18px]
                        "
                      />
                    </div>

                    {/* =========================================
                        TWO LINE TEXT
                    ========================================= */}
                    <div
                      className="
                        mt-1
                        w-full
                        text-center
                        text-[6px]
                        font-semibold
                        leading-[9px]
                        text-white

                        xs:text-[7px]
                        xs:leading-[10px]

                        sm:mt-1.5
                        sm:text-[9px]
                        sm:leading-3

                        md:text-[10px]
                        md:leading-[13px]

                        lg:text-[10px]
                      "
                    >
                      <div>{feature.line1}</div>
                      <div>{feature.line2}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================
            SLIDER DOTS
        ========================================= */}
        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              left-1/2
              z-20
              flex
              -translate-x-1/2
              items-center
              gap-1.5

              sm:bottom-4
            "
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index === currentIndex
                      ? "w-6 bg-orange-300"
                      : "w-1.5 bg-white/60"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
