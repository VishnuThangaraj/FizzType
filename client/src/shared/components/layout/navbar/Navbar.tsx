import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavbarItems } from "./constant/navbar.items";
import Logo from "../../ui/Logo/Logo";
import { useTheme } from "../../../context";

const Navbar = () => {
  const { accent, primary, tertiary } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getItemColor = (isActive: boolean, isHovered: boolean) => {
    if (isActive) return accent;
    if (isHovered) return tertiary;
    return primary;
  };

  return (
    <div className="w-full bg-transparent flex justify-between items-end mb-1">
      <div className="flex gap-5 items-end">
        {/* Logo */}
        <Logo />
        <div className="flex gap-5 items-center">
          {NavbarItems.map((item, index) => {
            const isActive = location.pathname === item.navigation;
            const isHovered = hoveredItem === item.name;

            return (
              <button
                key={`nav-left-${index}`}
                className="cursor-pointer transition-colors text-base"
                style={{ color: getItemColor(isActive, isHovered) }}
                onClick={() => navigate(item.navigation)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FontAwesomeIcon icon={item.icon} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Navbar Right */}
      <div className="flex gap-5 items-center">
        <button
          className="cursor-pointer transition-colors text-base"
          style={{ color: getItemColor(false, hoveredItem === "bell") }}
          onMouseEnter={() => setHoveredItem("bell")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button
          className="cursor-pointer transition-colors text-base"
          style={{
            color: getItemColor(
              location.pathname === "/login",
              hoveredItem === "user",
            ),
          }}
          onClick={() => navigate("/login")}
          onMouseEnter={() => setHoveredItem("user")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
