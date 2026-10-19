import { useEffect } from "react";
import { useTheme } from "../../../context";
import { changeLogs } from "../../../../config/change-logs";

interface ChangeLogsModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangeLogsModal = ({ open, onClose }: ChangeLogsModalProps) => {
  const { accent, primary, tertiary, secondary, background } = useTheme();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl p-6 shadow-2xl flex flex-col gap-6 border-4"
        style={{
          backgroundColor: background,
          borderColor: secondary,
          borderWidth: "4px",
          borderStyle: "solid",
          color: tertiary,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div
          className="flex flex-col gap-8 max-h-[75vh] overflow-y-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden pr-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {changeLogs.map((item, index) => {
            const sections = [
              { title: "Features", data: item.features },
              { title: "Improvements", data: item.improvements },
              { title: "Fixes", data: item.fixes },
              { title: "Nerd Stuff", data: item.nerdStuff },
            ];

            return (
              <div key={item.version || index} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div
                      className="text-4xl tracking-wider font-medium"
                      style={{ color: accent }}
                    >
                      {item.version}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-lg" style={{ color: primary }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-base" style={{ color: tertiary }}>
                    Thank you to all the contributors who made this release
                    possible!
                  </div>
                </div>

                {sections.map(
                  (section) =>
                    section.data &&
                    section.data.length > 0 && (
                      <div
                        key={section.title}
                        className="flex flex-col gap-2"
                      >
                        <div
                          className="capitalize text-2xl font-medium"
                          style={{ color: primary }}
                        >
                          {section.title}
                        </div>
                        <ul className="list-disc pl-6 space-y-1">
                          {section.data.map((entry, i) => (
                            <li
                              key={`${section.title}-${i}`}
                              className="text-base leading-relaxed"
                              style={{ color: tertiary }}
                            >
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )}

                {index < changeLogs.length - 1 && (
                  <div
                    className="border-t-4 my-2"
                    style={{ borderColor: `${primary}30` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangeLogsModal;
