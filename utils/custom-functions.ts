export const checkImageFileSize = (base64String: string) => {
    // Remove the data URI header (e.g., "data:image/jpeg;base64,")
    const base64WithoutHeader = base64String.split(',')[1];

    // The size in bytes is roughly the length of the string * 3/4
    // Accounting for padding characters '==' or '='
    const stringLength = base64WithoutHeader.length;
    const padding = (base64WithoutHeader.indexOf('==') > -1) ? 2 : (base64WithoutHeader.indexOf('=') > -1 ? 1 : 0);
    const fileSizeInBytes = (stringLength * 0.75) - padding;

    return Math.round(fileSizeInBytes);
};