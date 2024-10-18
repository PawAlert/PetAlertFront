const Banner = () => {
    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] z-[-1]">
            <img
                src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="강아지"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute top-[35%] right-0 transform -translate-y-1/2 text-right text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
                    우리와 함께하는 소중한 순간들을 기억하며,
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 sm:mb-3 md:mb-4">
                    당신의 사랑하는 반려동물을 찾는 여정에 함께해요.
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                    사랑하는 친구가 사라졌다면, 그리움 속에서 다시 만날 수 있도록 힘을 모아주세요.
                </p>
            </div>
        </div>
    );
};

export default Banner;