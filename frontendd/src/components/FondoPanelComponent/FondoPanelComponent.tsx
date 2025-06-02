import type { FC } from "react";
import type { FondoPanelProps } from "../../interfaces/FondoPanelProps";

export const FondoPanelComponent: FC<FondoPanelProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="absolute inset-0 bg-[url('/fondoPanel.jpg')] bg-cover bg-center opacity-25 z-0"></div>
      <div className="absolute inset-0 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
