import { LoginFormTypes } from "@/pages/login";
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

export const signInUser = async (formData: LoginFormTypes) => {
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

export const signOutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer logout");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/users/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token inválido");
  }

  return response.json();
};
