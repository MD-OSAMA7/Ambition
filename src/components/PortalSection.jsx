import {
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";

const portals = [
  {
    title: "Student Portal",
    description:
      "Access your classes, study materials, tests, results and updates.",
    button: "Student Login",
    icon: GraduationCap,
    color: "blue",
    link: "https://earthix.in/portal/login",
  },
  {
    title: "Staff Portal",
    description:
      "Manage classes, attendance, students, tests and academic activities.",
    button: "Staff Login",
    icon: Users,
    color: "blue",
    link: "https://earthix.in/staff-portal/login",
  },
];

const PortalCard = ({
  title,
  description,
  button,
  icon: Icon,
  link,
}) => {
  return (
    <div className="group flex flex-1 items-center gap-3 rounded-lg border border-blue-100 bg-white px-3 py-3 font-sans shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:px-4">

      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 transition duration-200 group-hover:bg-blue-100">
        <Icon
          size={30}
          strokeWidth={1.8}
          className="text-blue-700 transition duration-200 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-sans text-sm font-bold text-blue-800 sm:text-base">
          {title}
        </h3>

        <p className="mt-1 font-sans text-[10px] leading-relaxed text-gray-500 sm:text-[11px]">
          {description}
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#00563f] px-3 py-1.5 font-sans text-[10px] font-semibold text-white transition hover:bg-[#004832] sm:text-[11px]"
        >
          {button}
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
};

const PortalSection = () => {
  return (
    <section className="bg-[#eefafa] px-4 py-2.5 font-sans sm:px-6 sm:py-3">
      <div className="mx-auto flex max-w-[1550px] flex-col items-stretch gap-3 lg:flex-row lg:items-center">

        {/* Left Content */}
        <div className="lg:w-[38%]">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-[#00563f]" />

            <h2 className="font-sans text-xl font-bold sm:text-2xl">
              <span className="text-[#00553f]">Access Your</span>{" "}
              <span className="text-amber-500">Portal</span>
            </h2>
          </div>

          <p className="mt-1.5 max-w-112.5 font-sans text-xs leading-relaxed text-gray-600 sm:text-sm">
            Everything you need for learning, attendance, tests and
            academic updates — in one place.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          {portals.map((portal) => (
            <PortalCard
              key={portal.title}
              {...portal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortalSection;