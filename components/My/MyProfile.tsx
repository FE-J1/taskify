import Image from "next/image";
import InputField from "./InputField";
import MyButton from "./MyButton";
import { useState } from "react";

const MyProfile: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // 닉네임이나 이미지를 서버로 보내는 로직 추가
    console.log("닉네임:", nickname, "이미지:", profileImage);
  };

  return (
    <div className="lg:w-[672px] md:w-[548px] sm:w-[284px] md:p-6 sm:p-4 md:mb-6 sm:mb-4 rounded-2xl bg-white100">
      <h2 className="md:text-[24px] sm:text-[18px] md:mb-6 sm:mb-10 font-bold">
        프로필
      </h2>
      <div className="flex md:gap-[42px] sm:gap-10 md:flex-row sm:flex-col">
        <div className="md:w-[182px] sm:w-[100px]">
          <label htmlFor="inputFile">
            <Image
              className="cursor-pointer"
              src="/images/icons/profile_add_box.svg"
              alt="파일추가"
              width="182"
              height="182"
            />
          </label>
          <input
            className="hidden"
            type="file"
            id="inputFile"
            onChange={handleFileChange}
          />
        </div>
        <div className="md:w-[400px] sm:w-[252px]">
          <InputField
            label="이메일"
            name="email"
            type="email"
            placeholder="1212@naver.com"
            readOnly
          />
          <InputField
            label="닉네임"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <MyButton onClick={handleSave}>저장</MyButton>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;