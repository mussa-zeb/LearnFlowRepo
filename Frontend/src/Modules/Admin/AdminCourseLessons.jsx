import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { coursesApi } from "../../Shared/utils/api";
import MediaInput from "../../Shared/components/MediaInput";
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Video, CheckCircle } from "lucide-react";

const AdminCourseLessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const [courseTitle, setCourseTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id);
        setCourseTitle(data.title);
        setLessons(data.lessons && data.lessons.length > 0 ? data.lessons : [{ title: "Class 1", videoUrl: "" }]);
      } catch (error) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleLessonChange = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: `Class ${lessons.length + 1}`, videoUrl: "" }]);
  };

  const removeLesson = (index) => {
    if (lessons.length === 1) {
      return alert("A course must have at least one lesson.");
    }
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const moveLesson = (index, direction) => {
    if (direction === "up" && index > 0) {
      const updated = [...lessons];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setLessons(updated);
    } else if (direction === "down" && index < lessons.length - 1) {
      const updated = [...lessons];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      setLessons(updated);
    }
  };

  const handleSave = async () => {
    const hasEmptyFields = lessons.some((l) => !l.title.trim() || !l.videoUrl);
    if (hasEmptyFields) {
      setError("Please ensure every lesson has a title and a video URL/upload.");
      return;
    }

    setError("");
    setSaving(true);
    setSuccessMsg("");

    try {
      await coursesApi.update(id, { lessons }, token);
      setSuccessMsg("Curriculum saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to save curriculum. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-[#706A63] bg-white min-h-screen">Loading curriculum...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/admin/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#706A63] hover:text-[#1A1816] transition-colors duration-150 mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to courses
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1816]">
              Manage Curriculum
            </h1>
            <p className="text-[#706A63] mt-1">Adding videos to: <span className="font-semibold text-[#1A1816]">{courseTitle}</span></p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] disabled:opacity-50 self-start sm:self-auto transition-colors"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Curriculum"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> {successMsg}
            </div>
          )}

          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="relative rounded-2xl border border-[#EBE5D9] bg-white p-5 sm:p-6 shadow-sm group">
                
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#EBE5D9]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F9F6F0] text-sm font-bold text-[#D48C70] border border-[#EBE5D9]">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-bold text-[#1A1816]">Lesson {index + 1}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveLesson(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 text-[#706A63] hover:text-[#1A1816] disabled:opacity-30 rounded-md hover:bg-[#F9F6F0] transition-colors"
                      title="Move Up"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="p-1.5 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50 ml-2 transition-colors"
                      title="Delete Lesson"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Lesson Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1816] mb-2">
                      Lesson Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                      className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm placeholder:text-[#706A63] focus:border-[#D48C70] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D48C70] transition-all"
                      placeholder="e.g. Introduction, Class 1, Day 2..."
                    />
                  </div>

                  <MediaInput
                    label={<><Video className="inline h-4 w-4 mr-1" /> Video Content <span className="text-red-500">*</span></>}
                    type="video"
                    value={lesson.videoUrl}
                    onChange={(val) => handleLessonChange(index, "videoUrl", val)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    help="Paste a YouTube/Vimeo link, or upload an MP4 file."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Lesson Button */}
          <button
            onClick={addLesson}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#EBE5D9] bg-[#F9F6F0] px-4 py-6 text-sm font-semibold text-[#706A63] transition-colors hover:border-[#D48C70] hover:bg-[#EBE5D9] hover:text-[#1A1816]"
          >
            <Plus className="h-5 w-5" />
            Add Another Video / Lesson
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AdminCourseLessons;