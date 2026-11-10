import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] items-center justify-center overflow-hidden bg-white px-4 py-16 sm:py-20 font-sans">

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* 404 Illustration */}
        <svg
          viewBox="0 0 900 500"
          className="mb-1 h-auto w-full max-w-[850px]"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="404 illustration with an open book and magnifying glass"
        >
          <defs>
            <linearGradient id="bookPage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F9F6F0" />
            </linearGradient>

            <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EBE5D9" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          {/* Background Blob - Updated to standard Cream background */}
          <path
            d="M85 285
               C48 185 126 112 247 126
               C316 65 415 16 510 45
               C610 76 625 139 720 158
               C830 182 863 282 810 355
               C758 425 646 420 533 411
               C411 443 273 419 171 397
               C103 384 75 342 85 285Z"
            fill="#F9F6F0"
            opacity="0.85"
          />

          {/* 404 Typography - Updated to Espresso */}
          <g
            fill="#1A1816"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="900"
            textAnchor="middle"
          >
            <text
              x="290"
              y="337"
              fontSize="278"
              letterSpacing="-13"
            >
              4
            </text>

            <text
              x="450"
              y="337"
              fontSize="278"
              letterSpacing="-13"
            >
              0
            </text>

            <text
              x="610"
              y="337"
              fontSize="278"
              letterSpacing="-13"
            >
              4
            </text>
          </g>

          {/* Orange rays behind the book - Updated to Skin color */}
          <g
            stroke="#D48C70"
            strokeWidth="9"
            strokeLinecap="round"
          >
            <path d="M418 310 L412 285" />
            <path d="M442 306 L442 278" />
            <path d="M465 310 L477 286" />
          </g>

          {/* Book ground shadow */}
          <ellipse
            cx="450"
            cy="432"
            rx="330"
            ry="19"
            fill="#EBE5D9"
            opacity="0.55"
          />

          {/* OPEN BOOK */}
          <g transform="translate(450 365)">

            {/* Left outer page */}
            <path
              d="M0 30
                 C-62 -20 -151 -50 -215 -13
                 L-215 64
                 C-145 33 -65 49 0 91Z"
              fill="url(#bookPage)"
              stroke="#EBE5D9"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Left upper page */}
            <path
              d="M0 30
                 C-66 -28 -147 -65 -197 -36
                 C-143 -30 -72 3 0 74Z"
              fill="#FFFFFF"
              stroke="#EBE5D9"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Left inner page */}
            <path
              d="M0 30
                 C-47 -15 -107 -28 -159 -10
                 C-99 -4 -48 34 0 76Z"
              fill="#FFFFFF"
              stroke="#EBE5D9"
              strokeWidth="3"
            />

            {/* Right outer page */}
            <path
              d="M0 30
                 C62 -20 151 -50 215 -13
                 L215 64
                 C145 33 65 49 0 91Z"
              fill="url(#bookPage)"
              stroke="#EBE5D9"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Right upper page */}
            <path
              d="M0 30
                 C66 -28 147 -65 197 -36
                 C143 -30 72 3 0 74Z"
              fill="#FFFFFF"
              stroke="#EBE5D9"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Right inner page */}
            <path
              d="M0 30
                 C47 -15 107 -28 159 -10
                 C99 -4 48 34 0 76Z"
              fill="#FFFFFF"
              stroke="#EBE5D9"
              strokeWidth="3"
            />

            {/* Page fold / center spine */}
            <path
              d="M0 30
                 C-8 48 -7 76 0 91
                 C7 76 8 48 0 30Z"
              fill="#EBE5D9"
            />

            {/* Bottom black book cover - Updated to Espresso */}
            <path
              d="M-215 61
                 C-139 48 -64 59 0 91
                 C64 59 139 48 215 61
                 L219 83
                 C141 76 67 82 0 105
                 C-67 82 -141 76 -219 83Z"
              fill="#1A1816"
              stroke="#1A1816"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Bottom spine */}
            <path
              d="M-20 91 Q0 105 20 91 Q13 117 0 117 Q-13 117 -20 91Z"
              fill="#1A1816"
            />

            {/* Page highlights */}
            <path
              d="M-170 2 Q-105 4 -35 53"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.9"
            />

            <path
              d="M170 2 Q105 4 35 53"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>

          {/* MAGNIFYING GLASS */}
          <g transform="translate(615 340) rotate(-43)">

            {/* Handle - Updated to Espresso */}
            <rect
              x="-13"
              y="29"
              width="26"
              height="100"
              rx="12"
              fill="#1A1816"
            />

            {/* Handle highlight */}
            <path
              d="M-4 43 L-4 112"
              stroke="#514D46"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Lens */}
            <circle
              cx="0"
              cy="0"
              r="51"
              fill="url(#lens)"
              stroke="#1A1816"
              strokeWidth="12"
            />

            {/* Glass reflection */}
            <path
              d="M-27 -29 Q-12 -44 7 -39"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeLinecap="round"
            />

          </g>
        </svg>

        {/* Heading - Updated to Espresso */}
        <h1 className="mb-3 text-4xl font-black tracking-tight text-[#1A1816] sm:text-5xl md:text-6xl">
          Page not found
        </h1>

        {/* Description - Updated to Skin color */}
        <p className="mb-10 text-base font-semibold leading-relaxed text-[#D48C70] sm:text-xl md:text-2xl">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">

          <Link
            to="/"
            className="inline-flex min-w-[210px] items-center justify-center gap-3 rounded-full bg-[#D48C70] px-9 py-4 text-base font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#c07a5e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D48C70] focus:ring-offset-2"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>

          <button
            onClick={() =>
              window.history.length > 1
                ? navigate(-1)
                : navigate("/")
            }
            className="inline-flex min-w-[210px] items-center justify-center gap-3 rounded-full border-2 border-[#1A1816] bg-transparent px-9 py-[14px] text-base font-bold text-[#1A1816] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F9F6F0] focus:outline-none focus:ring-2 focus:ring-[#1A1816] focus:ring-offset-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFound;