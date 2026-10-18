import { useTheme } from "../../../../context";

const FooterKeys = () => {
  const { primary, secondary } = useTheme();

  const spanStyle = { backgroundColor: primary, color: secondary };
  return (
    <div className="flex flex-col items-center gap-2 text-xs">
      <div className="flex gap-1">
        <span className="px-1 py-0 rounded-xs" style={spanStyle}>
          tab &gt; enter
        </span>
        - restart test
      </div>
      <div className="flex gap-1">
        <span className="px-1 py-0 rounded-xs" style={spanStyle}>
          escape
        </span>{" "}
        or{" "}
        <span className="px-1 py-0 rounded-xs" style={spanStyle}>
          ctrl + shift + p
        </span>{" "}
        - command line
      </div>
    </div>
  );
};

export default FooterKeys;
