import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaCodeBranch, FaDonate, FaPalette } from "react-icons/fa";

import {
  footerSocials,
  footerLegals,
  footerSectionStyle,
} from "@/config/footerConfig";
import { app_version } from "@/config/appConfig";

const baseStyle = `${footerSectionStyle} flex items-center gap-2`;

const FooterItem = ({ icon: Icon, label, onClick }) => (
  <div className={baseStyle} onClick={onClick}>
    <Icon className="text-md" />
    <span>{label}</span>
  </div>
);

const Footer = () => {
  const navigate = useNavigate();
  const [openTheme, setOpenTheme] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openVersion, setOpenVersion] = useState(false);

  return (
    <div className="flex flex-col gap-7 text-sm pb-7">
      <div className="flex flex-col justify-center text-center gap-2">
        <div>
          <span className="inline-flex items-center justify-center px-1 rounded-xs text-xs bg-primary text-backgound mx-3">
            tab &gt; enter
          </span>{" "}
          - restart test
        </div>
        <div>
          <span className="inline-flex items-center justify-center px-1 rounded-xs text-xs bg-primary text-backgound mx-3">
            escape
          </span>{" "}
          or{" "}
          <span className="inline-flex items-center justify-center px-1 rounded-xs text-xs bg-primary text-backgound mx-3">
            ctrl + shift + p
          </span>
          - command line
        </div>
      </div>
      <div className="flex justify-between items-center">
        {/* Left Footer */}
        <div className="flex items-center">
          <FooterItem
            icon={IoMdMail}
            label="contact"
            onClick={() => setOpenContact(true)}
          />
          <FooterItem
            icon={FaDonate}
            label="donate"
            onClick={() => setOpenDonate(true)}
          />
          {footerSocials.map((item, index) => (
            <FooterItem
              key={`footer_social_${index}`}
              icon={item.icon}
              label={item.title}
              onClick={() => window.open(item.location, "_blank")}
            />
          ))}
          {footerLegals.map((item, index) => (
            <FooterItem
              key={`footer_legal_${index}`}
              icon={item.icon}
              label={item.title}
              onClick={() => navigate(item.location)}
            />
          ))}
        </div>

        {/* Right Footer */}
        <div className="flex justify-between items-center">
          <FooterItem
            icon={FaPalette}
            label="serika dark"
            onClick={() => setOpenTheme(true)}
          />
          <FooterItem
            icon={FaCodeBranch}
            label={app_version}
            onClick={() => setOpenVersion(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
