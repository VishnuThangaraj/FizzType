import { Link } from "react-router-dom";
import { termsAndConditions, termsUpdateDate } from "../data/termsOfService";

const renderTextWithLinks = (text) => {
  if (typeof text !== "string") return text;

  const parts = text.split(/(Privacy Policy)/g);
  return parts.map((part, i) => {
    if (part === "Privacy Policy") {
      return (
        <Link
          key={i}
          to="/privacy"
          className="text-quaternary underline hover:text-quinary transition-colors duration-200"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};

const TermsOfService = () => {
  return (
    <div className="text-quinary text-m text-justify">
      <div className="mb-8">
        These terms of service were last updated on {termsUpdateDate}.
      </div>

      <div className="flex flex-col gap-10">
        {termsAndConditions.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h2 className="text-2xl text-accent mb-4 font-normal">
              {section.title}
            </h2>
            {Array.isArray(section.description) ? (
              <div>
                {section.description.map((para, paraIdx) => {
                  const isListItem = /^\d+\.\s/.test(para);
                  const isNextListItem =
                    paraIdx < section.description.length - 1 &&
                    /^\d+\.\s/.test(section.description[paraIdx + 1]);
                  const mb = isListItem && isNextListItem ? "mb-0" : "mb-4";

                  return (
                    <div
                      key={paraIdx}
                      className={`${isListItem ? "ml-8" : ""} ${mb}`}
                    >
                      {renderTextWithLinks(para)}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>{renderTextWithLinks(section.description)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfService;
