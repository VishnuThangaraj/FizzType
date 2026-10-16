import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTyping from "../hooks/use-typing";

const CapsLockDetector = () => {
  const { capsLock } = useTyping();

  return (
    <div
      className={`${capsLock ? "visible" : "invisible"} select-none text-lg bg-red-50 py-4 px-8 rounded-lg flex items-center gap-2`}
    >
      <FontAwesomeIcon icon={faLock} /> Caps Lock
    </div>
  );
};

export default CapsLockDetector;
