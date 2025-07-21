import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ScoreList from "./features/Score/ScoreList";
import StudentList from "./features/Student/studentlist";
import StudentEdit from "./features/Student/StudentEdit";
import ScoreEdit from "./features/Score/ScoreEdit";
import Home from "./pages/Home";
import Login from "./auto/Login/Login";
import Signup from "./auto/Signup/Signup";
import Info from "./user/info";
import StudentCreate from "./features/Student/StudentCreate";
import ScoreUpload from "./features/Score/ScoreUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Navigate to="/home/student" />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
