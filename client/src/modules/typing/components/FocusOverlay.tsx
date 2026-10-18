import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../shared/context";

interface FocusOverlayProps {
  onFocus: () => void;
  isFocused?: boolean;
}

const FocusOverlay = ({ onFocus, isFocused }: FocusOverlayProps) => {
  const { tertiary } = useTheme();

  return (
    <div
      onClick={onFocus}
      className={`absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none transition-opacity duration-300 ease-out ${
        isFocused ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-2 text-base font-normal tracking-wide transition-transform hover:scale-105 duration-150"
        style={{ color: tertiary }}
      >
        <FontAwesomeIcon icon={faArrowPointer} className="text-sm" />
        <span>Click here or press any key to focus</span>
      </div>
    </div>
  );
};

export default FocusOverlay;
