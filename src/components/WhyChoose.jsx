import {
  GraduationCap,
  BadgeCheck,
  ClipboardList,
  CircleHelp,
  Users,
  BookOpen,
  ChartNoAxesCombined,
  Target,
} from "lucide-react";

const features = [
  {
    title: "Experienced",
    subtitle: "Faculty",
    icon: GraduationCap,
  },
  {
    title: "Concept-Based",
    subtitle: "Learning",
    icon: BadgeCheck,
  },
  {
    title: "Regular Test",
    subtitle: "Series",
    icon: ClipboardList,
  },
  {
    title: "Doubt & Revision",
    subtitle: "Classes",
    icon: CircleHelp,
  },
  {
    title: "Focused",
    subtitle: "Batch Size",
    icon: Users,
  },
  {
    title: "Quality",
    subtitle: "Study Material",
    icon: BookOpen,
  },
  {
    title: "Performance",
    subtitle: "Tracking",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Competitive",
    subtitle: "Exam Guidance",
    icon: Target,
  },
];

const WhyChoose = () => {
  return (
    <section className="px-4 py-5 font-sans sm:px-6 sm:py-7">
      <div className="mx-auto max-w-[1550px] rounded-lg bg-[#eaf8f6] px-3 py-5 sm:px-5 lg:px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold uppercase sm:text-2xl">
            <span className="text-[#00553f]">Why Choose</span>{" "}
            <span className="text-amber-500">Ambition Classes?</span>
          </h2>

          <p className="mt-1 text-xs font-medium text-[#006341] sm:text-sm">
            More Than Coaching. A Complete Learning Journey.
          </p>
        </div>

        {/* Features */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8 lg:gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex min-h-[82px] flex-col items-center justify-center rounded-md bg-white px-2 py-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Icon
                  size={27}
                  strokeWidth={1.8}
                  className="text-blue-700"
                />

                <p className="mt-2 text-[10px] font-bold leading-tight text-blue-800 sm:text-[11px]">
                  {feature.title}
                  <br />
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;