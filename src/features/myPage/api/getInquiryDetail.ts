import axios from 'axios';
import { InquiryDetail } from '../model/types';

export const getInquiryDetail = async (id: string | number): Promise<InquiryDetail> => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(numericId)) {
    throw new Error('Invalid inquiry ID');
  }

  const token = localStorage.getItem('token');
  try {
    const response = await axios.get<{ status: string; message: string; data: InquiryDetail }>(
        `${import.meta.env.VITE_APP_API_URL}/api/inquiries/admin/${numericId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch inquiry detail:', error);
    throw error;
  }
};