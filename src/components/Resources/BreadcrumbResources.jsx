const BreadcrumbResources = () => {
  return (
    <div className="flex flex-row items-center justify-start gap-[7px] text-left text-xs text-slategray-200 font-inter">
      <img className="h-5 w-5 relative" loading="lazy" alt="" src="/home.svg" />
      <img
        className="h-3.5 w-3.5 relative"
        loading="lazy"
        alt=""
        src="/arrowright.svg"
      />
      <div className="relative font-medium inline-block min-w-[88px]">
        Resources
      </div>
    </div>
  );
};

export default BreadcrumbResources;
