export const upperFirstOfEachWord = (str: string) => {
    const words = str.split(' ');
    const result = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return result.join(' ');
};
