import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  coursesApi,
  roadmapsApi,
  resolveMediaUrl,
} from "../../Shared/utils/api";
import CourseDetailHeroImage from "../../../src/assets/hero10.png"

import VideoPlayer from "../../Shared/components/VideoPlayer";

import {
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle,
  ListVideo,
  Map,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Bookmark,
  Laptop,
} from "lucide-react";

// PUT YOUR ONLINE IMAGE URL HERE (direct link ending in .png)
const HERO_IMAGE_URL = "PASTE_YOUR_DIRECT_IMAGE_URL_HERE";

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [courseRoadmap, setCourseRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH COURSE AND ROADMAP
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: courseData } = await coursesApi.getById(id);
        setCourse(courseData);

        const { data: roadmapsData } = await roadmapsApi.getAll();

        const assignedRoadmap = roadmapsData.find(
          (rm) => rm.courseId === id || rm.courseId?._id === id
        );

        if (assignedRoadmap) {
          setCourseRoadmap(assignedRoadmap);
        }
      } catch (err) {
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#EBE5D9] border-t-[#D48C70] rounded-full animate-spin" />
        <p className="text-[#706A63] font-medium">
          Loading course details...
        </p>
      </div>
    );
  }

  // ERROR
  if (error || !course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-[#F9F6F0] rounded-3xl border border-[#EBE5D9] p-10 text-center max-w-md w-full">
          <BookOpen className="w-12 h-12 text-[#D48C70] mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-[#1A1816] mb-2">
            Course Not Found
          </h2>

          <p className="text-[#706A63] mb-6">
            Sorry, this course could not be found.
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-[#D48C70] hover:bg-[#BD765A] text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // COURSE DATA
  const previewUrl = resolveMediaUrl(course.previewVideoUrl);
  const thumbUrl = resolveMediaUrl(course.thumbnail);

  const lessons = course.lessons || [];
  const categories = course.categories || [];

  const learningPoints = [
    "Learn important course concepts",
    "Build practical knowledge and skills",
    "Understand real-world applications",
    "Improve your technical expertise",
  ];

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* =========================================
          HERO SECTION
      ========================================== */}
      <section className="relative overflow-hidden bg-white border-b border-[#EBE5D9]">
        {/* Soft gradient on the right side */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F9F6F0] to-transparent pointer-events-none z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 z-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#706A63] hover:text-[#D48C70] mb-8 transition-colors"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT SIDE CONTENT */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] text-[#1A1816] text-sm font-semibold mb-6">
                <GraduationCap size={16} className="text-[#D48C70]" />
                {categories.length > 0
                  ? categories.map((c) => c.name || "Category").join(" • ")
                  : "Programming & Technology"}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.15] text-[#1A1816] mb-5">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-[#706A63] leading-relaxed max-w-xl mb-8">
                {course.description}
              </p>

              {/* COURSE STATISTICS */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-[#706A63]">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <Clock size={16} className="text-[#D48C70]" />
                  <span className="font-semibold text-[#1A1816]">
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <BookOpen size={16} className="text-[#D48C70]" />
                  <span>{lessons.length} Lessons</span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <CheckCircle size={16} className="text-[#D48C70]" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="relative flex items-center justify-center lg:justify-end z-10 mt-8 lg:mt-0">
              {/* 3 CIRCLES CENTERED BEHIND IMAGE */}
              <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
                <div className="absolute h-[420px] w-[420px] rounded-full bg-[#D48C70]/5" />
                <div className="absolute h-[300px] w-[300px] rounded-full bg-[#D48C70]/10" />
                <div className="absolute h-[180px] w-[180px] rounded-full bg-[#D48C70]/15" />
              </div>

              <img
                src={CourseDetailHeroImage}
                alt="Graduation cap, books and pencils"
                className="relative z-10 w-full max-w-[520px] h-auto object-contain drop-shadow-xl"
              />

              {/* Floating Card */}
              <div className="absolute z-20 bottom-2 sm:bottom-6 right-4 sm:right-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#EBE5D9] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7EAE1] flex items-center justify-center">
                  <Laptop size={20} className="text-[#D48C70]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1816] text-sm">
                    LearnFlow Academy
                  </h3>
                  <p className="text-[11px] text-[#706A63]">
                    Learn Today. Lead Tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN COURSE SECTION
      ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* VIDEO PLAYER */}
            <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white p-2 shadow-sm">
              <div className="aspect-video overflow-hidden rounded-xl bg-[#1A1816]">
                {previewUrl ? (
                  <VideoPlayer
                    src={previewUrl}
                    title={course.title}
                    className="h-full w-full"
                  />
                ) : thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-white">
                    <Play size={55} className="text-[#D48C70] mb-3" />
                    <p className="text-white/70">Course Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* ABOUT COURSE */}
            <div className="bg-[#F9F6F0] rounded-2xl border border-[#EBE5D9] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-7 rounded-full bg-[#D48C70]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1816]">
                  About This Course
                </h2>
              </div>
              <p className="text-[#706A63] leading-8 whitespace-pre-wrap text-sm sm:text-base">
                {course.content || course.description}
              </p>
            </div>

            {/* WHAT YOU WILL LEARN */}
            <div className="bg-gradient-to-br from-[#F9F6F0] to-[#FDFBF7] rounded-2xl border border-[#EBE5D9] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-[#D48C70]" size={24} />
                <h2 className="text-xl font-bold text-[#1A1816]">
                  What You'll Learn
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningPoints.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#D48C70] flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#51443D] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* COURSE CURRICULUM */}
            <div>
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-7 bg-[#D48C70] rounded-full" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1816]">
                    Course Curriculum
                  </h2>
                </div>
                <span className="text-sm text-[#706A63] font-medium bg-[#F9F6F0] px-3 py-1 rounded-md border border-[#EBE5D9]">
                  {lessons.length} Lessons
                </span>
              </div>

              <div className="space-y-3">
                {lessons.length > 0 ? (
                  lessons.map((lesson, idx) => (
                    <Link
                      key={lesson._id || idx}
                      to={`/learn/${course._id}?lesson=${idx}`}
                      className="flex items-center gap-4 p-4 sm:p-5 bg-white border border-[#EBE5D9] rounded-xl hover:border-[#D48C70] hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#F9F6F0] text-[#D48C70] flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#D48C70] group-hover:text-white transition-colors border border-[#EBE5D9] group-hover:border-[#D48C70]">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A1816] text-sm sm:text-base group-hover:text-[#D48C70] transition-colors truncate">
                          {lesson.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-[#A39A91] group-hover:text-[#D48C70]">
                        <Play size={16} />
                        <ChevronRight size={18} />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="bg-[#F9F6F0] border border-[#EBE5D9] rounded-xl p-8 text-center">
                    <ListVideo
                      size={35}
                      className="mx-auto text-[#D48C70] mb-3"
                    />
                    <p className="text-[#706A63] text-sm">
                      Course content available upon enrollment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT COURSE SIDEBAR
          ========================================== */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-[#EBE5D9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              {/* SIDEBAR HEADER */}
              <div className="p-6 sm:p-7 border-b border-[#EBE5D9] bg-[#F9F6F0]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#A39A91] mb-1">
                      Course Details
                    </p>
                    <h3 className="text-xl font-bold text-[#1A1816]">
                      Start Your Journey
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#EBE5D9] flex items-center justify-center shadow-sm">
                    <Bookmark size={20} className="text-[#D48C70]" />
                  </div>
                </div>
                <p className="text-sm text-[#706A63] leading-relaxed">
                  Start learning today and improve your skills with practical
                  lessons.
                </p>
              </div>

              {/* COURSE FEATURES */}
              <div className="p-6 sm:p-7">
                <h3 className="font-bold text-[#1A1816] mb-5">
                  This Course Includes
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center">
                      <ListVideo size={17} className="text-[#D48C70]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1816]">
                        {lessons.length} Lessons
                      </p>
                      <p className="text-xs text-[#A39A91]">
                        On-demand learning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center">
                      <Clock size={17} className="text-[#D48C70]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1816]">
                        {course.duration}
                      </p>
                      <p className="text-xs text-[#A39A91]">
                        Total course duration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center">
                      <CheckCircle size={17} className="text-[#D48C70]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1816]">
                        Lifetime Access
                      </p>
                      <p className="text-xs text-[#A39A91]">
                        Learn at your own pace
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center">
                      <GraduationCap size={18} className="text-[#D48C70]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1816]">
                        Certificate
                      </p>
                      <p className="text-xs text-[#A39A91]">
                        Course completion
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-8 space-y-3">
                  <Link
                    to={`/learn/${course._id}`}
                    className="group flex items-center justify-center gap-2 w-full rounded-xl bg-[#D48C70] hover:bg-[#C07A5F] text-white px-5 py-3.5 font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <Play size={16} fill="currentColor" />
                    Start Learning
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  {courseRoadmap && (
                    <Link
                      to={`/roadmap/${courseRoadmap._id}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-white border border-[#EBE5D9] hover:border-[#D48C70] hover:bg-[#F9F6F0] text-[#1A1816] px-5 py-3.5 font-semibold text-sm transition-all"
                    >
                      <Map size={16} className="text-[#D48C70]" />
                      View Learning Roadmap
                    </Link>
                  )}
                </div>

                <p className="text-center text-[11px] font-medium text-[#A39A91] mt-6">
                  Learn Today. Lead Tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;