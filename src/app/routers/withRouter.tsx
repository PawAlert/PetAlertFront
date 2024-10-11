import {createBrowserRouter} from "react-router-dom";
import Index from "../index.tsx";
import Home from "../../features/myPage/ui/Home.tsx";
import Profile from "../../features/myPage/ui/profile.tsx";
import MyPage from "../../pages/myPage/myPage.tsx";
import Post from "../../features/myPage/ui/post.tsx";
import Favorites from "../../features/myPage/ui/favorites.tsx";
import Contact from "../../features/myPage/ui/contact.tsx";
import ChatList from "../../features/myPage/ui/chatList.tsx";
import {LoginForm} from "../../features/auth/ui/LoginForm.tsx";


const withRouter = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
        children: [
            // 메인 라우터
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <LoginForm/>
            },
            // 마이페이지의 사이드바 라우터
            {
                path: "myPage",
                element: <MyPage/>,
                children: [
                    {path: "profile", element: <Profile/>},
                    {path: "post", element: <Post/>},
                    {path: "favorites", element: <Favorites/>},
                    {path: "contact", element: <Contact/>},
                    {path: "chatList", element: <ChatList/>},
                ]
            },
        ]
    }
]);

export default withRouter;