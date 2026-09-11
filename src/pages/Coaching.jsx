import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// =====================================================
// IMAGES
// Put these inside:
// public/images/coaching/
// =====================================================

const heroImage =
  "/images/coaching/coaching-classroom.jpg";

const studentsImage =
  "/images/coaching/coaching-students.jpg";

const brochureImage =
  "/images/coaching/coaching-brochure.jpg";

// =====================================================
// ACADEMIC PROGRAMS
// =====================================================

const academicPrograms = [
  {
    title: "Foundation",
    subtitle: "School Foundation",
    description:
      "Strong academic foundation with concept-based learning and regular practice.",
    icon: BookOpen,
  },
  {
    title: "Class IX & X",
    subtitle: "CBSE & BSEB",
    description:
      "Focused preparation for school examinations with strong conceptual understanding.",
    icon: GraduationCap,
  },
  {
    title: "Class XI & XII",
    subtitle: "Science & Arts",
    description:
      "Structured preparation for higher secondary studies with guided academic support.",
    icon: Target,
  },
  {
    title: "JEE",
    subtitle: "Engineering Entrance",
    description:
      "Concept-focused preparation, practice and regular testing for engineering entrance.",
    icon: Trophy,
  },
  {
    title: "NEET",
    subtitle: "Medical Entrance",
    description:
      "Focused academic preparation with disciplined study and regular revision.",
    icon: Target,
  },
];

// =====================================================
// COMPETITIVE PROGRAMS
// =====================================================

const competitivePrograms = [
  "BSSC",
  "Railway",
  "Bihar Police",
  "G.D",
  "D.El.Ed",
  "CTET",
  "STET",
  "AMU",
  "JMI",
  "BHU",
  "JNU",
  "Polytechnic",
  "Paramedical",
  "BPSC-TRE",
];

// =====================================================
// HIGHLIGHTS
// =====================================================

const highlights = [
  "Experienced Teachers",
  "Concept Based Learning",
  "Complete NCERT Coverage",
  "Regular Test Series",
  "Doubt Classes",
  "Weekly & Monthly Tests",
  "Unit Tests",
  "Pre-Board Preparation",
  "Authentic Study Material",
];

const Coaching = () => {
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
            alt="Ambition Classes Classroom"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#003d2e]/95 via-[#00553f]/82 to-[#00553f]/15" />
        </div>

        <div className="relative mx-auto grid min-h-[450px] max-w-[1550px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">

          {/* Hero Content */}
          <div className="max-w-2xl text-white">

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
              Expert Guidance. Proven Results.
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.03] sm:text-5xl lg:text-6xl">
              Shape Your{" "}
              <span className="text-amber-500">
                Future
              </span>{" "}
              with Ambition Classes
            </h1>

            <p className="mt-4 text-sm font-semibold text-white/90 sm:text-base lg:text-lg">
              We Convert Your Potential into Success...
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Quality education, concept-based learning,
              experienced faculty and continuous guidance for
              school and competitive examinations.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "CBSE",
                "BSEB",
                "English Medium",
                "Hindi Medium",
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
                href="#programs"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
              >
                Explore Programs
                <ArrowRight size={15} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/60 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                Enquire Now
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-[470px] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">

              <img
                src={studentsImage}
                alt="Ambition Classes Students"
                className="h-[315px] w-full rounded-xl object-cover"
              />

              <div className="mt-3 rounded-xl bg-white/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  Ambition Classes
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  Learn Today. Achieve Tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAM OVERVIEW
      ===================================================== */}
      <section
        id="programs"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f] sm:text-xs">
              Our Programs
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">
                Courses Designed
              </span>{" "}
              <span className="text-amber-500">
                for Your Success
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              From school education to entrance and
              competitive examinations, we provide guided
              learning for different academic goals.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {academicPrograms.map((program) => {
              const Icon = program.icon;

              return (
                <div
                  key={program.title}
                  className="group rounded-xl border border-[#dcece6] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f7f2] transition group-hover:bg-[#dff2eb]">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#00553f]"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#00553f]">
                    {program.title}
                  </h3>

                  <p className="mt-1 text-[10px] font-semibold text-amber-600 sm:text-xs">
                    {program.subtitle}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {program.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE PROVIDE
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
            <img
              src={brochureImage}
              alt="Ambition Classes Study Material"
              className="h-[340px] w-full rounded-xl object-cover sm:h-[430px]"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Why Choose Ambition
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">
                Complete Support.
              </span>{" "}
              <span className="text-amber-500">
                Focused Preparation.
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Ambition Classes focuses on concept-based
              education, regular practice and continuous
              academic support to help students move ahead
              with confidence.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-[#148954]"
                  />

                  <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCHOOL + COMPETITIVE
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="grid gap-5 lg:grid-cols-2">

            {/* School & Higher Education */}
            <div className="rounded-2xl border border-[#dcece6] bg-[#f8fcfa] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f1]">
                  <GraduationCap
                    size={22}
                    className="text-[#00553f]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00553f]">
                    Academic Preparation
                  </p>

                  <h3 className="text-xl font-extrabold text-[#00553f] sm:text-2xl">
                    Classes IX – XII
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                English & Hindi Medium academic support for
                CBSE and BSEB students with emphasis on concepts,
                regular tests, doubt classes and revision.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "IX",
                  "X",
                  "XI",
                  "XII",
                  "Science",
                  "Arts",
                  "Foundation",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#00553f] ring-1 ring-[#dcece6] sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Competitive */}
            <div className="rounded-2xl border border-[#dcece6] bg-[#f8fcfa] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff5d9]">
                  <Trophy
                    size={22}
                    className="text-amber-500"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00553f]">
                    Competitive Preparation
                  </p>

                  <h3 className="text-xl font-extrabold text-[#00553f] sm:text-2xl">
                    General Competitions
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                Guided preparation for a wide range of
                entrance, recruitment and competitive
                examinations.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {competitivePrograms.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 ring-1 ring-[#dcece6] sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OUR EXPERTS
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Experts
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">
                Experienced
              </span>{" "}
              <span className="text-amber-500">
                Faculty
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Trained, experienced and dedicated teachers
              supporting students across different subjects.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {[
              {
                name: "Er. Waris Zaheer",
                subject: "Physics",
              },
              {
                name: "B. Kumar",
                subject: "Chemistry",
              },
              {
                name: "Rahul Singh",
                subject: "Biology",
              },
              {
                name: "Md. Imran",
                subject: "History",
              },
              {
                name: "Kundan Kumar",
                subject: "Geography",
              },
            ].map((faculty) => (
              <div
                key={faculty.name}
                className="rounded-xl border border-[#dcece6] bg-white p-4 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f7f2]">
                  <Users
                    size={22}
                    className="text-[#00553f]"
                  />
                </div>

                <h3 className="mt-3 text-xs font-bold text-[#00553f] sm:text-sm">
                  {faculty.name}
                </h3>

                <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                  {faculty.subject}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-[#00553f] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center text-white">

          <Trophy
            size={35}
            strokeWidth={1.7}
            className="text-amber-500"
          />

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Your Success Story{" "}
            <span className="text-amber-500">
              Starts Here
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Join Ambition Classes and take the right step
            towards your academic and competitive goals.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
          >
            Enquire Now
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coaching;