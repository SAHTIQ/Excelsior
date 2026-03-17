export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();
  return {
    success: Boolean(payload?.success),
    data: payload?.data ?? [],
  };
}
