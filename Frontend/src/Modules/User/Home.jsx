import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Play,
  ChevronLeft,
  ChevronRight,
  Map,
  Layers,
  Rocket,
  Award,
  Infinity as InfinityIcon,
  Check,
  Plus,
  Minus,
  GraduationCap,
  Laptop,
  Library,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { coursesApi, categoriesApi, roadmapsApi } from "../../Shared/utils/api.js";
import CourseCard from "../../Shared/components/CourseCard";
import { getCategoryIcon } from "../../Shared/utils/categoryIcons";

// Images (src/assets/ mein maujood hain)
import heroMain from "../../assets/hero-new.webp";
import homeNew from "../../assets/home-new.webp";



// TODO: apne asli features likho
const features = [
  {
    title: "Learn at Your Own Pace",
    description: "Flexible learning anytime, anywhere.",
    icon: Rocket,
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals.",
    icon: Users,
  },
  {
    title: "Certificates",
    description: "Showcase your skills with verified certificates.",
    icon: Award,
  },
  {
    title: "Lifetime Access",
    description: "Learn once, for a lifetime.",
    icon: InfinityIcon,
  },
];

const perks = [
  "Free & Premium Courses",
  "Expert Mentorship",
  "Career Guidance",
  "24/7 Support",
];

const faqs = [
  {
    question: "Can I browse courses without an account?",
    answer:
      "Yes. You can explore the available courses without creating an account.",
  },
  {
    question: "How do I find a course?",
    answer:
      "Browse the courses page or start with one of the popular topics on this page.",
  },
  {
    question: "Who adds courses to LearnFlow?",
    answer: "Courses are added and managed by the LearnFlow administrator.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. LearnFlow is designed to let you explore lessons on a schedule that suits you.",
  },
];

