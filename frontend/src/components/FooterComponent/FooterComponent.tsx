import { useState, type FC } from "react";
import Stepper from "../StepperComponent/StepperComponent";
import { Step } from "../StepperComponent/StepperSubComponents";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ hook de traducción

const enlaces: Record<string, string> = {
    "Cookies": "/cookies",
    // "Política de privacidad": "/privacidad",
    // "Condiciones de servicio": "/condiciones",
    // "FAQs": "/faq",
    // "Blog": "/blog",
    // "Sobre nosotros": "/sobre-nosotros",
    // "Soporte Técnico": "/soporte",
};

export const FooterComponent: FC = () => {
    const { t } = useTranslation(); // ✅ inicialización del hook
    const [mostrarModal, setMostrarModal] = useState(false);
    const [email, setEmail] = useState("");

    const listaUl = [
        [
            t("footer.cliente"),
            t("footer.devoluciones"),
            t("footer.pagos"),
            t("footer.condiciones"),
            t("footer.privacidad"),
        ],
        [
            t("footer.info"),
            t("footer.sobreNosotros"),
            t("footer.marcas"),
            t("footer.afiliados"),
            t("footer.inversores"),
            "Cookies", // Se mantiene como string para el enlace
        ],
        [
            t("footer.recursos"),
            "Blog",
            "FAQs",
            t("footer.soporte"),
            t("footer.foro"),
        ],
    ];

    return (
        <>
            <div className="flex justify-between px-20 py-12 bg-[#090c10] shadow-lg text-gray-300 flex-wrap gap-10">
                {listaUl.map((seccion, index) => (
                    <div key={index} className="min-w-[160px]">
                        <ul className="flex flex-col space-y-2">
                            <li className="text-white font-semibold text-lg mb-4 cursor-default">
                                {seccion[0]}
                            </li>
                            {seccion.slice(1).map((item, idx) => (
                                <li
                                    key={idx}
                                    className="hover:text-white cursor-pointer transition-colors duration-200"
                                >
                                    {enlaces[item] ? (
                                        <Link to={enlaces[item]} className="hover:underline">
                                            {t(`footer.${item.toLowerCase().replace(/\s/g, "")}`, item)}
                                        </Link>
                                    ) : (
                                        t(`footer.${item.toLowerCase().replace(/\s/g, "")}`, item)
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="min-w-[280px]">
                    <h3 className="text-white font-semibold text-lg mb-4 cursor-default">
                        {t("footer.contactoDirecto")}
                    </h3>
                    <button
                        onClick={() => setMostrarModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {t("footer.contactar")}
                    </button>
                </div>
            </div>

            {/* Popup modal */}
            {mostrarModal && (
                <div className="fixed inset-0 backdrop-blur-[5px] bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-2 right-2 text-white font-bold text-xl hover:text-red-500"
                        >
                            ×
                        </button>

                        <Stepper
                            initialStep={1}
                            onFinalStepCompleted={() => setMostrarModal(false)}
                            nextButtonText={t("footer.siguiente")} // ✅ traducido
                            backButtonText={t("footer.anterior")} // ✅ traducido
                            nextButtonProps={{
                                className: "text-white",
                            }}
                            backButtonProps={{
                                className: "text-white",
                            }}
                            contentClassName="text-white"
                            footerClassName="mt-6"
                            stepCircleContainerClassName="bg-transparent"
                            stepContainerClassName="justify-center"
                        >
                            <Step>
                                <h2 className="text-xl font-semibold">{t("footer.paso1")}</h2>
                                <p>{t("footer.deseasContacto")}</p>
                            </Step>
                            <Step>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("footer.placeholderEmail")}
                                    className="w-full mt-2 p-2 border rounded"
                                />
                            </Step>
                            <Step>
                                <p className="text-center text-green-300">
                                    {t("footer.gracias")}
                                </p>
                                <p className="text-center text-green-300">
                                    {t("footer.enviado")}
                                </p>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            )}
        </>
    );
};
