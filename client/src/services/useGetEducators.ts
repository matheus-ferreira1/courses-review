const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getEducators = async () => {
  const response = await fetch(`${API_BASE_URL}/educators`);

  if (!response.ok) {
    throw new Error("Erro ao buscar educadores");
  }

  return response.json();
};
