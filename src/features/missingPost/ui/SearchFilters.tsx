import React from 'react';
import { useMissingPostStore } from '../model/store';

const SearchFilters: React.FC = () => {
    const { params, setParams } = useMissingPostStore();

    // 상태값을 한국어로 변환하는 함수
    const getStatusLabel = (status: string) => {
        switch(status) {
            case 'MISSING': return '실종중';
            case 'FOUND': return '발견';
            case 'TEMPORARY_CARE': return '임시보호';
            case 'CLOSED': return '종료';
            default: return '전체';
        }
    };

    return (
        <div className="flex space-x-4 mb-4">
            <select
                className="border border-gray-300 rounded px-2 py-1"
                value={params.sortDirection}
                onChange={(e) => setParams({sortDirection: e.target.value as 'ASC' | 'DESC', page: 0})}
            >
                <option value="DESC">실종일 가까운 순서</option>
                <option value="ASC">오래된 순</option>
            </select>
            <select
                className="border border-gray-300 rounded px-2 py-1"
                value={params.statusFilter}
                onChange={(e) => setParams({ statusFilter: e.target.value as 'MISSING' | 'FOUND' | 'TEMPORARY_CARE' | 'CLOSED' | '', page: 0 })}
            >
                <option value="">{getStatusLabel('')}</option>
                <option value="MISSING">{getStatusLabel('MISSING')}</option>
                <option value="FOUND">{getStatusLabel('FOUND')}</option>
                <option value="TEMPORARY_CARE">{getStatusLabel('TEMPORARY_CARE')}</option>
                <option value="CLOSED">{getStatusLabel('CLOSED')}</option>
            </select>
        </div>
    );
};

export default SearchFilters;