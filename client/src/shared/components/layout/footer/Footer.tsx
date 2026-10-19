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
import ContactModal from "../../ui/modal/ContactModal";
import SupportModal from "../../ui/modal/SupportModal";
import ChangeLogsModal from "../../ui/modal/ChangeLogsModal";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accent, primary, tertiary } = useTheme();

  const [openSupport, setOpenSupport] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openVersion, setOpenVersion] = useState(false);
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
            onClick={() => setOpenContact(true)}
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
            onClick={() => setOpenSupport(true)}
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
            onClick={() => setOpenVersion(true)}
          >
            <FontAwesomeIcon icon={faCodeBranch} />
            <div>v{appVersion}</div>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal open={openContact} onClose={() => setOpenContact(false)} />

      {/* Support Modal */}
      <SupportModal open={openSupport} onClose={() => setOpenSupport(false)} />

      {/* Version Modal */}
      <ChangeLogsModal
        open={openVersion}
        onClose={() => setOpenVersion(false)}
      />
    </div>
  );
};

export default Footer;
