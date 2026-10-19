import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  developerEmail,
  developerGithub,
  appRepository,
} from "../../../../config/app-config";
import { useTheme } from "../../../context";
import { useNavigate } from "react-router-dom";
import { contactMailSubject } from "./constant/contact-mail-subject";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const navigate = useNavigate();
  const { accent, primary, tertiary, secondary } = useTheme();
  const [copied, setCopied] = useState(false);
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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(developerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl p-6 shadow-2xl flex flex-col gap-6 border"
        style={{
          backgroundColor: secondary,
          borderColor: `${primary}40`,
          color: tertiary,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2.5 text-2xl font-medium"
            style={{ color: primary }}
          >
            <span>Contact</span>
          </div>
        </div>

        {/* Message */}
        <div
          className="flex flex-col gap-4 text-[16px] leading-relaxed tracking-wider text-justify"
          style={{ color: tertiary }}
        >
          <p>
            Have feedback, found a bug, or want to contribute to FizzType? Feel
            free to reach out through any of the channels below.
          </p>

          <p>
            Please <span className="text-[#C64653]">do not send</span> requests
            to delete account, update email, update name or clear personal bests
            - you can do that in the{" "}
            <span
              className="cursor-pointer transition-colors"
              onClick={() => navigate("/account-settings")}
              style={{
                color: hoveredLink === "account-settings" ? tertiary : primary,
              }}
              onMouseEnter={() => setHoveredLink("account-settings")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              account settings
            </span>{" "}
            page.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {contactMailSubject.map((item) => {
            const isHovered = hoveredLink === item.name;

            return (
              <a
                key={item.name}
                href={`mailto:${developerEmail}?subject=[${item.subject}]`}
                className="flex items-center justify-center gap-2.5 p-3 rounded-lg border transition-all cursor-pointer font-medium text-sm select-none"
                style={{
                  backgroundColor: isHovered ? tertiary : `${primary}15`,
                  color: isHovered ? secondary : tertiary,
                  borderColor: isHovered ? tertiary : `${primary}30`,
                }}
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <FontAwesomeIcon icon={item.icon} className="text-base" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Email Box */}
        <div
          className="flex items-center justify-between p-3 rounded-lg border transition-colors"
          style={{
            backgroundColor: `${primary}15`,
            borderColor: `${primary}30`,
          }}
        >
          <div className="flex flex-col">
            <span
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: primary }}
            >
              Email
            </span>
            <a
              href={`mailto:${developerEmail}`}
              className="text-sm font-medium hover:underline transition-colors"
              style={{
                color: hoveredLink === "email-link" ? accent : tertiary,
              }}
              onMouseEnter={() => setHoveredLink("email-link")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {developerEmail}
            </a>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md transition-colors text-sm flex items-center gap-1.5"
            style={{
              color: copied
                ? accent
                : hoveredLink === "copy-btn"
                  ? tertiary
                  : primary,
            }}
            onClick={handleCopyEmail}
            onMouseEnter={() => setHoveredLink("copy-btn")}
            onMouseLeave={() => setHoveredLink(null)}
            title="Copy email to clipboard"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Repository & Social Links */}
        <div className="flex flex-col gap-2.5">
          <span
            className="text-xs uppercase tracking-wider font-semibold"
            style={{ color: primary }}
          >
            Links &amp; Socials
          </span>
          <div className="grid grid-cols-3 gap-2">
            {/* GitHub Repo */}
            <a
              href={appRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border transition-all cursor-pointer text-sm"
              style={{
                backgroundColor:
                  hoveredLink === "repo" ? tertiary : `${primary}15`,
                color: hoveredLink === "repo" ? secondary : tertiary,
                borderColor:
                  hoveredLink === "repo" ? tertiary : `${primary}30`,
              }}
              onMouseEnter={() => setHoveredLink("repo")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <FontAwesomeIcon icon={faCodeBranch} />
              <span className="text-xs font-medium">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vishnuthangaraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border transition-all cursor-pointer text-sm"
              style={{
                backgroundColor:
                  hoveredLink === "linkedin" ? tertiary : `${primary}15`,
                color: hoveredLink === "linkedin" ? secondary : tertiary,
                borderColor:
                  hoveredLink === "linkedin" ? tertiary : `${primary}30`,
              }}
              onMouseEnter={() => setHoveredLink("linkedin")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span className="text-xs font-medium">LinkedIn</span>
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/VishnuThangaraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border transition-all cursor-pointer text-sm"
              style={{
                backgroundColor:
                  hoveredLink === "twitter" ? tertiary : `${primary}15`,
                color: hoveredLink === "twitter" ? secondary : tertiary,
                borderColor:
                  hoveredLink === "twitter" ? tertiary : `${primary}30`,
              }}
              onMouseEnter={() => setHoveredLink("twitter")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <FontAwesomeIcon icon={faTwitter} />
              <span className="text-xs font-medium">Twitter</span>
            </a>
          </div>
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

export default ContactModal;
