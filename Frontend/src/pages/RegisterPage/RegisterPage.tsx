import { NotiToastComponent } from "../../components/NotiToastComponents/NotiToastComponet";
import { RegisterComponent } from "../../components/RegisterComponent/RegisterComponent";

export const RegistroPage = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-slate-300">
    //   <RegisterComponent />
    // </div>

    // <div className="min-h-screen flex items-center justify-center px-4 py-6">
    //   <div className="w-full max-w-4xl bg-[#1F2937] rounded-lg shadow-lg p-10">
    //     <RegisterComponent />
    //   </div>
    // </div>

    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#1F2937] p-10">
        <div className="w-full max-w-md">
          <RegisterComponent />
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      />
      <NotiToastComponent />
    </div>
  );
};
