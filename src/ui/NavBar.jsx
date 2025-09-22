import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { logout } from "../services/apiAuth";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isStudentAtom } from "../atoms/user";
import { getStudentByStudentId } from "../services/apistudent";
import ToggleTheme from "./ToggleTheme";

export default function NavBar() {
  const { pathname } = useLocation();
  const Navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom); // 已通过userAtom与存储关联
  const isStudent = useAtomValue(isStudentAtom);
  // 移除原有的localStorage读取逻辑
  useEffect(() => {
    const token = import.meta.env.VITE_SUPABASE_TOKEN;
    const userToken = JSON.parse(localStorage.getItem(token));
    if (!userToken) {
      return;
    }
    setUser(userToken.user.user_metadata);
    if (isStudent) {
      const fetchStudentData = async () => {
        const students = await getStudentByStudentId(user.sub);
        const studentData = students[0];
        setUser(studentData.avatar);
      };
      fetchStudentData();
    }
  }, []);

  const signout = async () => {
    await logout();
    Navigate("/login");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                href="/home/student"
                className={`${
                  pathname === "/home/student" ? "menu-active" : ""
                }`}
              >
                Student
              </a>
            </li>
            <li>
              <a
                href="/home/score"
                className={`${pathname === "/home/score" ? "menu-active" : ""}`}
              >
                Score
              </a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" onClick={() => Navigate("/")}>
          Sunshine
        </a>
      </div>
      {!isStudent && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                href="/home/student"
                className={`${
                  pathname === "/home/student" ? "menu-active" : ""
                }`}
              >
                Student
              </a>
            </li>
            <li>
              <a
                href="/home/score"
                className={`${pathname === "/home/score" ? "menu-active" : ""}`}
              >
                Score
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="navbar-end">
        <ToggleTheme />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between" href="/home/info">
                Info
              </a>
            </li>
            <li>
              <a onClick={signout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
