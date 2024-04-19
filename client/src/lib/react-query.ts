import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { toast } from "@/components/ui/use-toast";

let displayedNetworkFailureError = false;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true;

            toast({
              title: "Erro",
              description:
                "A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.",
              variant: "destructive",
            });
          }

          return false;
        }

        return true;
      },
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          // eslint-disable-next-line no-unsafe-optional-chaining
          if ("message" in error.response?.data) {
            toast({
              title: "Erro",
              description: error.response?.data.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro",
              description: "Erro ao processar operação!",
              variant: "destructive",
            });
          }
        }
      },
    },
  },
});
