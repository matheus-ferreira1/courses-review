const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useSignOutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer logout");
  }
};
