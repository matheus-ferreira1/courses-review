import { useCookies } from "react-cookie";

import { NewEducatorFormTypes } from "@/pages/new-educator";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useCreateEducator = async (formData: NewEducatorFormTypes) => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const authToken = cookies;
  console.log(`Bearer ${cookies}`);
  console.log(cookies);

  const response = await fetch(`${API_BASE_URL}/educators`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
