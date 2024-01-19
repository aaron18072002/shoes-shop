export default function convertTimestampToLocalDate(timestamp: any) {
    const dateObject = new Date(timestamp);

    const localizedDate = dateObject.toLocaleString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // Use 12-hour clock
    });

    return localizedDate;
}
