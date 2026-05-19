import ToolBar from "@/features/typing/components/ToolBar";
import LanguageBar from "@/features/typing/components/LanguageBar";
import { FaRedoAlt } from "react-icons/fa";

import { typingAreaStyles } from "@/features/typing/styles/typingStyles";

const words =
  "only group good all around still day public be group seem same here first here first form look number could around might come fact against stand only group good all around still day public be group seem same here first here first form look number could around might come fact against stand";

const TypingWorkspace = () => {
  return (
    <div>
      <ToolBar />
      <LanguageBar />

      {/* Typing Area  */}
      <div className={typingAreaStyles}>{words}</div>

      {/* Reset button */}
      <div className="flex justify-center mt-10">
        <button className="cursor-pointer">
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
};

export default TypingWorkspace;
