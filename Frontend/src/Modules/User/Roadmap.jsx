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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-[#706A63]">
        {rm.steps?.length > 0 && (
          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-[#D48C70]" /> Text</span>
        )}
        {rm.videoLessons?.length > 0 && (
          <span className="flex items-center gap-1.5"><Video className="h-4 w-4 text-[#D48C70]" /> Video</span>
        )}
        {rm.pdfUrl && (
          <span className="flex items-center gap-1.5"><FileText className="h-4 w-4 text-[#D48C70]" /> PDF</span>
        )}
        <span className="hidden sm:block w-1 h-1 rounded-full bg-[#EBE5D9]" />
        <span>{rm.steps?.length || rm.videoLessons?.length || 0} Steps</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Hero Section with Solid Circles */}
      <section className="relative overflow-hidden bg-white border-b border-[#EBE5D9]">
        {/* Solid Skin Color Circles */}
        <div className="absolute -left-32 top-10 w-[400px] h-[400px] bg-[#D48C70]/10 rounded-full pointer-events-none" />
        <div className="absolute -right-40 top-0 w-[500px] h-[500px] bg-[#D48C70]/10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1816] mb-6">
            Learning Roadmaps
          </h1>
          <p className="text-lg text-[#706A63] max-w-2xl mx-auto leading-relaxed mb-10">
            Explore structured learning paths to achieve your goals.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto flex items-center bg-white border border-[#EBE5D9] rounded-full p-1.5 shadow-sm">
            <div className="pl-4 pr-2 text-[#706A63]">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent py-2 px-2 text-sm text-[#1A1816] placeholder:text-[#706A63] focus:outline-none"
            />
            <button className="bg-[#D48C70] hover:bg-[#c07a5e] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="text-center py-20 text-[#706A63]">Loading roadmaps...</div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EBE5D9] shadow-sm">
            <Map className="h-12 w-12 text-[#D48C70] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#1A1816] mb-2">No roadmaps found</h3>
            <p className="text-[#706A63]">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRoadmaps.map((rm) => (
              <Link
                key={rm._id}
                to={`/roadmap/${rm._id}`}
                className="group flex flex-col sm:flex-row items-stretch gap-5 bg-white rounded-3xl border border-[#EBE5D9] p-5 shadow-sm hover:shadow-md hover:border-[#D48C70]/50 transition-all duration-300"
              >
                {/* Image Left */}
                <div className="w-full sm:w-28 h-48 sm:h-auto flex-shrink-0 rounded-2xl overflow-hidden bg-white border border-[#EBE5D9] p-3 flex items-center justify-center">
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

                {/* Content Middle */}
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

                {/* Action Right */}
                <div className="flex items-center justify-center mt-4 sm:mt-0 flex-shrink-0">
                  <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-[#D48C70] px-4 py-2.5 text-sm font-bold text-white shadow-sm group-hover:bg-[#c07a5e] transition-colors whitespace-nowrap">
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