const API_URL = import.meta.env.VITE_APP_API_URL;

export const SOCIAL_LOGIN_URLS = {
    GOOGLE: `${API_URL}/oauth2/authorization/google`,
    NAVER: `${API_URL}/oauth2/authorization/naver`,
    KAKAO: `${API_URL}/oauth2/authorization/kakao`,
};