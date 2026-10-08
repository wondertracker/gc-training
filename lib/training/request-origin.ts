// Next.js can reconstruct request.url with an internal hostname. Compare the
// browser origin with the incoming Host and proxy protocol instead.
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  const protocol = (request.headers.get("x-forwarded-proto") || url.protocol.slice(0, -1))
    .split(",")[0].trim();
  return origin === `${protocol}://${host}`;
}
