import React from 'react';
import Select, { SingleValue } from 'react-select';
import { useVolunteerSearchStore } from '../model/store';
import { ActivityType } from '../model/types';
import {area} from "../../../shared/ares.ts";


interface SearchFiltersProps {
    onFilterChange: () => void;
}

type SelectOption = { value: string; label: string };

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
    const { filters, setFilters } = useVolunteerSearchStore();

    const handleActivityTypeChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ activityType: selectedOption.value as keyof typeof ActivityType | '전체' });
            onFilterChange();
        }
    };

    const handleProvinceChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ province: selectedOption.value, city: '전체' });
            onFilterChange();
        }
    };

    const handleCityChange = (selectedOption: SingleValue<SelectOption>) => {
        if (selectedOption) {
            setFilters({ city: selectedOption.value });
            onFilterChange();
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ sortByClosest: e.target.checked });
        onFilterChange();
    };

    const activityTypeOptions: SelectOption[] = [
        { value: '전체', label: '전체' },
        ...Object.entries(ActivityType).map(([key, value]) => ({ value: key, label: value }))
    ];

    const provinceOptions: SelectOption[] = [
        { value: '전체', label: '전체' },
        ...area.map(province => ({ value: province.name, label: province.name }))
    ];

    const cityOptions: SelectOption[] = filters.province === '전체'
        ? [{ value: '전체', label: '전체' }]
        : [
            { value: '전체', label: '전체' },
            ...(area.find(province => province.name === filters.province)?.subArea.map(city => ({
                value: city,
                label: city
            })) || [])
        ];

    return (
        <div className="mb-4 space-y-4">
            <Select<SelectOption>
                options={activityTypeOptions}
                onChange={handleActivityTypeChange}
                value={activityTypeOptions.find(option => option.value === filters.activityType)}
                placeholder="Select Activity Type"
                className="w-full"
            />
            <Select<SelectOption>
                options={provinceOptions}
                onChange={handleProvinceChange}
                value={provinceOptions.find(option => option.value === filters.province)}
                placeholder="Select Province"
                className="w-full"
            />
            <Select<SelectOption>
                options={cityOptions}
                onChange={handleCityChange}
                value={cityOptions.find(option => option.value === filters.city)}
                placeholder="Select City"
                isDisabled={filters.province === '전체'}
                className="w-full"
            />
            <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    checked={filters.sortByClosest}
                    onChange={handleSortChange}
                    className="mr-2"
                />
                Sort by Closest Date
            </label>
        </div>
    );
};