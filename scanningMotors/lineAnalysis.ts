import {
  getSquareCenter,
  isInTheSamePhrase,
  isOnTheSameLine,
} from "./coordinateAnalysis";

export function lineAnalysis(OcrResult: Array<any>): any {
  const lines: { [key: string]: Line } = {};
  OcrResult.forEach((element, index) => {
    if (index > 0) {
      const elementCenter = getSquareCenter(element.boundingPoly.vertices);
      const previousElementCenter = getSquareCenter(
        OcrResult[index - 1].boundingPoly.vertices
      );
      if (isOnTheSameLine(elementCenter, previousElementCenter)) {
        var count = Object.keys(lines).length;
        lines[count - 1].text =
          lines[count - 1].text + " " + element.description;
        // faire la moyenne des coordonnées x et y
        lines[count - 1].coords.x =
          (lines[count - 1].coords.x + elementCenter.x) / 2;
        lines[count - 1].coords.y =
          (lines[count - 1].coords.y + elementCenter.y) / 2;
      } else {
        var count = Object.keys(lines).length;
        const line: Line = {
          coords: elementCenter,
          text: element.description,
        };
        lines[count] = line;
      }
    }
  });
  Object.entries(lines).forEach(([key, value]) => {
    Object.entries(lines).forEach(([key2, value2]) => {
      if (key !== key2) {
        if (isOnTheSameLine(value.coords, value2.coords)) {
          if (lines[key]) {
            lines[key].coords.x =
              (lines[key].coords.x + lines[key2].coords.x) / 2;
            lines[key].coords.y =
              (lines[key].coords.y + lines[key2].coords.y) / 2;
            lines[key].text = lines[key]?.text + " " + lines[key2]?.text;
            delete lines[key2];
          }
        }
      }
    });
  });

  // Ordonner les lignes par ordre croissant de coordonnées x
  const linesArray = Object.values(lines);
  linesArray.sort((a, b) => a.coords.x - b.coords.x);
  console.log("linesArray: ", JSON.stringify(linesArray, null, 4));
  return linesArray;
}
