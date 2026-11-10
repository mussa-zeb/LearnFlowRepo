import { Link } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";
import { resolveMediaUrl } from "../utils/api";

const CourseCard = ({ course }) => {
  const thumb = resolveMediaUrl(course.thumbnail);
  const categories = course.categories || [];

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#D48C70]/50 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F9F6F0]">
        {thumb ? (
          <img
            src={thumb}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-[#D48C70]" />
          </div>
        )}
        
        {/* Categories */}
        <span className="absolute left-3 top-3 flex flex-wrap gap-1">
          {categories.slice(0, 2).map((c) => (
            <span
              key={c._id || c}
              className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1A1816] shadow-sm backdrop-blur-sm ring-1 ring-[#EBE5D9]"
            >
              {c.name || "Uncategorized"}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1A1816] shadow-sm backdrop-blur-sm ring-1 ring-[#EBE5D9]">
              +{categories.length - 2}
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-[#1A1816] line-clamp-2 leading-snug mb-2 group-hover:text-[#D48C70] transition-colors duration-150">
          {course.title}
        </h3>
        <p className="text-sm text-[#706A63] line-clamp-3 leading-relaxed mb-4 flex-1">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#EBE5D9]">
          <div className="flex items-center gap-1.5 text-[#706A63]">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold">{course.duration}</span>
          </div>
          <span className="text-sm font-bold text-[#D48C70] group-hover:gap-2 transition-all">
            Learn →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;