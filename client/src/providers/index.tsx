import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <BrowserRouter>
          {children}
          <Toaster />
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  );
}
