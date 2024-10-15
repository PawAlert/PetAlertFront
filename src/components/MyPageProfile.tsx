import { useState } from "react";

const Profile2 = () => {
  const [formData, setFormData] = useState({
    username: "john_doe", // 초기 값 설정
    phoneNumber: "010-1234-5678",
    email: "john.doe@example.com", // 고정된 이메일
    role: "동물병원", // 고정된 역할
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 프로필 업데이트 API 호출
    console.log(formData);
  };

  const handleImageUpdate = () => {
    // 이미지 업데이트 로직 추가
    alert("이미지 업데이트 기능은 여기에 추가하세요.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">프로필</h1>

      <div className="flex items-center mb-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            onClick={handleImageUpdate}
            className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full"
          >
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
          </button>
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

export default Profile2;
