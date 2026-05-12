import { useNavigate } from "react-router-dom";
import { memo, useCallback, useReducer } from "react";
import { FaCodeBranch, FaDonate, FaPalette, FaEnvelope } from "react-icons/fa";

import {
  footerSocials,
  footerLegals,
  footerSectionStyle,
} from "@/components/footer/config/footerConfig";
import { app_version } from "@/config/appConfig";
import { TbFileUnknownFilled } from "react-icons/tb";

const baseStyle = `${footerSectionStyle} flex items-center gap-1 whitespace-nowrap`;
const secondaryStyle =
  "inline-flex items-center justify-center px-1 rounded-xs text-[10px] bg-primary text-backgound mx-1";

const modalReducer = (state, action) => ({ ...state, [action]: true });
const initialModalState = {
  theme: false,
  support: false,
  contact: false,
  version: false,
};

const FooterItem = memo(({ icon: Icon, label, onClick }) => (
  <div className={baseStyle} onClick={onClick}>
    <Icon className="text-md shrink-0" />
    <span>{label}</span>
  </div>
));
FooterItem.displayName = "FooterItem";

const Footer = () => {
  const navigate = useNavigate();
  const [, openModal] = useReducer(modalReducer, initialModalState);

  const handleContact = useCallback(() => openModal("contact"), []);
  const handleSupport = useCallback(() => openModal("support"), []);
  const handleTheme = useCallback(() => openModal("theme"), []);
  const handleVersion = useCallback(() => openModal("version"), []);

  return (
    <div className="flex flex-col gap-7 text-[12px] pb-2">
      <div className="flex flex-col justify-center text-center gap-1.5">
        <div>
          <span className={secondaryStyle}>tab &gt; enter</span> - restart test
        </div>
        <div>
          <span className={secondaryStyle}>escape</span> or{" "}
          <span className={secondaryStyle}>ctrl + shift + p</span>- command line
        </div>
      </div>

      <div className="flex justify-between items-start">
        {/* Left Footer  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-0">
          <FooterItem
            icon={FaEnvelope ?? TbFileUnknownFilled}
            label="contact"
            onClick={handleContact}
          />
          <FooterItem
            icon={FaDonate ?? TbFileUnknownFilled}
            label="support"
            onClick={handleSupport}
          />
          {footerSocials.map((item, index) => (
            <FooterItem
              key={`footer_social_${index}`}
              icon={item.icon ?? TbFileUnknownFilled}
              label={item.title}
              onClick={() => window.open(item.location, "_blank")}
            />
          ))}
          {footerLegals.map((item, index) => (
            <FooterItem
              key={`footer_legal_${index}`}
              icon={item.icon ?? TbFileUnknownFilled}
              label={item.title}
              onClick={() => navigate(item.location)}
            />
          ))}
        </div>

        {/* Right Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-1">
          <FooterItem
            icon={FaPalette}
            label="serika dark"
            onClick={handleTheme}
          />
          <FooterItem
            icon={FaCodeBranch}
            label={app_version}
            onClick={handleVersion}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
