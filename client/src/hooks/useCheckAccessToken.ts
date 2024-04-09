import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useAuthStore } from "@/stores/auth-store";
import { useToast } from "@/components/ui/use-toast";

const useCheckAccessToken = () => {
  const [cookies, removeCookie] = useCookies(["auth-token"]);
  const { logout } = useAuthStore((state) => state);
  const { toast } = useToast();

  useEffect(() => {
    const accessToken = cookies["auth-token"];

    if (!accessToken) {
      logout();
      removeCookie("auth-token");
      toast({
        title:
          "Sua sessão expirou. Faça login novamente para publicar avaliações.",
      });
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        toast({
          title: "Bem vindo de volta!",
        });
      } else {
        logout();
        removeCookie("auth-token");
        toast({
          title:
            "Sua sessão expirou. Faça login novamente para publicar avaliações.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return null;
};
