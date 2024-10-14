import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile3 = () => {
  const [formData, setFormData] = useState({
    username: "", // 사용자 이름
    phoneNumber: "",
    email: "", // 이메일
    role: "", // 사용자 역할
    profileImageUrl: "", // 프로필 이미지 URL
    userImage: null, // 업로드된 이미지 파일
  });

  const [loading, setLoading] = useState(true); // 데이터를 불러오는 중 상태 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("토큰이 존재하지 않습니다. 로그인이 필요합니다.");
          return;
        }

        const response = await axios.get(
          "https://port-0-pawalertbackendteamgroup-m06zwfj8628a2164.sel4.cloudtype.app/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = response.data.data;
        setFormData({
          username: profileData.userName,
          phoneNumber: profileData.phoneNumber,
          email: profileData.email,
          role: profileData.UserRoles,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이미지 선택 시 처리하는 함수
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      userImage: e.target.files[0], // 선택된 파일을 저장
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("토큰이 존재하지 않습니다. 로그인이 필요합니다.");
        return;
      }

      // FormData 생성 및 이미지 파일 추가
      const updatedFormData = new FormData();
      updatedFormData.append("username", formData.username);
      updatedFormData.append("phoneNumber", formData.phoneNumber);
      updatedFormData.append("email", formData.email);
      updatedFormData.append("role", formData.role);
      if (formData.userImage) {
        updatedFormData.append("userImage", formData.userImage); // 이미지 파일 추가
      }

      // 프로필 업데이트 API 호출
      const response = await axios.put(
        "https://api.example.com/api/user/profile", // 실제 API URL로 변경
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // 헤더 설정
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

  const handleImageUpdate = () => {
    // 이미지 업데이트 로직 추가
    alert("이미지 업데이트 기능은 여기에 추가하세요.");
  };

  if (loading) {
    return <div>프로필 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">프로필</h1>

      <div className="flex items-center mb-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={formData.profileImageUrl || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm10 4a1 1 0 011 1v6a1 1 0 11-2 0V8a1 1 0 011-1zM9 9a1 1 0 100 2h2a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange} // 이미지 변경 핸들러 추가
            />
          </label>
        </div>

        <div className="ml-6 space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            이미지 업데이트
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-md">
            프로필 삭제하기
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
