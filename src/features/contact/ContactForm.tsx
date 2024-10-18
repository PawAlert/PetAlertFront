import React, { useState, FormEvent } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    inquiryType: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // 입력할 때마다 에러 메시지를 초기화합니다.
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이메일이나 전화번호 둘 중 하나는 필수로 입력해야 함
    if (!formData.email && !formData.phone) {
      setError("이메일 주소나 전화번호 중 하나는 필수입니다.");
      return;
    }

    // 폼 제출 처리 로직
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-2">문의하기</h1>
      <h2 className="text-2xl font-bold mb-6 text-center">CONTACT</h2>
      <p className="mb-6">
        • 문의글을 남겨주세요. 빠르게 확인 후 답변을 드리겠습니다.
      </p>
      <form onSubmit={handleSubmit}>
        {/* 문의 종류 */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">문의 종류 *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="inquiryType"
                value="글 관련"
                onChange={handleChange}
                className="mr-2"
                required
              />
              글 관련
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inquiryType"
                value="신고"
                onChange={handleChange}
                className="mr-2"
                required
              />
              신고
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inquiryType"
                value="기타"
                onChange={handleChange}
                className="mr-2"
                required
              />
              기타
            </label>
          </div>
        </div>

        {/* 이름 입력 */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">이름 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="이름"
            required
          />
        </div>

        {/* 이메일 주소 입력 */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">이메일 주소</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="이메일 주소"
          />
        </div>

        {/* 전화번호 입력 */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">전화번호</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="전화번호"
          />
        </div>

        {/* 오류 메시지 표시 */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* 문의 내용 입력 */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">문의 내용 *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="문의내용"
            rows={5}
            required
          />
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
