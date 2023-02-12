
const SameLineTolerance = 30;
const SamePhraseTolerance = 190;

export function getSquareCenter(square: Array<Point>): Point {
  let centerX = 0;
  let centerY = 0;
  for (let i = 0; i < square.length; i++) {
    centerX += square[i].x;
    centerY += square[i].y;
  }
  centerX /= square.length;
  centerY /= square.length;
  const center: Point = {
    x: centerX,
    y: centerY,
  };
  return center;
}

export function isOnTheSameLine(point1: Point, point2: Point): boolean {
  const isOnTheSameLine = Math.abs(point1.x - point2.x) < SameLineTolerance;
  return isOnTheSameLine;
}

export function isInTheSamePhrase(point1: Point, point2: Point): boolean {
  const isOnTheSameLine = Math.abs(point1.y - point2.y) < SamePhraseTolerance;
  return isOnTheSameLine;
}
