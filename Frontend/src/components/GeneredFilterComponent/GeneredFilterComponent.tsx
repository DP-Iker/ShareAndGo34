import type { FC } from "react";
import type { FiltersProps } from "../../interfaces/GeneredFilterComponentProp";
import Select from "react-select";
import type { FiltroVehiculo } from "../../interfaces/Vehiculo";

export const GeneredFilterComponent: FC<FiltersProps> = ({
  index,
  filter,
  onFilterChange,
  valorActual, 
}) => {
  return (
    <>
      {/* <div className="flex flex-col w-44">
        <label
          htmlFor={`filter-${index}`}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {filter.label}
        </label>
        <Select
          inputId={`filter-${index}`}
          options={filter.options}
          onChange={(selected) =>
            onFilterChange(filter.name as FiltroVehiculo, selected?.value ?? "")
          }
          isClearable
          placeholder={`${filter.label}...`}
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#D1D5DB",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#9CA3AF",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 50,
            }),
          }}
        />
      </div> */}
      {/* <div className="flex flex-col w-44">
        <label
          htmlFor={`filter-${index}`}
          className="text-sm font-medium text-gray-300 mb-1"
        >
          {filter.label}
        </label>
        <Select
          inputId={`filter-${index}`}
          options={filter.options}
          onChange={(selected) =>
            onFilterChange(filter.name as FiltroVehiculo, selected?.value ?? "")
          }
          isClearable
          placeholder={`${filter.label}...`}
          className="text-sm text-white"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#1F2937",
              borderColor: state.isFocused ? "#A78BFA" : "#374151",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#A78BFA",
              },
              color: "white",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1F2937",
              color: "white",
              zIndex: 50,

              scrollbarWidth: "thin",
              scrollbarColor: "#A78BFA transparent",

              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#A78BFA",
                borderRadius: "4px",
              },
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isSelected
                ? "#A78BFA"
                : isFocused
                  ? "#374151"
                  : "#1F2937",
              color: "white",
              cursor: "pointer",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9CA3AF",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "#9CA3AF",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
            clearIndicator: (base) => ({
              ...base,
              color: "#9CA3AF",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
          }}
        />
      </div> */}
      <div className="flex flex-col w-48 gap-1">
        <label
          htmlFor={`filter-${index}`}
          className="text-xs font-semibold text-gray-400 tracking-wide px-1"
        >
          {filter.label}
        </label>

        <Select
          inputId={`filter-${index}`}
          options={filter.options}
          value={
            valorActual
              ? filter.options.find((opt) => opt.value === valorActual)
              : null
          }
          onChange={(selected) =>
            onFilterChange(filter.name as FiltroVehiculo, selected?.value ?? "")
          }
          isClearable
          placeholder={`Selecciona ${filter.label.toLowerCase()}`}
          className="text-sm text-white"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#111827", // más oscuro
              borderColor: state.isFocused ? "#8B5CF6" : "#374151",
              borderWidth: "1px",
              boxShadow: state.isFocused ? "0 0 0 1px #8B5CF6" : "none",
              "&:hover": {
                borderColor: "#8B5CF6",
              },
              borderRadius: "0.5rem",
              color: "white",
              minHeight: "38px",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1F2937",
              borderRadius: "0.5rem",
              marginTop: 4,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
              zIndex: 50,
              paddingTop: 4,
              paddingBottom: 4,
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isSelected
                ? "#8B5CF6"
                : isFocused
                  ? "#4B5563"
                  : "transparent",
              color: isSelected ? "#fff" : "#E5E7EB",
              cursor: "pointer",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 12,
              paddingRight: 12,
              transition: "background 0.2s ease-in-out",
              borderRadius: "0.375rem",
              // margin: "2px 6px",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9CA3AF",
            }),
            dropdownIndicator: (base, { isFocused }) => ({
              ...base,
              color: isFocused ? "#8B5CF6" : "#9CA3AF",
              transition: "color 0.2s",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
            clearIndicator: (base) => ({
              ...base,
              color: "#9CA3AF",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
          }}
        />
      </div>

    </>
  );
};
