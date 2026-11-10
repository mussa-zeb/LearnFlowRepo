import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  coursesApi,
  roadmapsApi,
  resolveMediaUrl,
} from "../../Shared/utils/api";
import CourseDetailHeroImage from "../../../src/assets/hero10.png";

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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 z-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#706A63] hover:text-[#D48C70] mb-6 sm:mb-8 transition-colors relative z-20"
          >
            <ArrowLeft size={15} className="sm:hidden" />
            <ArrowLeft size={17} className="hidden sm:block" />
            Back to Courses
          </Link>

          {/* 2 Columns (Text Left, Image Right) */}
          <div
            className="grid items-center gap-2 sm:gap-10 lg:gap-16 relative"
            style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
          >
            {/* LEFT SIDE CONTENT */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-[#F9F6F0] border border-[#EBE5D9] text-[#1A1816] text-[10px] sm:text-sm font-semibold mb-3 sm:mb-6">
                <GraduationCap size={12} className="text-[#D48C70] sm:hidden" />
                <GraduationCap size={16} className="text-[#D48C70] hidden sm:block" />
                {categories.length > 0
                  ? categories.map((c) => c.name || "Category").join(" • ")
                  : "Programming & Technology"}
              </div>

              <h1 className="text-[19px] sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.2] sm:leading-[1.15] text-[#1A1816] mb-3 sm:mb-5">
                {course.title}
              </h1>

              <p className="text-[11px] sm:text-lg text-[#706A63] leading-5 sm:leading-relaxed max-w-xl mb-4 sm:mb-8">
                {course.description}
              </p>

              {/* COURSE STATISTICS */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-6 sm:gap-y-4 text-[10px] sm:text-sm text-[#706A63]">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <Clock size={12} className="text-[#D48C70] sm:hidden" />
                  <Clock size={16} className="text-[#D48C70] hidden sm:block" />
                  <span className="font-semibold text-[#1A1816]">
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <BookOpen size={12} className="text-[#D48C70] sm:hidden" />
                  <BookOpen size={16} className="text-[#D48C70] hidden sm:block" />
                  <span>{lessons.length} Lessons</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#EBE5D9] shadow-sm">
                  <CheckCircle size={12} className="text-[#D48C70] sm:hidden" />
                  <CheckCircle size={16} className="text-[#D48C70] hidden sm:block" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE & CIRCLES */}
            <div className="relative flex items-center justify-center sm:justify-end z-10 h-full pt-4 pb-8 sm:pb-0">
              
              {/* Wrapper to keep Circles perfectly scaled behind the Image */}
              <div className="relative w-[190px] h-[190px] sm:w-[320px] sm:h-[320px] lg:w-[460px] lg:h-[460px] flex items-center justify-center">
                
                {/* Desktop Circles */}
                <div className="absolute inset-0 hidden lg:block pointer-events-none">
                  <div className="absolute -top-[10%] -right-[10%] w-full h-full rounded-full bg-[#D48C70]/10" />
                  <div className="absolute top-[15%] right-[10%] w-[75%] h-[75%] rounded-full bg-[#D48C70]/15" />
                  <div className="absolute bottom-0 -right-[10%] w-[50%] h-[50%] rounded-full bg-[#D48C70]/20" />
                </div>

                {/* Mobile Circles */}
                <div className="absolute inset-0 lg:hidden pointer-events-none">
                  <div className="absolute -top-[5%] -right-[5%] w-full h-full rounded-full bg-[#D48C70]/10" />
                  <div className="absolute top-[15%] right-[10%] w-[80%] h-[80%] rounded-full bg-[#D48C70]/15" />
                  <div className="absolute bottom-0 -right-[5%] w-[50%] h-[50%] rounded-full bg-[#D48C70]/20" />
                </div>

                {/* Image (Increased size, perfect fit) */}
                <img
                  src={CourseDetailHeroImage}
                  alt="Graduation cap, books and pencils"
                  className="relative z-10 w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[400px] h-auto object-contain drop-shadow-xl"
                />
                
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