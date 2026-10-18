import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FooterLinks, FooterSocials } from "./constant/footer.links";
import { useLocation, useNavigate } from "react-router-dom";
import FooterKeys from "./components/FooterKeys";

import {
  faEnvelope,
  faHandHoldingDollar,
  faPalette,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { appVersion } from "../../../../config/app-config";
import { useTheme } from "../../../context";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accent, primary, tertiary } = useTheme();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getItemColor = (isActive: boolean, isHovered: boolean) => {
    if (isActive) return accent;
    if (isHovered) return tertiary;
    return primary;
  };

  return (
    <div className="flex flex-col w-full gap-5 text-sm">
      <FooterKeys />
      <div className="flex justify-between items-center">
        {/* Footer Left */}
        <div className="flex justify-between gap-5">
          {/* Contact */}
          <button
            className="flex items-center gap-1 cursor-pointer transition-colors"
            style={{ color: getItemColor(false, hoveredItem === "contact") }}
            onMouseEnter={() => setHoveredItem("contact")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <div>contact</div>
          </button>

          {/* Support */}
          <button
            className="flex items-center gap-1 cursor-pointer transition-colors"
            style={{ color: getItemColor(false, hoveredItem === "support") }}
            onMouseEnter={() => setHoveredItem("support")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FontAwesomeIcon icon={faHandHoldingDollar} />
            <div>support</div>
          </button>

          {/* Socials */}
          {FooterSocials.map((item, index) => {
            const isHovered = hoveredItem === item.name;

            return (
              <button
                key={`nav-left-social-${index}`}
                className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: getItemColor(false, isHovered) }}
                onClick={() =>
                  window.open(item.url, "_blank", "noopener,noreferrer")
                }
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <div>{item.name}</div>
              </button>
            );
          })}

          {/* Links */}
          {FooterLinks.map((item, index) => {
            const isActive = location.pathname === item.navigation;
            const isHovered = hoveredItem === item.name;

            return (
              <button
                key={`nav-left-internal-${index}`}
                className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: getItemColor(isActive, isHovered) }}
                onClick={() => navigate(item.navigation)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <div>{item.name}</div>
              </button>
            );
          })}
        </div>

        {/* Footer Right */}
        <div className="flex justify-between gap-5">
          {/* Theme Switch */}
          <button
            className="flex items-center gap-1 cursor-pointer transition-colors"
            style={{ color: getItemColor(false, hoveredItem === "theme") }}
            onMouseEnter={() => setHoveredItem("theme")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FontAwesomeIcon icon={faPalette} />
            <div>serika dark</div>
          </button>

          {/* App Version */}
          <button
            className="flex items-center gap-1 cursor-pointer transition-colors"
            style={{ color: getItemColor(false, hoveredItem === "version") }}
            onMouseEnter={() => setHoveredItem("version")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FontAwesomeIcon icon={faCodeBranch} />
            <div>v{appVersion}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
