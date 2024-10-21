import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/Login/model/store";
import AdoptionDropdown from "../../features/adoption/ui/AdoptionDropdown";
import VolunteerDropdown from "../../features/volunteer/ui/VolunteerDropdown.tsx";
import { useEffect, useState } from "react";
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const checkLoginStatus = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, [checkLoginStatus, location]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const headerClasses = `w-full ${isMainPage ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-white shadow-sm'} z-50`;
  const textClasses = isMainPage ? 'text-white' : 'text-black';
  const loginButtonClasses = `px-4 py-2 ${isMainPage ? 'bg-transparent text-white border border-white' : 'bg-black text-white'} rounded-full`;

  const NavLinks = ({ mobile }: { mobile: boolean }) => (
      <>
        <Link to="/missingPostList" className={`block py-2 text-[18px] font-medium hover:text-gray-500 transition-colors ${mobile ? 'text-black' : textClasses}`}>반려동물 찾아요</Link>
        <VolunteerDropdown isMobile={mobile} />
        <AdoptionDropdown isMobile={mobile} />
        <Link to="/" className={`block py-2 text-[18px] font-medium hover:text-gray-500 transition-colors ${mobile ? 'text-black' : textClasses}`}>공지사항</Link>
      </>
  );

  return (
      <header className={headerClasses}>
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className={`flex items-center space-x-2 ${textClasses}`}>
              <img src="/assets/506572108c2c11efbee1ad74d3898230.jpg" alt="PetAlert Logo" className="w-8 h-8"/>
              <span className="text-xl font-bold">PetAlert</span>
            </Link>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-black"/>
                ) : (
                    <Bars3Icon className="h-6 w-6 text-black"/>
                )}
              </button>
            </div>

            <nav className={`md:flex md:items-center md:space-x-8 ${isMenuOpen ? 'block fixed inset-0 bg-white z-50 pt-16 px-6' : 'hidden'} md:relative md:bg-transparent md:pt-0 md:px-0 md:flex-grow md:justify-center`}>
              {isMenuOpen && (
                  <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 md:hidden">
                    <XMarkIcon className="h-6 w-6 text-black"/>
                  </button>
              )}
              <NavLinks mobile={isMenuOpen} />
              {isMenuOpen && (
                  <div className="mt-4 md:hidden">
                    {isLoggedIn ? (
                        <Link to="/mypage/profile" className="block py-2 text-[18px] font-medium hover:text-gray-500 transition-colors text-black">MyPage</Link>
                    ) : (
                        <Link to="/login" className="block py-2 text-[18px] font-medium hover:text-gray-500 transition-colors text-black">Login</Link>
                    )}
                  </div>
              )}
            </nav>

            <div className="hidden md:block">
              {isLoggedIn ? (
                  <Link to="/mypage/profile" className={`${textClasses} text-[18px] font-medium hover:text-gray-500 transition-colors`}>MyPage</Link>
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