import { useNavigate } from "react-router-dom";
import BrandIcon from "./BrandIcon";
import { useTheme } from "../../../context";

interface LogoProps {
  size?: number | string;
  className?: string;
}

const Logo = ({ size, className = "" }: LogoProps) => {
  const { accent, primary, tertiary } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`cursor-pointer flex items-center gap-2.5 select-none ${className}`}
      onClick={() => navigate("/")}
    >
      <BrandIcon size={size} color={accent} className="h-8 w-auto shrink-0" />
      <div className="relative flex items-baseline font-medium tracking-wide leading-none">
        <span className="text-[30px]" style={{ color: tertiary }}>
          fi
        </span>
        <span className="relative text-[30px] leading-none">
          <span
            className="absolute -top-1 left-0.5 text-[10px] leading-none font-semibold tracking-normal whitespace-nowrap"
            style={{ color: primary }}
          >
            human see
          </span>
          <span style={{ color: tertiary }}>zztype</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
