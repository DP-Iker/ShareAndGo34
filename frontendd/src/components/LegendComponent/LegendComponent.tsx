import { useTranslation } from "react-i18next";

export const LegendComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="backdrop-blur-[12px] backdrop-saturate-[180%] bg-[rgba(17,24,39,0.7)] border border-white/20 rounded-xl p-4 w-3/4 text-white text-sm space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-[#4ade80]">
        🗺️ {t("legend.title")}
      </h3>

      {/* Icono coche clúster */}
      <div className="flex items-center gap-3">
        <div
          className="w-[40px] h-[45px]"
          dangerouslySetInnerHTML={{
            __html: `
              <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,0)">
                  <path d="M20 0C9 0 0 9 0 20c0 11 10 21 20 25 10-4 20-14 20-25C40 9 31 0 20 0z" fill="#3b82f6" />
                  <circle cx="20" cy="20" r="15" fill="white"/>
                  <path d="M13 25v-2l1-4c.2-1 1-2 2-2h8c1 0 2 .7 2 2l1 4v2h-1a1 1 0 1 1-2 0h-8a1 1 0 1 1-2 0h-1zm3-6h8l-.5-2h-7l-.5 2z" fill="#3b82f6" />
                </g>
              </svg>
            `,
          }}
        />
        <span>{t("legend.vehicle")}</span>
      </div>

      {/* Icono Parking */}
      <div className="flex items-center gap-3">
        <div
          className="w-[40px] h-[45px]"
          dangerouslySetInnerHTML={{
            __html: `
              <svg width="40.5" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="22" r="17" fill="#10b981" />
                <text 
                  x="21" 
                  y="25" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  fill="white" 
                  font-size="20px" 
                  font-family="Arial, sans-serif">
                  P
                </text>
              </svg>
            `,
          }}
        />
        <span>{t("legend.parking")}</span>
      </div>

      <div className="text-xs text-center text-white/60">
        * {t("legend.note")}
      </div>
    </div>
  );
};
