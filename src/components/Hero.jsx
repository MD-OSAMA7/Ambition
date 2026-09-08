import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  BarChart3,
  Users,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Experienced",
    subtitle: "Faculty",
  },
  {
    icon: BookOpen,
    title: "Concept Based",
    subtitle: "Learning",
  },
  {
    icon: BarChart3,
    title: "Regular Test",
    subtitle: "Series",
  },
  {
    icon: Users,
    title: "Personal",
    subtitle: "Attention",
  },
  {
    icon: Trophy,
    title: "Proven",
    subtitle: "Results",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#004d3b] text-white">
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Students at Ambition Classes"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Green Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#004d3b] via-[#00563f]/90 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-[1550px] px-5 sm:px-8 lg:px-10">
        <div className="flex min-h-125 items-center py-10 sm:min-h-132.5 lg:min-h-140">

          <div className="w-full max-w-155">

            {/* Small Heading */}
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-400 sm:text-sm">
              Simri Bakhtiyarpur's Trusted
            </p>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-yellow-400 sm:text-sm">
              Educational Institution
            </p>

            {/* Main Heading */}
            <h2 className="text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              <span className="block text-white">
                Turn Your
              </span>

              <span className="block text-yellow-400">
                Potential
              </span>

              <span className="block text-white">
                Into <span className="text-yellow-400">Success.</span>
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-137.5 text-sm leading-relaxed text-white/90 sm:text-base">
              Focused learning. Experienced teachers.
              <br />
              A clear path towards academic and competitive success.
            </p>

            {/* Categories */}
            <p className="mt-3 text-xs font-bold text-yellow-300 sm:text-sm">
              Schooling{" "}
              <span className="px-1 text-white">|</span>
              Coaching{" "}
              <span className="px-1 text-white">|</span>
              Competitive Preparation
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2.5 text-xs font-bold text-[#00563f] transition hover:bg-yellow-300 sm:px-5 sm:text-sm"
              >
                Explore Ambition Classes
                <ArrowRight size={15} />
              </a>

              <a
                href="#"
                className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-bold text-[#00563f] transition hover:bg-gray-100 sm:px-5 sm:text-sm"
              >
                Enquire Now
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Features */}
            <div className="mt-7 grid max-w-[560px] grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-[#00563f]/70">
                      <Icon size={21} className="text-white" />
                    </div>

                    <p className="mt-2 text-[10px] font-semibold leading-tight text-white sm:text-[11px]">
                      {feature.title}
                      <br />
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;