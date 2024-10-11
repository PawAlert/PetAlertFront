import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8081, // 원하는 포트 번호로 변경
    },
})
