import { getSquareCenter, isOnTheSameLine } from "./coordinateAnalysis";

export function lineAnalysis(OcrResult: Array<any>): any {
  const lines: { [key: string]: Line } = {};

  // for each eleement in OcrResult an array that looks like ocrResultExample from GoogleOcrResult.ts check if elements are in the same line and if yes add it the variable lines with the line number as key
  OcrResult.forEach((element, index) => {
    if (index > 0) {
      const elementCenter = getSquareCenter(element.boundingPoly.vertices);
      // console.log("Point: ", elementCenter);
      const previousElementCenter = getSquareCenter(
        OcrResult[index - 1].boundingPoly.vertices
      );

      if (isOnTheSameLine(elementCenter, previousElementCenter)) {
        var count = Object.keys(lines).length;
        lines[count - 1].text =
          lines[count - 1].text + " " + element.description;
      } else {
        var count = Object.keys(lines).length;
        const line: Line = {
          coords: elementCenter,
          text: element.description,
        };
        lines[count] = line;
      }
      // console.log("lines: ", JSON.stringify(lines, null, 4));
    }
  });
  Object.entries(lines).forEach(([key, value]) => {
    // recheck lines object and if there are lines that are close to another line in lines object merge them
    Object.entries(lines).forEach(([key2, value2]) => {
      if (key !== key2) {
        if (isOnTheSameLine(value.coords, value2.coords)) {
          if (lines[key]) {
            lines[key].text = lines[key]?.text + "-" + lines[key2]?.text;
            delete lines[key2];
          }
        }
      }
    });
  });
  console.log("Lines: ", JSON.stringify(lines, null, 4));

  return lines;
}
