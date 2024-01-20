export function containsCommonElement(arr1: any[], arr2: any[]) {
    return arr1.every((element) => arr2.includes(element));
}
