export function incrementDateBySeconds(seconds: number) {
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + seconds);

  return expiresAt;
}
