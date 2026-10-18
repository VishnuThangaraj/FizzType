import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

const LanguageSelector = () => {
  return (
    <div className="flex gap-2 items-center cursor-pointer mb-1">
      <FontAwesomeIcon icon={faEarthAmericas} />
      english
    </div>
  );
};

export default LanguageSelector;