// Chhota label jaise "— Popular Topics"
const SectionLabel = ({ children }) => (
  <span className="flex items-center gap-2 text-xs font-semibold text-[#C8683F]">
    <span className="h-px w-6 bg-[#C8683F]" />
    {children}
  </span>
);

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const [coursesRes, popularRes, roadmapsRes] = await Promise.all([
          coursesApi.getAll(),
          categoriesApi.getPopular(),
          roadmapsApi.getAll(),
        ]);
        if (active) {
          setCourses(
            Array.isArray(coursesRes.data) ? coursesRes.data.slice(0, 8) : []
          );
          setPopularCategories(
            Array.isArray(popularRes.data) ? popularRes.data : []
          );
          setRoadmaps(
            Array.isArray(roadmapsRes.data) ? roadmapsRes.data.slice(0, 4) : []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const scrollToFeatured = () => {
    document.getElementById("featured")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const slide = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <main className="overflow-hidden bg-white text-[#2B2420]">
      {/* ================= Hero ================= */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-10 lg:pt-14">
        <div className="relative z-10">
          

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Your learning journey,{" "}
            <span className="text-[#C8683F]">starts here.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#7A6A5E] sm:text-base">
            Access world-class courses, expert-led tutorials, and personalized
            roadmaps to build the skills you need for a brighter future.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8683F] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B0552F]"
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            {/* TODO: video ka link lagao, abhi ye courses section par le jata hai */}
            <button
              type="button"
              onClick={scrollToFeatured}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#EBDCCB] bg-[#FDF6EE] px-6 text-sm font-semibold transition-colors hover:bg-[#FBEBDD]"
            >
              <Play className="h-4 w-4 text-[#C8683F]" />
              Watch Video
            </button>
          </div>
        </div>

        {/* Hero picture */}
        <div className="relative mx-auto flex w-full max-w-xl items-end justify-center lg:max-w-none">
          {/* Peeche ka peach blob */}
          <div className="absolute bottom-0 left-1/2 aspect-[1/1] w-[82%] -translate-x-1/2 rounded-[58%_42%_52%_48%/48%_56%_44%_52%] bg-[#F6DFCB]" />

          {/* Chhote sparkle lines (top right) */}
          <div className="absolute right-[4%] top-[2%] z-10 hidden sm:block">
            <span className="absolute left-0 top-2 h-4 w-0.5 rotate-[-30deg] rounded bg-[#C8683F]" />
            <span className="absolute left-3 top-0 h-5 w-0.5 rounded bg-[#C8683F]" />
            <span className="absolute left-6 top-2 h-4 w-0.5 rotate-[30deg] rounded bg-[#C8683F]" />
          </div>

          {/* Image upar */}
          <img
            src={heroMain}
            alt="LearnFlow learning platform"
            className="relative z-10 aspect-[5/4] w-full object-contain object-bottom"
          />

          {/* Floating card 1: laptop (left top) */}
          <div className="absolute left-[2%] top-[10%] z-20 grid h-20 w-20 -rotate-3 place-items-center rounded-2xl border-4 border-white bg-[#FBEBDD] shadow-lg sm:h-24 sm:w-24">
            <Laptop className="h-9 w-9 stroke-[1.5] text-[#C8683F] sm:h-11 sm:w-11" />
          </div>

          {/* Floating card 2: graduation cap (right top) */}
          <div className="absolute right-[0%] top-[14%] z-20 grid h-20 w-20 rotate-6 place-items-center rounded-2xl border-4 border-white bg-[#FBEBDD] shadow-lg sm:h-24 sm:w-24">
            <GraduationCap className="h-9 w-9 stroke-[1.5] text-[#2B2420] sm:h-11 sm:w-11" />
          </div>

          {/* Floating card 3: books (right middle) */}
          <div className="absolute right-[-2%] top-[50%] z-20 grid h-20 w-20 -rotate-3 place-items-center rounded-2xl border-4 border-white bg-[#FBEBDD] shadow-lg sm:h-24 sm:w-24">
            <Library className="h-9 w-9 stroke-[1.5] text-[#C8683F] sm:h-11 sm:w-11" />
          </div>
        </div>
      </section>

      {/* ================= Feature cards ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#EBDCCB] bg-[#FBEBDD]/60 px-4 py-6 text-center"
            >
              <Icon className="mx-auto h-7 w-7 stroke-[1.6] text-[#C8683F]" />
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mx-auto mt-1 max-w-[200px] text-xs leading-5 text-[#7A6A5E]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Explore Your Interests ================= */}
      {popularCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Popular Topics</SectionLabel>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
                Explore Your Interests
              </h2>
              <p className="mt-2 text-sm text-[#7A6A5E]">
                Discover a wide range of topics to kickstart your learning
                journey.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-[#2B2420]/20 bg-[#FDF6EE] px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#FBEBDD]"
            >
              Browse All Topics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {popularCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <Link
                  key={cat._id}
                  to={`/courses?category=${cat._id}`}
                  className="flex min-h-[56px] items-center gap-3 rounded-xl border border-[#EBDCCB] bg-[#FDF6EE] px-4 text-sm font-medium transition hover:border-[#C8683F] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8683F]"
                >
                  <Icon className="h-5 w-5 shrink-0 stroke-[1.6] text-[#C8683F]" />
                  <span className="leading-tight">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= Unlock your potential banner ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-[#EBDCCB] bg-[#FBEBDD]">
          <div className="grid grid-cols-[1.25fr_0.75fr] items-center lg:grid-cols-[1.1fr_0.8fr_1fr]">
            {/* Text side */}
            <div className="p-5 sm:p-10 lg:p-12">
              <h2 className="text-xl font-bold leading-tight tracking-[-0.02em] text-[#2B2420] sm:text-4xl">
                Unlock Your <span className="text-[#C8683F]">Potential</span>{" "}
                with LearnFlow
              </h2>
              <p className="mt-2 max-w-sm text-[11px] leading-4 text-[#7A6A5E] sm:mt-3 sm:text-sm sm:leading-6">
                Get unlimited access to premium courses and start building the
                skills for a successful career today.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#C8683F] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B0552F] sm:mt-6 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
              >
                Start Learning Free{" "}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>

            {/* Perks: sirf desktop par */}
            <ul className="hidden space-y-3 lg:block lg:p-0">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-sm font-medium text-[#2B2420]"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#C8683F]">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Picture side */}
            <div className="relative h-44 sm:h-64 lg:h-full lg:min-h-[320px]">
              <div className="absolute -right-6 bottom-[-2rem] h-40 w-40 rounded-full bg-[#F6DFCB] sm:-right-10 sm:bottom-[-4rem] sm:h-72 sm:w-72" />
              <img
                src={homeNew}
                alt="Learner working on a laptop"
                className="absolute inset-0 z-10 h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Most Popular Courses ================= */}
      <section
        id="featured"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-16 sm:px-8 lg:px-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Featured Courses</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
              Most Popular Courses
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-[#2B2420]/20 bg-[#FDF6EE] px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#FBEBDD]"
          >
            View All Courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Previous courses"
            className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-[#EBDCCB] bg-[#FDF6EE] transition-colors hover:bg-[#FBEBDD] sm:grid"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE]"
                  >
                    <div className="aspect-[16/9] animate-pulse bg-[#EBDCCB]" />
                    <div className="space-y-3 p-5">
                      <div className="h-5 w-3/4 animate-pulse rounded bg-[#EBDCCB]" />
                      <div className="h-4 w-full animate-pulse rounded bg-[#FBEBDD]" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-[#FBEBDD]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <div
                ref={sliderRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(33.333%-0.67rem)] xl:w-[calc(25%-0.75rem)]"
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#C8683F]/40 bg-[#FDF6EE] px-6 py-14 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-[#C8683F]" />
                <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7A6A5E]">
                  New courses will appear here when the administrator adds
                  them.
                </p>
                <Link
                  to="/courses"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C8683F] underline underline-offset-4"
                >
                  Explore courses <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Next courses"
            className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-[#EBDCCB] bg-[#FDF6EE] transition-colors hover:bg-[#FBEBDD] sm:grid"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ================= Structured Paths (Roadmaps) ================= */}
      {roadmaps.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Learning Roadmaps</SectionLabel>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
                Structured Paths for Success
              </h2>
              <p className="mt-2 text-sm text-[#7A6A5E]">
                Follow curated roadmaps to master skills step by step.
              </p>
            </div>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-[#2B2420]/20 bg-[#FDF6EE] px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#FBEBDD]"
            >
              Explore All Roadmaps <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmaps.map((rm) => (
              <Link
                key={rm._id}
                to={`/roadmap/${rm._id}`}
                className="group flex flex-col rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE] p-5 transition-all hover:-translate-y-0.5 hover:border-[#C8683F] hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBEBDD] text-[#C8683F] transition-colors group-hover:bg-[#C8683F] group-hover:text-white">
                  <Map className="h-5 w-5" />
                </div>
                <h3 className="line-clamp-1 text-base font-semibold">
                  {rm.title}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-xs leading-5 text-[#7A6A5E]">
                  {rm.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8683F]" />
                  <span className="h-px flex-1 bg-[#EBDCCB]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EBDCCB]" />
                  <span className="h-px flex-1 bg-[#EBDCCB]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EBDCCB]" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-medium text-[#7A6A5E]">
                    <Layers className="h-3.5 w-3.5" />
                    {rm.contentType === "pdf"
                      ? "PDF Guide"
                      : `${rm.steps?.length || 0} Steps`}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#C8683F] transition-all group-hover:gap-2">
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= FAQs ================= */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Have Questions?
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#7A6A5E]">
            Find answers to the most common questions about LearnFlow.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[#EBDCCB] bg-[#FDF6EE]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C8683F]"
                >
                  {faq.question}
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-[#C8683F]" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-[#C8683F]" />
                  )}
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 pr-10 text-sm leading-6 text-[#7A6A5E]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;