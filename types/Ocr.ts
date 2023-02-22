type Point = {
  x: number;
  y: number;
};
type Line = {
  coords: Point;
  text: string;
};

type LineMerged = {
  coordsList: Point[];
  text: string;
};
