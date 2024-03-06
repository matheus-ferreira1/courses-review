import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
