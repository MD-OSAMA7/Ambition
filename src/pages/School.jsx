import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const schoolHeroImage =
  "/images/school/school-campus.jpg";

const studentsImage =
  "/images/school/students-group.jpg";

const classroomImage =
  "/images/school/classroom.jpg";

const schoolLogo =
  "/images/school/school-logo.png";

const schoolFeatures = [
  {
    title: "CBSE Curriculum",
    description:
      "A structured learning environment based on the CBSE curriculum.",
    icon: BookOpen,
  },
  {
    title: "English Medium",
    description:
      "Learning and communication through an English medium academic environment.",
    icon: GraduationCap,
  },
  {
    title: "Creative Education",
    description:
      "Encouraging young minds through meaningful and creative learning experiences.",
    icon: Lightbulb,
  },
  {
    title: "Growing Minds",
    description:
      "A nurturing environment focused on confidence, discipline and overall growth.",
    icon: Heart,
  },
];

const learningAreas = [
  {
    title: "Quality Education",
    description:
      "Strong academic foundations with a focus on understanding and learning.",
    icon: BookOpen,
  },
  {
    title: "Student Development",
    description:
      "Helping students develop confidence, discipline and positive habits.",
    icon: Users,
  },
  {
    title: "Safe & Supportive Environment",
    description:
      "A caring environment where students can learn, grow and participate confidently.",
    icon: ShieldCheck,
  },
];

const School = () => {
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
            src={schoolHeroImage}
            alt="Ambition Prestige School"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#003c2d]/95 via-[#00553f]/80 to-[#00553f]/20" />
        </div>

        <div className="relative mx-auto grid min-h-[440px] max-w-[1550px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">

          {/* Hero Content */}
          <div className="max-w-2xl text-white">

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
              The Path to Success Beginning At
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
              Ambition{" "}
              <span className="text-amber-500">
                Prestige School
              </span>
            </h1>

            <p className="mt-3 text-lg font-semibold text-white/95 sm:text-xl">
              The School of Excellence...
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              A CBSE Curriculum | English Medium School
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-sm">
                Pre-Nursery to Class 8th
              </span>

              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-sm">
                English Medium
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#admission"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
              >
                Admission Information
                <ArrowRight size={15} />
              </a>

              <a
                href="#about-school"
                className="inline-flex items-center gap-2 rounded-md border border-white/60 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 sm:text-sm"
              >
                Explore School
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-[470px] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <img
                src={studentsImage}
                alt="Ambition Prestige School Students"
                className="h-[310px] w-full rounded-xl object-cover"
              />

              <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                  <img
                    src={schoolLogo}
                    alt="Ambition Prestige School Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    Ambition Prestige School
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    The School of Excellence...
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          SCHOOL INTRO
      ===================================================== */}
      <section
        id="about-school"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-2 lg:gap-14">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-[#eef8f5] p-2">
            <img
              src={classroomImage}
              alt="Students at Ambition Prestige School"
              className="h-[300px] w-full rounded-xl object-cover sm:h-[390px]"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              About The School
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">
                The Best Creative Education
              </span>{" "}
              <span className="text-amber-500">
                for Growing Minds
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Ambition Prestige School is an English Medium
              School following a CBSE curriculum, created to
              provide young learners with a positive and
              meaningful educational environment.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Our focus is not only on academic learning but
              also on nurturing confidence, creativity,
              discipline and the overall development of
              growing minds.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[#dcece6] bg-[#f5fbf8] p-3">
                <p className="text-xs font-bold text-[#00553f] sm:text-sm">
                  Curriculum
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  CBSE Curriculum
                </p>
              </div>

              <div className="rounded-lg border border-[#dcece6] bg-[#f5fbf8] p-3">
                <p className="text-xs font-bold text-[#00553f] sm:text-sm">
                  Medium
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  English Medium
                </p>
              </div>

              <div className="rounded-lg border border-[#dcece6] bg-[#f5fbf8] p-3">
                <p className="text-xs font-bold text-[#00553f] sm:text-sm">
                  Admission
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Pre-Nursery to Class 8th
                </p>
              </div>

              <div className="rounded-lg border border-[#dcece6] bg-[#f5fbf8] p-3">
                <p className="text-xs font-bold text-[#00553f] sm:text-sm">
                  Focus
                </p>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Creative Education
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCHOOL FEATURES
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Approach
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">
                Learning With
              </span>{" "}
              <span className="text-amber-500">
                Purpose
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              A learning environment designed to encourage
              knowledge, creativity, confidence and growth.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {schoolFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-[#dcece6] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f1]">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#00553f]"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#00553f]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ADMISSION
      ===================================================== */}
      <section
        id="admission"
        className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mx-auto overflow-hidden rounded-2xl bg-[#00553f]">
          <div className="grid items-center lg:grid-cols-[1.25fr_0.75fr]">

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-500 sm:text-xs">
                Admissions Open
              </p>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Begin Your Child's{" "}
                <span className="text-amber-500">
                  Learning Journey
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                Admissions are open for Pre-Nursery to Class
                8th at Ambition Prestige School.
              </p>

              <p className="mt-3 text-sm font-semibold text-white sm:text-base">
                The Best Creative Education for Growing Minds
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
              >
                Contact For Admission
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Admission Info */}
            <div className="border-t border-white/10 bg-white/5 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-xl border border-white/15 bg-white/10 p-5">
                <h3 className="text-lg font-bold text-white">
                  Student Admission Details
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="rounded-md bg-white/10 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-500">
                      Classes
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Pre-Nursery to Class 8th
                    </p>
                  </div>

                  <div className="rounded-md bg-white/10 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-500">
                      Medium
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      English Medium
                    </p>
                  </div>

                  <div className="rounded-md bg-white/10 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-500">
                      Curriculum
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      CBSE Curriculum
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY SCHOOL
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

            {/* Content */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
                Why Ambition Prestige School
              </p>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                <span className="text-[#00553f]">
                  A Strong Foundation
                </span>{" "}
                <span className="text-amber-500">
                  for Tomorrow
                </span>
              </h2>

              <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                We believe the early years of education play
                an important role in shaping a student's habits,
                confidence, curiosity and attitude towards
                learning.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Our approach combines academic learning with
                encouragement, discipline and opportunities
                for students to grow as confident individuals.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3">
              {learningAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-[#dcece6] bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f7f2]">
                      <Icon
                        size={21}
                        className="text-[#00553f]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#00553f] sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SCHOOL IMAGE STRIP
      ===================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto grid max-w-[1350px] grid-cols-1 gap-3 md:grid-cols-2">

          <div className="overflow-hidden rounded-xl">
            <img
              src={studentsImage}
              alt="Ambition Prestige School Students"
              className="h-[260px] w-full object-cover transition duration-300 hover:scale-[1.01] sm:h-[330px]"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src={classroomImage}
              alt="Ambition Prestige School Classroom"
              className="h-[260px] w-full object-cover transition duration-300 hover:scale-[1.01] sm:h-[330px]"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          CLOSING CTA
      ===================================================== */}
      <section className="bg-[#00553f] px-4 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center text-white">

          <GraduationCap
            size={35}
            strokeWidth={1.7}
            className="text-amber-500"
          />

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Growing Minds.{" "}
            <span className="text-amber-500">
              Building Futures.
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Ambition Prestige School is committed to creating
            an educational environment where children can
            learn, grow and move confidently towards a brighter
            future.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-amber-400 sm:text-sm"
          >
            Get In Touch
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default School;