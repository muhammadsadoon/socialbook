export function calculateTimeDuration(creationTimeMs:number) {
  const timeDifferenceMs = Date.now() - creationTimeMs;
  const secondsElapsed = Math.floor(timeDifferenceMs / 1000);

  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const MONTH = DAY * 30; // Approximation for simple display
  const YEAR = DAY * 365; // Approximation for simple display

  if (secondsElapsed < MINUTE) {
    return `${secondsElapsed}s ago`;
  } else if (secondsElapsed < HOUR) {
    const minutes = Math.floor(secondsElapsed / MINUTE);
    return `${minutes}m ago`;
  } else if (secondsElapsed < DAY) {
    const hours = Math.floor(secondsElapsed / HOUR);
    return `${hours}h ago`;
  } else if (secondsElapsed < MONTH) {
    const days = Math.floor(secondsElapsed / DAY);
    return `${days}d ago`;
  } else if (secondsElapsed < YEAR) {
    const months = Math.floor(secondsElapsed / MONTH);
    return `${months}mo ago`;
  } else {
    const years = Math.floor(secondsElapsed / YEAR);
    return `${years}y ago`;
  }
}