import React from 'react';
import { Link } from 'react-router-dom';

interface Review {
    id: number;
    image: string;
    title: string;
    date: string;
    location: string;
}

const adoptionReviews: Review[] = [
    {
        id: 1,
        image: "https://cdn.imweb.me/thumbnail/20210304/035d01c442580.png",
        title: "새로운 가족을 맞이했어요",
        date: "2024년 10월 10일",
        location: "서울시 강남구"
    },
    {
        id: 2,
        image: "https://newsimg-hams.hankookilbo.com/2024/06/25/9b490f29-4415-43bb-bdf8-b77c3ca67413.jpg",
        title: "행복한 골든 리트리버",
        date: "2024년 10월 15일",
        location: "경기도 수원시"
    },
    {
        id: 3,
        image: "https://bareunnutri.com/files/attach/images/2023/09/27/8f8610825cfcec05c020bb7c62b0716b.jpg",
        title: "사랑스러운 믹스견 입양",
        date: "2024년 10월 20일",
        location: "부산시 해운대구"
    },
    {
        id: 4,
        image: "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        title: "포메라니안과의 새로운 시작",
        date: "2024년 10월 25일",
        location: "대구시 수성구"
    }
];

const volunteerReviews: Review[] = [
    {
        id: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxILEKrQlSSd0zCAg_CI1bGLuEKMN6KZ2F0g&s",
        title: "유기견 보호소 청소 봉사",
        date: "2024년 11월 5일",
        location: "경기도 시흥시 배곧동 배곧보호센터"
    },
    {
        id: 2,
        image: "https://flexible.img.hani.co.kr/flexible/normal/758/492/imgdb/original/2024/0808/20240808502492.jpg",
        title: "유기묘 돌보기 활동",
        date: "2024년 11월 10일",
        location: "서울시 마포구 동물사랑센터"
    },
    {
        id: 3,
        image: "https://cdn.imweb.me/upload/S20210807d1f68b7a970c2/7170113c6a983.jpg",
        title: "유기동물 산책 도우미",
        date: "2024년 11월 15일",
        location: "인천시 연수구 동물보호소"
    },
    {
        id: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Stray_cat_at_Castillo_San_Felipe_del_Morro%2C_Puerto_Rico_%28cropped%29.jpg/800px-Stray_cat_at_Castillo_San_Felipe_del_Morro%2C_Puerto_Rico_%28cropped%29.jpg",
        title: "유기동물 치료 보조 활동",
        date: "2024년 11월 20일",
        location: "경기도 고양시 동물병원"
    }
];
interface ReviewSectionProps {
    title: string;
    reviews: Review[];
    linkTo: string;
    accentColor: string;
    buttonColor: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ title, reviews, accentColor, buttonColor }) => (
    <div className="mb-20">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <div className={`w-24 h-1 ${accentColor} mx-auto`}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <img src={review.image} alt={review.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">날짜: {review.date}</p>
                        <p className="text-sm text-gray-600">위치: {review.location}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-8">
            {/*<Link to={linkTo} className={`inline-block ${buttonColor} text-white font-semibold py-2 px-6 rounded-full hover:opacity-90 transition duration-300`}>*/}
            {/*    더 많은 후기 보기*/}
            {/*</Link>*/}
            <Link to={"/"} className={`inline-block ${buttonColor} text-white font-semibold py-2 px-6 rounded-full hover:opacity-90 transition duration-300`}>
                더 많은 후기 보기
            </Link>
        </div>
    </div>
);

const ReviewsSection: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-amber-50 to-blue-50">
            <div className="container mx-auto px-4">
                <ReviewSection
                    title="입양 후기"
                    reviews={adoptionReviews}
                    linkTo="/adoption-reviews"
                    accentColor="bg-yellow-400"
                    buttonColor="bg-yellow-400"
                />
                <ReviewSection
                    title="봉사 후기"
                    reviews={volunteerReviews}
                    linkTo="/volunteer-reviews"
                    accentColor="bg-blue-400"
                    buttonColor="bg-blue-400"
                />
            </div>
        </section>
    );
};

export default ReviewsSection;