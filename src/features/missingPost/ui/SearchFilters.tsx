import React from 'react';
import Select, { SingleValue } from 'react-select';
import { useMissingPostStore } from '../model/store';
import { area } from "../../../shared/ares";

type SelectOption = { value: string; label: string };

const SearchFilters: React.FC = () => {
    const { filters, setFilters } = useMissingPostStore();

    const handleStatusChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ status: selectedOption.value, page: 0 });
        }
    };

    const handleProvinceChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ province: selectedOption.value, city: '', page: 0 });
        }
    };

    const handleCityChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ city: selectedOption.value, page: 0 });
        }
    };

    const handleSortChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ sortByClosest: selectedOption.value === 'latest', page: 0 });
        }
    };

    const statusOptions: SelectOption[] = [
        { value: '', label: '상태 선택' },
        { value: 'MISSING', label: '실종' },
        { value: 'FOUND', label: '발견' },
        { value: 'TEMPORARY_CARE', label: '임시보호' },
        { value: 'CLOSED', label: '종료' }
    ];

    const provinceOptions: SelectOption[] = [
        { value: '', label: '시/도 선택' },
        ...area.map(province => ({ value: province.name, label: province.name }))
    ];

    const cityOptions: SelectOption[] = filters.province
        ? [
            { value: '', label: '시/군/구 선택' },
            ...(area.find(province => province.name === filters.province)?.subArea.map(city => ({
                value: city,
                label: city
            })) || [])
        ]
        : [{ value: '', label: '시/군/구 선택' }];

    const sortOptions: SelectOption[] = [
        { value: 'latest', label: '작성일 최신순' },
        { value: 'oldest', label: '작성일 오래된순' }
    ];

    return (
        <div className="flex flex-wrap gap-4 mb-4">

            <Select<SelectOption>
                options={provinceOptions}
                onChange={handleProvinceChange}
                value={provinceOptions.find(option => option.value === filters.province)}
                placeholder="시/도 선택"
                className="w-48"
            />
            <Select<SelectOption>
                options={cityOptions}
                onChange={handleCityChange}
                value={cityOptions.find(option => option.value === filters.city)}
                placeholder="시/군/구 선택"
                isDisabled={!filters.province}
                className="w-48"
            />
            <Select<SelectOption>
                options={statusOptions}
                onChange={handleStatusChange}
                value={statusOptions.find(option => option.value === filters.status)}
                placeholder="상태 선택"
                className="w-48"
            />
            <Select<SelectOption>
                options={sortOptions}
                onChange={handleSortChange}
                value={sortOptions.find(option => option.value === (filters.sortByClosest ? 'latest' : 'oldest'))}
                placeholder="정렬 선택"
                className="w-48"
            />
        </div>
    );
};

export default SearchFilters;