import React from 'react';

interface Review {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
}

const sampleReviews: Review[] = [
    {
        id: 1,
        title: "강아지 산책 봉사 후기",
        author: "김철수",
        date: "2023-05-15",
        content: "처음으로 강아지 산책 봉사를 다녀왔습니다. 정말 즐거운 경험이었어요!"
    },
    {
        id: 2,
        title: "고양이 보호소 청소 봉사",
        author: "이영희",
        date: "2023-05-10",
        content: "고양이들과 함께 시간을 보내며 보호소를 깨끗이 청소했습니다. 보람찼어요."
    },
    {
        id: 3,
        title: "유기동물 급식 봉사 후기",
        author: "박지민",
        date: "2023-05-05",
        content: "유기동물들에게 먹이를 주는 봉사활동을 했습니다. 동물들이 행복해하는 모습을 보니 기분이 좋았어요."
    }
];

const VolunteerReviewsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">봉사활동 후기</h1>
            <div className="space-y-6">
                {sampleReviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">작성자: {review.author} | 날짜: {review.date}</p>
                        <p className="text-gray-700">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerReviewsPage;