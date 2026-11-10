import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { roadmapsApi, resolveMediaUrl } from "../../Shared/utils/api";
import VideoPlayer from "../../Shared/components/VideoPlayer";
import { jsPDF } from "jspdf";
import {
  Home, Code, Layers, Rocket, Trophy, Clock, CircleCheck, Circle, Calendar,
  ArrowLeft, CheckCircle, Download, PlayCircle, FileText, Video, BookOpen, Image as ImageIcon
} from "lucide-react";

const iconMap = { Home, Code, Layers, Rocket, Trophy };

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [progress, setProgress] = useState({});
  const [pdfCompleted, setPdfCompleted] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const [activeTab, setActiveTab] = useState("text");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { data } = await roadmapsApi.getById(id);
        setRoadmap(data);
        
        if (data.steps?.length > 0) setActiveTab("text");
        else if (data.pdfUrl) setActiveTab("pdf");
        else if (data.videoLessons?.length > 0) setActiveTab("video");

        const savedText = localStorage.getItem(`roadmap_progress_${data._id}`);
        if (savedText) setProgress(JSON.parse(savedText));
        else {
          const initial = {};
          data.steps?.forEach((_, i) => { initial[i] = i === 0 ? "in-progress" : "upcoming"; });
          setProgress(initial);
        }

        const savedPdf = localStorage.getItem(`roadmap_pdf_completed_${data._id}`);
        if (savedPdf) setPdfCompleted(JSON.parse(savedPdf));

        const savedVid = localStorage.getItem(`roadmap_vid_completed_${data._id}`);
        if (savedVid) setVideoCompleted(JSON.parse(savedVid));
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [id]);

  const toggleStatus = (index) => {
    const current = progress[index] || "upcoming";
    let nextStatus = "upcoming";
    if (current === "upcoming") nextStatus = "in-progress";
    else if (current === "in-progress") nextStatus = "completed";
    else if (current === "completed") nextStatus = "upcoming";

    const newProgress = { ...progress, [index]: nextStatus };
    setProgress(newProgress);
    localStorage.setItem(`roadmap_progress_${roadmap._id}`, JSON.stringify(newProgress));
  };

  const togglePdfComplete = () => {
    const newStatus = !pdfCompleted;
    setPdfCompleted(newStatus);
    localStorage.setItem(`roadmap_pdf_completed_${roadmap._id}`, JSON.stringify(newStatus));
  };

  const toggleVideoComplete = (index) => {
    const newCompleted = videoCompleted.includes(index)
      ? videoCompleted.filter((i) => i !== index)
      : [...videoCompleted, index];
    setVideoCompleted(newCompleted);
    localStorage.setItem(`roadmap_vid_completed_${roadmap._id}`, JSON.stringify(newCompleted));
  };

  const getPdfUrl = (url) => {
    if (!url) return "";
    let finalUrl = resolveMediaUrl(url);
    if (!finalUrl.toLowerCase().endsWith(".pdf")) finalUrl = `${finalUrl}.pdf`;
    return finalUrl;
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFillColor(249, 246, 240); 
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(26, 24, 22); 
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("LearnFlow", 15, 20);
      doc.setFontSize(20);
      doc.text(roadmap.title, 15, 55);
      
      let yPos = 75;
      roadmap.steps.forEach((step, index) => {
        if (yPos > 260) { doc.addPage(); yPos = 20; }
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${step.title}`, 15, yPos);
        doc.setFontSize(10);
        doc.setTextColor(112, 106, 99);
        const splitStepDesc = doc.splitTextToSize(step.description, pageWidth - 30);
        doc.text(splitStepDesc, 15, yPos + 6);
        yPos += 6 + (splitStepDesc.length * 5) + 10;
      });
      doc.save(`${roadmap.title.replace(/\s+/g, '_')}_LearnFlow.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-[#706A63] min-h-screen bg-white">Loading roadmap...</div>;
  if (!roadmap) return <div className="p-12 text-center text-[#706A63] min-h-screen bg-white">Roadmap not found.</div>;

  const hasText = roadmap.steps && roadmap.steps.length > 0;
  const hasPdf = !!roadmap.pdfUrl;
  const hasVideo = roadmap.videoLessons && roadmap.videoLessons.length > 0;
  const showTabs = hasText || hasPdf || hasVideo;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#706A63] hover:text-[#1A1816] mb-6 transition-colors relative z-20">
          <ArrowLeft className="h-4 w-4" /> Back to Roadmaps
        </Link>

        {/* Hero Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12 py-6">
          
          {/* Perfect Overlapping Solid Circles (Right Side) */}
          <div className="absolute inset-y-0 right-0 w-[500px] pointer-events-none -z-10 hidden md:block translate-x-12">
            {/* Largest Circle - Top Right */}
            <div className="absolute -top-24 right-0 w-[450px] h-[450px] rounded-full bg-[#D48C70]/10"></div>
            {/* Medium Circle - Middle Right */}
            <div className="absolute top-1/4 -right-10 w-[320px] h-[320px] rounded-full bg-[#D48C70]/15"></div>
            {/* Smallest Circle - Bottom Right */}
            <div className="absolute bottom-0 right-20 w-[200px] h-[200px] rounded-full bg-[#D48C70]/20"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1816] mb-4">
              {roadmap.title}
            </h1>
            <p className="text-[#706A63] text-base sm:text-lg leading-relaxed mb-6">
              {roadmap.description}
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-[#706A63]">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Self-paced</span>
              <span className="text-[#EBE5D9]">|</span>
              <span className="flex items-center gap-1.5"><CircleCheck className="h-4 w-4" /> {roadmap.steps?.length || 0} Steps</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center w-full relative z-10">
            {roadmap.imageUrl ? (
              <img 
                src={resolveMediaUrl(roadmap.imageUrl)} 
                alt={roadmap.title} 
                className="w-full max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-xl" 
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center text-[#D48C70]">
                <ImageIcon className="h-12 w-12" />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Tabs */}
        {showTabs && (
          <div className="flex items-center justify-center mb-8 w-full px-2 relative z-10">
            <div className="flex w-full sm:w-auto overflow-x-auto bg-white border border-[#EBE5D9] rounded-full p-1.5 shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {hasText && (
                <button 
                  onClick={() => setActiveTab("text")} 
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "text" ? "bg-[#D48C70] text-white shadow-md" : "text-[#706A63] hover:text-[#1A1816]"}`}
                >
                  <BookOpen className="h-4 w-4" /> Text
                </button>
              )}
              {hasPdf && (
                <button 
                  onClick={() => setActiveTab("pdf")} 
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "pdf" ? "bg-[#D48C70] text-white shadow-md" : "text-[#706A63] hover:text-[#1A1816]"}`}
                >
                  <FileText className="h-4 w-4" /> PDF
                </button>
              )}
              {hasVideo && (
                <button 
                  onClick={() => setActiveTab("video")} 
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "video" ? "bg-[#D48C70] text-white shadow-md" : "text-[#706A63] hover:text-[#1A1816]"}`}
                >
                  <Video className="h-4 w-4" /> Video
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- TEXT MODE --- */}
        {activeTab === "text" && hasText && (
          <>
            <div className="relative space-y-4 mb-8">
              <div className="absolute left-[28px] sm:left-[32px] top-10 bottom-10 w-0.5 bg-[#EBE5D9]" />
              {roadmap.steps.map((step, idx) => {
                const Icon = iconMap[step.icon] || Home;
                const status = progress[idx] || "upcoming";
                const isCompleted = status === "completed";
                const isInProgress = status === "in-progress";

                return (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-6 z-10">
                    <div className="flex-shrink-0 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#D48C70] text-white font-semibold text-lg sm:text-xl shadow-md border-4 border-white">
                      {idx + 1}
                    </div>
                    <div className="flex-1 rounded-2xl border border-[#EBE5D9] bg-white p-4 sm:p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#F9F6F0] text-[#D48C70]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#1A1816]">{step.title}</h3>
                            <p className="text-sm sm:text-base text-[#706A63] mt-1">{step.description}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-[#706A63] font-medium">
                              <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {step.duration}</div>
                              <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#EBE5D9]" /> {step.difficulty}</div>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => toggleStatus(idx)} className={`self-start sm:self-center flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${isCompleted ? "bg-[#1A1816] text-white" : isInProgress ? "bg-[#F9F6F0] text-[#D48C70] border border-[#D48C70]" : "bg-white border border-[#EBE5D9] text-[#706A63] hover:bg-[#F9F6F0]"}`}>
                          {isCompleted ? <CircleCheck className="h-4 w-4" /> : isInProgress ? <Circle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                          {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-8">
               <button onClick={handleDownloadPDF} disabled={isDownloading} className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#c07a5e] disabled:opacity-50 transition-colors">
                 <Download className="h-4 w-4" /> {isDownloading ? "Generating..." : "Download as PDF"}
               </button>
            </div>
          </>
        )}

        {/* --- PDF MODE --- */}
        {activeTab === "pdf" && hasPdf && (
           <div className="space-y-6">
             <div className="bg-white rounded-3xl border border-[#EBE5D9] p-6 sm:p-8 shadow-sm">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1816] mb-1">Roadmap Document</h3>
                    <p className="text-sm text-[#706A63]">Read the document below or download a copy.</p>
                  </div>
                  <a href={getPdfUrl(roadmap.pdfUrl)} target="_blank" rel="noopener noreferrer" download={`${roadmap.title.replace(/\s+/g, '_')}.pdf`} className="inline-flex items-center gap-2 rounded-xl bg-[#D48C70] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c07a5e] transition-colors self-start sm:self-auto">
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
               </div>
               <div className="w-full h-[600px] rounded-xl overflow-hidden border border-[#EBE5D9] bg-[#F9F6F0]">
                 <iframe src={`${getPdfUrl(roadmap.pdfUrl)}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full" title="Roadmap PDF" />
               </div>
             </div>
             <div className="rounded-3xl border border-[#EBE5D9] bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                   <h3 className="text-lg font-bold text-[#1A1816] flex items-center gap-2">
                     {pdfCompleted ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Circle className="h-5 w-5 text-[#EBE5D9]" />}
                     {pdfCompleted ? "You have completed this Roadmap!" : "Finished reading?"}
                   </h3>
                   <p className="text-sm text-[#706A63] mt-1">{pdfCompleted ? "Great job! Your progress is saved." : "Mark this document as complete to track your progress."}</p>
                </div>
                <button onClick={togglePdfComplete} className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors ${pdfCompleted ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "bg-[#D48C70] text-white hover:bg-[#c07a5e]"}`}>
                  <CheckCircle className="h-4 w-4" /> {pdfCompleted ? "Marked as Complete" : "Mark as Complete"}
                </button>
             </div>
           </div>
        )}

        {/* --- VIDEO MODE --- */}
        {activeTab === "video" && hasVideo && (
          <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE5D9] shadow-sm">
            <div className="flex-1 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#EBE5D9] bg-black aspect-video">
                <VideoPlayer 
                  src={resolveMediaUrl(roadmap.videoLessons[activeVideoIndex]?.videoUrl)} 
                  title={roadmap.videoLessons[activeVideoIndex]?.title} 
                  className="h-full w-full" 
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1816]">
                    {roadmap.videoLessons[activeVideoIndex]?.title}
                  </h3>
                  <p className="text-sm text-[#706A63]">Lesson {activeVideoIndex + 1} of {roadmap.videoLessons.length}</p>
                </div>
                <button onClick={() => toggleVideoComplete(activeVideoIndex)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${videoCompleted.includes(activeVideoIndex) ? "bg-green-50 text-green-700 border border-green-200" : "bg-[#D48C70] text-white hover:bg-[#c07a5e]"}`}>
                  <CheckCircle className="h-4 w-4" />
                  {videoCompleted.includes(activeVideoIndex) ? "Completed" : "Mark as complete"}
                </button>
              </div>
            </div>

            <div className="lg:w-[350px] flex-shrink-0">
              <div className="rounded-2xl border border-[#EBE5D9] overflow-hidden h-full flex flex-col">
                <div className="bg-[#F9F6F0] px-5 py-4 border-b border-[#EBE5D9] flex justify-between items-center">
                  <h3 className="font-bold text-[#1A1816]">Course Playlist</h3>
                  <span className="text-xs font-semibold text-[#D48C70] bg-white px-2 py-1 rounded-md border border-[#EBE5D9]">{roadmap.videoLessons.length} Lessons</span>
                </div>
                <div className="divide-y divide-[#EBE5D9] overflow-y-auto flex-1 max-h-[450px]">
                  {roadmap.videoLessons.map((lesson, index) => {
                    const isActive = index === activeVideoIndex;
                    const isCompleted = videoCompleted.includes(index);
                    return (
                      <button key={index} onClick={() => setActiveVideoIndex(index)} className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${isActive ? "bg-[#F9F6F0]" : "hover:bg-[#F9F6F0]"}`}>
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${isCompleted ? "bg-green-100 text-green-700" : isActive ? "bg-[#D48C70] text-white" : "bg-[#EBE5D9] text-[#706A63]"}`}>
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isActive ? "text-[#1A1816]" : "text-[#706A63]"}`}>{lesson.title}</p>
                        </div>
                        {isActive && <PlayCircle className="h-4 w-4 text-[#D48C70]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RoadmapDetail;