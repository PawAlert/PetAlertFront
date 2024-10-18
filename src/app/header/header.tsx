import { Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/Login/model/store";
import AdoptionDropdown from "../../features/adoption/ui/AdoptionDropdown";
import VolunteerDropdown from "../../features/volunteerSearch/ui/VolunteerDropdown";

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    // todo : 로그아웃 이후 동작 추가해주기
  };

  return (
      <header className="w-full bg-white">
        <div className="container mx-auto py-5 px-4">
          <div className="flex justify-between items-center flex-wrap">
            <Link to="/">
              <h2 className="text-2xl font-bold text-primary">PetAlert</h2>
            </Link>

            <nav className="flex items-center space-x-4 flex-wrap">
              {isLoggedIn ? (
                  <>
                    <Link to="/mypage/profile">
                      <h2 className="text-lg font-semibold text-primary hover:text-red-600 transition-colors">
                        MyPage
                      </h2>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-lg font-semibold text-primary hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
              ) : (
                  <Link to="/login">
                    <h2 className="text-lg font-semibold text-primary hover:text-red-600 transition-colors">
                      Login
                    </h2>
                  </Link>
              )}
              <div className="inline-block">
                <AdoptionDropdown />
              </div>
              <div className="inline-block">
                <VolunteerDropdown />
              </div>
              <Link to="/missingPostList">
                <h2 className="text-lg font-semibold text-primary hover:text-red-600 transition-colors">
                  반려동물 찾아요
                </h2>
              </Link>
              <Link to="/example">
                <h2 className="text-lg font-semibold text-primary hover:text-red-600 transition-colors">
                  shared 사용예제
                </h2>
              </Link>
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;