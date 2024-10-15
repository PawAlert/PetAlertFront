import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/Login/customHook/useAuth';

const MyPage: React.FC = () => {
    const { userInfo } = useAuth();
    const isAdmin = userInfo?.userRoles === 'ROLE_ADMIN';
    const isOfficialUser = userInfo?.userRoles === 'ROLE_OFFICIAL_USER';

    const menuItems = [
        { text: '프로필', route: 'profile' },
        { text: '내가 작성한 글', route: 'post' },
        { text: '찜 글', route: 'favorites' },
        { text: '문의하기', route: 'contact' },
        { text: '내 채팅목록', route: 'chatList' },
        ...(isAdmin ? [{ text: '문의 목록', route: 'inquiries' }] : []),
        ...(isOfficialUser || isAdmin ? [{ text: '입양글 목록', route: 'adoptionPosts' }] : []),
        { text: '관계자 등록', route: 'officialRegistration' },
    ];

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-100">
                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.route} className="mb-2">
                                <NavLink
                                    to={item.route}
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                                    }
                                >
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="w-3/4 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default MyPage;