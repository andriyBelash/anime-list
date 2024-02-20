

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`${process.env.BASE_URL}${input}`, {
    ...init,
    ...{
      headers: {
        'Content-Type': 'application/json',
      }
    }
  });
  const result = await data.json();

  return result as T
}