import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "../../../dropdown/Dropdown";
import { Card } from "@/types/cards";
import { styles } from ".././styles";

interface HeaderProps {
  card: Card | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CardHeader: React.FC<HeaderProps> = ({
  card,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {
        onEdit();
        onClose();
      },
    },
    {
      label: "삭제하기",
      onClick: () => {
        onDelete();
        onClose();
      },
    },
  ];

  return (
    <div className={styles.modalHeader}>
      <h1 className="text-xl font-bold">{card?.title}</h1>
      <div className="flex items-center">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${styles.kebabButton} relative`}
        >
          <Image
            src="/images/icons/icon_kebab.svg"
            width={4}
            height={16}
            alt="더보기"
          />
          <div className="absolute top-[28px] right-0 w-[93px] bg-white rounded-md shadow-lg z-10">
            <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
          </div>
        </button>

        <button className={styles.closeButton} onClick={onClose}>
          <Image
            src="/images/icons/icon_close.svg"
            width={16}
            height={16}
            alt="닫기"
          />
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
