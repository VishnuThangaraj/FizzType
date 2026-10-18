import { useTheme } from "../../../context";
import Logo from "../../ui/Logo/Logo";

interface TopBarProps {
  pageTitle?: string;
}

const TopBar = ({ pageTitle }: TopBarProps) => {
  const { accent } = useTheme();

  return (
    <div className="flex gap-5 text-3xl items-end font-bold">
      {/* Logo */}
      <Logo />

      {/* page Title */}
      <div style={{color:accent}}>{pageTitle}</div>
    </div>
  );
};

export default TopBar;
