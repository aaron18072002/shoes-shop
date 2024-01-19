export function convertPriceToStringVND(price: number): string {
    const formattedPrice = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'symbol',
    });

    return formattedPrice.replace(/₫/g, '');
}

export function convertPriceToStringVNDWithD(price: number): string {
    const formattedPrice = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formattedPrice;
}
