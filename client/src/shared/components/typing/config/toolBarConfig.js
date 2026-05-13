import {
  FaAt,
  FaFont,
  FaClock,
  FaWrench,
  FaHashtag,
  FaMountain,
  FaQuoteLeft,
} from "react-icons/fa";

export const textModifiers = [
  {
    title: "punctuation",
    icon: FaAt,
  },
  {
    title: "numbers",
    icon: FaHashtag,
  },
];

export const typingModes = [
  {
    title: "time",
    icon: FaClock,
  },
  {
    title: "words",
    icon: FaFont,
  },
  {
    title: "quote",
    icon: FaQuoteLeft,
  },
  {
    title: "zen",
    icon: FaMountain,
  },
  {
    title: "custom",
    icon: FaWrench,
  },
];

export const typingDuration = [
  {
    title: "15",
  },
  {
    title: "30",
  },
  {
    title: "60",
  },
  {
    title: "120",
  },
];
