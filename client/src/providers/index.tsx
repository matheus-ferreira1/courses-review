import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { Toaster } from "@/components/ui/toaster";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <BrowserRouter>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            {children}
          </CookiesProvider>
          <Toaster />
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  );
}
