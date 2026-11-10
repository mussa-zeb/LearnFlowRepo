import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { coursesApi, resolveMediaUrl } from "../../Shared/utils/api";
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Search,
  ListVideo,
} from "lucide-react";

const AdminCourses = () => {
  const { token } = useAdminAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // "all" | "published" | "draft"
  const statusFilter = searchParams.get("status") || "all";

  const fetchCourses = async () => {
    try {
      const { data } = await coursesApi.getAllAdmin(token);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  useEffect(() => {
    let result = courses;

    if (statusFilter === "published") {
      result = result.filter((c) => c.isPublished);
    } else if (statusFilter === "draft") {
      result = result.filter((c) => !c.isPublished);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          (course.categories || []).some((c) =>
            (c.name || "").toLowerCase().includes(term)
          )
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, courses, statusFilter]);

  const setStatus = (status) => {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This will also delete all its videos."
      )
    ) {
      setDeleteLoading(id);
      try {
        await coursesApi.delete(id, token);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1816] mb-1">
                Manage Courses
              </h1>
              <p className="text-[#706A63]">
                Create, edit, and manage all your courses
              </p>
            </div>
            <Link
              to="/admin/courses/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#c07a5e] hover:shadow-md self-start sm:self-end"
            >
              <Plus className="h-4 w-4" />
              Add new course
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="relative w-full lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-[#706A63]" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3 pl-11 pr-4 text-sm text-[#1A1816] placeholder:text-[#706A63] shadow-sm focus:border-[#D48C70] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D48C70] transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["all", "published", "draft"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                    statusFilter === s
                      ? "bg-[#D48C70] text-white shadow-sm"
                      : "bg-[#F9F6F0] text-[#706A63] border border-[#EBE5D9] hover:bg-[#EBE5D9] hover:text-[#1A1816]"
                  }`}
                >
                  {s === "all"
                    ? "All"
                    : s === "published"
                    ? "Published"
                    : "Drafts"}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="animate-pulse rounded-2xl border border-[#EBE5D9] bg-white p-5"
                >
                  <div className="h-5 bg-[#F9F6F0] rounded-md w-1/3 mb-2" />
                  <div className="h-4 bg-[#F9F6F0] rounded-md w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#EBE5D9]">
                  <thead className="bg-[#F9F6F0]">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider hidden md:table-cell">
                        Categories
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider hidden lg:table-cell">
                        Videos
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-right text-xs font-bold text-[#706A63] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE5D9] bg-white">
                    {filteredCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="hover:bg-[#F9F6F0] transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-14 sm:h-12 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#F9F6F0] border border-[#EBE5D9]">
                              {course.thumbnail ? (
                                <img
                                  src={resolveMediaUrl(course.thumbnail)}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-[#D48C70]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[#1A1816] truncate">
                                {course.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {(course.categories || []).length === 0 ? (
                              <span className="text-xs text-[#706A63]">
                                —
                              </span>
                            ) : (
                              course.categories.map((c) => (
                                <span
                                  key={c._id || c}
                                  className="inline-flex items-center rounded-full bg-[#F9F6F0] px-2 py-0.5 text-xs font-medium text-[#706A63] border border-[#EBE5D9]"
                                >
                                  {c.name || "Unnamed"}
                                </span>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm font-medium text-[#1A1816]">
                            {course.lessons?.length || 0} Videos
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border ${
                              course.isPublished
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <Link
                              to={`/admin/courses/${course._id}/lessons`}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                              title="Manage Videos"
                            >
                              <ListVideo className="h-3 w-3" />
                              Curriculum
                            </Link>

                            <Link
                              to={`/admin/courses/edit/${course._id}`}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#706A63] border border-[#EBE5D9] bg-white hover:bg-[#F9F6F0] hover:text-[#1A1816] transition-colors"
                            >
                              <Pencil className="h-3 w-3" />
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(course._id)}
                              disabled={deleteLoading === course._id}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 border border-red-200 bg-white hover:bg-red-50 disabled:opacity-50 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                              {deleteLoading === course._id ? "..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-[#EBE5D9] bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F6F0] mb-4">
                <BookOpen className="h-6 w-6 text-[#D48C70]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1816] mb-1">
                No courses found
              </h3>
              <p className="text-[#706A63] mb-6 max-w-sm">
                {searchTerm || statusFilter !== "all"
                  ? "Try a different search term or filter."
                  : "Get started by creating your first course."}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link
                  to="/admin/courses/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add course
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;