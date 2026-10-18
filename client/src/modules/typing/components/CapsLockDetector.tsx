import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTypingCaps } from "../hooks/use-typing-caps";
import { useTheme } from "../../../shared/context";

const CapsLockDetector = () => {
  const { accent, secondary } = useTheme();
  const { capsLock } = useTypingCaps();

  return (
    <div
      className={`${capsLock ? "visible" : "invisible"} select-none py-4 px-8 rounded-lg flex items-center gap-2 my-4`}
      style={{backgroundColor:accent, color:secondary}}
    >
      <FontAwesomeIcon icon={faLock} /> Caps Lock
    </div>
  );
};

export default CapsLockDetector;
