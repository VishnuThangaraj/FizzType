import CapsLockDetector from "../components/CapsLockDetector";
import DurationSelector from "../components/DurationSelector";
import FilterGroup from "../components/FilterGroup";
import LanguageSelector from "../components/LanguageSelector";
import ModeSelector from "../components/ModeSelector";
import TypingScreen from "../components/TypingScreen";

const Typing = () => {
  return (
    <div className="relative h-full flex-1 flex flex-col gap-5 my-[3%]">
      <div className="flex gap-20 items-center justify-center">
        <FilterGroup />
        <ModeSelector />
        <DurationSelector />
      </div>

      {/* Typing Screen */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 -translate-y-8">
        <CapsLockDetector />
        <LanguageSelector />
        <TypingScreen />
      </div>
    </div>
  );
};

export default Typing;
