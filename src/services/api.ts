const BASE_URL = "http://localhost:3000";

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<T>;
}

export async function post<T, U>(endpoint: string, data: U): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create data");
  }

  return response.json() as Promise<T>;
}

export async function patch<T, U>(endpoint: string, data: U): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  return response.json() as Promise<T>;
}

export async function remove(endpoint: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
}
