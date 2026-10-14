import { typingDuration } from "../constant/typing-duration.constant";
import useTyping from "../hooks/use-typing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

const DurationSelector = () => {
  const active = "text-red-500";
  const { duration, setDuration } = useTyping();

  return (
    <div className="flex gap-5 p-1 px-2 rounded-lg items-center">
      {typingDuration.map((value, index) => {
        return (
          <button
            key={`typing-duration-selctor-${index}`}
            className={`cursor-pointer ${duration === value ? active : ""}`}
            onClick={() => setDuration(value)}
          >
            {value}
          </button>
        );
      })}

      <div
        className={`cursor-pointer ${typingDuration.indexOf(duration) === -1 ? active : ""}`}
        // onClick={() => setDuration()}
      >
        <FontAwesomeIcon icon={faTools} />
      </div>
    </div>
  );
};

export default DurationSelector;
