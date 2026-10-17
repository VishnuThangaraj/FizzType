import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

interface TestResetProps {
  handleTestReset?: () => void;
}

const TestReset = ({ handleTestReset }: TestResetProps) => {
  return (
    <button className="cursor-pointer" onClick={handleTestReset}>
      <FontAwesomeIcon icon={faArrowRotateRight} />
    </button>
  );
};

export default TestReset;
