import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// =====================================================
// IMAGES
// Put these inside:
// public/images/trust/
// =====================================================

const trustLogo =
  "/images/trust/trust-logo.png";

const heroImage =
  "/images/trust/trust-activity.jpg";

const communityImage =
  "/images/trust/community.jpg";

const educationImage =
  "/images/trust/education.jpg";

const focusAreas = [
  {
    title: "Quality Education",
    description:
      "Promoting meaningful and accessible education for students and communities.",
    icon: BookOpen,
  },
  {
    title: "Scholarship Support",
    description:
      "Supporting deserving students through educational assistance and opportunities.",
    icon: GraduationCap,
  },
  {
    title: "Community Development",
    description:
      "Working towards stronger and more inclusive communities through social initiatives.",
    icon: Users,
  },
  {
    title: "Career Guidance",
    description:
      "Helping young people make informed academic and career decisions.",
    icon: Target,
  },
  {
    title: "Social Welfare",
    description:
      "Supporting people and communities through welfare-focused initiatives.",
    icon: HeartHandshake,
  },
  {
    title: "Stronger Bihar",
    description:
      "Contributing towards a brighter, more educated and empowered Bihar.",
    icon: Lightbulb,
  },
];

const principles = [
  {
    title: "Empower",
    description:
      "Creating opportunities that help individuals become confident and self-reliant.",
    icon: Users,
  },
  {
    title: "Educate",
    description:
      "Promoting quality education as a foundation for individual and social progress.",
    icon: BookOpen,
  },
  {
    title: "Support",
    description:
      "Standing with deserving students, families and communities through meaningful initiatives.",
    icon: HeartHandshake,
  },
  {
    title: "Uplift",
    description:
      "Working towards a more inclusive, responsible and progressive society.",
    icon: ShieldCheck,
  },
];

const Trust = () => {
  return (
    <div className="bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#00553f]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Ambition Educational and Welfare Trust"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#003d2d]/95 via-[#00553f]/82 to-[#00553f]/25" />
        </div>

        <div className="relative mx-auto grid min-h-[450px] max-w-[1550px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">

          {/* Hero Content */}
          <div className="max-w-2xl text-white">

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
              Ambition Educational & Welfare Trust
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
              Education for{" "}
              <span className="text-amber-500">
                a Better Tomorrow
              </span>
            </h1>

            <p className="mt-4 text-lg font-semibold text-white/95 sm:text-xl">
              Empower • Educate • Support • Uplift
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Working towards quality education, social
              development, meaningful opportunities and a
              stronger community.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Education",
                "Scholarship",
                "Community",
                "Welfare",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold backdrop-blur-sm sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#about-trust"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
              >
                Know Our Trust
                <ArrowRight size={15} />
              </a>

              <a
                href="#initiatives"
                className="inline-flex items-center gap-2 rounded-md border border-white/60 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                Our Initiatives
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Logo + Image */}
          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-[470px] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">

              <div className="overflow-hidden rounded-xl bg-white p-4">
                <img
                  src={trustLogo}
                  alt="Ambition Educational and Welfare Trust Logo"
                  className="mx-auto h-[170px] w-full object-contain"
                />
              </div>

              <div className="mt-3 rounded-xl bg-white/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  Our Purpose
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  Education for a Better Society
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT TRUST
      ===================================================== */}
      <section
        id="about-trust"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-2 lg:gap-14">

          {/* Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              About The Trust
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">
                Our Purpose.
              </span>{" "}
              <span className="text-amber-500">
                A Better Society.
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Ambition Educational & Welfare Trust works
              towards creating meaningful opportunities through
              education, support and community-focused
              initiatives.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We believe that education can empower
              individuals, strengthen communities and create
              better opportunities for the future.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Our efforts focus on deserving students,
              educational development, social welfare and
              initiatives that contribute towards a more
              inclusive and progressive society.
            </p>

            <a
              href="#initiatives"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#00553f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#004532] sm:text-sm"
            >
              Explore Our Work
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-[#eef8f5] p-2">
            <img
              src={educationImage}
              alt="Education Initiative"
              className="h-[310px] w-full rounded-xl object-cover sm:h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Philosophy
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">
                Empower.
              </span>{" "}
              <span className="text-amber-500">
                Educate. Support. Uplift.
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Four principles guide our efforts towards
              education, opportunity and social development.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#dcece6] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f7f2]">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#00553f]"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#00553f]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          INITIATIVES
      ===================================================== */}
      <section
        id="initiatives"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Focus Areas
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">
                Initiatives for
              </span>{" "}
              <span className="text-amber-500">
                Meaningful Change
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Building opportunities through education,
              mentorship, welfare and community development.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="group rounded-xl border border-[#dcece6] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f7f2]">
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-[#00553f]"
                      />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-amber-500 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#00553f]">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY IMAGE SECTION
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
            <img
              src={communityImage}
              alt="Ambition Educational Welfare Initiative"
              className="h-[320px] w-full rounded-xl object-cover sm:h-[400px]"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Education & Community
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">
                Small Steps.
              </span>{" "}
              <span className="text-amber-500">
                Big Change.
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Every meaningful change begins with an
              opportunity. Through educational and community
              initiatives, we strive to create opportunities
              that help people move forward.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Education that creates opportunities",
                "Support for deserving students",
                "Guidance for young minds",
                "Community-focused development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f5ef]">
                    <span className="h-2 w-2 rounded-full bg-[#148954]" />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION / MISSION
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Direction
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">
                Vision, Mission
              </span>{" "}
              <span className="text-amber-500">
                & Values
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">

            {/* Vision */}
            <div className="rounded-xl border border-[#dcece6] bg-[#f7fcfa] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Users
                  size={23}
                  className="text-[#00553f]"
                />
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-[#00553f]">
                Our Vision
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A knowledgeable, empowered and prosperous
                society where individuals and communities can
                move towards a brighter future.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-xl border border-[#dcece6] bg-[#fffaf0] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Target
                  size={23}
                  className="text-amber-500"
                />
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-[#00553f]">
                Our Mission
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To support education, create opportunities and
                contribute to the social and economic development
                of our communities.
              </p>
            </div>

            {/* Values */}
            <div className="rounded-xl border border-[#dcece6] bg-[#fff6f8] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <HeartHandshake
                  size={23}
                  className="text-rose-500"
                />
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-[#00553f]">
                Our Values
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Integrity, compassion, service, inclusion and
                commitment to creating a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION / TRUST IDENTITY
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">

          <MapPin
            size={32}
            strokeWidth={1.7}
            className="text-[#00553f]"
          />

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00553f]">
            Serving With Purpose
          </p>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            <span className="text-[#00553f]">
              Education for
            </span>{" "}
            <span className="text-amber-500">
              a Better Society
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Together, we can create better educational
            opportunities, stronger communities and brighter
            futures.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#00553f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#004532] sm:text-sm"
          >
            Get Involved
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-[#00553f] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center text-white">

          <HeartHandshake
            size={35}
            strokeWidth={1.7}
            className="text-amber-500"
          />

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Be a Part of the{" "}
            <span className="text-amber-500">
              Change
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Support educational opportunities and community
            initiatives that help build a brighter tomorrow.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
          >
            Connect With Us
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trust;