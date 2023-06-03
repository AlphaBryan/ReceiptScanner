import { clientSegmentation, marketSegmentation, productsSegmentation, totalSegmentation } from "./lineSegmentation/lineSegmentationIGA";
import { callProcess, callResult } from "./tbsApi";

export async function scanMotor(image) {
    const sendData = await callProcess([image], {});
    // wait 15 seconds for the result
    await new Promise(resolve => setTimeout(resolve, 15000));
    const receivedData = await callResult(sendData.token)
    const segmentedMarket = marketSegmentation(receivedData);
    const segmentedTotal = totalSegmentation(receivedData);
    const segmentedProducts = productsSegmentation(receivedData);
    const segmentedClients = clientSegmentation(receivedData);
    return {
        market: segmentedMarket,
        products: segmentedProducts,
        client: segmentedClients,
        totals: segmentedTotal,
    };
}