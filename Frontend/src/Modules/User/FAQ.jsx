import { ChevronDown, Search, GraduationCap, BookOpen, Play, Smartphone, Monitor, Headphones, CreditCard, TrendingUp, RefreshCw, ShieldCheck, Send, Mail, Award, Users, Clock, Lock, Video, MessageCircle, FileText, Star } from "lucide-react";
import { useState } from "react";

const faqs = [
  { icon: GraduationCap, question: "How do I create an account?", answer: "Click on the Sign Up button in the top right corner and fill in your details to create a free account." },
  { icon: BookOpen, question: "How do I start a course?", answer: "Just browse our courses, choose one, and click the 'Enroll Now' button." },
  { icon: Play, question: "Can I access courses for free?", answer: "Yes, many of our courses are free. You can also upgrade to Pro for premium content." },
  { icon: Smartphone, question: "Can I use LearnFlow on mobile?", answer: "Yes, LearnFlow is fully responsive and works perfectly on all devices." },
  { icon: Monitor, question: "Do I get a certificate?", answer: "Yes! You will receive a certificate after completing any course." },
  { icon: Headphones, question: "How can I contact support?", answer: "You can reach our support team via email, live chat, or the Contact page." },
  { icon: CreditCard, question: "What payment methods are available?", answer: "We accept all major credit cards, PayPal, and other secure payment methods." },
  { icon: TrendingUp, question: "Are the courses beginner-friendly?", answer: "Yes, we offer courses for all levels, from beginner to advanced." },
  { icon: RefreshCw, question: "Can I get a refund?", answer: "Yes, we offer a 7-day money-back guarantee on all paid courses." },
  { icon: ShieldCheck, question: "Is my data secure?", answer: "Absolutely. We use industry-standard security to protect your personal information." },
  { icon: Award, question: "Are the certificates recognized?", answer: "Yes, our certificates are recognized by many industry partners and can be added to your LinkedIn profile." },
  { icon: Users, question: "Can I learn with friends?", answer: "Yes, you can enroll in group courses or invite friends to study together using our referral program." },
  { icon: Clock, question: "How long do I have access to a course?", answer: "Once you enroll in a course, you have lifetime access to the materials, including future updates." },
  { icon: Lock, question: "Can I download course materials?", answer: "Yes, many of our courses offer downloadable resources like PDFs, code snippets, and worksheets." },
  { icon: Video, question: "Are the courses video-based?", answer: "Our courses include a mix of high-quality video lessons, reading materials, and interactive quizzes." },
  { icon: MessageCircle, question: "Is there a community for students?", answer: "Yes! We have an active community forum and Discord server where you can connect with other learners." },
  { icon: FileText, question: "Can I get an invoice for my purchase?", answer: "Yes, an invoice is automatically generated and sent to your email after a successful payment." },
  { icon: Star, question: "How are courses rated?", answer: "Courses are rated by students after completion. We display the average rating to help you choose the best course." },
];

const FAQ = () => {
  // Changed to track the specific question string instead of index
  const [openQuestion, setOpenQuestion] = useState(null); 
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle function ensuring only one opens at a time
  const toggleFAQ = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="w-full bg-white min-h-screen font-sans">
      
      {/* ============ HERO ============ */}
      <div className="relative w-full overflow-hidden bg-white">
        
        {/* ============ PROFESSIONAL CIRCULAR DECORATIONS ============ */}
        <div className="absolute top-1/2 -left-32 md:-left-48 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#D48C70]/20 pointer-events-none z-0" />
        <div className="absolute top-1/2 -right-32 md:-right-48 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#D48C70]/20 pointer-events-none z-0" />
        {/* ======================================================= */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative z-10">
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-[#FBEDE7] text-[#1A1816] text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D48C70] text-white text-xs">?</span>
              Frequently Asked Questions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-[#1A1816] mt-5 leading-tight">
              How can we <span className="text-[#D48C70]">help?</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#1A1816] leading-relaxed mt-4 max-w-2xl mx-auto font-medium">
              Find answers to the most common questions about LearnFlow.<br />
              If you don't find what you're looking for, feel free to contact us.
            </p>
            <div className="w-24 h-1 bg-[#D48C70] mx-auto mt-6 rounded-full" />

            <form onSubmit={(e)=>e.preventDefault()} className="max-w-3xl mx-auto mt-8 flex items-center bg-white border border-[#EBE5D9] rounded-full p-1.5 shadow-sm">
              <Search className="h-5 w-5 text-[#1A1816] ml-4 shrink-0" />
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search for an FAQ..." className="flex-1 px-4 py-2.5 bg-transparent outline-none text-[#1A1816] placeholder:text-[#706A63]" />
              <button className="bg-[#D48C70] hover:bg-[#C07A5F] text-white px-7 py-2.5 rounded-full font-medium transition-colors">Search</button>
            </form>
          </div>
        </div>
      </div>

      {/* ============ FAQ GRID ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((faq) => {
            // Check if the current question is the one that's open
            const isOpen = openQuestion === faq.question; 
            const Icon = faq.icon;
            
            return (
              <div 
                key={faq.question} 
                /* Matched the background color to the screenshot (#F8F6F0) */
                className={`rounded-2xl border bg-[#F8F6F0] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 ${isOpen ? "border-[#D48C70]" : "border-[#EBE5D9]"}`}
              >
                <button 
                  onClick={() => toggleFAQ(faq.question)} 
                  className="flex w-full items-start gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCEBE4] text-[#D48C70]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex-1 pt-1">
                    <h3 className="text-[17px] font-semibold text-[#1A1816] leading-snug">
                      {faq.question}
                    </h3>
                    {/* Added smooth transition for the dropdown text */}
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="text-[#706A63] text-[15px] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-[#1A1816] shrink-0 mt-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            );
          })}
        </div>
        
        {filtered.length === 0 && (
          <p className="text-center text-[#706A63] py-10">
            No results found for “{search}”
          </p>
        )}

        {/* ============ STILL HAVE QUESTIONS ============ */}
        <div className="mt-10 bg-[#F8F6F0] border border-[#EBE5D9] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-[76px] w-[76px] rounded-full bg-[#FBDCCF] flex items-center justify-center shrink-0">
              <Send className="h-9 w-9 text-[#D48C70]" />
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#1A1816]">Still have questions?</h3>
              <p className="text-[#1A1816]/80 mt-1">Our support team is here to help you 24/7.</p>
            </div>
          </div>
          <a href="/contact" className="inline-flex items-center gap-2 bg-[#D48C70] hover:bg-[#C07A5F] text-white px-6 py-3 rounded-full font-medium transition-colors shrink-0">
            <Mail className="h-4 w-4" /> Contact Us →
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;