import { RegisterFormTypes } from "@/pages/register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerUser = async (formData: RegisterFormTypes) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
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
