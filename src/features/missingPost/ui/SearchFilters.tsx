import React from 'react';
import { useMissingPostStore } from '../model/store';

const SearchFilters: React.FC = () => {
    const { params, setParams } = useMissingPostStore();

    // 상태값을 한국어로 변환하는 함수
    const getStatusLabel = (status: string) => {
        switch(status) {
            case 'MISSING': return '실종중';
            case 'FOUND': return '구조중';
            default: return '전체';
        }
    };

    return (
        <div className="flex space-x-4 mb-4">
            <select
                className="border border-gray-300 rounded px-2 py-1"
                value={params.sortDirection}
                onChange={(e) => setParams({ sortDirection: e.target.value as 'ASC' | 'DESC', page: 0 })}
            >
                <option value="ASC">오래된 순</option>
                <option value="DESC">최신 순</option>
            </select>
            <select
                className="border border-gray-300 rounded px-2 py-1"
                value={params.statusFilter}
                onChange={(e) => setParams({ statusFilter: e.target.value as 'MISSING' | 'FOUND' | '', page: 0 })}
            >
                <option value="">{getStatusLabel('')}</option>
                <option value="MISSING">{getStatusLabel('MISSING')}</option>
                <option value="FOUND">{getStatusLabel('FOUND')}</option>
            </select>
        </div>
    );
};

export default SearchFilters;