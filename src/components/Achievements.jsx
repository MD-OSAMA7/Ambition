import { useEffect, useState } from "react";
import {
  Trophy,
  Stethoscope,
  Users,
  LoaderCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const fallbackAchievements = [
  {
    _id: "fallback-1",
    value: "500+",
    descriptionLine1: "Selections in IIT-JEE &",
    descriptionLine2: "Other Competitive Exams",
  },
  {
    _id: "fallback-2",
    value: "200+",
    descriptionLine1: "NEET Selections &",
    descriptionLine2: "Medical Admissions",
  },
  {
    _id: "fallback-3",
    value: "10,000+",
    descriptionLine1: "Students Mentored",
    descriptionLine2: "",
  },
];

const achievementIcons = [
  Trophy,
  Stethoscope,
  Users,
];

const Achievements = () => {
  const [achievements, setAchievements] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/achievements/public`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch achievements"
        );
      }

      if (data.achievements?.length > 0) {
        setAchievements(
          data.achievements.slice(0, 3)
        );
      } else {
        setAchievements(
          fallbackAchievements
        );
      }
    } catch (error) {
      console.error(
        "Achievements fetch error:",
        error.message
      );

      setAchievements(
        fallbackAchievements
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <section className="bg-white px-2.5 py-4 font-sans sm:px-4 lg:px-6">
        <div className="flex min-h-[150px] items-center justify-center">
          <LoaderCircle
            size={28}
            className="animate-spin text-[#00563f]"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-2.5 py-4 font-sans sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[1600px]">

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-lg border border-[#00553f]/10 bg-[#00553f] font-sans shadow-sm">

          {/* ================= HEADER ================= */}
          <div className="flex items-center px-4 py-3 sm:px-5 sm:py-3.5">

            {/* Header Icon */}
            <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
              <Trophy
                size={20}
                strokeWidth={2.2}
                className="text-yellow-300"
              />
            </div>

            {/* Header Text */}
            <div>
              <h2 className="font-sans text-[13px] font-bold leading-tight sm:text-[15px]">
                <span className="font-sans text-white">
                  Our{" "}
                </span>

                <span className="font-sans text-amber-500">
                  Achievements
                </span>
              </h2>

              <p className="mt-0.5 font-sans text-[8px] leading-3 text-white/75 sm:text-[9px]">
                Real Students. Real Success.
              </p>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-3">

            {achievements.map(
              (achievement, index) => {
                const Icon =
                  achievementIcons[
                    index %
                      achievementIcons.length
                  ];

                return (
                  <div
                    key={achievement._id}
                    className={`group relative flex items-center gap-3 px-4 py-3.5 font-sans transition duration-200 hover:bg-white/[0.05] sm:px-5 sm:py-4 ${
                      index > 0
                        ? "border-t border-white/15 sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >

                    {/* ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans ring-1 ring-white/10 transition duration-200 group-hover:scale-105 group-hover:bg-white/15">
                      <Icon
                        size={25}
                        strokeWidth={2}
                        className="text-white"
                      />
                    </div>

                    {/* TEXT */}
                    <div className="min-w-0 font-sans">

                      {/* Value */}
                      <p className="font-sans text-[20px] font-extrabold leading-none tracking-tight text-white sm:text-[22px]">
                        {achievement.value}
                      </p>

                      {/* Line 1 */}
                      {achievement.descriptionLine1 && (
                        <p className="mt-1.5 font-sans text-[8px] leading-[1.3] text-white/90 sm:text-[9px]">
                          {achievement.descriptionLine1}
                        </p>
                      )}

                      {/* Line 2 */}
                      {achievement.descriptionLine2 && (
                        <p className="font-sans text-[8px] leading-[1.3] text-white/80 sm:text-[9px]">
                          {achievement.descriptionLine2}
                        </p>
                      )}
                    </div>

                    {/* Small Accent */}
                    <div className="absolute bottom-0 left-4 right-4 h-px bg-white/10 font-sans opacity-0 transition group-hover:opacity-100 sm:left-5 sm:right-5" />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;