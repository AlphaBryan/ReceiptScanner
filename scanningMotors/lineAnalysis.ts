import {
  getSquareCenter,
  isInTheSamePhrase,
  isOnTheSameLine,
} from "./coordinateAnalysis";

export function lineAnalysis(OcrResult: Array<any>): any {
  const lines: Line[] = [];
  let currentLine: Line | null = null;

  // sort the OcrResult by x coordinate
  


  // Iterate through each element in OcrResult
  // for (const element,index of OcrResult) {
  OcrResult.forEach((element, index) => {
    // if (index > 0) {
      // console.log("index: ", index);
      // Get the center point of the bounding box of the current element
      const elementCenter = getSquareCenter(element.boundingPoly.vertices);

      // If currentLine is null or the current element is not on the same line as the previous element
      if (
        currentLine === null ||
        !isOnTheSameLine(elementCenter, currentLine.coords)
      ) {
        // Create a new line object
        currentLine = { coords: elementCenter, text: element.description };
        lines.push(currentLine);
      } else {
        // Concatenate the current element's description to the previous line's text
        currentLine.text += ` ${element.description}`;
        // Calculate the average coordinates of the current line
        currentLine.coords.x = (currentLine.coords.x + elementCenter.x) / 2;
        currentLine.coords.y = (currentLine.coords.y + elementCenter.y) / 2;
      }
    // }
  });
  OcrResult.sort((a, b) => {
    const aCenter = getSquareCenter(a.boundingPoly.vertices);
    const bCenter = getSquareCenter(b.boundingPoly.vertices);
    return aCenter.x - bCenter.x;
  });

  // Group lines by approximate x-coordinate
  const xTolerance = 20; // adjust this value to suit your needs
  const lineGroups: Map<number, Line[]> = new Map();
  for (const line of lines) {
    const groupKey = Math.round(line.coords.x / xTolerance);
    if (!lineGroups.has(groupKey)) {
      lineGroups.set(groupKey, []);
    }
    lineGroups.get(groupKey)!.push(line);
  }

  // Merge lines within each group
  const mergedLines: Line[] = [];
  for (const group of lineGroups.values()) {
    group.sort((a, b) => a.coords.x - b.coords.x);
    let mergedLine: Line = group[0];
    for (let i = 1; i < group.length; i++) {
      const line = group[i];
      if (isOnTheSameLine(line.coords, mergedLine.coords)) {
        mergedLine.text += ` ${line.text}`;
        mergedLine.coords.x = (mergedLine.coords.x + line.coords.x) / 2;
        mergedLine.coords.y = (mergedLine.coords.y + line.coords.y) / 2;
      } else {
        mergedLines.push(mergedLine);
        mergedLine = line;
      }
    }
    mergedLines.push(mergedLine);
  }

  console.log("mergedLines: ", JSON.stringify(mergedLines, null, 4));
  return mergedLines;
}
