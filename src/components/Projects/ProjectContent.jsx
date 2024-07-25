
import ProjectTab from "./ProjectTabs";

const ProjectContent = () => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border gap-[20px] max-w-full text-left text-xl text-black font-poppins">
     
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-sm">
        <ProjectTab />
     
      </div>
    </div>
  );
};

export default ProjectContent;
