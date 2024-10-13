import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const ExamplePage: React.FC = () => {
    // 경로 지정
    const menuItems = [
        { text: '이미지 업로드 예제', route: 'imageUploader' },
        { text: '우편번호 예제', route: 'postCodeSearch' },
        // { text: '찜 글', route: 'favorites' },
        // { text: '문의하기', route: 'contact' },
        // { text: '내 채팅목록', route: 'chatList' },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-gray-100">
                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.route} className="mb-2">
                                <NavLink
                                    to={item.route} // 상대 경로로 설정
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

export default ExamplePage;
