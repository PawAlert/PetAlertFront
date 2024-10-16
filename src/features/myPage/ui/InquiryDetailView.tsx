import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInquiryDetail } from "../api/getInquiryDetail";
import { InquiryDetail } from "../model/types";
import { useAuth } from "../../auth/Login/customHook/useAuth";

const InquiryDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.uid !== "bc50a30d-8da4-4d10-a5a9-6bba1b4c2b6e") {
      navigate("/myPage");
      return;
    }

    const fetchInquiryDetail = async () => {
      if (!id || isNaN(Number(id))) {
        setError("유효하지 않은 문의 ID입니다.");
        return;
      }

      try {
        const data = await getInquiryDetail(Number(id));
        setInquiry(data);
      } catch (error) {
        console.error("Error fetching inquiry detail:", error);
        setError("문의 상세 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchInquiryDetail();
  }, [id, userInfo, navigate]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!inquiry) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">문의 상세 내용</h2>
      <div className="space-y-4">
        <p>
          <span className="font-semibold">유형:</span> {inquiry.type}
        </p>
        <p>
          <span className="font-semibold">이름:</span> {inquiry.name}
        </p>
        <p>
          <span className="font-semibold">이메일:</span> {inquiry.email}
        </p>
        <p>
          <span className="font-semibold">전화번호:</span> {inquiry.phoneNumber}
        </p>
        <div>
          <p className="font-semibold">문의 내용:</p>
          <p className="mt-2 whitespace-pre-wrap">{inquiry.content}</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/myPage/inquiries")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default InquiryDetailView;
