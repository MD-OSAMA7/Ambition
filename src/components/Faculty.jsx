import { useEffect, useState } from "react";
import {
  ArrowRight,
  LoaderCircle,
  UserRound,
} from "lucide-react";

const API_URL = "http://localhost:5000";

// --------------------------------------------------
// FALLBACK DATA
// Backend unavailable hone par same UI/data dikhega
// --------------------------------------------------
const fallbackFaculty = [
  {
    _id: "fallback-1",
    name: " ",
    subject: "Physics",
    image: "/faculty/wazir-zaheer.jpg",
  },
  {
    _id: "fallback-2",
    name: " ",
    subject: "Chemistry",
    image: "/faculty/b-kumar.jpg",
  },
  {
    _id: "fallback-3",
    name: " ",
    subject: "Biology",
    image: "/faculty/rahul-singh.jpg",
  },
  {
    _id: "fallback-4",
    name: " ",
    subject: "Biology",
    image: "/faculty/savan-kumar.jpg",
  },
  {
    _id: "fallback-5",
    name: " ",
    subject: "Mathematics (IV-XII)",
    image: "/faculty/md-ali.jpg",
  },
  {
    _id: "fallback-6",
    name: " ",
    subject: "Mathematics (IV-XII)",
    image: "/faculty/md-noor.jpg",
  },
  {
    _id: "fallback-7",
    name: " ",
    subject: "History",
    image: "/faculty/md-iman.jpg",
  },
  {
    _id: "fallback-8",
    name: " ",
    subject: "Geography",
    image: "/faculty/kundan-kumar.jpg",
  },
  {
    _id: "fallback-9",
    name: " ",
    subject: "Sociology",
    image: "/faculty/aman-kumar.jpg",
  },
];

// --------------------------------------------------
// IMAGE URL HELPER
// Cloudinary + old local image dono support
// --------------------------------------------------
const getImageUrl = (image) => {
  if (!image) return "";

  // Cloudinary URL
  if (image.startsWith("http")) {
    return image;
  }

  // Old local uploads
  if (image.startsWith("/uploads")) {
    return `${API_URL}${image}`;
  }

  // Public folder image
  return image;
};

// --------------------------------------------------
// FACULTY CARD
// --------------------------------------------------
const FacultyCard = ({
  name,
  subject,
  image,
}) => {
  const imageUrl = getImageUrl(image);

  return (
    <div className="group min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white font-sans shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name || subject}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-sans text-gray-400">
            <UserRound size={30} />
          </div>
        )}

        {/* Soft Image Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="px-2.5 py-2.5 text-center font-sans">

        {/* Name */}
        <h3 className="truncate font-sans text-[11px] font-extrabold leading-tight text-blue-900 sm:text-xs">
          {name || "Faculty Member"}
        </h3>

        {/* Subject */}
        <div className="mt-1 flex items-center justify-center gap-1">

          <span className="h-1 w-1 rounded-full bg-blue-500" />

          <p className="truncate font-sans text-[9px] font-semibold text-blue-600 sm:text-[10px]">
            {subject}
          </p>

        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------
// FACULTY SECTION
// --------------------------------------------------
const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculty = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/faculty/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch faculty"
        );
      }

      if (
        Array.isArray(data.faculty) &&
        data.faculty.length > 0
      ) {
        setFaculty(
          data.faculty.slice(0, 9)
        );
      } else {
        setFaculty(fallbackFaculty);
      }
    } catch (error) {
      console.error(
        "Faculty fetch error:",
        error.message
      );

      setFaculty(fallbackFaculty);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ------------------------------------------------
  // LOADING
  // ------------------------------------------------
  if (loading) {
    return (
      <section className="bg-white px-4 py-4 font-sans sm:px-6 sm:py-6">
        <div className="mx-auto flex min-h-[250px] max-w-[1550px] items-center justify-center">
          <LoaderCircle
            size={28}
            className="animate-spin text-blue-800"
          />
        </div>
      </section>
    );
  }

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  return (
    <section className="bg-white px-4 py-4 font-sans sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[1550px]">

        {/* Heading */}
        <div className="mb-4 flex items-end justify-between gap-3">

          <div>
            <div className="flex items-center gap-2">

              <span className="h-6 w-1 rounded-full bg-blue-700" />

              <h2 className="font-sans text-xl font-extrabold sm:text-2xl">
                <span className="font-sans text-[#00553f]">
                  Our{" "}
                </span>

                <span className="font-sans text-amber-500">
                  Faculty
                </span>
              </h2>

            </div>

            <p className="mt-1 font-sans text-[10px] text-gray-500 sm:text-xs">
              Learn from experienced and dedicated subject experts.
            </p>
          </div>

          {/* View All Faculty */}
          <a
            href="/faculty"
            className="group flex shrink-0 items-center gap-1.5 rounded-full border border-[#00563f]/25 bg-white px-4 py-2 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white sm:px-5 sm:py-2.5 sm:text-xs"
          >
            <span className="font-sans">
              View All Faculty
            </span>

            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9">
          {faculty
            .slice(0, 9)
            .map((member) => (
              <FacultyCard
                key={member._id}
                name={member.name}
                subject={member.subject}
                image={member.image}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;