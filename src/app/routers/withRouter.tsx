import {createBrowserRouter} from "react-router-dom";
import Index from "../index.tsx";
import Home from "../../pages/main/MainPage.tsx";
import Profile from "../../features/myPage/ui/profile.tsx";
import MyPage from "../../pages/myPage/myPage.tsx";
import Post from "../../features/myPage/ui/post.tsx";
import Favorites from "../../features/myPage/ui/favorites.tsx";
import Contact from "../../features/myPage/ui/contact.tsx";
import ChatList from "../../features/myPage/ui/chatList.tsx";
import {SignupForm} from "../../features/auth/signup/ui/SignupForm.tsx";
import LoginPage from "../../pages/login/login.tsx";
import MissingReportFormPage from "../../pages/missingPost/MissingReportPage.tsx";
import MissingPostListPage from "../../pages/missingPost/missingPostPage.tsx";
import MissingPostDetail from "../../features/missingPost/ui/MissingPostDetail.tsx";
import {ChatRoom} from "../../features/chat/ui/chatRoom.tsx";
import AdoptionPage from "../../pages/Adoption/AdoptionPage.tsx";
import AdoptionGuidePage from "../../pages/Adoption/ AdoptionGuidePage.tsx";
import AnnouncementDetailView from "../../features/adoption/ui/AnnouncementDetailView.tsx";
import MyInquiriesList from "../../features/myPage/ui/MyInquiriesList.tsx";
import InquiryDetailView from "../../features/myPage/ui/InquiryDetailView.tsx";
import AdoptionPostsList from "../../features/adoption/ui/AdoptionPostsList.tsx";
import CreateAnnouncementPage from "../../pages/Adoption/CreateAnnouncementPage.tsx";
import OfficialRegistrationPage from "../../pages/OfficialRegistration/ OfficialRegistrationPage.tsx";
import VolunteerSearchPage from "../../pages/VolunteerSearchPage/VolunteerSearchPage.tsx";
import {VolunteerDetailPage} from "../../pages/VolunteerSearchPage/VolunteerDetailPage.tsx";
import VolunteerReviewsPage from "../../pages/VolunteerSearchPage/VolunteerReviewsPage.tsx";
import CreateNoticePage from "../../pages/notice/CreateNoticePage.tsx";



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
                path: "missing-post/:id",
                element: <MissingPostDetail/>
            },
            {
                path: "missingForm",
                element: <MissingReportFormPage/>
            },
            {
                path: "adoption",
                children: [
                    {path: "", element: <AdoptionPage/>},
                    {path: "guide", element: <AdoptionGuidePage/>},
                    {path: ":id", element: <AnnouncementDetailView/>},
                    {path: "create", element: <CreateAnnouncementPage/>}
                ]
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
                    {path: "inquiries", element: <MyInquiriesList/>},
                    {path: "inquiries/:id", element: <InquiryDetailView/>},
                    {path: "adoptionPosts", element: <AdoptionPostsList/>},
                    {path: "officialRegistration", element: <OfficialRegistrationPage/>},
                    {path: "noticeAdmin", element: <CreateNoticePage/>},
                ]
            },
            {
                path: "volunteer",
                children: [
                    { path: "", element: <VolunteerSearchPage /> },
                    { path: ":id", element: <VolunteerDetailPage /> },
                    { path: "reviews", element: <VolunteerReviewsPage /> },
                ]
            },
            //채팅 라우터
            {
                path: "chat",
                children: [
                    {path: "", element: <ChatList/>},
                    {path: ":chatRoomId", element: <ChatRoom/>}
                ]
            },
        ]
    }
]);

export default withRouter;