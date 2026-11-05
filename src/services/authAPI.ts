const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    access_token?: string;
  };
  message?: string;
}

async function request<T>(
  endpoint: string,
  payload: object
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errors = result.errors
      ? Object.values(result.errors).flat().join(" ")
      : "";

    throw new Error(
      errors || result.message || "Permintaan gagal. Silakan coba lagi."
    );
  }

  return result as T;
}

export const registerUser = (payload: RegisterPayload) =>
  request<AuthResponse>("register", payload);

export const loginUser = (payload: LoginPayload) =>
  request<AuthResponse>("login", payload);