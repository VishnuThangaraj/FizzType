import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typingModeList } from "../constant/typing-mode.constant";
import useTyping from "../hooks/use-typing";

const ModeSelector = () => {
  const active = "text-red-500";
  const { typingMode, setTypingMode } = useTyping();

  return (
    <div className="flex gap-5 p-1 px-2 rounded-lg">
      {typingModeList.map((item, index) => {
        return (
          <button
            key={`typing-mode-selctor-${index}`}
            className={`cursor-pointer flex gap-1.5 items-center ${typingMode === item.name ? active : ""}`}
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
