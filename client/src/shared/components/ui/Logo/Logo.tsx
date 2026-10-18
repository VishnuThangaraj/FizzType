import BrandIcon from "./BrandIcon";

interface LogoProps {
  size?: number | string;
  className?: string;
}

const Logo = ({ size, className = "" }: LogoProps) => {
  return (
    <div
      className={`cursor-pointer flex items-center gap-2.5 select-none ${className}`}
    >
      <BrandIcon size={size} className="h-8 w-auto shrink-0" />
      <div className="relative flex items-center text-2xl font-bold tracking-wide leading-none">
        <span>fi</span><span className="relative leading-none text-[20px]">
          <span className="absolute -top-1.5 left-0.5 text-[10px] leading-none opacity-60 font-medium tracking-tight whitespace-nowrap">
            human see
          </span>
          zztype
        </span>
      </div>
    </div>
  );
};

export default Logo;
