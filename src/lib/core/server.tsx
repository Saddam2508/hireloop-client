const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async <T = unknown,>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401, 404, 403
  return res.json() as Promise<T>;
};

export const serverMutation = async <T = unknown,>(
  path: string,
  data: unknown,
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // handle 401, 404, 403
  return res.json() as Promise<T>;
};
