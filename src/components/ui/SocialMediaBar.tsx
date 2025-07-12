"use client";

import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

export const SocialMediaBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      url: "https://facebook.com/your-page",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-[#1877F2] hover:bg-[#0E65DA]",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/your-handle",
      icon: <Instagram className="h-5 w-5" />,
      color:
        "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/your-handle",
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-[#1DA1F2] hover:bg-[#0C85D0]",
    },
    {
      name: "Youtube",
      url: "https://youtube.com/your-channel",
      icon: <Youtube className="h-5 w-5" />,
      color: "bg-[#FF0000] hover:bg-[#D60000]",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/your-company",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-[#0A66C2] hover:bg-[#004182]",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 transition-all duration-300 z-40 ${
        isHovered ? "translate-x-0" : "-translate-x-2"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`p-3 text-white shadow-md transform transition-all duration-300 flex items-center group ${
            social.color
          } ${isHovered ? "translate-x-0" : "-translate-x-8"}`}
          style={{
            borderTopRightRadius: "0.375rem",
            borderBottomRightRadius: "0.375rem",
            transitionDelay: isHovered
              ? `${socialLinks.indexOf(social) * 50}ms`
              : "0ms",
          }}
        >
          <span className="z-10">{social.icon}</span>
          <span
            className={`absolute left-10 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            {social.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SocialMediaBar;
