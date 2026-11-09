import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Expert"], default: "Beginner" },
  icon: { type: String, default: "Home" },
});

const videoLessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    steps: [stepSchema],
    videoLessons: [videoLessonSchema],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
    pdfUrl: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;