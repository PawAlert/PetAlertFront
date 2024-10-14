import React, { useState } from "react";

const PostList = () => {
  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "잃어버린 강아지를 찾습니다.",
      address: "서울특별시 강남구 테헤란로 강남빌딩 앞",
      views: 111115,
      imageUrl: "https://via.placeholder.com/60",
      profile: {
        name: "바디",
        age: "5",
        gender: "남자",
        microchip: "123456789101112131415",
        contact: "010-1234-5678",
        location: "서울특별시 강남구 테헤란로 강남빌딩 앞 세븐일레븐 근처",
        profileImage: "https://via.placeholder.com/150",
      },
    },
    {
      id: 2,
      title: "강아지를 찾고 있습니다.",
      address: "서울특별시 종로구 삼청동",
      views: 89500,
      imageUrl: "https://via.placeholder.com/60",
      profile: {
        name: "코코",
        age: "3",
        gender: "여자",
        microchip: "678901234567890123456",
        contact: "010-2345-6789",
        location: "서울특별시 종로구 삼청동 세븐일레븐 근처",
        profileImage: "https://via.placeholder.com/150",
      },
    },
    {
      id: 3,
      title: "강아지를 잃어버렸어요.",
      address: "서울특별시 마포구 상암동",
      views: 50000,
      imageUrl: "https://via.placeholder.com/60",
      profile: {
        name: "몽이",
        age: "2",
        gender: "남자",
        microchip: "112233445566778899001",
        contact: "010-3456-7890",
        location: "서울특별시 마포구 상암동 근처 공원",
        profileImage: "https://via.placeholder.com/150",
      },
    },
  ];

  // State to track the selected post
  const [selectedProfile, setSelectedProfile] = useState(posts[0].profile);

  // Function to handle post click
  const handlePostClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-6">작성 글</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Post List */}
          <div>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-pink-100 p-4 rounded-md flex cursor-pointer"
                  onClick={() => handlePostClick(post.profile)}
                >
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      제목: {post.title}
                    </h2>
                    <p>주소: {post.address}</p>
                    <p className="text-sm text-gray-500">
                      조회수: {post.views.toLocaleString()}회
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedProfile.name}
              </p>
              <p>
                <strong>나이:</strong> {selectedProfile.age}세
              </p>
              <p>
                <strong>성별:</strong> {selectedProfile.gender}
              </p>
              <p>
                <strong>마이크로칩:</strong> {selectedProfile.microchip}
              </p>
              <img
                src={selectedProfile.profileImage}
                alt="Pet"
                className="w-40 h-40 rounded-md object-cover mt-4"
              />
              <div className="mt-4 space-y-2">
                <p>
                  <strong>연락처:</strong> {selectedProfile.contact}
                </p>
                <p>
                  <strong>위치:</strong> {selectedProfile.location}
                </p>
              </div>
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
              Edit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostList;
