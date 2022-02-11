export function getUrl(url?: string) {
  return new URL(url ? url : "/", process.env.NEXTAUTH_URL);
}
