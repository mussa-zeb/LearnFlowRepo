import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { coursesApi, categoriesApi } from "../../Shared/utils/api";
import MediaInput from "../../Shared/components/MediaInput";
import { ArrowLeft, Save, Image, Video } from "lucide-react";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    duration: "",
    durationMinutes: "",
    thumbnail: "",
    previewVideoUrl: "",
    content: "",
    isPublished: true,
  });

  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await categoriesApi.getAll();
        setAvailableCategories(data);
      } catch {
        // ignore
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchCourse = async () => {
        try {
          const { data } = await coursesApi.getById(id);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            categories: (data.categories || []).map((c) =>
              typeof c === "string" ? c : c._id
            ),
            duration: data.duration || "",
            durationMinutes: data.durationMinutes || "",
            thumbnail: data.thumbnail || "",
            previewVideoUrl: data.previewVideoUrl || "",
            content: data.content || "",
            isPublished: data.isPublished,
          });
        } catch {
          setError("Failed to load course");
        } finally {
          setLoadingCourse(false);
        }
      };
      fetchCourse();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleCategory = (categoryId) => {
    setFormData((prev) => {
      const has = prev.categories.includes(categoryId);
      return {
        ...prev,
        categories: has
          ? prev.categories.filter((c) => c !== categoryId)
          : [...prev.categories, categoryId],
      };
    });
  };

  const setField = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isEditMode) {
        await coursesApi.update(id, formData, token);
        navigate("/admin/courses");
      } else {
        const { data } = await coursesApi.create(formData, token);
        navigate(`/admin/courses/${data._id}/lessons`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loadingCourse) {
    return <div className="p-12 text-center text-[#706A63] bg-white min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link
            to="/admin/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#706A63] hover:text-[#1A1816] mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1816]">
            {isEditMode ? "Edit Course Details" : "Create New Course"}
          </h1>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#1A1816] border-b border-[#EBE5D9] pb-4 mb-4">
                Basic Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1A1816] mb-2">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1816] mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm resize-none focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-[#1A1816] mb-2">
                    Categories
                  </label>
                  {availableCategories.length === 0 ? (
                    <p className="text-xs text-[#706A63]">
                      No categories yet. Create categories in{" "}
                      <Link
                        to="/admin/categories"
                        className="underline text-[#D48C70] hover:text-[#c07a5e]"
                      >
                        Manage Categories
                      </Link>
                      .
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((cat) => {
                        const selected = formData.categories.includes(cat._id);
                        return (
                          <button
                            key={cat._id}
                            type="button"
                            onClick={() => toggleCategory(cat._id)}
                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                              selected
                                ? "bg-[#D48C70] text-white border-[#D48C70]"
                                : "bg-white text-[#706A63] border-[#EBE5D9] hover:bg-[#F9F6F0]"
                            }`}
                          >
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1816] mb-2">
                      Duration Label <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                      placeholder="e.g. 4 hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1816] mb-2">
                      Duration (Minutes) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="durationMinutes"
                      required
                      min={1}
                      value={formData.durationMinutes}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                      placeholder="e.g. 240"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-[#EBE5D9] text-[#D48C70] focus:ring-[#D48C70]"
                      />
                      <span className="text-sm font-medium text-[#1A1816]">
                        Publish
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#1A1816] border-b border-[#EBE5D9] pb-4 mb-4">
                Course Media
              </h2>
              <div className="space-y-8">
                <MediaInput
                  label={
                    <>
                      <Image className="inline h-4 w-4 mr-1" /> Thumbnail
                    </>
                  }
                  type="image"
                  value={formData.thumbnail}
                  onChange={setField("thumbnail")}
                  placeholder="https://example.com/image.jpg"
                  help="Recommended 16:9 ratio. JPG, PNG, or WEBP."
                />
                <MediaInput
                  label={
                    <>
                      <Video className="inline h-4 w-4 mr-1" /> Preview Video (Optional)
                    </>
                  }
                  type="video"
                  value={formData.previewVideoUrl}
                  onChange={setField("previewVideoUrl")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  help="Shown on the course details page before starting."
                />
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#1A1816] border-b border-[#EBE5D9] pb-4 mb-4">
                Course Notes
              </h2>
              <textarea
                name="content"
                required
                rows={6}
                value={formData.content}
                onChange={handleChange}
                className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] px-4 py-2.5 text-sm text-[#1A1816] shadow-sm resize-none focus:border-[#D48C70] focus:bg-white focus:ring-1 focus:ring-[#D48C70] focus:outline-none transition-all"
                placeholder="Write supplementary text, requirements, or notes..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link
                to="/admin/courses"
                className="rounded-xl border border-[#EBE5D9] bg-white px-5 py-2.5 text-sm font-medium text-[#1A1816] shadow-sm hover:bg-[#F9F6F0] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Save Changes"
                  : "Next: Add Videos"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;