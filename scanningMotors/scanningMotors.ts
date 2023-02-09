// import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import TextRecognition from "react-native-text-recognition";
import { gcpPictureScanning } from "./gcpTextDetectort";
// const segmentation = require("line-segmentation-gcp-vision-ocr");
// @ts-ignore
import { init } from "./lineSegmentation/test1/lineSegmentationGpcVision";
// @ts-ignore
import { initLineSegmentation } from "./lineSegmentation/test2/lineSegmentationGpcVision";
import { Alert, Share, View, Button } from "react-native";
export async function scanningMotors(file: string) {
  try {
    console.log("Analyze Started...");
    // @ts-ignore
    const scanResult = await gcpPictureScanning(file.base64);
    console.log("Analyze Done.");

    // let segmentedResult = init(scanResult.responses[0]); //Algo Test 1
    let segmentedResult = initLineSegmentation(scanResult.responses[0]); //Algo Test 2

    // const fullTextAnnotation = scanResult.responses[0].fullTextAnnotation;
    // const text = fullTextAnnotation?.text || "";

    const jsonResult = JSON.stringify(segmentedResult, null, 4);
    console.log("result: ", scanResult.responses[0].textAnnotation);

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: jsonResult,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };
    // onShare();
    return segmentedResult[0];
  } catch (error) {
    console.log("Scanning motors error: ", error);
  }
}
