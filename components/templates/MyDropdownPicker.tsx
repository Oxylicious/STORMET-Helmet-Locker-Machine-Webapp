import type { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

import { outfitFont } from "@/styles/fonts";

interface MyDropDownPickerProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  onChange?: () => void;
  placeholder?: string;
  darkMode?: boolean;
  width?: string;
  className?: string;
  label?: string;
  divClassname?: string;
  removeChevron?: boolean;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  menuListWidth?: string;
}

const MyDropDownPicker: React.FC<MyDropDownPickerProps> = ({
  value,
  setValue,
  options,
  error,
  onChange,
  placeholder,
  darkMode = false,
  width,
  className,
  label,
  divClassname,
  removeChevron = false,
  borderColor = "#6CE841",
  fontSize = "1.2rem",
  fontWeight = "400",
  padding = "0.4rem",
  menuListWidth = undefined,
}) => {
  return (
    <div className={twMerge("", divClassname)}>
      {label && (
        <p className="-translate-y-1 translate-x-3 o-50 t33">{label}</p>
      )}
      <Select
        value={options.find((option) => option.value === value)}
        options={options}
        isSearchable={false}
        className={twMerge(className, outfitFont)}
        onChange={(newValue: any) => {
          onChange?.();
          setValue(newValue?.value);
        }}
        placeholder={placeholder}
        styles={{
          container: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              width,
            }) as CSSObjectWithLabel,

          control: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              borderColor: error ? "red" : borderColor,
              backgroundColor: "transparent",
              cursor: "pointer",
              userSelect: "none",
            }) as CSSObjectWithLabel,

          placeholder: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              color: darkMode ? "#8D8E8F" : "black",
              fontSize: "1.5rem",
              cursor: "pointer",
              userSelect: "none",
            }) as CSSObjectWithLabel,

          // The value itself
          singleValue: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              color: darkMode ? "#FFF" : "black",
              fontSize: fontSize,
              fontWeight: fontWeight,
              padding: padding,
              cursor: "pointer",
              userSelect: "none",
              textAlign: removeChevron ? "center" : "left",
              fontFamily: "Outfit",
            }) as CSSObjectWithLabel,

          menuList: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              cursor: "pointer",
              userSelect: "none",
              width: menuListWidth,
              color: darkMode ? "#8D8E8F" : "black",
              backgroundColor: "#2B2F31",
            }) as CSSObjectWithLabel,

          // Chevron Down
          dropdownIndicator: (baseStyles: any) =>
            ({
              ...baseStyles,
              display: removeChevron ? "none" : "default",
            }) as CSSObjectWithLabel,

          // Vertical Line
          indicatorSeparator: (baseStyles: any) =>
            ({
              ...baseStyles,
              display: removeChevron ? "none" : "default",
            }) as CSSObjectWithLabel,
        }}
      ></Select>
    </div>
  );
};

export default MyDropDownPicker;
