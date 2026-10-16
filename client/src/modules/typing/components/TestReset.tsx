import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

import useTyping from "../hooks/use-typing";

const TestReset = () => {
  const { handleTestReset } = useTyping();

  return (
    <button className="cursor-pointer" onClick={handleTestReset}>
      <FontAwesomeIcon icon={faArrowRotateRight} />
    </button>
  );
};

export default TestReset;
