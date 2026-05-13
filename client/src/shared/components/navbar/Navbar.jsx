import {
  FaBell,
  FaRegUser,
  FaKeyboard,
  FaCrown,
  FaInfo,
  FaCog,
} from "react-icons/fa";
import { memo } from "react";

const baseStyle = "";

const NavbarIcons = memo(
  ({ icon: Icon, fontSize = "18px", onClick = () => {} }) => (
    <div className={baseStyle} onClick={onClick}>
      <Icon style={{ fontSize: fontSize }} className="text-lg shrink-0" />
    </div>
  ),
);

const Navbar = () => {
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
          <NavbarIcons icon={FaKeyboard} fontSize="20px" />
          <NavbarIcons icon={FaCrown} fontSize="20px" />
          <NavbarIcons icon={FaInfo} />
          <NavbarIcons icon={FaCog} />
        </div>
      </div>
      {/* Right Navbar Section */}
      <div className="flex justify-between gap-7  pt-4">
        <NavbarIcons icon={FaBell} />
        <NavbarIcons icon={FaRegUser} />
      </div>
    </div>
  );
};

export default Navbar;
