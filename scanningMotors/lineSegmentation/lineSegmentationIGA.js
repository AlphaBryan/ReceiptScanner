export function productsSegmentation(response) {
    const products = [];
    const productItems = response.result?.lineItems;
    for (const productItem of productItems) {
        if (productItem.desc.includes('TOTAL') ||
            productItem.desc.includes('RABAIS')) {
            continue;
        }
        const product = {
            name: productItem.desc,
            quantity: productItem.qty == 0 ? 1 : productItem.qty,
            price: productItem.lineTotal,
        }
        products.push(product);
    }
    return products;
}

export function marketSegmentation(response) {
    const market = {
        name: response.result?.establishment,
        phone: response.result?.phoneNumber,
        city: 'Montréal'
    };
    return market;
}
export function clientSegmentation(response) {
    const client = {
        paymentMethod: response.result?.paymentMethod,
    };
    console.log('clientSegmentation', client);
    return client;
}
export function totalSegmentation(response) {
    var subTotal = 0;
    for (const productItem of response.result.lineItems) {
        if (!productItem.desc.includes('TOTAL')) {
            continue;
        }
        subTotal = productItem.lineTotal;
    }

    const totals = {
        subTotal: subTotal,
        tax: response.result.tax,
        total: response.result.total,
    }
    return totals;
}

