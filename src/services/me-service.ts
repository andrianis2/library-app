import {
  UserProfile,
  Loan,
  UserReview,
} from "@/types/me";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(
  endpoint: string,
  token: string
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum diatur");
  }

  if (!token) {
    throw new Error("Token autentikasi tidak ditemukan");
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  console.log("API:", endpoint);
  console.log("HTTP STATUS:", response.status);
  console.log("API RESPONSE:", result);

  if (!response.ok) {
    throw new Error(
      result?.message ||
      result?.error ||
      `HTTP Error ${response.status}`
    );
  }

  return result as T;
}

export async function getMyProfile(token: string) {
  return request<UserProfile>("/me", token);
}

export async function getMyLoans(
  token: string,
  page = 1,
  limit = 20
) {
  return request<Loan[]>(
    `/me/loans?page=${page}&limit=${limit}`,
    token
  );
}

export async function getMyReviews(
  token: string,
  page = 1,
  limit = 20
) {
  return request<UserReview[]>(
    `/me/reviews?page=${page}&limit=${limit}`,
    token
  );
}