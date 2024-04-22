import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import Home from "./pages/home";
import Register from "./pages/register";
import { AuthLayout } from "./pages/_layouts/auth";
import Login from "./pages/login";
import Educators from "./pages/educators";
import EducatorDetail from "./pages/educator-detail";
import NewEducator from "./pages/new-educator";
import Topics from "./pages/topics";
import TopicDetail from "./pages/topic-detail";
import NewTopic from "./pages/new-topic";
import CourseDetail from "./pages/course-detail";
import NewCourse from "./pages/new-course";
import NewReview from "./pages/new-review";
import NotFoundPage from "./pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/educators",
        element: <Educators />,
      },
      {
        path: "/educators/:educatorId",
        element: <EducatorDetail />,
      },
      {
        path: "/new-educator",
        element: <NewEducator />,
      },
      {
        path: "/topics",
        element: <Topics />,
      },
      {
        path: "/topics/:topicId",
        element: <TopicDetail />,
      },
      {
        path: "/new-topic",
        element: <NewTopic />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "/new-course",
        element: <NewCourse />,
      },
      {
        path: "/new-review/:courseId",
        element: <NewReview />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
