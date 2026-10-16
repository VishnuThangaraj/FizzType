import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typingFilterList } from "../constant/typing-filter.constant";
import useTyping from "../hooks/use-typing";

const FilterGroup = () => {
  const active = "text-red-500";
  const { filterGroup, toggleFilterGroup } = useTyping();

  return (
    <div className="flex gap-5 p-1 px-2 rounded-lg">
      {typingFilterList.map((item, index) => {
        return (
          <button
            key={`typing-mode-selctor-${index}`}
            className={`cursor-pointer flex gap-1.5 items-center ${filterGroup.indexOf(item.name) !== -1 ? active : ""}`}
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
