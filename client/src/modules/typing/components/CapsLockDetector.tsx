import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTypingCaps } from "../hooks/use-typing-caps";

const CapsLockDetector = () => {
  const { capsLock } = useTypingCaps();

  return (
    <div
      className={`${capsLock ? "visible" : "invisible"} select-none text-lg bg-red-50 py-4 px-8 rounded-lg flex items-center gap-2`}
    >
      <FontAwesomeIcon icon={faLock} /> Caps Lock
    </div>
  );
};

export default CapsLockDetector;
