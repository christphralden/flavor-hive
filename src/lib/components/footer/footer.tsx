export default function Footer() {
  return (
    <footer className="w-full h-[400px] flex items-end">
      <div className="w-full lg:w-fit h-fit lg:h-full flex flex-row lg:flex-col justify-between  items-end overflow-clip gap-0 p-8">
        <div className="w-full h-full flex flex-col justify-end items-start">
          <h1 className="text-3xl sm:text-6xl lg:text-8xl xl:text-9xl font-medium text-nowrap leading-tight lg:leading-[7rem]">{`FlavorHive `}</h1>
        </div>
        <div className="w-fit lg:w-full text-right lg:text-left text-gray-500 text-sm lg:flex-row  flex flex-col gap-1 justify-between ">
          <p>christphralden</p>
          <p>christophernnh</p>
          <p>Daviskelvin824</p>
          <p>elgankenlie</p>
          <p>josetano2</p>
        </div>
      </div>
    </footer>
  );
}
