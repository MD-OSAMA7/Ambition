import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Target,
  Users,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// =====================================================
// LOCAL IMAGES
// Put these images inside:
// public/images/about/
// =====================================================

const founderImage = "/images/about/founder.jpg";

const academicHeadImage = "/images/about/academic-head.jpg";

const classroomImage = "/images/about/classroom.jpg";

const studentGroupImage = "/images/about/students.jpg";

const values = [
  {
    title: "Better Education",
    description:
      "Quality learning, strong concepts and the right guidance for every aspiring student.",
    icon: BookOpen,
  },
  {
    title: "Stronger Communities",
    description:
      "Education that creates confidence, responsibility and positive social impact.",
    icon: Users,
  },
  {
    title: "Brighter Futures",
    description:
      "Helping students build the knowledge and skills needed for a successful future.",
    icon: Lightbulb,
  },
  {
    title: "Greater Opportunities",
    description:
      "Opening pathways for academic growth, competitive success and personal development.",
    icon: Target,
  },
];

const AboutUs = () => {
  return (
    <div className="font-sans bg-white text-slate-800">
      <TopBar />
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#00553f]">
        <div className="absolute inset-0">
          <img
            src={classroomImage}
            alt="Ambition Classes Students"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#003f30]/95 via-[#00553f]/80 to-[#00553f]/20" />
        </div>

        <div className="relative mx-auto grid min-h-[430px] max-w-[1550px] items-center px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-16">
          {/* Left */}
          <div className="max-w-2xl text-white">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-500 sm:text-xs">
              Aspiring For Excellence
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              About <span className="text-amber-500">Ambition Classes</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              Education is not just about marks, it is about building a better
              future.
            </p>

            {/* Dream Path */}
            <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
              {["DREAM", "LEARN", "GROW", "ACHIEVE"].map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wide backdrop-blur-sm sm:text-xs">
                    {item}
                  </span>

                  {index < 3 && (
                    <ArrowRight size={13} className="text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="mt-8 hidden justify-end lg:flex">
            <div className="relative w-[430px] overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl">
              <img
                src={studentGroupImage}
                alt="Ambition Classes Students"
                className="h-[290px] w-full rounded-xl object-cover"
              />

              <div className="absolute bottom-5 left-5 rounded-lg bg-[#00553f]/90 px-4 py-3 text-white backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">
                  Our Vision
                </p>

                <p className="mt-1 text-sm font-bold">
                  Learning Today. Building Tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-[#eef8f5] p-2">
            <img
              src={classroomImage}
              alt="Ambition Classes Classroom"
              className="h-[300px] w-full rounded-xl object-cover sm:h-[380px]"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Who We Are
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">Building Confidence.</span>{" "}
              <span className="text-amber-500">Shaping Futures.</span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Ambition Classes was founded with a clear vision to provide
              quality education, meaningful guidance and continuous support to
              every aspiring student. Our approach goes beyond textbook learning
              and focuses on concepts, discipline, confidence and long-term
              academic growth.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We believe that the right education can create better individuals,
              stronger communities and brighter opportunities for the future.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#founder"
                className="inline-flex items-center gap-2 rounded-md bg-[#00553f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#004532] sm:text-sm"
              >
                Meet Our Leadership
                <ArrowRight size={15} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-[#00553f] px-5 py-2.5 text-xs font-bold text-[#00553f] transition hover:bg-[#eef8f5] sm:text-sm"
              >
                Get in Touch
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR APPROACH
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1350px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Our Foundation
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              <span className="text-[#00553f]">What Drives</span>{" "}
              <span className="text-amber-500">Ambition</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Our philosophy is built around education, guidance, discipline and
              opportunities.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
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
                    {value.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FOUNDER
      ===================================================== */}
      <section id="founder" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Founder Image */}
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-[#dcece6] bg-[#f2faf7] p-2 shadow-sm">
              <img
                src={founderImage}
                alt="Founder, Ambition Classes"
                className="h-[360px] w-full rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Founder Content */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Leadership Message
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">Education Beyond</span>{" "}
              <span className="text-amber-500">Marks</span>
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <Award size={20} className="text-amber-500" />

              <span className="text-sm font-bold text-[#00553f] sm:text-base">
                Er. — Founder, Ambition Classes
              </span>
            </div>

            <blockquote className="mt-5 border-l-4 border-amber-500 pl-4 text-base font-semibold leading-relaxed text-[#00553f] sm:text-lg">
              “Education is not just about marks, it is about building a better
              future.”
            </blockquote>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              With a vision to provide quality education and guidance to every
              aspiring student, I founded Ambition Classes to create
              opportunities, build confidence and shape a brighter tomorrow.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Every learner deserves the right environment, the right guidance
              and the confidence to pursue their dreams. That belief continues
              to shape everything we do at Ambition Classes.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACADEMIC HEAD
      ===================================================== */}
      <section className="bg-[#f4faf8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1350px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00553f]">
              Academic Leadership
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-[#00553f]">Knowledge Empowers.</span>{" "}
              <span className="text-amber-500">Guidance Gives Direction.</span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500" />

            <p className="mt-5 text-sm font-semibold text-[#00553f] sm:text-base">
              Er. Rafe Zaheer
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Academic Head & Faculty
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Knowledge empowers, guidance direction, and together we build
              brighter futures.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Dedicated to delivering quality education, mentoring young minds,
              and helping students achieve their dreams through discipline,
              strategy and continuous support.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <GraduationCap size={21} className="text-[#00553f]" />
              </div>

              <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                Dedicated to learning, mentoring and growth
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-[#dcece6] bg-white p-2 shadow-sm">
              <img
                src={academicHeadImage}
                alt="Er. Rafe Zaheer"
                className="h-[320px] w-full rounded-xl object-cover sm:h-[390px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}
      <section className="bg-[#00553f] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center text-white">
          <HeartHandshake
            size={34}
            strokeWidth={1.7}
            className="text-amber-500"
          />

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Together for a{" "}
            <span className="text-amber-500">Brighter Future</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            At Ambition Classes, every student is encouraged to dream bigger,
            learn better, grow stronger and achieve with confidence.
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

export default AboutUs;
