import {
  GraduationCap,
  Stethoscope,
  Building2,
  Trophy,
  UserRound,
  BookOpen,
  ClipboardCheck,
  School,
  Landmark,
  TrainFront,
  Shield,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    title: "Academic (I – XII)",
    icon: GraduationCap,
    theme: "green",
    items: [
      { text: "Classes I – XII", icon: UserRound },
      { text: "Science & Arts", icon: BookOpen },
      { text: "CBSE & BSEB Courses", icon: School },
      { text: "Foundation Courses", icon: ClipboardCheck },
    ],
  },
  {
    title: "Medical & Engineering",
    icon: Stethoscope,
    theme: "red",
    items: [
      { text: "NEET", icon: UserRound },
      { text: "JEE", icon: UserRound },
      { text: "Foundation Batches", icon: BookOpen },
      { text: "Regular Test Series", icon: ClipboardCheck },
    ],
  },
  {
    title: "Higher Education",
    icon: Building2,
    theme: "blue",
    items: [
      { text: "AMU | JNU | JMI", icon: Landmark },
      { text: "BHU", icon: Landmark },
      { text: "B.Sc. | B.Ed. | D.El.Ed.", icon: School },
      { text: "Other Entrance Exams", icon: FileCheck },
    ],
  },
  {
    title: "Government & Competitive Exams",
    icon: Trophy,
    theme: "purple",
    items: [
      { text: "BPSC / TIRE", icon: UserRound },
      { text: "BSSC", icon: UserRound },
      { text: "Railway | Police", icon: TrainFront },
      { text: "CTET | STET", icon: Shield },
    ],
  },
];

const themeClasses = {
  green: {
    header: "bg-[#00734f]",
    icon: "text-[#00734f]",
    soft: "bg-[#eef8f4]",
  },

  red: {
    header: "bg-red-600",
    icon: "text-red-600",
    soft: "bg-red-50",
  },

  blue: {
    header: "bg-blue-700",
    icon: "text-blue-700",
    soft: "bg-blue-50",
  },

  purple: {
    header: "bg-purple-700",
    icon: "text-purple-700",
    soft: "bg-purple-50",
  },
};

const ProgramCard = ({
  title,
  icon: HeaderIcon,
  theme,
  items,
}) => {
  const styles = themeClasses[theme];

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white font-sans shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Card Header */}
      <div
        className={`flex items-center gap-2 px-4 py-2.5 font-sans text-white transition duration-300 ${styles.header}`}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
          <HeaderIcon
            size={18}
            strokeWidth={1.9}
          />
        </div>

        <h3 className="font-sans text-xs font-bold leading-tight sm:text-sm">
          {title}
        </h3>
      </div>

      {/* Card Content */}
      <div className="space-y-2 px-3.5 py-3 sm:px-4">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className="group/item flex items-center gap-2 rounded-md px-1.5 py-1 font-sans transition duration-200 hover:bg-gray-50"
            >
              {/* Item Icon */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${styles.soft}`}
              >
                <Icon
                  size={12}
                  strokeWidth={1.9}
                  className={styles.icon}
                />
              </div>

              {/* Item Text */}
              <span className="font-sans text-[10px] font-medium text-gray-600 transition group-hover/item:text-gray-800 sm:text-[11px]">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CoachingPrograms = () => {
  return (
    <section className="bg-white px-4 pb-5 font-sans sm:px-6 sm:pb-7">
      <div className="mx-auto max-w-[1550px]">

        {/* =========================
            SECTION HEADING
        ========================== */}
        <div className="mb-3 flex items-end justify-between gap-3">

          <div>
            <div className="flex items-center gap-2">

              <span className="h-5 w-1 rounded-full bg-[#00563f]" />

              <h2 className="font-sans text-xl font-extrabold sm:text-2xl">
                <span className="font-sans text-[#00553f]">
                  Our Coaching{" "}
                </span>

                <span className="font-sans text-amber-500">
                  Programs
                </span>
              </h2>
            </div>

            <p className="mt-1 font-sans text-[11px] text-gray-500 sm:text-xs">
              Structured courses for school, entrance and competitive
              examinations.
            </p>
          </div>

          {/* Desktop View All */}
          <a
            href="/coaching"
            className="group hidden shrink-0 items-center gap-1.5 rounded-full border border-[#00563f]/25 bg-white px-4 py-2 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white sm:flex sm:px-5 sm:py-2.5 sm:text-xs"
          >
            <span className="font-sans">
              View All Programs
            </span>

            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* =========================
            PROGRAM CARDS
        ========================== */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard
              key={program.title}
              {...program}
            />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-3 flex justify-end sm:hidden">
          <a
            href="/coaching"
            className="group flex items-center gap-1.5 rounded-full border border-[#00563f]/25 bg-white px-4 py-2 font-sans text-[10px] font-semibold text-[#00563f] shadow-sm transition duration-200 hover:border-[#00563f] hover:bg-[#00563f] hover:text-white"
          >
            <span className="font-sans">
              View All Programs
            </span>

            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoachingPrograms;