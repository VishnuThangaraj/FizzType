import { FaGlobeAmericas } from "react-icons/fa";

const LanguageBar = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center btn-colored-hover items-center gap-4 cursor-pointer">
        <FaGlobeAmericas /> english
      </div>
    </div>
  );
};

export default LanguageBar;
