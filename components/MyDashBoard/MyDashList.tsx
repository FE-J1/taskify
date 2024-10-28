import { useState, useEffect } from "react";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { DashboardResponse } from "@/types/dashboards";
import Link from "next/link";
import Image from "next/image";
import CreateDashBoard from "./CreateDashBoard";
import useModal from "@/hooks/modal/useModal";
import { boardCardBtn, boardCardBtnBox } from "./MyDashStyle";
import { parse } from "cookie";

interface MyDashListProps {
  initialDashboards: DashboardResponse;
}

const MyDashList: React.FC<MyDashListProps> = ({ initialDashboards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboards, setDashboards] = useState(initialDashboards);
  const { isOpen, openModal, closeModal } = useModal();

  const totalCount = dashboards?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 5);

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const cookies = parse(document.cookie);
        const accessToken = cookies.accessToken;
        const data = await getDashboards(currentPage, 5, accessToken);
        setDashboards(data);
      } catch (error) {
        console.error("Error fetching dashboards:", error);
      }
    };

    if (currentPage > 1) {
      fetchDashboards();
    }
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNewDashBoard = () => {
    openModal();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-[10px] lg:gap-[13px]">
        <div className={`justify-center ${boardCardBtn}`}>
          <button
            type="button"
            className={`${boardCardBtnBox}`}
            onClick={handleNewDashBoard}
          >
            새로운 대시보드 <br /> 추가하기
            <Image
              src="/images/icons/icon_add_dashboard.svg"
              width={16}
              height={16}
              alt="대시보드 추가"
            />
          </button>
        </div>

        {dashboards?.dashboards?.map((dashboard) => (
          <div key={dashboard.id} className={`${boardCardBtn}`}>
            <Link
              href={`/dashboards/${dashboard.id}`}
              className={`${boardCardBtnBox}`}
              prefetch={false} // 프리페치 비활성화로 getServerSideProps가 항상 실행되도록 함
            >
              {dashboard.title}
              {dashboard.createdByMe && (
                <Image
                  src="/images/icons/icon_crown.svg"
                  width={20}
                  height={18}
                  className="md:h-[14px] md:w-[18px]"
                  alt="왕관"
                />
              )}
              <Image
                src="/images/icons/icon_arrow_right.svg"
                width={18}
                height={18}
                className="ml-auto"
                alt="화살표"
              />
            </Link>
          </div>
        ))}
      </div>

      {dashboards?.dashboards?.length > 0 && (
        <div className="flex items-center justify-end gap-5 mt-4">
          <div>
            <span className="text-sm text-black300">
              {currentPage} 페이지 중 {totalPages}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="relative w-9 h-9 md:w-10 md:h-10"
            >
              <Image
                src="/images/icons/pagination_left.svg"
                fill
                alt="이전"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
              />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="relative w-9 h-9 md:w-10 md:h-10"
            >
              <Image
                src="/images/icons/pagination_right.svg"
                fill
                alt="다음"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
              />
            </button>
          </div>
        </div>
      )}
      {isOpen && <CreateDashBoard isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};

export default MyDashList;
