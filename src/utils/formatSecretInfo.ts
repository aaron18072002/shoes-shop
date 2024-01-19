export const formatSecretInfo = (input: string) => {
    return input.replace(/^.{7}/g, '********');
};
