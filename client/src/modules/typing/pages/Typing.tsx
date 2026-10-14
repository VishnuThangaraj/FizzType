import DurationSelector from "../components/DurationSelector";
import FilterGroup from "../components/FilterGroup";
import LanguageSelector from "../components/LanguageSelector";
import ModeSelector from "../components/ModeSelector";

const Typing = () => {
  return (
    <div className="relative h-full flex-1 flex flex-col gap-5 my-[3%]">
      <div className="flex gap-20 items-center justify-center">
        <FilterGroup />
        <ModeSelector />
        <DurationSelector />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <LanguageSelector />
        <div className="bg-red-400"></div>
      </div>
    </div>
  );
};

export default Typing;
