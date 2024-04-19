import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useAuthStore } from "./stores/auth-store";

import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  // const { checkAccessToken } = useAuthStore((state) => state);

  // useEffect(() => {
  //   checkAccessToken();
  // }, [checkAccessToken]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
