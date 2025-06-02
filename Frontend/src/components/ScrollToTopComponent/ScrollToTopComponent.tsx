import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reinicia scroll al top cuando cambia la ruta
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
