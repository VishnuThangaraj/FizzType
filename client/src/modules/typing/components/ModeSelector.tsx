import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typingModeList } from "../constant/typing-mode.constant";
import useTyping from "../hooks/use-typing";
import { useTheme } from "../../../shared/context";

const ModeSelector = () => {
  const { accent, primary, secondary, tertiary } = useTheme();
  const { typingMode, setTypingMode } = useTyping();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getItemColor = (isActive: boolean, isHovered: boolean) => {
    if (isActive) return accent;
    if (isHovered) return tertiary;
    return primary;
  };

  return (
    <div
      className="flex gap-5 py-2 px-5 rounded-lg items-center text-sm"
      style={{ backgroundColor: secondary }}
    >
      {typingModeList.map((item, index) => {
        const isActive = typingMode === item.name;
        const isHovered = hoveredItem === item.name;

        return (
          <button
            key={`typing-mode-selctor-${index}`}
            className="cursor-pointer flex gap-1.5 items-center transition-colors"
            style={{ color: getItemColor(isActive, isHovered) }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setTypingMode(item.name)}
          >
            <FontAwesomeIcon icon={item.icon} />
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
