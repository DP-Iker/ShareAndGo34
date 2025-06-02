import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { VolverComonent } from "./VolverComponent";

export const VolverPanelComonent: FC = () => {
    const navigate = useNavigate();


    return (
        <VolverComonent url={"/panel"} />
    );
}