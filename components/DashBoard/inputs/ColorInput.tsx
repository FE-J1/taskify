import React from "react";
import Image from "next/image";
import checkImage from "../../../public/images/icons/icon_select.svg?url";
import { colorClass, ColorKey } from "@/types/color";

interface ColorPorps {
  color: ColorKey;
  isSelected: boolean;
  onClick: (color: ColorKey) => void;
}

const ColorInput = ({ color, isSelected = true, onClick }: ColorPorps) => {
  const handleClick = () => {
    onClick(color);
  };

  return (
    <button
      type="button"
      className={`p-1 ${colorClass[color]} rounded-full w-8 h-8`}
      onClick={handleClick}
    >
      {isSelected && (
        <Image src={checkImage} width={24} height={24} alt="check Image" />
      )}
    </button>
  );
};

export default ColorInput;
