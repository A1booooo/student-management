import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import isAuthenticated from "../hooks/useAuth";

export default function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 未认证且不在登录页时重定向
  useEffect(() => {
    async function isLogin() {
      const isAuth = await isAuthenticated();
      if (
        !isAuth &&
        !pathname.includes("/login") &&
        !pathname.includes("/signup")
      ) {
        navigate("/login");
      }
    }
    isLogin();
  }, [pathname, navigate]);

  return <Outlet />;
}
