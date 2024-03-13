import { LoginFormTypes } from "@/pages/login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useSignInUser = async (formData: LoginFormTypes) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
