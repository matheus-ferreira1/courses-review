import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Educators from "./pages/educators";
import EducatorDetail from "./pages/educator-detail";
import NewEducator from "./pages/new-educator";
import Topics from "./pages/topics";
import NewTopic from "./pages/new-topic";
import TopicDetail from "./pages/topic-detail";

export default function App() {
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
      </Routes>
    </>
  );
}
