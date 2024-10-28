import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";
import { getDashboards } from "@/utils/api/dashboardsApi";
import MyDashList from "@/components/MyDashBoard/MyDashList";
import InvitedList from "@/components/MyDashBoard/InvitedList";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import { UserResponse } from "@/types/users";
import { DashboardResponse } from "@/types/dashboards";

interface MyDashBoardPageProps {
  initialDashboards: DashboardResponse;
  user: UserResponse;
}

const MyDashBoardPage = ({ initialDashboards, user }: MyDashBoardPageProps) => {
  return (
    <DashBoardLayout>
      <div className="w-full p-6 md:p-10 lg:max-w-[1102px]">
        <MyDashList initialDashboards={initialDashboards} />
        <InvitedList />
      </div>
    </DashBoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // axiosInstance에 쿠키 정보 전달
    const headers = {
      cookie: context.req.headers.cookie,
      Authorization: `Bearer ${accessToken}`,
    };

    const [user, dashboards] = await Promise.all([
      getUserInfo(headers),
      getDashboards(1, 5, headers),
    ]);

    return {
      props: {
        initialDashboards: dashboards,
        user,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default MyDashBoardPage;
