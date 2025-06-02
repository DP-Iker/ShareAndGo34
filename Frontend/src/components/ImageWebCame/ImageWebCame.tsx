import { useRef, useState, type FC, type ReactElement } from "react";
import Webcam from "react-webcam";
import type { ImageWebCameProps } from "../../interfaces/ImageWebCameProps";

export const ImageWebCame: FC<ImageWebCameProps> = ({ setImage }): ReactElement => {
  const webcamRef = useRef<Webcam | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const tomarFoto = () => {
    if (webcamRef.current) {
      const captura = webcamRef.current.getScreenshot();
      if (captura) {
        setImage(captura);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/80 hover:bg-white   text-[#111827] px-5 py-2 rounded-full font-semibold shadow transition duration-200"
      >
        Abrir cámara
      </button>

      {isOpen && (

        <div className="fixed inset-0 backdrop-blur-[5px] bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-[#1F2937] p-6 rounded-2xl shadow-xl w-full max-w-2xl text-white relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Captura con Webcam</h2>

            <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                videoConstraints={{
                  facingMode: "user",
                }}
              />
            </div>

            <div className="flex justify-between mt-4 space-x-4">
              <button
                onClick={tomarFoto}
                className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Capturar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

