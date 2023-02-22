
const SameLineTolerance = 25;
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

export function isInTheSamePhrase(point1: Point, point2: Point): boolean {
  const isOnTheSameLine = Math.abs(point1.y - point2.y) < SamePhraseTolerance;
  return isOnTheSameLine;
}

export function isOnTheSameLinecoordsList(coordsList1: Point[], coordsList2: Point[]): boolean {
  const tolerance = SameLineTolerance;
  for (let i = 0; i < coordsList1.length; i++) {
    for (let j = 0; j < coordsList2.length; j++) {
      const coords1 = coordsList1[i];
      const coords2 = coordsList2[j];
      if (
        Math.abs(coords1.x - coords2.x) <= SameLineTolerance
      ) {
        return true;
      }
    }
  }
  return false;
}