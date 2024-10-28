import React from "react";
import Image from "next/image";
import Dropdown from "../../../dropdown/Dropdown";
import { Card } from "@/types/cards";
import { styles } from ".././styles";

interface HeaderProps {
  card: Card | null;
  onClose: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  onEdit: () => void;
}

const CardHeader: React.FC<HeaderProps> = ({
  card,
  onClose,
  isDropdownOpen,
  setIsDropdownOpen,
  onEdit,
}) => {
  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {
        onEdit();
        onClose();
      },
    },
    { label: "삭제하기", onClick: () => console.log("삭제하기 클릭") },
  ];

  return (
    <div className={styles.modalHeader}>
      <h1 className="text-xl font-bold">{card?.title}</h1>
      <div className="flex items-center">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles.kebabButton}
        >
          <Image
            src="/images/icons/icon_kebab.svg"
            width={4}
            height={16}
            alt="더보기"
          />
        </button>
        <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
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
