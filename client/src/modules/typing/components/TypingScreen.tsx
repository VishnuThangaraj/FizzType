import { sampleWords } from "../../../shared/data/sample-words.data";

const TypingScreen = () => {
  return (
    <div className="flex flex-wrap text-3xl tracking-wider gap-4">
      {sampleWords.map((word, index) => {
        return (
          <div key={`typing-word-${index}`}>
            {[...word].map((letter, letterIndex) => {
              return <span key={`typing-letter-${letterIndex}`}>{letter}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TypingScreen;
