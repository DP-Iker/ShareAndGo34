import type { FC } from "react";
import type { TituloProps } from "../../interfaces/PanelProps";
import { VolverPanelComonent } from "./VolverPanelComonent";

export const TituloComponent: FC<TituloProps> = ({ titulo }) => {

    return (
        <div className="relative flex items-center justify-between mb-6">
            <div className="z-10">
                <VolverPanelComonent />
            </div>

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl text-center font-bold text-purple-300">
                {titulo}
            </h1>
        </div>
    );
}