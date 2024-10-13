import React, { useState, useEffect, useCallback } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { AddressData } from "./model/AddressData.tsx";

// Kakao Maps API 타입 정의
declare global {
    interface Window {
        kakao: {
            maps: {
                load: (callback: () => void) => void;
                services: {
                    Geocoder: new () => {
                        addressSearch: (
                            address: string,
                            callback: (
                                result: Array<{
                                    x: string;
                                    y: string;
                                    address_name: string;
                                    address_type: string;
                                    address: {
                                        address_name: string;
                                        region_1depth_name: string;
                                        region_2depth_name: string;
                                        region_3depth_name: string;
                                        mountain_yn: string;
                                        main_address_no: string;
                                        sub_address_no: string;
                                    };
                                }>,
                                status: string
                            ) => void
                        ) => void;
                    };
                    Status: {
                        OK: string;
                        ZERO_RESULT: string;
                        ERROR: string;
                    };
                };
            };
        };
    }
}

interface Props {
    onAddressSelect: (addressData: AddressData) => void;
}

export const PostCodeSearch: React.FC<Props> = ({ onAddressSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&libraries=services&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                console.log("Kakao Maps API loaded successfully");
                setKakaoMapsLoaded(true);
            });
        };

        script.onerror = (e) => {
            console.error("Failed to load Kakao Maps API", e);
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleComplete = useCallback((data: Address) => {
        const addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        let extraAddr = "";

        if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
                extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            if (extraAddr !== "") {
                extraAddr = `(${extraAddr})`;
            }
        }

        const newAddressData: AddressData = {
            postcode: data.zonecode,
            address: addr,
            addressDetail: extraAddr,
            latitude: 0,
            longitude: 0,
        };

        if (kakaoMapsLoaded && window.kakao && window.kakao.maps) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(addr, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    const { x, y } = result[0];
                    newAddressData.longitude = parseFloat(x);
                    newAddressData.latitude = parseFloat(y);
                    console.log("좌표 변환 성공:", { latitude: y, longitude: x });
                } else {
                    console.error("좌표 변환 실패:", status);
                }
                onAddressSelect(newAddressData);
                setIsOpen(false);
            });
        } else {
            console.error("Kakao Maps API is not fully loaded");
            onAddressSelect(newAddressData);
            setIsOpen(false);
        }
    }, [kakaoMapsLoaded, onAddressSelect]);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                주소 검색
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <DaumPostcode onComplete={handleComplete} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};