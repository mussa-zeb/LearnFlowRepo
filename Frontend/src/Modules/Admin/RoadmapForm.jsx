import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { roadmapsApi, coursesApi, categoriesApi, uploadApi } from "../../Shared/utils/api";
import MediaInput from "../../Shared/components/MediaInput";
import { ArrowLeft, Save, Plus, Trash2, FileText, Upload, CheckCircle, Video, Image } from "lucide-react";

const RoadmapForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    steps: [{ title: "", description: "", duration: "", difficulty: "Beginner", icon: "Home" }],
    videoLessons: [{ title: "Introduction", videoUrl: "" }],
    categories: [],
    courseId: "",
    pdfUrl: "",
    isPublished: false,
  });

  const [courses, setCourses] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          coursesApi.getAllAdmin(token),
          categoriesApi.getAll(),
        ]);
        setCourses(coursesRes.data);
        setAvailableCategories(categoriesRes.data);

        if (isEditMode) {
          const { data } = await roadmapsApi.getById(id);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            steps: data.steps?.length ? data.steps : [{ title: "", description: "", duration: "", difficulty: "Beginner", icon: "Home" }],
            videoLessons: data.videoLessons?.length ? data.videoLessons : [{ title: "Introduction", videoUrl: "" }],
            categories: (data.categories || []).map((c) => typeof c === "string" ? c : c._id),
            courseId: data.courseId || "",
            pdfUrl: data.pdfUrl || "",
            isPublished: data.isPublished || false,
          });
        }
      } catch (err) {
        setError("Failed to load data.");
      }
    };
    if (token) fetchInitialData();
  }, [id, isEditMode, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleCategory = (categoryId) => {
    setFormData((prev) => {
      const has = prev.categories.includes(categoryId);
      return { ...prev, categories: has ? prev.categories.filter((c) => c !== categoryId) : [...prev.categories, categoryId] };
    });
  };

  // Steps Handlers
  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };
  const addStep = () => setFormData({ ...formData, steps: [...formData.steps, { title: "", description: "", duration: "", difficulty: "Beginner", icon: "Home" }] });
  const removeStep = (index) => {
    if (formData.steps.length === 1) return;
    setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) });
  };

  // Video Lessons Handlers
  const handleVideoLessonChange = (index, field, value) => {
    const newLessons = [...formData.videoLessons];
    newLessons[index][field] = value;
    setFormData({ ...formData, videoLessons: newLessons });
  };
  const addVideoLesson = () => setFormData({ ...formData, videoLessons: [...formData.videoLessons, { title: `Lesson ${formData.videoLessons.length + 1}`, videoUrl: "" }] });
  const removeVideoLesson = (index) => {
    if (formData.videoLessons.length === 1) return;
    setFormData({ ...formData, videoLessons: formData.videoLessons.filter((_, i) => i !== index) });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await uploadApi.uploadFile(file, "document", token);
      setFormData((prev) => ({ ...prev, pdfUrl: data.url }));
    } catch (err) {
      setError("Failed to upload PDF.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      categories: formData.categories,
      courseId: formData.courseId || null,
      isPublished: formData.isPublished,
      steps: formData.steps,
      pdfUrl: formData.pdfUrl,
      videoLessons: formData.videoLessons,
    };

    try {
      if (isEditMode) await roadmapsApi.update(id, payload, token);
      else await roadmapsApi.create(payload, token);
      navigate("/admin/roadmaps");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-20 min-h-screen">
      <div className="w-full border-b border-[#EBE5D9] px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <Link to="/admin/roadmaps" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#706A63] hover:text-[#1A1816] mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to roadmaps
        </Link>
        <h1 className="text-2xl font-bold text-[#1A1816]">{isEditMode ? "Edit Roadmap" : "Create New Roadmap"}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-200">{error}</div>}

          {/* Basic Info */}
          <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#1A1816] border-b border-[#EBE5D9] pb-4 mb-4">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-[#1A1816] mb-2">Roadmap Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-[#EBE5D9] px-4 py-2.5 text-sm focus:border-[#D48C70] focus:outline-none bg-[#F9F6F0] focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1816] mb-2">Description *</label>
              <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="w-full rounded-xl border border-[#EBE5D9] px-4 py-2.5 text-sm focus:border-[#D48C70] focus:outline-none bg-[#F9F6F0] focus:bg-white resize-none transition-all" />
            </div>
            
            <MediaInput 
              label={<><Image className="inline h-4 w-4 mr-1" /> Cover Image</>} 
              type="image" 
              value={formData.imageUrl} 
              onChange={(val) => setFormData({ ...formData, imageUrl: val })} 
              placeholder="https://..." 
              help="This image will be displayed on the roadmap listing and detail pages." 
            />

            <div>
              <label className="block text-sm font-medium text-[#1A1816] mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((cat) => {
                  const selected = formData.categories.includes(cat._id);
                  return (
                    <button key={cat._id} type="button" onClick={() => toggleCategory(cat._id)} className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border transition ${selected ? "bg-[#D48C70] text-white border-[#D48C70]" : "bg-white text-[#706A63] border-[#EBE5D9] hover:bg-[#F9F6F0]"}`}>
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-sm font-medium text-[#1A1816] mb-2">Assign to Course (Optional)</label>
                <select name="courseId" value={formData.courseId} onChange={handleChange} className="w-full rounded-xl border border-[#EBE5D9] px-4 py-2.5 text-sm bg-[#F9F6F0] focus:bg-white focus:border-[#D48C70] focus:outline-none transition-all">
                  <option value="">-- No specific course --</option>
                  {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                </select>
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="h-5 w-5 rounded border-[#EBE5D9] text-[#D48C70] focus:ring-[#D48C70]" />
                  <span className="text-sm font-medium text-[#1A1816]">Publish Roadmap</span>
                </label>
              </div>
            </div>
          </div>

          {/* Text Steps */}
          <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-4 mb-4">
              <h2 className="text-lg font-bold text-[#1A1816] flex items-center gap-2"><FileText className="h-5 w-5 text-[#D48C70]"/> Text Guide Steps</h2>
              <button type="button" onClick={addStep} className="text-sm text-[#D48C70] hover:text-[#b8765d] font-medium flex items-center gap-1 transition-colors"><Plus className="h-4 w-4" /> Add Step</button>
            </div>
            <div className="space-y-6">
              {formData.steps.map((step, index) => (
                <div key={index} className="relative bg-[#F9F6F0] p-4 sm:p-6 rounded-2xl border border-[#EBE5D9]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#1A1816]">Step {index + 1}</h3>
                    {formData.steps.length > 1 && (
                      <button type="button" onClick={() => removeStep(index)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#706A63] mb-1">Title *</label>
                      <input type="text" required value={step.title} onChange={(e) => handleStepChange(index, "title", e.target.value)} className="w-full rounded-lg border border-[#EBE5D9] px-3 py-2 text-sm focus:outline-none focus:border-[#D48C70] bg-white transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#706A63] mb-1">Description *</label>
                      <input type="text" required value={step.description} onChange={(e) => handleStepChange(index, "description", e.target.value)} className="w-full rounded-lg border border-[#EBE5D9] px-3 py-2 text-sm focus:outline-none focus:border-[#D48C70] bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#706A63] mb-1">Duration *</label>
                      <input type="text" required value={step.duration} onChange={(e) => handleStepChange(index, "duration", e.target.value)} className="w-full rounded-lg border border-[#EBE5D9] px-3 py-2 text-sm focus:outline-none focus:border-[#D48C70] bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#706A63] mb-1">Difficulty</label>
                      <select value={step.difficulty} onChange={(e) => handleStepChange(index, "difficulty", e.target.value)} className="w-full rounded-lg border border-[#EBE5D9] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#D48C70] transition-all">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Upload */}
          <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
             <h2 className="text-lg font-bold text-[#1A1816] border-b border-[#EBE5D9] pb-4 mb-4 flex items-center gap-2"><Upload className="h-5 w-5 text-[#D48C70]"/> PDF Document</h2>
             <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#EBE5D9]">
               {formData.pdfUrl ? (
                 <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#EBE5D9]">
                   <span className="text-sm text-green-700 flex items-center gap-2"><CheckCircle className="h-4 w-4"/> PDF Uploaded</span>
                   <button type="button" onClick={() => setFormData({...formData, pdfUrl: ""})} className="text-red-500 text-sm hover:underline transition-all">Remove</button>
                 </div>
               ) : (
                 <input type="file" accept="application/pdf" onChange={handlePdfUpload} disabled={uploading} className="block w-full text-sm text-[#706A63] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1A1816] file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-[#333] transition-all" />
               )}
               {uploading && <p className="text-xs text-[#706A63] mt-2">Uploading PDF...</p>}
             </div>
          </div>

          {/* Video Lessons */}
          <div className="space-y-6 rounded-2xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-4 mb-4">
              <h2 className="text-lg font-bold text-[#1A1816] flex items-center gap-2"><Video className="h-5 w-5 text-[#D48C70]"/> Video Playlist</h2>
              <button type="button" onClick={addVideoLesson} className="text-sm text-[#D48C70] hover:text-[#b8765d] font-medium flex items-center gap-1 transition-colors"><Plus className="h-4 w-4" /> Add Video</button>
            </div>
            <div className="space-y-6">
              {formData.videoLessons.map((lesson, index) => (
                <div key={index} className="relative bg-[#F9F6F0] p-4 sm:p-6 rounded-2xl border border-[#EBE5D9]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#1A1816]">Video {index + 1}</h3>
                    {formData.videoLessons.length > 1 && (
                      <button type="button" onClick={() => removeVideoLesson(index)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#706A63] mb-1">Lesson Title *</label>
                      <input type="text" required value={lesson.title} onChange={(e) => handleVideoLessonChange(index, "title", e.target.value)} className="w-full rounded-lg border border-[#EBE5D9] px-3 py-2 text-sm focus:outline-none focus:border-[#D48C70] bg-white transition-all" />
                    </div>
                    <MediaInput label="Video URL *" type="video" value={lesson.videoUrl} onChange={(val) => handleVideoLessonChange(index, "videoUrl", val)} placeholder="https://youtube.com/..." />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/admin/roadmaps" className="rounded-xl border border-[#EBE5D9] bg-white px-5 py-2.5 text-sm font-medium text-[#1A1816] hover:bg-[#F9F6F0] transition-colors">Cancel</Link>
            <button type="submit" disabled={loading || uploading} className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c07a5e] disabled:opacity-50 transition-colors">
              <Save className="h-4 w-4" /> {loading ? "Saving..." : "Save Roadmap"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapForm;