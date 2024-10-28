// Card.tsx
import React from "react";
import Image from "next/image";
import { Card as CardType } from "@/types/cards";
import { hexToRgba } from "@/utils/TodoForm";

interface CardProps {
  card: CardType;
  tagColors: Record<string, string>;
  onClick: () => void;
  dashboardId: number;
}

const Card: React.FC<CardProps> = ({
  card,
  tagColors,
  onClick,
  dashboardId,
}) => (
  <button
    className="w-full md:flex md:gap-5 lg:block p-3 border border-gray400 rounded-md bg-white100"
    onClick={onClick}
  >
    <div className="overflow-hidden relative w-full h-40 md:flex-[0_0_90px] lg:flex-1 md:h-[53px] lg:h-40 rounded-md">
      <Image
        src={card.imageUrl || "/images/resource/card_image1.png"}
        className="object-cover"
        fill
        alt="카드 이미지"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="w-full pt-1 md:pt-0 lg:pt-[15px]">
      <h2 className="sm:text-sm md:text-[16px] font-medium text-left">
        {card.title}
      </h2>
      <div className="md:flex lg:block gap-4">
        <ul className="tags flex items-center gap-[6px] mt-[6px]">
          {card.tags.map((tag) => (
            <li
              key={tag}
              className="tag py-1 px-[6px] rounded"
              style={{
                backgroundColor: hexToRgba(tagColors[tag] || "#000000", 0.2),
                color: tagColors[tag] || "#000000",
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="md:flex-1 flex justify-between items-center pt-[6px]">
          <p className="flex items-center text-gray200 text-xs font-medium">
            <span>
              <Image
                src="/images/icons/icon_calendar.svg"
                width={18}
                height={18}
                alt="캘린더"
              />
            </span>
            {new Date(card.dueDate)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
              .replace(/\.$/, "")}
          </p>
          <p className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
            {card.assignee.nickname}
          </p>
        </div>
      </div>
    </div>
  </button>
);

export default Card;
