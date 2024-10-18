import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/Login/customHook/useAuth';

type MenuItem = {
    text: string;
    route: string;
    subItems?: MenuItem[];
};

const MyPage: React.FC = () => {
    const { userInfo } = useAuth();

    const getMenuItems = (): MenuItem[] => {
        const commonItems: MenuItem[] = [
            { text: '프로필', route: 'profile' },
            { text: '내 채팅목록', route: 'chatList' },
        ];

        switch (userInfo?.userRoles) {
            case 'ROLE_ADMIN':
                return [
                    ...commonItems,
                    { text: '공지사항', route: 'notices' },
                    {
                        text: '문의 목록',
                        route: 'inquiries',
                        subItems: [
                            { text: '처리 완료', route: 'inquiries/completed' },
                            { text: '처리 중', route: 'inquiries/inProgress' },
                        ]
                    },
                    {
                        text: '대시보드',
                        route: 'dashboard',
                        subItems: [
                            { text: '오늘의 게시글', route: 'dashboard/todayPosts' },
                            { text: '오늘의 활동', route: 'dashboard/todayActivities' },
                        ]
                    },
                ];
            case 'ROLE_OFFICIAL_USER':
                return [
                    ...commonItems,
                    {
                        text: '내가 작성한 글',
                        route: 'myPosts',
                        subItems: [
                            { text: '입양', route: 'myPosts/adoption' },
                            { text: '봉사활동', route: 'myPosts/volunteer' },
                            { text: '기타', route: 'myPosts/other' },
                        ]
                    },
                    { text: '문의하기', route: 'contact' },
                    { text: '관계자 정보수정', route: 'officialInfo' },
                ];
            case 'ROLE_USER':
            default:
                return [
                    ...commonItems,
                    { text: '내가 작성한 글', route: 'post' },
                    { text: '문의하기', route: 'contact' },
                    { text: '관계자 등록하기', route: 'officialRegistration' },
                ];
        }
    };

    const menuItems = getMenuItems();

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-100">
                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.route} className="mb-2">
                                {item.subItems ? (
                                    <div>
                                        <span className="font-bold text-gray-600">{item.text}</span>
                                        <ul className="pl-4 mt-2">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.route} className="mb-1">
                                                    <NavLink
                                                        to={subItem.route}
                                                        className={({ isActive }) =>
                                                            isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"
                                                        }
                                                    >
                                                        {subItem.text}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <NavLink
                                        to={item.route}
                                        className={({ isActive }) =>
                                            isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"
                                        }
                                    >
                                        {item.text}
                                    </NavLink>
                                )}
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