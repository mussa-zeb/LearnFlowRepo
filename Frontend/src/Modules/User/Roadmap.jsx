import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roadmapsApi, resolveMediaUrl } from "../../Shared/utils/api";
import { Map, ArrowRight, Search, BookOpen, FileText, Video } from "lucide-react";

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await roadmapsApi.getAll();
        setRoadmaps(data);
        setFilteredRoadmaps(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRoadmaps(
        roadmaps.filter((rm) =>
          rm.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredRoadmaps(roadmaps);
    }
  }, [searchTerm, roadmaps]);

  const renderTypes = (rm) => {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#706A63]">
        {rm.steps?.length > 0 && (
          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Text</span>
        )}
        {rm.videoLessons?.length > 0 && (
          <span className="flex items-center gap-1.5"><Video className="h-4 w-4" /> Video</span>
        )}
        {rm.pdfUrl && (
          <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> PDF</span>
        )}
        <span className="hidden sm:block w-1 h-1 rounded-full bg-[#EBE5D9]" />
        <span>{rm.steps?.length || rm.videoLessons?.length || 0} Steps</span>
      </div>
    );
  };

  return (
    <div className="bg-[#F9F6F0] min-h-screen pb-20 font-sans">
      <section className="w-full bg-white border-b border-[#EBE5D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1816] mb-4">
            Learning Roadmaps
          </h1>
          <p className="text-lg text-[#706A63] max-w-2xl mx-auto leading-relaxed mb-8">
            Explore structured learning paths to achieve your goals.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Search className="h-5 w-5 text-[#706A63]" />
            </div>
            <input
              type="text"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-full border border-[#EBE5D9] bg-[#F9F6F0] py-4 pl-14 pr-6 text-sm text-[#1A1816] placeholder:text-[#706A63] shadow-sm focus:border-[#D48C70] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D48C70]/20 transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="text-center py-20 text-[#706A63]">Loading roadmaps...</div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EBE5D9]">
            <Map className="h-12 w-12 text-[#EBE5D9] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#1A1816] mb-2">No roadmaps found</h3>
            <p className="text-[#706A63]">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRoadmaps.map((rm) => (
              <Link
                key={rm._id}
                to={`/roadmap/${rm._id}`}
                className="group flex flex-col sm:flex-row items-stretch gap-5 bg-white rounded-2xl border border-[#EBE5D9] p-5 shadow-sm hover:shadow-md hover:border-[#D48C70]/40 transition-all duration-300"
              >
                {/* FIXED: object-contain and padding to show full image */}
                <div className="w-full sm:w-32 h-48 sm:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-[#F9F6F0] border border-[#EBE5D9] p-2 flex items-center justify-center">
                  {rm.imageUrl ? (
                    <img 
                      src={resolveMediaUrl(rm.imageUrl)} 
                      alt={rm.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <Map className="h-10 w-10 text-[#D48C70]" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0 py-1">
                  <h2 className="text-xl font-bold text-[#1A1816] mb-2 group-hover:text-[#D48C70] transition-colors line-clamp-2">
                    {rm.title}
                  </h2>
                  <p className="text-sm text-[#706A63] line-clamp-2 mb-4">
                    {rm.description}
                  </p>
                  <div className="mt-auto">
                    {renderTypes(rm)}
                  </div>
                </div>

                <div className="flex items-end sm:items-center mt-4 sm:mt-0 flex-shrink-0">
                  <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-[#D48C70] px-4 py-2.5 text-sm font-semibold text-white shadow-sm group-hover:bg-[#c07a5e] transition-colors whitespace-nowrap">
                    View Roadmap <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;