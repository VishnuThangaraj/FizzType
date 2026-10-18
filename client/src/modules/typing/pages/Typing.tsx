import CapsLockDetector from "../components/CapsLockDetector";
import DurationSelector from "../components/DurationSelector";
import FilterGroup from "../components/FilterGroup";
import LanguageSelector from "../components/LanguageSelector";
import ModeSelector from "../components/ModeSelector";
import TypingScreen from "../components/TypingScreen";

const Typing = () => {
  return (
    <div className="relative flex-1 flex flex-col gap-6 pt-6 pb-12">
      <div className="flex gap-8 items-center justify-center">
        <FilterGroup />
        <ModeSelector />
        <DurationSelector />
      </div>

      {/* Typing Screen */}
      <div className="flex flex-col items-center gap-4">
        <CapsLockDetector />
        <LanguageSelector />
        <TypingScreen />
      </div>
    </div>
  );
};

export default Typing;
