import React, { useState, useEffect } from "react";
import axios from "axios";

// API 엔드포인트 URL 상수
const API_BASE_URL =
  "https://port-0-pawalertbackendteamgroup-m06zwfj8628a2164.sel4.cloudtype.app/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 토큰 가져오기 함수
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("토큰이 존재하지 않습니다. 로그인이 필요합니다.");
  }
  return token;
};

// FormData 타입 정의
interface FormData {
  username: string;
  phoneNumber: string;
  email: string;
  role: string;
  profileImageUrl: string;
  userImage: File | null;
}

const Profile3 = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    phoneNumber: "",
    email: "",
    role: "",
    profileImageUrl: "",
    userImage: null,
  });

  const [loading, setLoading] = useState(true as boolean);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = response.data.data;
        console.log(profileData);
        setFormData({
          username: profileData.userName,
          phoneNumber: profileData.phoneNumber,
          email: profileData.email,
          role: profileData.userRoles,
          profileImageUrl: profileData.profileImageUrl,
          userImage: null, // 초기 값은 null
        });
        setLoading(false);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setError("프로필 데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이미지 선택 시 처리하는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        userImage: file,
        profileImageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = getToken();

      const response = await api.patch(
        "/user/update",
        {
          username: formData.username,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("프로필 업데이트 성공:", response.data);
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트 중 문제가 발생했습니다.");
    }
  };

  // 이미지 업데이트 함수
  const handleImageUpdate = async () => {
    if (!formData.userImage) {
      alert("업로드할 이미지를 선택해주세요.");
      return;
    }

    try {
      const token = getToken();
      const formDataToSend = new FormData();
      formDataToSend.append("userImage", formData.userImage);

      const response = await api.patch(
        "/user/updateProfileImage",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("이미지 업데이트 성공:", response.data);
      alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("이미지 업데이트 실패:", error);
      alert("이미지 업데이트 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">프로필</h1>

      <div className="flex items-center mb-6">
        <div className="relative">
          <img
            src={formData.profileImageUrl || "/default-profile.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover cursor-pointer"
            onClick={() =>
              (
                document.getElementById("fileInput") as HTMLInputElement
              )?.click()
            }
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="ml-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleImageUpdate}
            type="button"
            disabled={!formData.userImage}
          >
            이미지 업데이트
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email - 고정값 */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Role - 고정값 */}
        <div>
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            readOnly
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile3;
