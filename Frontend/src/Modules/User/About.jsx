import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  Trophy,
  Play,
  GraduationCap,
  Quote,
} from "lucide-react";

// Image (src/assets/ mein maujood hai)
import aboutImg from "../../assets/about-new.webp";

/* ---------- Colors (Home jaisi) ----------
   white  #FFFFFF  page background
   cream  #FDF6EE  cards, boxes
   peach  #FBEBDD  soft panels
   line   #EBDCCB  borders
   clay   #C8683F  main accent (hover #B0552F)
   brown  #2B2420  dark sections, headings
   muted  #7A6A5E  body text
------------------------------------------ */

const highlights = [
  {
    title: "Quality Learning",
    description: "Expert-led courses and industry-relevant content.",
    icon: BookOpen,
  },
  {
    title: "Inclusive Education",
    description: "Learn at your own pace, everywhere.",
    icon: Users,
  },
  {
    title: "Career Growth",
    description: "Build skills and achieve your career goals.",
    icon: TrendingUp,
  },
  {
    title: "Trusted Platform",
    description: "Join millions of learners worldwide.",
    icon: Trophy,
  },
];

const About = () => {
  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-hidden bg-white text-[#2B2420]">
      {/* ================= Hero: Our Mission ================= */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:pt-14">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EBDCCB] bg-[#FBEBDD] px-3 py-1.5 text-xs font-medium">
            <GraduationCap className="h-4 w-4 text-[#C8683F]" />
            About LearnFlow
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Our <span className="text-[#C8683F]">Mission</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg font-medium leading-8 sm:text-xl">
            To make high-quality education accessible to everyone, everywhere,
            and help learners build a brighter future.
          </p>

          <span className="mt-6 block h-1 w-14 rounded-full bg-[#C8683F]" />

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#7A6A5E] sm:text-base">
            At LearnFlow, we believe that education is the key to unlocking
            potential. Our mission is to provide engaging, practical, and
            industry-relevant learning experiences that empower individuals to
            achieve their goals.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8683F] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B0552F]"
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={scrollToStory}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#EBDCCB] bg-[#FDF6EE] px-6 text-sm font-semibold transition-colors hover:bg-[#FBEBDD]"
            >
              <Play className="h-4 w-4 text-[#C8683F]" />
              Watch Our Story
            </button>
          </div>
        </div>

        {/* Hero picture */}
        <div className="relative mx-auto flex w-full max-w-md items-end justify-center lg:max-w-none">
          {/* Peeche ka peach blob */}
          <div className="absolute bottom-0 left-1/2 aspect-[1/1] w-[85%] -translate-x-1/2 rounded-[58%_42%_52%_48%/48%_56%_44%_52%] bg-[#F6DFCB]" />

          {/* Chhote sparkle lines (top right) */}
          <div className="absolute right-[6%] top-[2%] z-10 hidden sm:block">
            <span className="absolute left-0 top-2 h-4 w-0.5 rotate-[-30deg] rounded bg-[#C8683F]" />
            <span className="absolute left-3 top-0 h-5 w-0.5 rounded bg-[#C8683F]" />
            <span className="absolute left-6 top-2 h-4 w-0.5 rotate-[30deg] rounded bg-[#C8683F]" />
          </div>

          {/* Image upar */}
          <img
            src={aboutImg}
            alt="LearnFlow learner"
            className="relative z-10 aspect-[1/1] w-full max-w-md object-contain object-bottom"
          />
        </div>
      </section>

      {/* ================= 4 highlight cards ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE] px-4 py-7 text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#EBDCCB] bg-[#FBEBDD]">
                <Icon className="h-6 w-6 stroke-[1.6] text-[#C8683F]" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{title}</h3>
              <p className="mx-auto mt-1 max-w-[200px] text-xs leading-5 text-[#7A6A5E]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Quote banner ================= */}
   {/* ================= Quote banner ================= */}
<section
  id="story"
  className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-12 sm:px-8 lg:px-10"
>
  <div className="relative overflow-hidden rounded-3xl border border-[#EBDCCB] bg-[#FDF6EE]">
    <div className="grid items-center lg:grid-cols-[1.3fr_0.7fr]">
      <div className="p-8 sm:p-10 lg:p-14">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#C8683F]">
          <Quote className="h-5 w-5 fill-white text-white" />
        </span>
        <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#2B2420] sm:text-4xl">
          Education is not just about learning, it's about building a{" "}
          <span className="text-[#C8683F]">better future.</span>
        </h2>
        <p className="mt-4 flex items-center gap-2 text-sm text-[#7A6A5E]">
          <span className="h-px w-6 bg-[#C8683F]" />
          LearnFlow Team
        </p>
      </div>

      {/* Picture side */}
      <div className="relative hidden h-full min-h-[340px] lg:block">
        <div className="absolute -right-12 bottom-[-4rem] h-80 w-80 rounded-full bg-[#F6DFCB]" />
        <div className="absolute right-40 top-8 h-28 w-28 rounded-full bg-[#FBEBDD]" />
        <img
          src={aboutImg}
          alt="LearnFlow learner"
          className="absolute bottom-0 right-6 z-10 h-[99%] w-auto max-w-none object-contain object-bottom"
        />
      </div>
    </div>
  </div>
</section>
    </main>
  );
};

export default About;