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
        // if there is a price in the line, console log and check if there is another line with a close y coordinate
        if (isOnTheSameLinecoordsList(lines[i].coordsList, lines[j].coordsList)) {
          if (lines[i].text.includes("$") && lines[j].text.includes("$")) {
            // console.log("pb: ", lines[i].text + " and " + lines[j].text);
            const averageY1 = lines[i].coordsList.reduce((acc, curr) => acc + curr.y, 0) / lines[i].coordsList.length;
            const averageY2 = lines[j].coordsList.reduce((acc, curr) => acc + curr.y, 0) / lines[j].coordsList.length;
            const deltaY = Math.abs(averageY1 - averageY2);
            if (deltaY < 50) { // change this value based on how close the lines need to be to merge
              lines[i].coordsList.push(...lines[j].coordsList);
              lines[i].text = `${lines[i].text} ${lines[j].text}`;
              lines.splice(j, 1);
              hasChanged = true;
              break;
            }
          } else {
            lines[i].coordsList.push(...lines[j].coordsList);
            lines[i].text = `${lines[i].text} ${lines[j].text}`;
            lines.splice(j, 1);
            hasChanged = true;
            break;
          }
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

  console.log("linesArray: ", JSON.stringify(lines, null, 2));
  // console.log("linesArray: ", lines);
  return lines;

}
