import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { coursesApi, resolveMediaUrl } from "../../Shared/utils/api";
import VideoPlayer from "../../Shared/components/VideoPlayer";
import { 
  ArrowLeft, 
  CheckCircle, 
  PlayCircle, 
  Bell, 
  ChevronDown, 
  List, 
  Play, 
  Edit3, 
  Save, 
  Trophy, 
  ArrowRight,
  Download 
} from "lucide-react";

const Learn = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  // --- NOTES STATE ---
  const [noteContent, setNoteContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Read the 'lesson' query param from URL. Fallback to 0 if not present.
  const lessonParam = searchParams.get("lesson");
  const initialIndex = lessonParam ? parseInt(lessonParam, 10) : 0;
  
  const [activeLessonIndex, setActiveLessonIndex] = useState(
    !isNaN(initialIndex) && initialIndex >= 0 ? initialIndex : 0
  );

  // 1. Fetch Course Data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // 2. Load Progress from LocalStorage when course is loaded
  useEffect(() => {
    if (course) {
      try {
        const savedProgress = localStorage.getItem("learnflow_progress");
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          if (parsed[course._id]) {
            setCompletedLessons(parsed[course._id]);
          }
        }
      } catch (error) {
        console.error("Failed to load progress from localStorage", error);
      }
    }
  }, [course]);

  // 3. Update active lesson if the URL changes
  useEffect(() => {
    const p = searchParams.get("lesson");
    if (p !== null) {
      const idx = parseInt(p, 10);
      if (!isNaN(idx) && idx >= 0) {
        setActiveLessonIndex(idx);
      }
    }
  }, [searchParams]);

  // Calculate lessons and safe index EARLY for notes logic
  const lessons = course?.lessons && course.lessons.length > 0 
    ? course.lessons 
    : (course?.videoUrl ? [{ title: "Full Video", videoUrl: course.videoUrl }] : []);
    
  const safeLessonIndex = activeLessonIndex < lessons.length ? activeLessonIndex : 0;

  // --- NEW EFFECT: Load Notes jab bhi lesson ya course change ho ---
  useEffect(() => {
    if (course && lessons.length > 0) {
      const savedNote = localStorage.getItem(`learnflow_note_${course._id}_${safeLessonIndex}`);
      setNoteContent(savedNote || "");
      setIsSaved(false); // Reset saved state when switching lessons
    }
  }, [course, safeLessonIndex, lessons.length]);

  const handleLessonSelect = (index) => {
    setActiveLessonIndex(index);
    setSearchParams({ lesson: index.toString() });
  };

  // 4. Toggle Complete and Save to LocalStorage
  const toggleComplete = (index) => {
    let newCompleted;
    if (completedLessons.includes(index)) {
      newCompleted = completedLessons.filter((i) => i !== index);
    } else {
      newCompleted = [...completedLessons, index];
    }
    
    setCompletedLessons(newCompleted);

    try {
      const savedProgress = localStorage.getItem("learnflow_progress");
      const parsed = savedProgress ? JSON.parse(savedProgress) : {};
      
      parsed[course._id] = newCompleted;
      localStorage.setItem("learnflow_progress", JSON.stringify(parsed));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  };

  // --- FUNCTION: Notes ko LocalStorage mein save karne ke liye ---
  const handleSaveNote = () => {
    if (course && lessons.length > 0) {
      localStorage.setItem(`learnflow_note_${course._id}_${safeLessonIndex}`, noteContent);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000); 
    }
  };

  // --- NAYA FUNCTION: Notes ko Download karne ke liye ---
  const handleDownloadNote = () => {
    if (!noteContent.trim()) {
      alert("Aapne abhi tak koi note nahi likha hai!");
      return;
    }

    // Text file banane ke liye Blob use kar rahe hain
    const blob = new Blob([noteContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    
    // File ka naam set kar rahe hain (Course aur Lesson ke naam se)
    const safeCourseTitle = course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const safeLessonTitle = (activeLesson?.title || "lesson").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `Notes_${safeCourseTitle}_${safeLessonTitle}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-12 text-center text-[#706A63] bg-[#FFFFFF] min-h-screen">Loading course...</div>;
  if (!course) return <div className="p-12 text-center text-[#706A63] bg-[#FFFFFF] min-h-screen">Course not found.</div>;

  const activeLesson = lessons[safeLessonIndex];
  const videoSrc = resolveMediaUrl(activeLesson?.videoUrl || "");

  const progressPercent = lessons.length > 0 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;

  // --- HELPER FUNCTION: Har Video ka apna Thumbnail nikalne ke liye ---
  const getLessonThumbnail = (lesson) => {
    if (lesson?.thumbnail) return lesson.thumbnail;
    if (lesson?.image) return lesson.image;
    if (lesson?.thumbnailUrl) return lesson.thumbnailUrl;

    if (lesson?.videoUrl) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = lesson.videoUrl.match(regExp);
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
      }
    }

    if (course?.thumbnail) return course.thumbnail;
    if (course?.image) return course.image;

    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans pb-20">
  
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Button & Header */}
        <div className="mb-6">
          <Link to={`/courses/${course._id}`} className="inline-flex items-center gap-2 text-sm font-semibold bg-white border border-[#EBE5D9] hover:bg-[#F9F6F0] text-[#1A1816] px-4 py-2 rounded-full transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 bg-[#D48C70]/10 text-[#D48C70] px-3 py-1 rounded-full w-fit text-sm font-semibold">
            <Play className="w-3.5 h-3.5 fill-current" />
            {(course.categories || []).map((c) => c.name).join(" · ") || "Course Category"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1816] tracking-tight">
            {course.title}
          </h1>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          
          {/* Left Column (Video + Notes) */}
          <div className="space-y-6">
            
            {/* Video Container (Changed bg to black as per cheat sheet) */}
            <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-black shadow-sm aspect-video relative">
              {videoSrc ? (
                <VideoPlayer src={videoSrc} title={activeLesson?.title} className="h-full w-full" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <p className="text-[#706A63]">No video uploaded.</p>
                </div>
              )}
            </div>

            {/* Lesson Info & Complete Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1816] mb-1">
                  {safeLessonIndex + 1}. {activeLesson?.title || "Introduction"}
                </h2>
                <p className="text-sm font-medium text-[#706A63]">
                  In this lesson, you will get introduced to the topic and learn the core concepts.
                </p>
              </div>
              
              {/* Button (Using Success Green and Primary Button colors) */}
              <button
                onClick={() => toggleComplete(safeLessonIndex)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  completedLessons.includes(safeLessonIndex)
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-[#D48C70] hover:bg-[#c07a5e] text-white shadow-sm"
                }`}
              >
                <CheckCircle className={`h-4 w-4 ${completedLessons.includes(safeLessonIndex) ? "text-green-700" : "text-white"}`} />
                {completedLessons.includes(safeLessonIndex) ? "Completed" : "Mark as Complete"}
              </button>
            </div>

            {/* Notes Section */}
            <div className="bg-white border border-[#EBE5D9] shadow-sm rounded-2xl p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Edit3 className="w-5 h-5 text-[#1A1816]" />
                <h3 className="text-lg font-bold text-[#1A1816]">Your Notes</h3>
              </div>
              <textarea 
                placeholder="Take your notes here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onBlur={handleSaveNote} 
                className="w-full h-32 p-4 rounded-xl bg-[#F9F6F0] border border-[#EBE5D9] focus:border-[#D48C70] focus:bg-white text-[#1A1816] focus:outline-none resize-none mb-4"
              ></textarea>
              
              <div className="flex items-center gap-3">

          
                {/* DOWNLOAD BUTTON */}
                <button 
                  onClick={handleDownloadNote}
                  className="inline-flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-bold transition-colors bg-white border-[#EBE5D9] hover:bg-[#F9F6F0] text-[#1A1816]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (Curriculum Sidebar) */}
          <div className="space-y-4">
            <div className="bg-white border border-[#EBE5D9] shadow-sm rounded-2xl overflow-hidden sticky top-8">
              
              {/* Header & Progress */}
              <div className="p-5 border-b border-[#EBE5D9]">
                <div className="flex items-center gap-3 mb-4">
                  {/* Header Thumbnail */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#EBE5D9] flex-shrink-0 relative bg-[#F9F6F0]">
                    <img 
                      src={course.thumbnail || course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} 
                      alt="Course Thumbnail" 
                      className="w-full h-full object-cover opacity-90" 
                    />
                  </div>
                  <h3 className="font-bold text-lg text-[#1A1816]">Course Curriculum</h3>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-full h-1.5 bg-[#EBE5D9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D48C70] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#706A63] whitespace-nowrap">{progressPercent}% Complete</span>
                </div>
              </div>

              {/* Modules/Lessons List */}
              <div className="divide-y divide-[#EBE5D9]/50 max-h-[500px] overflow-y-auto">
                {lessons.map((lesson, index) => {
                  const isActive = index === safeLessonIndex;
                  const isCompleted = completedLessons.includes(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleLessonSelect(index)}
                      className={`w-full flex items-center justify-between gap-3 p-4 text-left transition-colors ${
                        isActive ? "bg-[#D48C70]/10" : "hover:bg-[#F9F6F0]"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        
                        {/* Dynamic Thumbnail */}
                        <div className={`relative w-20 h-12 flex-shrink-0 rounded-md overflow-hidden border ${
                          isActive ? "border-[#D48C70] shadow-sm" : "border-[#EBE5D9]"
                        }`}>
                          <img 
                            src={getLessonThumbnail(lesson)} 
                            alt={lesson.title} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className={`w-4 h-4 fill-current ${isActive ? 'text-[#D48C70]' : 'text-white'}`} />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1 truncate">
                          <p className={`text-sm font-semibold truncate ${
                            isActive ? "text-[#D48C70]" : isCompleted ? "text-[#706A63]" : "text-[#1A1816]"
                          }`}>
                            {index + 1}. {lesson.title}
                          </p>
                        </div>
                      </div>
                      
                      <span className="text-xs font-medium text-[#706A63]">Video</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Learn;