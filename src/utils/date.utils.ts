export function incrementDateBySeconds(seconds: number) {
  const expiresAt = new Date();
  expiresAt.setUTCSeconds(expiresAt.getSeconds() + seconds);

  return expiresAt;
}
