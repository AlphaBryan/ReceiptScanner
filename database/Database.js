import uri from './uri';

const BaseServerAdress = uri;

export async function ServerGetRequest(endpoint, body = null) {
    const uri = BaseServerAdress + endpoint;

    try {
        if (body) {
            // GET request with body
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            return data;
        } else {
            // Regular GET request without body
            const response = await fetch(uri);

            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log('#Error - ServerGetRequest:', error.message);
        console.log('  => - request uri:', uri);
        return null;
    }
}

export async function ServerPostRequest(endpoint, body) {
    const uri = BaseServerAdress + endpoint;
    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("#Error - ServerPostRequest:", error.message);
        console.log("  => - Error request uri:", uri);
        return null;
    }
}

export async function ServerPatchRequest(endpoint, body) {
    const uri = BaseServerAdress + endpoint;
    try {
        const response = await fetch(uri, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return response;
    } catch (error) {
        console.log("#Error - ServerPatchRequest:", error.message);
        console.log("  => - Error request uri:", uri);
        return null;
    }
}

export async function ServerPostRequestImage(endpoint, imageUri) {
    const uri = BaseServerAdress + endpoint;
    try {
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            type: "image/jpeg",
            name: "image.jpg",
        });
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("- ServerPostRequest:", error.message);
        console.log("  - Error request uri:", uri);
        return null;
    }
}