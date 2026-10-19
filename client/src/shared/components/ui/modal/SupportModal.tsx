import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingDollar,
  faStar,
  faHeart,
  faMugHot,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  developerGithub,
  appRepository,
  githubSponsorsUrl,
  buyMeACoffeeUrl,
} from "../../../../config/app-config";
import { useTheme } from "../../../context";

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
}

const supportOptions = [
  {
    id: "github-star",
    name: "Star on GitHub",
    desc: "Leave a star on the repo",
    icon: faStar,
    url: appRepository,
  },
  {
    id: "github-sponsors",
    name: "GitHub Sponsors",
    desc: "Sponsor project development",
    icon: faHeart,
    url: githubSponsorsUrl,
  },
  {
    id: "buy-coffee",
    name: "Buy Me a Coffee",
    desc: "Support via a donation",
    icon: faMugHot,
    url: buyMeACoffeeUrl,
  },
  {
    id: "contribute-code",
    name: "Contribute Code",
    desc: "Submit issues or pull requests",
    icon: faCodeBranch,
    url: `${appRepository}/pulls`,
  },
];

const SupportModal = ({ open, onClose }: SupportModalProps) => {
  const { accent, primary, tertiary, secondary, background } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl p-6 shadow-2xl flex flex-col gap-6 border-4 max-h-[90vh] overflow-y-auto no-scrollbar scrollbar-none"
        style={{
          backgroundColor: background,
          borderColor: secondary,
          color: tertiary,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2.5 text-2xl font-medium"
            style={{ color: primary }}
          >
            <FontAwesomeIcon icon={faHandHoldingDollar} />
            <span>Support</span>
          </div>
        </div>

        {/* Message */}
        <div
          className="flex flex-col gap-3 text-[15px] leading-relaxed tracking-wider text-justify"
          style={{ color: tertiary }}
        >
          <p>
            FizzType is free, ad-free, and open source. If you find the
            platform helpful and want to help support server hosting, domains,
            and continuous improvements, any support is deeply appreciated!
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          {supportOptions.map((item) => {
            const isHovered = hoveredLink === item.id;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border transition-all cursor-pointer select-none"
                style={{
                  backgroundColor: isHovered ? tertiary : `${primary}15`,
                  color: isHovered ? secondary : tertiary,
                  borderColor: isHovered ? tertiary : `${primary}30`,
                }}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <FontAwesomeIcon icon={item.icon} className="text-xl shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span
                    className="text-xs transition-colors"
                    style={{ color: isHovered ? secondary : primary }}
                  >
                    {item.desc}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Maintainer info */}
        <div
          className="pt-2 border-t flex justify-between items-center text-xs"
          style={{ borderColor: `${primary}30`, color: primary }}
        >
          <span>Created by Vishnu Thangaraj</span>
          <a
            href={developerGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 transition-colors"
            style={{ color: hoveredLink === "profile" ? accent : primary }}
            onMouseEnter={() => setHoveredLink("profile")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>@VishnuThangaraj</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
