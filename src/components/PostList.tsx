import React, { useState, useRef } from "react";
import axios from "axios";

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
        name: "버디",
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

  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState({ ...selectedProfile });
  const [selectedImages, setSelectedImages] = useState([]);
  const [deletePhotoIds, setDeletePhotoIds] = useState([]);
  const fileInputRef = useRef(null);

  const toggleEditMode = () => {
    if (isEditing) {
      updateProfile();
    } else {
      setEditingProfile({ ...selectedProfile });
      setSelectedImages([]);
      setDeletePhotoIds([]);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleDeleteImage = (imageId) => {
    setDeletePhotoIds((prev) => [...prev, imageId]);
  };

  const updateProfile = async () => {
    const formData = new FormData();
    const petUpdateDto = {
      petId: editingProfile.id,
      petName: editingProfile.name,
      species: editingProfile.species,
      breed: editingProfile.breed,
      color: editingProfile.color,
      gender: editingProfile.gender,
      microchipId: editingProfile.microchip,
      neutering: editingProfile.neutering,
      age: parseInt(editingProfile.age),
      deletePhotoIds: deletePhotoIds,
    };

    formData.append(
      "petUpdateDto",
      new Blob([JSON.stringify(petUpdateDto)], { type: "application/json" })
    );

    selectedImages.forEach((image) => {
      formData.append("petImage", image);
    });

    try {
      const response = await axios.put("/api/pets/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSelectedProfile(response.data);
        alert("프로필이 성공적으로 업데이트되었습니다.");
      }
    } catch (error: unknown) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
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
              {isEditing ? (
                <>
                  <input
                    name="name"
                    value={editingProfile.name}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="age"
                    value={editingProfile.age}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="gender"
                    value={editingProfile.gender}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="microchip"
                    value={editingProfile.microchip}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="species"
                    value={editingProfile.species}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="breed"
                    value={editingProfile.breed}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <input
                    name="color"
                    value={editingProfile.color}
                    onChange={handleInputChange}
                    className="border p-1 w-full"
                  />
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="neutering"
                        checked={editingProfile.neutering}
                        onChange={(e) =>
                          setEditingProfile((prev) => ({
                            ...prev,
                            neutering: e.target.checked,
                          }))
                        }
                      />
                      중성화 여부
                    </label>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    multiple
                    className="mt-2"
                  />
                  <div className="mt-2">
                    {selectedProfile.images &&
                      selectedProfile.images.map((image, index) => (
                        <div
                          key={index}
                          className="inline-block mr-2 mb-2 relative"
                        >
                          <img
                            src={image.url}
                            alt={`Pet ${index}`}
                            className="w-20 h-20 object-cover"
                          />
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            X
                          </button>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <>
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
                  <p>
                    <strong>종:</strong> {selectedProfile.species}
                  </p>
                  <p>
                    <strong>품종:</strong> {selectedProfile.breed}
                  </p>
                  <p>
                    <strong>색상:</strong> {selectedProfile.color}
                  </p>
                  <p>
                    <strong>중성화 여부:</strong>{" "}
                    {selectedProfile.neutering ? "예" : "아니오"}
                  </p>
                  <div className="mt-4">
                    {selectedProfile.images &&
                      selectedProfile.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Pet ${index}`}
                          className="w-20 h-20 object-cover inline-block mr-2 mb-2"
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
            <button
              className={`${
                isEditing ? "bg-blue-500" : "bg-green-500"
              } text-white py-2 px-4 rounded-md mt-4`}
              onClick={toggleEditMode}
            >
              {isEditing ? "저장" : "수정"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostList;
