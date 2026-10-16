import { sampleWords } from "../../../shared/data/sample-words.data";

const TypingScreen = () => {
  return (
    <div className="flex flex-wrap text-3xl tracking-wider gap-4">
      {sampleWords.map((word) => {
        return <span>{word}</span>;
      })}
    </div>
  );
};

export default TypingScreen;
