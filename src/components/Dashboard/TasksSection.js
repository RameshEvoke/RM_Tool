const TasksSection = () => {
  return (
    <div>
      <div className="project-parent-card">
        <h4 className="fw-600">My Tasks</h4>
        <div className="task-tabs">
          <ul className="task-tabs-list">
            <li className="active">All Tasks</li>
            <li>Pending Tasks</li>
            <li>Completed Tasks</li>
          </ul>
        </div>
        <div className="taskcards-list mt-3">
          <div className="task-card card">
            <div className="d-flex">
              <div>
                <img src="./my-task-avtar.svg"/>
              </div>
              <div className="ms-2 me-auto">
                <h6 className="task-title">Timesheet entry</h6>
                <p className="task-description">Ramya submitted timesheet for Jan 15-19, 2024</p>
              </div>
              <span className="align-self-center"><img src="./right-arrow.svg"/></span>
            </div>
          </div>
          <div className="task-card card">
            <div className="d-flex">
              <div>
                <img src="./my-task-avtar.svg"/>
              </div>
              <div className="ms-2 me-auto">
                <h6 className="task-title">Timesheet entry</h6>
                <p className="task-description">Ramya submitted timesheet for Jan 15-19, 2024</p>
              </div>
              <span className="align-self-center"><img src="./right-arrow.svg"/></span>
            </div>
          </div>
          <div className="task-card card">
            <div className="d-flex">
              <div>
                <img src="./my-task-avtar.svg"/>
              </div>
              <div className="ms-2 me-auto">
                <h6 className="task-title">Timesheet entry</h6>
                <p className="task-description">Ramya submitted timesheet for Jan 15-19, 2024</p>
              </div>
              <span className="align-self-center"><img src="./right-arrow.svg"/></span>
            </div>
          </div>
          <div className="task-card card">
            <div className="d-flex">
              <div>
                <img src="./my-task-avtar.svg"/>
              </div>
              <div className="ms-2 me-auto">
                <h6 className="task-title">Timesheet entry</h6>
                <p className="task-description">Ramya submitted timesheet for Jan 15-19, 2024</p>
              </div>
              <span className="align-self-center"><img src="./right-arrow.svg"/></span>
            </div>
          </div>
          <div className="task-card card">
            <div className="d-flex">
              <div>
                <img src="./my-task-avtar.svg"/>
              </div>
              <div className="ms-2 me-auto">
                <h6 className="task-title">Timesheet entry</h6>
                <p className="task-description">Ramya submitted timesheet for Jan 15-19, 2024</p>
              </div>
              <span className="align-self-center"><img src="./right-arrow.svg"/></span>
            </div>
          </div>
        
        </div>
      </div>
      {/* <div className="col-6 pe-0 items-start justify-start max-w-full text-left text-xl text-black font-poppins mq700:min-w-full mq975:flex-1">
        <h3 className="mb-4 relative text-inherit font-semibold font-inherit inline-block mq450:text-base">
          My Tasks
        </h3>
        <div className="mt-[-3px] self-stretch rounded-8xs bg-aliceblue box-border flex flex-col items-center justify-start max-w-full text-sm text-slategray-100 font-inter  border-[1px] border-solid border-lavender-100 px-3 py-3">
          <div className="self-stretch bg-white overflow-x-auto flex flex-row items-start justify-between border-[1px] border-solid border-lavender-200 mb-3 box-border px-1 py-1">
            <button className="cursor-pointer py-2 px-[19px] bg-white shadow-[0px_0px_4px_rgba(83,_104,_232,_0.2)] rounded-sm overflow-hidden shrink-0 flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-royalblue-300 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-royalblue-100">
              <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block">
                All Tasks
              </div>
            </button>
            <div className="flex flex-row items-center justify-center py-2 px-[19px]">
              <div className="relative font-medium inline-block">
                Pending Tasks
              </div>
            </div>
            <div className="flex flex-row items-center justify-center py-2 px-[19px]">
              <div className="relative font-medium inline-block">
                Completed Tasks
              </div>
            </div>
          </div>
          <div className="w-100 overflow-x-auto flex flex-col items-start justify-start max-w-full text-darkslateblue-100 font-poppins">
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <img
                  className="h-9 w-9 relative object-contain"
                  loading="lazy"
                  alt=""
                  src="/pimage@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <img
                  className="h-9 w-9 relative object-cover"
                  alt=""
                  src="/pimage@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <img
                  className="h-9 w-9 relative object-cover"
                  alt=""
                  src="/pimage@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <div className="h-9 w-9 rounded-11xl flex flex-row items-start justify-start pt-[14.4px] px-[11.5px] pb-[13.6px] box-border relative bg-[url('/public/profiletick@3x.png')] bg-cover bg-no-repeat bg-[top]">
                  <img
                    className="h-2 w-[13px] absolute !m-[0] top-[14.4px] left-[11.5px] object-contain"
                    loading="lazy"
                    alt=""
                    src="/line-1.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block min-w-[116px]">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <div className="h-9 w-9 rounded-11xl flex flex-row items-start justify-start pt-[14.4px] px-[11.5px] pb-[13.6px] box-border relative bg-[url('/public/profiletick@3x.png')] bg-cover bg-no-repeat bg-[top]">
                  <img
                    className="h-2 w-[13px] absolute !m-[0] top-[14.4px] left-[11.5px] object-contain"
                    alt=""
                    src="/line-1.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block ">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
            <div className="mb-2 shadow-[0px_3px_3px_-1px_rgba(0,_0,_0,_0.14)] rounded-8xs bg-white flex flex-row items-center justify-between py-2.5 px-3 box-border w-100">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <div className="h-9 w-9 rounded-11xl flex flex-row items-start justify-start pt-[14.4px] px-[11.5px] pb-[13.6px] box-border relative bg-[url('/public/profiletick@3x.png')] bg-cover bg-no-repeat bg-[top]">
                  <img
                    className="h-2absolute !m-[0] top-[14.4px] left-[11.5px] object-contain"
                    alt=""
                    src="/line-1.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="relative font-semibold inline-block">
                    Timesheet entry
                  </div>
                  <div className="relative text-xs leading-[17px] font-medium font-inter text-slategray-200">
                    Ramya submitted timesheet for Jan 15-19, 2024
                  </div>
                </div>
              </div>
              <img className="h-5 w-5 relative" alt="" src="/arrowright-1.svg" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TasksSection;
