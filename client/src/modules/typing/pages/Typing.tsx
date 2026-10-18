import CapsLockDetector from "../components/CapsLockDetector";
import DurationSelector from "../components/DurationSelector";
import FilterGroup from "../components/FilterGroup";
import LanguageSelector from "../components/LanguageSelector";
import ModeSelector from "../components/ModeSelector";
import TypingScreen from "../components/TypingScreen";
import useTyping from "../hooks/use-typing";

const Typing = () => {
  const { isTypingStarted } = useTyping();

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Top Selectors Bar */}
      <div
        className={`flex gap-8 items-center justify-center pt-8 pb-4 transition-opacity duration-200 ${
          isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <FilterGroup />
        <ModeSelector />
        <DurationSelector />
      </div>


      <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-40">
        <div
          className={`flex flex-col items-center gap-4 transition-opacity duration-200 ${
            isTypingStarted ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <CapsLockDetector />
          <LanguageSelector />
        </div>
        <TypingScreen />
      </div>
    </div>
  );
};

export default Typing;
