export function Duration(ms: number) {
  const second = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const leftSecond = second % 60;

  return minutes >= 1
    ? `${minutes}:${leftSecond >= 10 ? leftSecond : "0" + leftSecond}`
    : second;
}
