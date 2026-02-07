export function velocityToPace(velocity: number): number | null {
  if (velocity <= 0) return null;

  const totalSeconds = 1000 / velocity;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds % 60);

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  return minutes + seconds / 100;
}
