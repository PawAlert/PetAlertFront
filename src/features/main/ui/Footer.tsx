import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <Link to="/" className="text-2xl font-bold text-gray-800">PawAlert</Link>
                        <p className="mt-2">함께 만드는 행복한 반려 생활</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
                        <ul>
                            <li><Link to="/about" className="hover:text-gray-800">소개</Link></li>
                            <li><Link to="/adoption" className="hover:text-gray-800">입양</Link></li>
                            <li><Link to="/volunteer" className="hover:text-gray-800">봉사활동</Link></li>
                            <li><Link to="/contact" className="hover:text-gray-800">문의하기</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">연락처</h3>
                        <p>서울특별시 강남구 테헤란로 123</p>
                        <p>이메일: info@PawAlert.com</p>
                        <p>전화: 02-1234-5678</p>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">팔로우하기</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
                    © {new Date().getFullYear()} PawAlert. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;