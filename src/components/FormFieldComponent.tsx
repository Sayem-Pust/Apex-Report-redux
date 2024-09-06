import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  value: string | number | Date | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder = "",
  min,
  maxLength,
}) => {
    const isAmountField = label === "Amount";
  return (
    <div className="flex flex-col">
      <div className="relative">
        {isAmountField && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
        )}
        <input
          type={type}
          value={
            value instanceof Date
              ? value.toISOString().split("T")[0] // Convert Date to 'YYYY-MM-DD'
              : value === null
              ? ""
              : value
          }
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            isAmountField ? "pl-6" : ""
          } min-w-[80px] px-2 py-1 font-[600] text-[#545454] text-[12px] border border-gray-300 rounded ${
            error ? "border-red-500" : ""
          }`}
          min={min}
          maxLength={maxLength}
          onKeyDown={(e) => {
            if (type === "number" && (e.key === "-" || e.key === "e")) {
              e.preventDefault();
            }
          }}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
