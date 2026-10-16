import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavbarItems } from "./constant/navbar.items";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-transparenst flex justify-between bg-red-50">
      <div className="flex gap-5">
        {/* Logo */}
        <div></div>
        <div className="flex gap-5 items-center-safe">
          {NavbarItems.map((item, index) => {
            return (
              <button
                key={ `nav-left-${index}`}
                className="cursor-pointer"
                onClick={() => navigate(item.navigation)}
              >
                <FontAwesomeIcon icon={item.icon} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Navbar Right */}
      <div className="flex gap-5">
        <div className="flex gap-5 items-center-safe">
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button className="cursor-pointer" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
