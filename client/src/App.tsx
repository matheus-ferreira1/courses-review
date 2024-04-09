import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuthStore } from "./stores/auth-store";
import { useCheckAccessToken } from "./hooks/useCheckAccessToken";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Educators from "./pages/educators";
import EducatorDetail from "./pages/educator-detail";
import NewEducator from "./pages/new-educator";
import Topics from "./pages/topics";
import NewTopic from "./pages/new-topic";
import TopicDetail from "./pages/topic-detail";
import CourseDetail from "./pages/course-detail";
import NewCourse from "./pages/new-course";

export default function App() {
  // const { checkAccessToken } = useAuthStore((state) => state);

  // useEffect(() => {
  //   checkAccessToken();
  // }, [checkAccessToken]);

  useCheckAccessToken();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/educators" element={<Educators />} />
        <Route path="/educators/:educatorId" element={<EducatorDetail />} />
        <Route path="/new-educator" element={<NewEducator />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicDetail />} />
        <Route path="/new-topic" element={<NewTopic />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="/new-course" element={<NewCourse />} />
      </Routes>
    </>
  );
}
