import React from "react";

function Logo({ width = "100px" }) {
  return (
    // Wrapper div to control size via props
    <div
      style={{ width: width }}
      className="aspect-square flex items-center justify-center"
    >
      {/* MODERN ABSTRACT LOGO DESIGN:
         Combines a stylized Pen Nib and fanning Pages of a book.
         Matches the Premium Purplish/Indigo theme.
      */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(147,51,234,0.3)]" // Soft purple glow
      >
        {/* Background Circle (Subtle tint) */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#F5F3FF"
          stroke="#E9D5FF"
          strokeWidth="1"
        />

        {/* Define Gradient */}
        <defs>
          <linearGradient
            id="logoGradient"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9333EA" /> {/* Purple 600 */}
            <stop offset="1" stopColor="#4F46E5" /> {/* Indigo 600 */}
          </linearGradient>
        </defs>

        {/* Abstract Book Pages / Flow */}
        <path
          d="M35 30C25 35 20 45 20 60C20 75 30 85 50 85M35 30C45 25 55 25 65 30M35 30L50 15M65 30C75 35 80 45 80 60C80 75 70 85 50 85M65 30L50 15M50 85V15"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70" // Slightly faded effect for pages
        />

        {/* Stylized Pen Nib (Foreground, solid gradient) */}
        <path
          d="M50 15L65 45L50 85L35 45L50 15Z"
          fill="url(#logoGradient)"
          stroke="#FAF5FF" // Ultra-light purple border for separation
          strokeWidth="2"
        />

        {/* Nib Eye (Center dot) */}
        <circle cx="50" cy="45" r="3" fill="#FAF5FF" />
      </svg>
    </div>
  );
}

export default Logo;
