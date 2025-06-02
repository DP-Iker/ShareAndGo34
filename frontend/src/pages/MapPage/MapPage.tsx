import CochesMapComponent from "../../components/CochesMapComponent/CochesMapComponent";

export const MapPage = () => {
  return (
    // <div className="relative bg-[#111827]" >
    //   <div className="absolute inset-0 bg-[url('/fondoMap.jpg')] bg-cover bg-center opacity-50"></div>
    <div className="relative min-h-screen bg-[#0d2854] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-[url('fondoMap.jpg')]  bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0  backdrop-blur-[5px]"></div>

      {/* <div className="relative backdrop-blur-[5px]"> */}
        <CochesMapComponent />
      {/* </div> */}

    </div>
  );
};
