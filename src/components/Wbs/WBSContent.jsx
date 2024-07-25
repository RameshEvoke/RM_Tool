import WBSTabs from "./WBSTabs";
//import TabContent from "./TabContent";

const WBSContent = () => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border gap-[20px] max-w-full text-left text-xl text-black font-poppins">
      <h3 className="m-0 relative text-inherit font-semibold font-inherit mq450:text-base">
        ALL WBS
      </h3>
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-sm">
        <WBSTabs />
        {/*<TabContent />*/}
      </div>
    </div>
  );
};

export default WBSContent;
