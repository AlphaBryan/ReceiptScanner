// import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import TextRecognition from "react-native-text-recognition";
import { gcpPictureScanning } from "./gcpTextDetectort";
// const segmentation = require("line-segmentation-gcp-vision-ocr");
// @ts-ignore
import { init } from "./lineSegmentation/lineSegmentationGpcVision";


export async function scanningMotors(file: string) {
  try {
    console.log("Analyze Started...");
    // @ts-ignore
    const scanResult = await gcpPictureScanning(file.base64);
    console.log("Analyze Done.");
    let segmentedResult = init(scanResult.responses[0]);
    const fullTextAnnotation = scanResult.responses[0].fullTextAnnotation;
    const text = fullTextAnnotation?.text || "";
    console.log("result: ", segmentedResult);
    return text;
  } catch (error) {
    console.log("Scanning motors error: ", error);
  }
}
