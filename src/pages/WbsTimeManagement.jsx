import Header from "../components/Header";
import LeftNav2 from "../components/LeftNav";
import BreadcrumbWBS from "../components/WBSManagement/BreadcrumbWBS";
import ContentWBSManagement from "../components/WBSManagement/ContentWBSManagement";

const WbsTimeManagement = () => {
  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <Header />
      <section className="self-stretch h-[400px] flex flex-row flex-wrap items-start justify-start [row-gap:20px] max-w-full mq835:pl-5 mq835:pr-5 mq835:box-border mq1050:pl-5 mq1050:pr-5 mq1050:box-border">
        <LeftNav2 />
        <div className="flex-1 flex flex-col items-start justify-start pt-2.5 px-[25px] pb-[60px] box-border gap-[25px] min-w-[786px] max-w-[calc(100%_-_230px)] mq835:max-w-full mq1050:min-w-full mq1050:max-w-full">
          <BreadcrumbWBS />
          <ContentWBSManagement />
        </div>
      </section>
    </div>
  );
};

export default WbsTimeManagement;
