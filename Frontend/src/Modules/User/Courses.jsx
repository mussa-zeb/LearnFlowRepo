import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { coursesApi, categoriesApi } from "../../Shared/utils/api";
import CourseCard from "../../Shared/components/CourseCard";
import CourseDetailHeroImage from "../../../src/assets/hero10.png"
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Code2,
  BarChart3,
  Palette,
  BriefcaseBusiness,
  Megaphone,
  Languages,
  Dumbbell,
  Camera,
  User,
  ArrowRight,
  Filter,
  RotateCcw,
} from "lucide-react";

const categoryIcons = [
  Code2,
  BarChart3,
  Palette,
  BriefcaseBusiness,
  Megaphone,
  Languages,
  Dumbbell,
  Camera,
  User,
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          coursesApi.getAll(),
          categoriesApi.getAll(),
        ]);

        setCourses(coursesRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          (course.categories || []).some((c) =>
            (c.name || "").toLowerCase().includes(term)
          )
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((course) =>
        (course.categories || []).some(
          (c) => (c._id || c) === selectedCategory
        )
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, courses]);

  const updateSearch = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set("search", value);
    else params.delete("search");

    setSearchParams(params);
  };

  const updateCategory = (id) => {
    const params = new URLSearchParams(searchParams);

    if (id === "all") params.delete("category");
    else params.set("category", id);

    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-white">
        
        {/* ============ 3 CIRCULAR DIVS ON RIGHT SIDE ============ */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full max-w-2xl pointer-events-none z-0 hidden lg:block">
          {/* Large Circle - using your skin color scheme */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#F4DCC3]/40" />
          {/* Medium Circle */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#F4DCC3]/60" />
          {/* Small Circle - using your orange accent */}
          <div className="absolute top-1/2 right-32 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-[#D9784C]/10" />
        </div>
        {/* ======================================================= */}

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-6 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-16">

          {/* Hero Content */}
          <div className="relative z-10">
            
            {/* Pill Badge matching the image layout, but using your colors */}
            <div className="inline-flex items-center gap-2 bg-[#F9F6F0] text-[#1A1816] px-4 py-1.5 rounded-lg mb-6 border border-[#EBE5D9]">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-semibold">Our Courses</span>
            </div>

            {/* Heading layout from image, colored with your theme */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight text-[#1A1816]">
              Browse Our <span className="text-[#D9784C]">Courses</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#706A63] sm:text-lg">
              Find the perfect course to build your skills and achieve your learning goals.
            </p>
          </div>

          {/* Hero Image (Transparent PNG) */}
          <div className="relative flex items-center justify-center lg:justify-end z-10 mt-8 lg:mt-0">
            <img
                            src={CourseDetailHeroImage}
                            alt="Graduation cap, books and pencils"
                            className="relative z-10 w-full max-w-[520px] h-auto object-contain drop-shadow-xl"
                          />
          </div>

        </div>
      </section>

      {/* ================= MAIN COURSES ================= */}
      <main className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 lg:px-10 relative z-10">

        {/* Search Bar & Filters in a single row like the image */}
        <div className="mb-6 flex flex-col gap-3 lg:flex-row items-center">
          
          <div className="relative flex-1 w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#706A63]"
            />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#EBE5D9] bg-white pl-12 pr-4 text-sm text-[#1A1816] shadow-sm outline-none transition focus:border-[#D9784C] focus:ring-4 focus:ring-[#D9784C]/10"
            />
          </div>

          <div className="flex w-full lg:w-auto gap-3 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <div className="flex h-[52px] shrink-0 items-center justify-between gap-6 rounded-xl border border-[#EBE5D9] bg-white px-4 text-sm font-medium text-[#1A1816] shadow-sm min-w-[160px] cursor-pointer hover:border-[#D9784C] transition-colors">
              All Categories
              <ChevronDown size={16} className="text-[#706A63]" />
            </div>

            <div className="flex h-[52px] shrink-0 items-center justify-between gap-6 rounded-xl border border-[#EBE5D9] bg-white px-4 text-sm font-medium text-[#1A1816] shadow-sm min-w-[140px] cursor-pointer hover:border-[#D9784C] transition-colors">
              All Levels
              <ChevronDown size={16} className="text-[#706A63]" />
            </div>

            <div className="flex h-[52px] shrink-0 items-center justify-between gap-6 rounded-xl border border-[#EBE5D9] bg-white px-4 text-sm font-medium text-[#1A1816] shadow-sm min-w-[140px] cursor-pointer hover:border-[#D9784C] transition-colors">
              All Durations
              <ChevronDown size={16} className="text-[#706A63]" />
            </div>

            <button className="flex h-[52px] shrink-0 items-center gap-2 rounded-xl bg-[#D9784C] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#C66B43]">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          <button
            onClick={() => updateCategory("all")}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
              selectedCategory === "all"
                ? "border-[#D9784C] bg-[#D9784C] text-white shadow-md"
                : "border-[#E8DFD2] bg-white text-[#1A1816] hover:border-[#D9784C] hover:text-[#D9784C]"
            }`}
          >
            All Courses
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateCategory(cat._id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                selectedCategory === cat._id
                  ? "border-[#D9784C] bg-[#D9784C] text-white shadow-md"
                  : "border-[#E8DFD2] bg-white text-[#1A1816] hover:border-[#D9784C] hover:text-[#D9784C]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Course Heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#1A1816] sm:text-2xl">
              Explore Our Courses
            </h2>
            <p className="mt-1 text-sm text-[#706A63]">
              Showing {filteredCourses.length} courses
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white"
              >
                <div className="aspect-[16/9] bg-[#F0EAE1]" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-[#F0EAE1]" />
                  <div className="h-4 w-full rounded bg-[#F0EAE1]" />
                  <div className="h-4 w-5/6 rounded bg-[#F0EAE1]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          
          /* Course Cards */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="group overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D48C70]/60 hover:shadow-xl hover:shadow-[#D48C70]/10"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5DCCE] bg-white px-5 py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8E8D6]">
              <BookOpen size={30} className="text-[#D9784C]" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#1A1816]">
              No Courses Found
            </h3>
            <p className="max-w-sm text-sm leading-6 text-[#706A63]">
              Try adjusting your search or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D9784C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C66B43]"
            >
              <RotateCcw size={16} />
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;