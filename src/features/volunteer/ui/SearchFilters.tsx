import React from 'react';
import Select, {SingleValue, StylesConfig} from 'react-select';
import {useVolunteerSearchStore} from '../model/store.ts';
import {ActivityType} from '../model/types.ts';
import {area} from "../../../shared/ares.ts";
import {VolunteerSearchFiltersType} from "../index.ts";

interface SearchFiltersProps {
    onFilterChange: (newFilters: Partial<VolunteerSearchFiltersType>) => void;
}

type SelectOption = { value: string; label: string };

const customStyles: StylesConfig<SelectOption, false> = {
    control: (provided) => ({
        ...provided,
        borderRadius: '4px',
        border: '1px solid #e2e8f0',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #cbd5e0',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#a0aec0',
    }),
};

export const SearchFilters: React.FC<SearchFiltersProps> = ({onFilterChange}) => {
    const {filters, setFilters} = useVolunteerSearchStore();

    const handleActivityTypeChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            const newFilters = {
                ...filters,
                activityType: selectedOption.value as keyof typeof ActivityType | '전체'
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const handleProvinceChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            const newFilters = {
                ...filters,
                province: selectedOption.value,
                city: '전체'
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const handleCityChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            const newFilters = {
                ...filters,
                city: selectedOption.value
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const handleSortChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            const newFilters = {
                ...filters,
                sortByClosest: selectedOption.value === 'closest'
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const activityTypeOptions: SelectOption[] = [
        {value: '전체', label: '활동 선택'},
        ...Object.entries(ActivityType).map(([key, value]) => ({value: key, label: value}))
    ];

    const provinceOptions: SelectOption[] = [
        {value: '전체', label: '시/도 선택'},
        ...area.map(province => ({value: province.name, label: province.name}))
    ];

    const cityOptions: SelectOption[] = filters.province === '전체'
        ? [{value: '전체', label: '시/군/구 선택'}]
        : [
            {value: '전체', label: '시/군/구 선택'},
            ...(area.find(province => province.name === filters.province)?.subArea.map(city => ({
                value: city,
                label: city
            })) || [])
        ];

    const sortOptions: SelectOption[] = [
        {value: 'latest', label: '날짜 가까운순'},
        {value: 'closest', label: '날짜 먼순'},
    ];

    return (
        <div className="flex flex-wrap gap-4 mb-4">

            <Select<SelectOption>
                options={provinceOptions}
                onChange={handleProvinceChange}
                value={provinceOptions.find(option => option.value === filters.province)}
                placeholder="시/도 선택"
                styles={customStyles}
                className="w-48"
            />
            <Select<SelectOption>
                options={cityOptions}
                onChange={handleCityChange}
                value={cityOptions.find(option => option.value === filters.city)}
                placeholder="시/군/구 선택"
                isDisabled={filters.province === '전체'}
                styles={customStyles}
                className="w-48"
            />

            <Select<SelectOption>
                options={activityTypeOptions}
                onChange={handleActivityTypeChange}
                value={activityTypeOptions.find(option => option.value === filters.activityType)}
                placeholder="활동 선택"
                styles={customStyles}
                className="w-48"
            />
            <Select<SelectOption>
                options={sortOptions}
                onChange={handleSortChange}
                value={sortOptions.find(option => option.value === (filters.sortByClosest ? 'closest' : 'latest'))}
                placeholder="날짜 가까운순"
                styles={customStyles}
                className="w-48"
            />
        </div>
    );
};