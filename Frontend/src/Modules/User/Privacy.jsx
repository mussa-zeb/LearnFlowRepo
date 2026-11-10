import React from 'react';
import { 
  Home, 
  Lock, 
  Database, 
  Settings, 
  ShieldCheck, 
  Users, 
  Scale, 
  Mail,
  Phone,
  MapPin,
  GraduationCap
} from 'lucide-react';

const Privacy = () => {
  return (
   <div>
    <div 
      className="w-full font-sans antialiased" 
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
      </style>

      {/* Main Hero Container */}
      <section className="relative w-full bg-[#F9F6F0] border-b border-[#EBE5D9] overflow-hidden">
        
        {/* --- BACKGROUND DECORATIVE SHAPES --- */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[600px] h-[600px] rounded-full border-[40px] border-[#FFFFFF] opacity-70"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] rounded-full border-[40px] border-[#FFFFFF] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#EBE5D9] opacity-30 blur-2xl"></div>
        </div>

        {/* --- CENTERED TEXT CONTENT --- */}
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-20 sm:py-28 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-[#1A1816]">Privacy </span>
            <span className="text-[#D48C70]">Policy</span>
          </h1>
          <p className="text-[#706A63] text-[17px] sm:text-[18px] leading-[1.8] mb-8 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="w-24 h-1.5 bg-[#D48C70] rounded-full mx-auto"></div>
        </div>
      </section>
    </div>
    

      {/* --- MAIN CONTENT SECTION (White background) --- */}
      <div className="w-full bg-[#FFFFFF]">
        <div className="max-w-[1000px] mx-auto px-6 py-10">
          
          {/* Section 1 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Lock size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Introduction</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] leading-[1.8]">
                At LearnFlow, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services. By using LearnFlow, you agree to the terms outlined in this policy.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Database size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Information We Collect</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] mb-3 sm:mb-4">We may collect the following types of information:</p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[15px] text-[#706A63]">
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span><strong className="text-[#1A1816] font-semibold">Personal Information:</strong> Name, email address, and other contact details.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span><strong className="text-[#1A1816] font-semibold">Account Information:</strong> Username, password, and profile details.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span><strong className="text-[#1A1816] font-semibold">Usage Information:</strong> Courses you enroll in, progress, and activity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span><strong className="text-[#1A1816] font-semibold">Technical Information:</strong> IP address, browser type, and device information.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Settings size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">How We Use Your Information</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] mb-3 sm:mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-[15px] text-[#706A63]">
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span>Provide and improve our services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span>Personalize your learning experience.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span>Send important updates and notifications.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D48C70] mr-2 sm:mr-3 text-lg leading-none mt-0.5">•</span>
                  <span>Analyze usage to enhance our platform.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <ShieldCheck size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Data Security</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] leading-[1.8]">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Users size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Third-Party Services</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] leading-[1.8]">
                We may use trusted third-party services (such as analytics, payment processors, and cloud hosting providers) to help operate our platform. These third parties have their own privacy policies, and we encourage you to review them.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="flex flex-row gap-4 sm:gap-6 py-8 sm:py-10 border-b border-[#EBE5D9]">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Scale size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Your Rights</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] leading-[1.8]">
                You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at <a href="mailto:support@learnflow.com" className="text-[#1A1816] font-semibold hover:text-[#D48C70] transition-colors">support@learnflow.com</a>.
              </p>
            </div>
          </div>

          {/* Section 7: Contact */}
          <div className="flex flex-row gap-4 sm:gap-6 pt-8 sm:pt-10 pb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1A1816] border border-[#EBE5D9]">
                <Mail size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="sm:pt-2 flex-1 w-full">
              <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1816] mb-2 sm:mb-3">Contact Us</h2>
              <p className="text-[#706A63] text-sm sm:text-[15px] mb-4 sm:mb-6">
                If you have any questions about this Privacy Policy, please feel free to reach out to us:
              </p>
              
              {/* Contact Details Row */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 text-xs sm:text-[14px] font-medium text-[#1A1816]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Mail size={14} className="text-[#706A63] sm:w-4 sm:h-4" />
                  <a href="mailto:support@learnflow.com" className="hover:text-[#D48C70] transition-colors">support@learnflow.com</a>
                </div>
                
                <div className="hidden sm:block text-[#EBE5D9]">|</div>
                
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Phone size={14} className="text-[#706A63] sm:w-4 sm:h-4" />
                  <span>+92 300 123 4567</span>
                </div>
                
                <div className="hidden sm:block text-[#EBE5D9]">|</div>
                
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin size={14} className="text-[#706A63] sm:w-4 sm:h-4" />
                  <span>Bannu, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;