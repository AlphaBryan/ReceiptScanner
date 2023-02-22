import {
  getSquareCenter,
  isInTheSamePhrase,
  isOnTheSameLinecoordsList,
} from "./coordinateAnalysis";

export function lineAnalysis(OcrResult: Array<any>): any {
  const lines: LineMerged[] = [];
  OcrResult.forEach((element, index) => {
    if (index > 0) {
      const elementCenter = getSquareCenter(element.boundingPoly.vertices);
      const previousElementCenter = getSquareCenter(
        OcrResult[index - 1].boundingPoly.vertices
      );
      if (isOnTheSameLinecoordsList([elementCenter], [previousElementCenter])) {
        const lastLine = lines[lines.length - 1];
        lastLine.text = `${lastLine.text} ${element.description}`;
        lastLine.coordsList.push(elementCenter);
      } else {
        lines.push({
          coordsList: [elementCenter],
          text: element.description,
        });
      }
    } else {
      lines.push({
        coordsList: [getSquareCenter(element.boundingPoly.vertices)],
        text: element.description,
      });
    }
  });

  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        if (
          isOnTheSameLinecoordsList(lines[i].coordsList, lines[j].coordsList)
        ) {
          lines[i].coordsList.push(...lines[j].coordsList);
          lines[i].text = `${lines[i].text} ${lines[j].text}`;
          lines.splice(j, 1);
          hasChanged = true;
          break;
        }
      }
      if (hasChanged) {
        break;
      }
    }
  }

  // Ordonner les lignes par ordre croissant de coordonnées x
  lines.sort((a, b) => {
    const aX =
      a.coordsList.reduce((acc, curr) => acc + curr.x, 0) / a.coordsList.length;
    const bX =
      b.coordsList.reduce((acc, curr) => acc + curr.x, 0) / b.coordsList.length;
    return aX - bX;
  });

  console.log("linesArray: ", JSON.stringify(lines, null, 4));
  // console.log("linesArray: ", lines);
  return lines;
}