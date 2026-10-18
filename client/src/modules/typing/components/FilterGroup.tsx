import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typingFilterList } from "../constant/typing-filter.constant";
import useTyping from "../hooks/use-typing";
import { useTheme } from "../../../shared/context";

const FilterGroup = () => {
  const { accent, primary, secondary, tertiary } = useTheme();
  const { filterGroup, toggleFilterGroup } = useTyping();
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
      {typingFilterList.map((item, index) => {
        const isActive = filterGroup.indexOf(item.name) !== -1;
        const isHovered = hoveredItem === item.name;

        return (
          <button
            key={`typing-filter-selctor-${index}`}
            className="cursor-pointer flex gap-1.5 items-center transition-colors"
            style={{ color: getItemColor(isActive, isHovered) }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => toggleFilterGroup(item.name)}
          >
            <FontAwesomeIcon icon={item.icon} />
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterGroup;
