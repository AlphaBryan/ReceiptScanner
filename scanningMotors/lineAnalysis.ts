import {
  getSquareCenter,
  isInTheSamePhrase,
  isOnTheSameLinecoordsList,
  sortByCoordsListX,
} from "./coordinateAnalysis";

export function lineAnalysis(inputData) {
  // remove the first element of the array
  inputData.shift();
  const lines = [];

  function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function mergeLines(lines) {
    const mergedLines = [];

    // Sort lines based on x-coordinate of the first coordinate in each line
    lines.sort((a, b) => a.coordsList[0].x - b.coordsList[0].x);
    // lines.sort((a, b) => sortByCoordsListX(a.coordsList, b.coordsList));
    // Merge lines that have the same x-coordinates with a tolerance of 25 pixels
    let currentLine = lines[0];
    for (let i = 1; i < lines.length; i++) {
      const nextLine = lines[i];
      if (
        // nextLine.coordsList[0].x - currentLine.coordsList.slice(-1)[0].x <=
        // 25
        isOnTheSameLinecoordsList(currentLine.coordsList, nextLine.coordsList)
      ) {
        currentLine.coordsList.push(...nextLine.coordsList);
        currentLine.text += " " + nextLine.text;
      } else {
        mergedLines.push(currentLine);
        currentLine = nextLine;
      }
    }
    mergedLines.push(currentLine);

    return mergedLines;
  }

  for (let i = 0; i < inputData.length; i++) {
    const line = inputData[i];
    let currentText = line.description.trim();
    let currentCoords = [getSquareCenter(line.boundingPoly.vertices)];

    for (let j = 0; j < line.length; j++) {
      const word = line[j];
      if (word.text.trim() !== "") {
        if (currentText !== "") {
          currentText += " ";
        }
        currentText += word.text.trim();
      }
      if (word.hasOwnProperty("box")) {
        const coords = {
          x: (word.box[0] + word.box[2]) / 2,
          y: (word.box[1] + word.box[3]) / 2,
        };
        currentCoords.push(coords);
      }
    }

    if (currentText !== "" && currentCoords.length > 0) {
      let found = false;
      for (let k = 0; k < lines.length; k++) {
        // const distanceToLine = distance(
        //   currentCoords[0].x,
        //   currentCoords[0].y,
        //   lines[k].coordsList[0].x,
        //   lines[k].coordsList[0].y
        // );
        // dont merge if text already include price ex: $1.00
        if (lines[k].text.includes("$")) {
          break;
        }
        if (isOnTheSameLinecoordsList(currentCoords, lines[k].coordsList)) {
          lines[k].coordsList.push(...currentCoords);
          lines[k].text += " " + currentText;
          found = true;
          break;
        }
      }

      if (!found) {
        lines.push({
          coordsList: currentCoords,
          text: currentText,
        });
      }
    }
  }

  const mergedLines = mergeLines(lines);
  // mergedLines.sort((a, b) => a.coordsList[0].x - b.coordsList[0].x);

  // console.log("mergedLines", JSON.stringify(mergedLines, null, 2));

  // console.log each text line
  for (let i = 0; i < mergedLines.length; i++) {
    console.log(mergedLines[i].text);
  }

  return mergedLines;
}
