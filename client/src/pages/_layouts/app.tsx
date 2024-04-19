import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";

import Footer from "@/components/footer";
import Header from "@/components/header";

export function AppLayout() {
  const navigate = useNavigate();
  const { checkAccessToken } = useAuthStore((state) => state);

  useLayoutEffect(() => {
    checkAccessToken();

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            navigate("/register", {
              replace: true,
            });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate, checkAccessToken]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
