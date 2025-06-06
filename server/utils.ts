export function parseURL(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.origin + parsed.pathname;
  } catch (error) {
    console.error("Invalid URL:", error);
    throw new Error("Failed to parse URL");
  }
}

export async function refreshUrls(urls: string[], token: string) {
  const parsedUrls = urls.map((url) => parseURL(url));

  const res = await fetch(
    "https://discord.com/api/v9/attachments/refresh-urls",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        attachment_urls: parsedUrls,
      }),
    }
  );

  if (!res.ok) throw new Error(`Failed to refresh URLs: ${res.status}`);
  return await res.json();
}
