import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/Login/model/store";
import AdoptionDropdown from "../../features/adoption/ui/AdoptionDropdown";
import VolunteerDropdown from "../../features/volunteer/ui/VolunteerDropdown.tsx";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, [checkLoginStatus, location]);

  const headerClasses = `w-full ${isMainPage ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-white shadow-sm'} z-50`;
  const textClasses = isMainPage ? 'text-white' : 'text-black';
  const loginButtonClasses = `px-4 py-2 ${isMainPage ? 'bg-transparent text-white border border-white' : 'bg-black text-white'} rounded-full`;

  return (
      <header className={headerClasses}>
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className={`flex items-center space-x-2 ${textClasses}`}>
              <img src="/assets/506572108c2c11efbee1ad74d3898230.jpg" alt="PetAlert Logo" className="w-8 h-8"/>
              <span className="text-xl font-bold">PetAlert</span>
            </Link>

            <nav className={`flex-1 flex justify-center items-center space-x-8 ${textClasses} ml-12`}>
              <Link to="/missingPostList" className="text-[18px] font-medium hover:text-gray-300 transition-colors">반려동물 찾아요</Link>
              <VolunteerDropdown/>
              <AdoptionDropdown/>
              <Link to="/" className="text-[18px] font-medium hover:text-gray-300 transition-colors">공지사항</Link>
            </nav>

            <div>
              {isLoggedIn ? (
                  <Link to="/mypage/profile"
                        className={`${textClasses} text-[18px] font-medium hover:text-gray-300 transition-colors`}>MyPage</Link>
              ) : (
                  <Link to="/login" className={`${loginButtonClasses} text-[18px] font-medium`}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;