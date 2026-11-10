import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { roadmapsApi, resolveMediaUrl } from "../../Shared/utils/api";
import {
  Plus,
  Pencil,
  Trash2,
  Map,
  Search,
  FileText,
  Video,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const AdminRoadmaps = () => {
  const { token } = useAdminAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchRoadmaps = async () => {
    try {
      const { data } = await roadmapsApi.getAllAdmin(token);
      setRoadmaps(data);
      setFilteredRoadmaps(data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRoadmaps();
  }, [token]);

  useEffect(() => {
    let result = roadmaps;
    if (searchTerm) {
      result = result.filter((rm) =>
        rm.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter !== "all") {
      result = result.filter((rm) => {
        const hasText = rm.steps && rm.steps.length > 0;
        const hasPdf = !!rm.pdfUrl;
        const hasVideo = rm.videoLessons && rm.videoLessons.length > 0;
        if (typeFilter === "text") return hasText;
        if (typeFilter === "pdf") return hasPdf;
        if (typeFilter === "video") return hasVideo;
        return true;
      });
    }
    if (statusFilter !== "all") {
      const isPublished = statusFilter === "published";
      result = result.filter((rm) => rm.isPublished === isPublished);
    }
    setFilteredRoadmaps(result);
  }, [searchTerm, typeFilter, statusFilter, roadmaps]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this roadmap?")) {
      setDeleteLoading(id);
      try {
        await roadmapsApi.delete(id, token);
        fetchRoadmaps();
      } catch (error) {
        alert("Failed to delete roadmap");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const renderTypes = (rm) => {
    const types = [];
    if (rm.steps && rm.steps.length > 0) types.push({ label: "Text", icon: BookOpen });
    if (rm.pdfUrl) types.push({ label: "PDF", icon: FileText });
    if (rm.videoLessons && rm.videoLessons.length > 0) types.push({ label: "Video", icon: Video });

    if (types.length === 0) return <span className="text-[#706A63] text-xs italic">No content</span>;

    return (
      <div className="flex flex-wrap gap-1.5">
        {types.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md bg-[#F9F6F0] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#706A63] border border-[#EBE5D9]"
          >
            <t.icon className="h-3 w-3" />
            {t.label}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      <div className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1816] mb-1">Manage Roadmaps</h1>
            <p className="text-[#706A63]">Create and manage learning paths for your platform.</p>
          </div>
          <Link
            to="/admin/roadmaps/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c07a5e] transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Add New Roadmap
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-[#706A63]" />
            </div>
            <input
              type="text"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3 pl-11 pr-4 text-sm text-[#1A1816] placeholder:text-[#706A63] shadow-sm focus:border-[#D48C70] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D48C70] transition-all"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3 pl-4 pr-10 text-sm font-medium text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="text">Text Only</option>
                <option value="pdf">PDF Only</option>
                <option value="video">Video Only</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706A63]" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3 pl-4 pr-10 text-sm font-medium text-[#1A1816] shadow-sm focus:border-[#D48C70] focus:bg-white focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706A63]" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#706A63]">Loading roadmaps...</div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="text-center py-20 bg-[#F9F6F0] rounded-2xl border border-[#EBE5D9]">
            <Map className="h-12 w-12 text-[#D48C70] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#1A1816] mb-2">No roadmaps found</h3>
            <p className="text-[#706A63] mb-6">Try adjusting your filters or create a new roadmap.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EBE5D9] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#EBE5D9]">
                <thead className="bg-[#F9F6F0]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">Steps</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#706A63] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#706A63] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE5D9]">
                  {filteredRoadmaps.map((rm, index) => (
                    <tr key={rm._id} className="hover:bg-[#F9F6F0] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#706A63]">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[#F9F6F0] border border-[#EBE5D9] flex items-center justify-center overflow-hidden p-1">
                            {rm.imageUrl ? (
                              <img src={resolveMediaUrl(rm.imageUrl)} alt={rm.title} className="h-full w-full object-contain" />
                            ) : (
                              <Map className="h-5 w-5 text-[#D48C70]" />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-[#1A1816]">{rm.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {renderTypes(rm)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#1A1816]">{rm.steps?.length || rm.videoLessons?.length || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                          rm.isPublished 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {rm.isPublished ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/roadmaps/edit/${rm._id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#EBE5D9] bg-white text-[#706A63] hover:text-[#D48C70] hover:border-[#D48C70] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(rm._id)}
                            disabled={deleteLoading === rm._id}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-white text-red-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white px-6 py-4 border-t border-[#EBE5D9] flex items-center justify-between">
              <span className="text-sm text-[#706A63]">
                Showing <span className="font-medium text-[#1A1816]">1</span> to <span className="font-medium text-[#1A1816]">{filteredRoadmaps.length}</span> of <span className="font-medium text-[#1A1816]">{filteredRoadmaps.length}</span> results
              </span>
              <div className="flex gap-1">
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#EBE5D9] bg-white text-[#706A63] disabled:opacity-50" disabled>
                  &lt;
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#D48C70] text-white font-medium shadow-sm">
                  1
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#EBE5D9] bg-white text-[#706A63] disabled:opacity-50" disabled>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRoadmaps;