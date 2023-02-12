// import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import TextRecognition from "react-native-text-recognition";
import { gcpPictureScanning } from "./gcpTextDetectort";
// const segmentation = require("line-segmentation-gcp-vision-ocr");
// @ts-ignore
import { init } from "./lineSegmentation/test1/lineSegmentationGpcVision";
// @ts-ignore
import { initLineSegmentation } from "./lineSegmentation/test2/lineSegmentationGpcVision";
import * as FileSystem from "expo-file-system";

export async function scanningMotors(file: string) {
  try {
    console.log("Analyze Started...");
    // @ts-ignore
    const scanResult = await gcpPictureScanning(file.base64);
    console.log("Analyze Done.");
    let segmentedResult = init(scanResult.responses[0]);
    const fullTextAnnotation = scanResult.responses[0].fullTextAnnotation;
    const text = fullTextAnnotation?.text || "";
    const textAnnotations = scanResult.responses[0].textAnnotations;
    //JSON file

    console.log("resultats: ", JSON.stringify(fullTextAnnotation, null, 2));
    // creating a file to save the result
    // const fileUri = FileSystem.documentDirectory + "result.txt";
    // await FileSystem.writeAsStringAsync(fileUri, segmentedResult);

    // // get the file content
    // const fileContent = await FileSystem.readAsStringAsync(fileUri);
    // console.log("fileContent: ", fileContent);
    return text;
  } catch (error) {
    console.log("Scanning motors error: ", error);
  }
}
