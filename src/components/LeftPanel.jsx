const LeftPanel = () => {
  return (
    <section className="flex-1 flex flex-col items-start justify-start p-5 box-border min-w-[468px] max-w-full mq675:min-w-full">
      <div className="self-stretch h-[610px] overflow-hidden shrink-0 flex flex-col items-start justify-start p-10 box-border bg-[url('/public/imagesection@3x.png')] bg-cover bg-no-repeat bg-[top]">
        <img
          className="w-[167px] h-[47px] relative object-cover"
          loading="lazy"
          alt=""
          src="/logo@2x.png"
        />
      </div>
    </section>
  );
};

export default LeftPanel;
