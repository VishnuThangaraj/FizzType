import { useState } from "react";
import { typingDuration } from "../constant/typing-duration.constant";
import useTyping from "../hooks/use-typing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../shared/context";

const DurationSelector = () => {
  const { accent, primary, secondary, tertiary } = useTheme();
  const { duration, setDuration } = useTyping();
  const [hoveredItem, setHoveredItem] = useState<number | string | null>(null);

  const getItemColor = (isActive: boolean, isHovered: boolean) => {
    if (isActive) return accent;
    if (isHovered) return tertiary;
    return primary;
  };

  const isToolsActive = typingDuration.indexOf(duration) === -1;
  const isToolsHovered = hoveredItem === "tools";

  return (
    <div
      className="flex gap-5 py-2 px-5 rounded-lg items-center text-sm"
      style={{ backgroundColor: secondary }}
    >
      {typingDuration.map((value, index) => {
        const isActive = duration === value;
        const isHovered = hoveredItem === value;

        return (
          <button
            key={`typing-duration-selctor-${index}`}
            className="cursor-pointer transition-colors"
            style={{ color: getItemColor(isActive, isHovered) }}
            onMouseEnter={() => setHoveredItem(value)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setDuration(value)}
          >
            {value}
          </button>
        );
      })}

      <div
        className="cursor-pointer transition-colors text-sm"
        style={{ color: getItemColor(isToolsActive, isToolsHovered) }}
        onMouseEnter={() => setHoveredItem("tools")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <FontAwesomeIcon icon={faTools} />
      </div>
    </div>
  );
};

export default DurationSelector;
