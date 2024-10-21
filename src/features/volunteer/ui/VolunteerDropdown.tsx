import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface VolunteerDropdownProps {
    isMobile: boolean;
}

const VolunteerDropdown: React.FC<VolunteerDropdownProps> = ({ isMobile }) => {
    const location = useLocation();
    const isMainPage = location.pathname === '/';

    const menuItems = [
        { to: "/volunteer", text: "봉사활동" },
        { to: "/volunteer/reviews", text: "활동후기" },
    ];

    if (isMobile) {
        return (
            <div className="py-2">
                <span className="block text-[18px] font-medium mb-2">봉사활동</span>
                {menuItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="block py-2 pl-4 text-[16px] text-gray-600 hover:text-gray-900"
                    >
                        {item.text}
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={`inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-[18px] font-medium ${isMainPage ? 'text-white' : 'text-black'} hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    봉사활동
                    <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        {menuItems.map((item) => (
                            <Menu.Item key={item.to}>
                                {({ active }) => (
                                    <Link
                                        to={item.to}
                                        className={`${
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-[16px]`}
                                    >
                                        {item.text}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default VolunteerDropdown;