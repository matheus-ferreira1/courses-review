import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { AppContextProvider } from "@/contexts/app-context";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <AppContextProvider>
          {children}
          <Toaster />
        </AppContextProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
