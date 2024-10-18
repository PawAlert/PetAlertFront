import React, { useState } from 'react';
import {AddressData} from "../model/AddressData.tsx";
import {PostCodeSearch} from "../PostCodeSearch.tsx";


const AddressSearchExample: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

    const handleAddressSelect = (addressData: AddressData) => {
        setSelectedAddress(addressData);
        console.log("Selected Address:", addressData);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">주소 검색 예시</h1>

            <PostCodeSearch onAddressSelect={handleAddressSelect} />

            {selectedAddress && (
                <div className="mt-4 p-4 border rounded-md">
                    <h2 className="text-xl font-semibold mb-2">선택된 주소 정보</h2>
                    <p><strong>우편번호:</strong> {selectedAddress.postcode}</p>
                    {/*<p><strong>주소:</strong> {selectedAddress.address}</p>*/}
                    <p><strong>상세주소:</strong> {selectedAddress.addressDetail}</p>
                    <p><strong>위도:</strong> {selectedAddress.latitude}</p>
                    <p><strong>경도:</strong> {selectedAddress.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default AddressSearchExample;