import Header1 from "../components/Header";
import LeftNav from "../components/LeftNav";
import FrameComponent from "../components/Dashboard/FrameComponent";
import TasksSection from "../components/Dashboard/TasksSection";

const Dashboard = () => {
  return (
    <div>

      <div className="main-body">
        <div className="leftnav">
          <LeftNav />
        </div>
        <div className="outlet">
          <Header1 />
          <div className="layout-section">
            <div className="row">
              <div className="col-md-6">
                <div className=" project-parent-card">
                  <h4 className="fw-600">My Projects</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="project-card card">
                        <div className="parent-card w-100">
                          <div className="project-logo">
                            <img className="project-logo" loading="lazy" alt="" src="/clientlogo.svg" />
                          </div>
                          <div className="project-content">
                            <h6 className="projectname">CSC CLS</h6>
                            <div className="w-100 bg-white mb-2">
                              <div className="progress-line" />
                            </div>
                            <div className="prog-text">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-card card">
                        <div className="parent-card w-100">
                          <div className="project-logo">
                            <img className="project-logo" loading="lazy" alt="" src="/solenis-logo.svg" />
                          </div>
                          <div className="project-content">
                            <h6 className="projectname">Solenis</h6>
                            <div className="w-100 bg-white mb-2">
                              <div className="progress-line" />
                            </div>
                            <div className="prog-text">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-card card">
                        <div className="parent-card w-100">
                          <div className="project-logo">
                            <img className="project-logo" loading="lazy" alt="" src="/axalta-icon.svg" />
                          </div>
                          <div className="project-content">
                            <h6 className="projectname">Axalta</h6>
                            <div className="w-100 bg-white mb-2">
                              <div className="progress-line" />
                            </div>
                            <div className="prog-text">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-card card">
                        <div className="parent-card w-100">
                          <div className="project-logo">
                            <img className="project-logo" loading="lazy" alt="" src="/hyster-yale-icon.svg" />
                          </div>
                          <div className="project-content">
                            <h6 className="projectname">Hyster Yale</h6>
                            <div className="w-100 bg-white mb-2">
                              <div className="progress-line" />
                            </div>
                            <div className="prog-text">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-parent-card mt-4">
                  <h4 className="fw-600">My Folders</h4>
                  <div className="pro-folder-order">
                    <FrameComponent />
                    <FrameComponent />
                    <FrameComponent />
                    <FrameComponent />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
              <TasksSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full relative bg-white flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
        <Header1 />
        <section className="self-stretch flex flex-row items-start justify-start py-0 pr-8 pl-0 box-border gap-[25px] max-w-full text-left text-xs text-slategray-200 font-inter mq1050:pl-8 mq950:pl-5 mq950:box-border">
          <LeftNav />
          <div className="flex-1 flex flex-col items-start justify-start pt-2.5 px-0 pb-5 box-border max-w-[calc(100%_-_256px)] mq1050:w-100 mq1050:pl-5 mq1050:pr-5 mq1050:box-border mq1050:max-w-full mq950:max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[25px] max-w-full">
              <div className="flex flex-row items-start justify-start gap-[7px]">
                <img
                  className="h-5 w-5 relative min-h-[20px]"
                  loading="lazy"
                  alt=""
                  src="/home.svg"
                />
                <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                  <img
                    className="w-3.5 h-3.5 relative"
                    loading="lazy"
                    alt=""
                    src="/arrowright.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.5px] px-0 pb-0">
                  <div className="relative font-medium inline-block min-w-[63px]">
                    Dashboard
                  </div>
                </div>
              </div>
              <div className="row w-100 items-start justify-start max-w-full text-xl text-black font-poppins">
                <div className="col-6 items-start justify-start max-w-full mq450:min-w-full mq700:gap-[28px] mq750:min-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start mb-5">
                    <h3 className="mb-4 relative text-inherit font-semibold font-inherit inline-block mq450:text-base">
                      My Projects
                    </h3>
                    <div className="row items-start justify-start text-lg text-darkslateblue-100">
                      <div className="col-6">
                        <div className="px-3 py-3 rounded-8xs bg-aliceblue box-border flex flex-row items-start justify-start border-[1px] border-solid border-lavender-100 gap-[10px]">
                          <img
                            className="h-10 w-10"
                            loading="lazy"
                            alt=""
                            src="/clientlogo.svg"
                          />
                          <div className="flex flex-col items-start justify-end w-100">
                            <div className="font-semibold inline-block mb-4 mt-2">
                              CSC CLS
                            </div>
                            <div className="w-100 bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start">
                              <div className="h-[3px] w-[85px] relative bg-royalblue-200" />
                            </div>
                            <div className="leading-[17px] mt-2 mb-1 font-medium inline-block text-xs text-dimgray font-inter">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="px-3 py-3 rounded-8xs bg-aliceblue box-border flex flex-row items-start justify-start border-[1px] border-solid border-lavender-100 gap-[10px]">
                          <div className="relative rounded-6xl bg-white">
                            <img
                              className="max-w-full overflow-hidden max-h-full pt-[6px] pb-[6px] pl-[6px] pr-[6px]"
                              loading="lazy"
                              alt=""
                              src="/solenis-1@2x.png"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-end w-100">
                            <div className="font-semibold inline-block mb-4 mt-2">
                              Solenis
                            </div>
                            <div className="w-100 bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start">
                              <div className="h-[3px] w-[85px] relative bg-royalblue-200" />
                            </div>
                            <div className="leading-[17px] mt-2 mb-1 font-medium inline-block text-xs text-dimgray font-inter">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div className="px-3 py-3 rounded-8xs bg-aliceblue box-border flex flex-row items-start justify-start border-[1px] border-solid border-lavender-100 gap-[10px]">
                          <div className="relative rounded-6xl bg-white">
                            <img
                              className="max-w-full overflow-hidden max-h-full pt-[7px] pb-[13px] pl-[7px] pr-[7px]"
                              loading="lazy"
                              alt=""
                              src="/137pxaxalta-coating-systems-logo-1@2x.png"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-end w-100">
                            <div className="font-semibold inline-block mb-4 mt-2">
                              Axalta
                            </div>
                            <div className="w-100 bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start">
                              <div className="h-[3px] w-[85px] relative bg-royalblue-200" />
                            </div>
                            <div className="leading-[17px] mt-2 mb-1 font-medium inline-block text-xs text-dimgray font-inter">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div className="px-3 py-3 rounded-8xs bg-aliceblue box-border flex flex-row items-start justify-start border-[1px] border-solid border-lavender-100 gap-[10px]">
                          <div className="relative rounded-6xl bg-white">
                            <img
                              className="max-w-full overflow-hidden max-h-full pt-[6px] pb-[6px] pl-[6px] pr-[6px]"
                              loading="lazy"
                              alt=""
                              src="/image-1@2x.png"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-end w-100">
                            <div className="font-semibold inline-block mb-4 mt-2">
                              Hyster Yale
                            </div>
                            <div className="w-100 bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start">
                              <div className="h-[3px] w-[85px] relative bg-royalblue-200" />
                            </div>
                            <div className="leading-[17px] mt-2 mb-1 font-medium inline-block text-xs text-dimgray font-inter">
                              42% completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 mq450:pr-5 mq450:box-border mq700:box-border">
                    <h3 className="m-0 mb-3 relative text-inherit font-semibold font-inherit inline-block mq450:text-base">
                      My Folders
                    </h3>
                    <div className="self-stretch flex flex-row items-center justify-start mq450:flex-wrap">
                      <FrameComponent />
                      <FrameComponent />
                      <FrameComponent />
                      <FrameComponent />
                    </div>
                  </div>
                </div>
                <TasksSection />
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default Dashboard;
