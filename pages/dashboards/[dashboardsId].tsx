import React, { useState } from "react";
import Image from "next/image";
import { Dashboard } from "@/types/dashboards";

interface DashboardDetailProps {
  dashboard: Dashboard | null;
  isOpen: boolean;
  onClose: () => void;
}

const DashboardDetail: React.FC<DashboardDetailProps> = ({
  dashboard,
  isOpen,
  onClose,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen || !dashboard) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-[730px] h-[763px] bg-white shadow-lg rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto pt-6 pl-4 pr-5">
          {/* 헤더 */}
          <div className="bg-white p-4 flex justify-between items-center ">
            <h1 className="text-xl font-bold">{dashboard.title}</h1>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-500 hover:text-gray-700 mr-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      수정하기
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow pr-4">
              {/* 태그 섹션 */}
              <div className="flex flex-wrap items-center gap-2 p-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                  • To Do
                </span>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                {[
                  { text: "프로젝트", color: "bg-orange-100 text-orange-800" },
                  { text: "일반", color: "bg-green-100 text-green-800" },
                  { text: "백엔드", color: "bg-pink-100 text-pink-800" },
                  { text: "상", color: "bg-purple-100 text-purple-800" },
                ].map((tag) => (
                  <span
                    key={tag.text}
                    className={`px-3 py-1 ${tag.color} text-sm rounded-md`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              {/* 본문 */}
              <div className="p-4">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                  Cras mattis, nulla non lacerat porttitor, diam justo laoreet
                  eros, vel aliquet diam elit at leo.
                </p>
                <div className="relative w-full h-64">
                  <Image
                    src="https://via.placeholder.com/300"
                    alt="Two women looking at a book"
                    fill
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            {/* 담당자 */}
            <div className="w-[200px] flex-shrink-0 p-4">
              <div className="p-4 rounded-lg border border-[#D9D9D9]">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  담당자
                </h3>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <span className="ml-2 text-sm">배유정</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mt-4 mb-2">
                  마감일
                </h3>
                <p className="text-sm">2022.12.30 19:00</p>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="p-4 ">
            <h2 className="text-lg font-semibold mb-2">댓글</h2>
            <div className="mb-6 relative">
              <textarea
                placeholder="댓글 작성하기"
                className="w-full p-2 pr-20 border rounded-lg h-24 resize-none"
              />
              <button className="absolute right-3 bottom-5 text-blue-500 px-7 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                입력
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Image
                  src="https://via.placeholder.com/30"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-grow">
                  <div className="flex items-center">
                    <p className="font-semibold">정민호</p>
                    <p className="text-sm text-gray-500 ml-2">
                      2023.12.27 14:05
                    </p>
                  </div>
                  <p className="mt-1">오늘까지 CCC 개발 완료 수 있을까요?</p>
                  <div className="mt-2">
                    <button className="text-sm text-gray-500 mr-2 underline">
                      수정
                    </button>
                    <button className="text-sm text-gray-500 underline">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetail;