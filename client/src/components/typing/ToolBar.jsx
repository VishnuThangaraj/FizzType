import {
  typingModes,
  textModifiers,
  typingDuration,
} from "@/components/typing/config/toolBarConfig";

import { FaTools } from "react-icons/fa";
import { TbFileUnknownFilled } from "react-icons/tb";

const itemHolderStyle = "flex gap-4 bg-tertiary py-3 px-4 rounded-lg";
const itemBaseStyle =
  "flex items-center text-xs gap-2 hover:text-white cursor-pointer";

const ToolBar = () => {
  return (
    <div className="flex justify-center my-8 gap-3">
      {/* Content Option */}
      <div className={itemHolderStyle}>
        {textModifiers.map((item, index) => {
          const Icon = item.icon ?? TbFileUnknownFilled;
          return (
            <div
              key={`toolbar-textModifier-${index}`}
              className={itemBaseStyle}
            >
              <Icon className="text-md shrink-0" />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      {/* Mode Selector */}
      <div className={itemHolderStyle}>
        {typingModes.map((item, index) => {
          const Icon = item.icon ?? TbFileUnknownFilled;
          return (
            <div key={`toolbar-typingModes-${index}`} className={itemBaseStyle}>
              <Icon className="text-md shrink-0" />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      {/* Duration Selection */}
      <div className={itemHolderStyle}>
        {typingDuration.map((item, index) => {
          return (
            <div key={`toolbar-typingModes-${index}`} className={itemBaseStyle}>
              <span>{item.title}</span>
            </div>
          );
        })}
        <div className={itemBaseStyle}>
          <FaTools className="text-xs" />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
