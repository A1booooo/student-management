import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import ScoreList from "./features/Score/ScoreList";
import StudentList from "./features/Student/StudentList";
import StudentEdit from "./features/Student/StudentEdit";
import ScoreEdit from "./features/Score/ScoreEdit";
import Home from "./pages/home";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import Info from "./user/Info";
import StudentCreate from "./features/Student/StudentCreate";
import ScoreUpload from "./features/Score/ScoreUpload";
import NotFound from "./ui/NotFound"; // 导入404页面组件

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Navigate to="/home/score" />} />
            <Route path="home" element={<Home />}>
              <Route path="score">
                <Route path="" element={<ScoreList />} />
                <Route path=":id" element={<ScoreEdit />} />
                <Route path="upload" element={<ScoreUpload />} />
              </Route>
              <Route path="student">
                <Route path="" element={<StudentList />} />
                <Route path=":id" element={<StudentEdit />} />
                <Route path="create" element={<StudentCreate />} />
              </Route>
              <Route path="info" element={<Info />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* 404路由 - 匹配当前布局下的所有未定义路径 */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* 根级404路由 - 匹配所有其他未定义的路径 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
