import type { SVGProps } from "react";

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  frameColor?: string;
  letterColor?: string;
  boldness?: number;
  frameBoldness?: number;
};

export default function BrandIcon({
  size,
  width,
  height,
  frameColor = "currentColor",
  letterColor = "currentColor",
  boldness = 4,
  frameBoldness = 4,
  className,
  style,
  ...props
}: BrandIconProps) {
  const computedHeight = height ?? size;
  const computedWidth =
    width ?? (typeof size === "number" ? (size * 300) / 180 : undefined);

  const defaultClasses =
    size !== undefined || height !== undefined
      ? "w-auto shrink-0"
      : "h-8 w-auto shrink-0 text-main transition-colors";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-680 -1030 300 180"
      width={computedWidth}
      height={computedHeight}
      className={`shrink-0 ${className ?? defaultClasses}`}
      style={{
        aspectRatio: "300 / 180",
        ...(computedHeight !== undefined
          ? {
              height:
                typeof computedHeight === "number"
                  ? `${computedHeight}px`
                  : computedHeight,
            }
          : {}),
        ...(computedWidth !== undefined
          ? {
              width:
                typeof computedWidth === "number"
                  ? `${computedWidth}px`
                  : computedWidth,
            }
          : {}),
        ...style,
      }}
      role="img"
      aria-label="BrandIcon"
      {...props}
    >
      {/* letters + pills */}
      <g
        fill={letterColor}
        stroke={letterColor}
        strokeWidth={boldness}
        strokeLinejoin="round"
      >
        <path d="M -430 -910 L -430 -910 C -424.481 -910 -420 -905.519 -420 -900 L -420 -900 C -420 -894.481 -424.481 -890 -430 -890 L -430 -890 C -435.519 -890 -440 -894.481 -440 -900 L -440 -900 C -440 -905.519 -435.519 -910 -430 -910 Z" />
        <path d="M -570 -910 L -510 -910 C -504.481 -910 -500 -905.519 -500 -900 L -500 -900 C -500 -894.481 -504.481 -890 -510 -890 L -570 -890 C -575.519 -890 -580 -894.481 -580 -900 L -580 -900 C -580 -905.519 -575.519 -910 -570 -910 Z" />

        {/* f: stem (slightly longer than original, ends 14 units above the bottom pills) */}
        <path d="M -590 -990 C -584.481 -990 -580 -985.519 -580 -980 L -580 -936 C -580 -930.481 -584.481 -926 -590 -926 C -595.519 -926 -600 -930.481 -600 -936 L -600 -980 C -600 -985.519 -595.519 -990 -590 -990 Z" />
        {/* f: top bar */}
        <path d="M -590 -990 L -550 -990 C -544.481 -990 -540 -985.519 -540 -980 C -540 -974.481 -544.481 -970 -550 -970 L -590 -970 C -595.519 -970 -600 -974.481 -600 -980 C -600 -985.519 -595.519 -990 -590 -990 Z" />
        {/* f: crossbar */}
        <path d="M -620 -960 L -560 -960 C -554.481 -960 -550 -955.519 -550 -950 C -550 -944.481 -554.481 -940 -560 -940 L -620 -940 C -625.519 -940 -630 -944.481 -630 -950 C -630 -955.519 -625.519 -960 -620 -960 Z" />

        <path d="M -460 -930 L -460 -900 C -460 -894.481 -464.481 -890 -470 -890 L -470 -890 C -475.519 -890 -480 -894.481 -480 -900 L -480 -930 L -508.82 -930 C -514.99 -930 -520 -934.481 -520 -940 L -520 -940 C -520 -945.519 -514.99 -950 -508.82 -950 L -431.18 -950 C -425.01 -950 -420 -945.519 -420 -940 L -420 -940 C -420 -934.481 -425.01 -930 -431.18 -930 L -460 -930 Z" />
        <path d="M -470 -990 L -430 -990 C -424.481 -990 -420 -985.519 -420 -980 L -420 -980 C -420 -974.481 -424.481 -970 -430 -970 L -470 -970 C -475.519 -970 -480 -974.481 -480 -980 L -480 -980 C -480 -985.519 -475.519 -990 -470 -990 Z" />
        <path d="M -630 -910 L -610 -910 C -604.481 -910 -600 -905.519 -600 -900 L -600 -900 C -600 -894.481 -604.481 -890 -610 -890 L -630 -890 C -635.519 -890 -640 -894.481 -640 -900 L -640 -900 C -640 -905.519 -635.519 -910 -630 -910 Z" />
        <path d="M -515 -990 L -510 -990 C -504.481 -990 -500 -985.519 -500 -980 L -500 -980 C -500 -974.481 -504.481 -970 -510 -970 L -515 -970 C -520.519 -970 -525 -974.481 -525 -980 L -525 -980 C -525 -985.519 -520.519 -990 -515 -990 Z" />
      </g>

      {/* frame */}
      <path
        fill={frameColor}
        stroke={frameColor}
        strokeWidth={frameBoldness}
        strokeLinejoin="round"
        d="M -660 -910 L -680 -910 L -680 -980 C -680 -1007.596 -657.596 -1030 -630 -1030 L -430 -1030 C -402.404 -1030 -380 -1007.596 -380 -980 L -380 -900 C -380 -872.404 -402.404 -850 -430 -850 L -630 -850 C -657.596 -850 -680 -872.404 -680 -900 L -680 -920 L -660 -920 L -660 -900 C -660 -883.443 -646.557 -870 -630 -870 L -430 -870 C -413.443 -870 -400 -883.443 -400 -900 L -400 -980 C -400 -996.557 -413.443 -1010 -430 -1010 L -630 -1010 C -646.557 -1010 -660 -996.557 -660 -980 L -660 -910 Z"
      />
    </svg>
  );
}
