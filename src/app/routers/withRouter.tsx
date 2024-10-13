import {createBrowserRouter} from "react-router-dom";
import Index from "../index.tsx";
import Home from "../../features/myPage/ui/Home.tsx";
import Profile from "../../features/myPage/ui/profile.tsx";
import MyPage from "../../pages/myPage/myPage.tsx";
import Post from "../../features/myPage/ui/post.tsx";
import Favorites from "../../features/myPage/ui/favorites.tsx";
import Contact from "../../features/myPage/ui/contact.tsx";
import ChatList from "../../features/myPage/ui/chatList.tsx";
import {SignupForm} from "../../features/auth/signup/ui/SignupForm.tsx";
import LoginPage from "../../pages/login/login.tsx";
import ExamplePage from "../../shared/components/example/ExamplePage.tsx";
import ExampleImageUpload from "../../shared/components/example/exampleImageUploader.tsx";
import AddressSearchExample from "../../shared/components/example/examplePostCodeSearch.tsx";
import MissingReportFormPage from "../../pages/missingPost/MissingReportPage.tsx";
import MissingPostListPage from "../../pages/missingPost/missingPostPage.tsx";


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
                element: <LoginPage/>
            },
            {
                path: "signup",
                element: <SignupForm/>
            },
            {
                path: "missingPostList",
                element: <MissingPostListPage/>
            },
            {
                path: "missingForm",
                element: <MissingReportFormPage/>
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
            {
                path: "example",
                element: <ExamplePage/>,
                children: [
                    {path: "imageUploader", element: <ExampleImageUpload/>},
                    {path: "postCodeSearch", element: <AddressSearchExample/>},
                ]
            }
        ]
    }
]);

export default withRouter;