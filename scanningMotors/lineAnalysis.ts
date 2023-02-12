import { getSquareCenter, isOnTheSameLine } from "./coordinateAnalysis";

export function lineAnalysis(OcrResult: Array<any>): any {
  const lines: any = {};

  // for each eleement in OcrResult an array that looks like ocrResultExample from GoogleOcrResult.ts check if elements are in the same line and if yes add it the variable lines with the line number as key
  OcrResult.forEach((element, index) => {
    console.log("index: ", index);
    if (index > 0) {
      const elementCenter = getSquareCenter(element.boundingPoly.vertices);
      console.log("Point: ", elementCenter);
      const previousElementCenter = getSquareCenter(
        OcrResult[index - 1].boundingPoly.vertices
      );

      if (isOnTheSameLine(elementCenter, previousElementCenter)) {
        var count = Object.keys(lines).length;
        console.log(count);
        lines[count - 1] = lines[count - 1] + " " + element.description;
      } else {
        var count = Object.keys(lines).length;
        console.log(count);
        lines[count] = element.description;
      }
      console.log("lines: ", JSON.stringify(lines, null, 4));
    }
  });

  return lines;
}
