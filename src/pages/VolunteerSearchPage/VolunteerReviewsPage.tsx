import React, { useState } from 'react';
import { FaUser, FaCalendar, FaChevronLeft, FaChevronRight, FaHeart, FaBuilding } from 'react-icons/fa';

interface Review {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    shelter: string;
    likes: number;
}

const sampleReviews: Review[] = [
    {
        id: 1,
        title: "강아지 산책 봉사 후기",
        author: "김철수",
        date: "2023-05-15",
        content: "처음으로 강아지 산책 봉사를 다녀왔습니다. 정말 즐거운 경험이었어요!",
        shelter: "행복한 강아지 보호소",
        likes: 15
    },
    {
        id: 2,
        title: "고양이 보호소 청소 봉사",
        author: "이영희",
        date: "2023-05-10",
        content: "고양이들과 함께 시간을 보내며 보호소를 깨끗이 청소했습니다. 보람찼어요.",
        shelter: "사랑받는 고양이 쉼터",
        likes: 23
    },
    {
        id: 3,
        title: "유기동물 급식 봉사 후기",
        author: "박지민",
        date: "2023-05-05",
        content: "유기동물들에게 먹이를 주는 봉사활동을 했습니다. 동물들이 행복해하는 모습을 보니 기분이 좋았어요.",
        shelter: "따뜻한 마음 동물 보호소",
        likes: 18
    },
    ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 4,
        title: `봉사활동 후기 ${i + 4}`,
        author: `작성자 ${i + 4}`,
        date: `2023-05-${20 + i}`,
        content: `이것은 봉사활동 후기 ${i + 4}의 내용입니다. 자세한 내용은 생략합니다.`,
        shelter: `보호소 ${i + 4}`,
        likes: Math.floor(Math.random() * 30)
    }))
];

const ITEMS_PER_PAGE = 5;

const VolunteerReviewsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviews, setReviews] = useState(sampleReviews);

    const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleLike = (id: number) => {
        setReviews(reviews.map(review =>
            review.id === id ? { ...review, likes: review.likes + 1 } : review
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">봉사활동 후기</h1>
            <div className="space-y-4">
                {currentReviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{review.title}</h2>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <FaUser className="mr-2 text-blue-500" />
                            <span className="mr-4">{review.author}</span>
                            <FaCalendar className="mr-2 text-green-500" />
                            <span>{review.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                            <FaBuilding className="mr-2 text-purple-500" />
                            <span>{review.shelter}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{review.content}</p>
                        <div className="flex items-center">
                            <button
                                onClick={() => handleLike(review.id)}
                                className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-300"
                            >
                                <FaHeart className={`mr-1 ${review.likes > 0 ? 'text-red-500' : ''}`} />
                                <span>{review.likes}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <FaChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                                currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <FaChevronRight />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default VolunteerReviewsPage;