import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const AdoptionDropdown: React.FC = () => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="text-lg font-semibold text-primary hover:text-red-600 transition-colors">
                입양
            </Menu.Button>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            <Link
                                to="/adoption"
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-red-500 hover:text-white"
                            >
                                입양 공고
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link
                                to="/adoption/guide"
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-red-500 hover:text-white"
                            >
                                입양 방법
                            </Link>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default AdoptionDropdown;