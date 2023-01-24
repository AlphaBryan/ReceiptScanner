// import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import TextRecognition from "react-native-text-recognition";
import { gcpPictureScanning } from "./gcpTextDetectort";

export async function scanningMotors(file: string) {
  try {
    console.log("Analyzing Picture...");
    // @ts-ignore
    const scanResult = await gcpPictureScanning(file.base64);
    console.log("Analyze Done.");
    const fullTextAnnotation = scanResult.responses[0].fullTextAnnotation;
    const text = fullTextAnnotation.text;
    // const textArray = text.split("\n");
    console.log("result: ", text);
  } catch (error) {
    console.log("Scanning motors error: ", error);
  }
}
