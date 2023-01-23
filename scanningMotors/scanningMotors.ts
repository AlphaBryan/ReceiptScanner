import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import TextRecognition from "react-native-text-recognition";

export async function scanningMotors(fileName: string) {
  try {
    // const worker = createWorker({
    //     logger: (m: any) => console.log(m),
    //     });
    // await worker.load();
    // await worker.loadLanguage("eng");
    // await worker.initialize("eng");
    // await worker.recognize("https://tesseract.projectnaptha.com/img/eng_bw.png");
    // // const { data: { text } } = await worker.getResult();
    // console.log(text);
    // await worker.terminate();
    
    
    console.log("Analyzing file: " + fileName);
  } catch (error) {
    console.log("Scanning motors error: ", error);
  }
}
