import { memo } from "react";

import {
  navbarLeftIcons,
  navbarRightIcons,
} from "@/shared/components/navbar/config/navbarConfig";

import { useNavigate } from "react-router-dom";

const baseStyle = "cursor-pointer btn-colored-hover";

const NavbarIcons = memo(
  ({ icon: Icon, fontSize = "18px", onClick = () => {} }) => (
    <div className={baseStyle} onClick={onClick}>
      <Icon style={{ fontSize: fontSize }} className="text-lg shrink-0" />
    </div>
  ),
);

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      {/* Left Navbar Section */}
      <div className="flex justify-between items-cente gap-3">
        {/* Logo */}
        <div>
          <span className="hidden md:display-block logo-text text-stone-300 font-bold text-4xl">
            fizztype
          </span>
        </div>
        <div className="flex justify-between gap-7 pt-4">
          {navbarLeftIcons.map((item) => {
            const Icon = item.icon;
            return (
              <NavbarIcons
                icon={Icon}
                fontSize={item.fontSize || "18px"}
                onClick={() => {
                  navigate(`${item.location}`);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Right Navbar Section */}
      <div className="flex justify-between gap-7  pt-4">
        {navbarRightIcons.map((item) => {
          const Icon = item.icon;
          return (
            <NavbarIcons
              icon={Icon}
              fontSize={item.fontSize || "18px"}
              onClick={() => {
                navigate(`${item.location}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
