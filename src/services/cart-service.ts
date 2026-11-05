import type { CartItem } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getCartApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi");
  }

  return API_URL;
}

function getErrorMessage(result: unknown, fallback: string) {
  if (
    typeof result === "object" &&
    result !== null &&
    "message" in result &&
    typeof result.message === "string"
  ) {
    return result.message;
  }

  return fallback;
}

export async function addCartItem(
  bookId: number,
  token: string
) {
  const response = await fetch(`${getCartApiUrl()}/api/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bookId,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(result, "Gagal menambahkan buku"));
  }

  return result;
}

export async function getCartItems(token: string): Promise<CartItem[]> {
  const response = await fetch(`${getCartApiUrl()}/cart/items`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(result, "Gagal mengambil keranjang"));
  }

  const data =
    typeof result === "object" && result !== null && "data" in result
      ? result.data
      : result;
  const items = Array.isArray(data)
    ? data
    : typeof data === "object" && data !== null && "items" in data
      ? data.items
      : undefined;

  if (!Array.isArray(items)) {
    throw new Error("Format data keranjang tidak sesuai");
  }

  return items as CartItem[];
}

export async function removeCartItem(
  itemId: number,
  token: string
): Promise<void> {
  const response = await fetch(
    `${getCartApiUrl()}/cart/items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const result: unknown = await response.json().catch(() => null);
    throw new Error(getErrorMessage(result, "Gagal menghapus buku dari keranjang"));
  }
}