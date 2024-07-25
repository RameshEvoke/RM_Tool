import Header from "../components/Header";
import LeftNav2 from "../components/LeftNav";
import Breadcrumb from "../components/WBSTimeReporting/Breadcrumb";
import Content from "../components/WBSTimeReporting/Content";
import TimeReportContent from "../components/TImeReport/TimeReportContent";


const WbsTimeReporting = () => {
  return (
    <div>
      <div className="main-body">
        <div className="leftnav">
          <LeftNav2 />
        </div>
        <div className="outlet">
          <Header />
         <div className="layout-section">
          <h4>Workflow Details</h4>
         <div className="card">
           {/* <Breadcrumb /> */}
            <TimeReportContent />
          </div>
         </div>
        </div>
      </div>
      {/* <div className="w-full relative bg-white flex flex-col items-start justify-start leading-[normal] tracking-[normal]">

        <section className="self-stretch flex">
          <LeftNav2 />
          <div className="flex-1 flex flex-col items-start justify-start pt-2.5 px-[25px] pb-[60px] box-border gap-[25px] min-w-[786px] max-w-[calc(100%_-_230px)] mq835:max-w-full mq1050:min-w-full mq1050:max-w-full">

            <Header />
            <div>
              <div>
                <h4>Workflow Details</h4>
                <div>
                  <Breadcrumb />

                  <Content />

                  <TimeReportContent />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default WbsTimeReporting;
