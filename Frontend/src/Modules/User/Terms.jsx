import {
  Home,
  ChevronRight,
  FileText,
  ShieldCheck,
  Users,
  Scale,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using LearnFlow, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree with these terms, please do not use our platform.",
  },
  {
    icon: FileText,
    title: "2. Use License",
    content:
      "Permission is granted to temporarily access the materials on LearnFlow for personal, non-commercial transitory viewing only. You may not modify, copy, or redistribute the materials without permission.",
  },
  {
    icon: FileText,
    title: "3. Course Access",
    content:
      "LearnFlow provides educational courses and learning materials. Users are responsible for using the provided learning resources appropriately and following the platform guidelines.",
  },
  {
    icon: Users,
    title: "4. User Responsibilities",
    content:
      "Users should provide accurate information when using LearnFlow and must not misuse the platform, interfere with its services, or attempt unauthorized access.",
  },
  {
    icon: ShieldCheck,
    title: "5. Disclaimer",
    content:
      "The materials on LearnFlow are provided on an 'as is' basis. LearnFlow makes no warranties, expressed or implied, regarding the accuracy or reliability of the materials.",
  },
  {
    icon: Scale,
    title: "6. Changes to Terms",
    content:
      "LearnFlow reserves the right to update these terms when necessary. Users should review this page periodically to stay informed about any changes.",
  },
  {
    icon: Mail,
    title: "7. Contact Us",
    content:
      "If you have any questions about these Terms of Service, please contact our support team at support@learnflow.com.",
  },
];

export default function TermsOfService() {
  return (
    <div 
      className="min-h-screen bg-[#FFFFFF]" 
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
      </style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFFFFF] border-b border-[#EBE5D9]">
        
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 h-96 w-96 rounded-full border-[40px] border-[#F9F6F0] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 h-72 w-72 rounded-full bg-[#EBE5D9] opacity-50 pointer-events-none" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:py-24">
          
          <div className="max-w-3xl z-10 flex flex-col items-center">
            
            <h1 className="text-5xl font-extrabold tracking-tight text-[#1A1816] sm:text-6xl lg:text-7xl mb-4 text-center">
              Terms <span className="text-[#D48C70]">Service</span>
            </h1>

            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-[#706A63] sm:text-lg text-center mx-auto">
              Please read these terms carefully before using our platform.
            </p>

            <div className="mt-6 h-1 w-20 rounded-full bg-[#D48C70] mx-auto" />
          </div>

        </div>
      </section>

      {/* Terms Content (Main Card) */}
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#EBE5D9] p-6 sm:p-10">
          {sections.map((section, index) => {
            return (
              <div
                key={index}
                // Yahan flex-col sm:flex-row ko sirf flex-row kar diya hai
                className={`flex flex-row gap-4 sm:gap-8 py-8 ${
                  index !== sections.length - 1 ? "border-b border-[#EBE5D9]" : ""
                }`}
              >
                {/* Number Badge */}
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#F9F6F0] border border-[#EBE5D9] text-lg sm:text-xl font-bold text-[#1A1816]">
                    {index + 1}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h2 className="mb-2 text-lg sm:text-xl font-bold text-[#1A1816]">
                    {section.title.replace(/^[0-9]+\.\s*/, '')} 
                  </h2>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#706A63]">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}