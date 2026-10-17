import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FooterLinks, FooterSocials } from "./constant/footer.links";
import { useNavigate } from "react-router-dom";
import FooterKeys from "./components/FooterKeys";

import {
  faEnvelope,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";

import { faPalette, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { appVersion } from "../../../../config/app-config";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-5">
      <FooterKeys />
      <div className="flex justify-between items-center">
        {/* Footer Left */}
        <div className="flex justify-between gap-5 text-sm">
          {/* Contact */}
          <button className="flex items-center gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} />
            <div>contact</div>
          </button>

          {/* Support */}
          <button className="flex items-center gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
            <div>support</div>
          </button>

          {/* Socials */}
          {FooterSocials.map((item, index) => {
            return (
              <button
                key={`nav-left-social-${index}`}
                className="flex items-center gap-1 cursor-pointer"
                onClick={() =>
                  window.open(item.url, "_blank", "noopener,noreferrer")
                }
              >
                <FontAwesomeIcon icon={item.icon} />
                <div>{item.name}</div>
              </button>
            );
          })}

          {/* Links */}
          {FooterLinks.map((item, index) => {
            return (
              <button
                key={`nav-left-internal-${index}`}
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => navigate(item.navigation)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <div>{item.name}</div>
              </button>
            );
          })}
        </div>

        {/* Footer Right */}
        <div className="flex justify-between gap-5 text-sm">
          {/* Theme Switch */}
          <button className="flex items-center gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faPalette} />
            <div>serika dark</div>
          </button>

          {/* App Version */}
          <button className="flex items-center gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faCodeBranch} />
            <div>v{appVersion}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
