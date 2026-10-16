interface TopBarProps {
  pageTitle?: string;
}

const TopBar = ({ pageTitle }: TopBarProps) => {
  return (
    <div className="flex gap-5 text-3xl items-end font-bold">
      {/* Logo */}
      <div className="">fizztype </div>

      {/* page Title */}
      <div className="">{pageTitle}</div>
    </div>
  );
};

export default TopBar;
