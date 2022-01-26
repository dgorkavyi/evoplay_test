export function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * max) + min;
}

export function doXTimes(x: number, func: Function): void {
  for (let i = 0; i < x; i++) func();
}