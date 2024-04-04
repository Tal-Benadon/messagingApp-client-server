function translateDateToString(dateInput) {
    const date = (typeof dateInput === 'string') ? new Date(dateInput) : dateInput;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    let prefix = '';
    if (date.toDateString() === today.toDateString()) {
        prefix = 'Today, ';
    } else if (date.toDateString() === yesterday.toDateString()) {
        prefix = 'Yesterday, ';
    }

    // Getting the weekday name
    const options = { weekday: 'long' };
    const weekday = date.toLocaleDateString('en-US', options);

    // Format the date manually to avoid leading zeroes and use "." separator
    const day = date.getDate(); // Get day without leading zero
    const month = date.getMonth() + 1; // Get month (0-11) and adjust to 1-12 scale
    const year = date.getFullYear();

    const dateString = `${weekday}, ${day}.${month}.${year}`;

    return prefix + dateString;
}


function formatTime(dateInput) {

    const date = (typeof dateInput === 'string') ? new Date(dateInput) : dateInput;

    let hours = date.getHours();
    let minutes = date.getMinutes();


    hours = hours < 10 ? String(hours) : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}

export default { translateDateToString, formatTime }