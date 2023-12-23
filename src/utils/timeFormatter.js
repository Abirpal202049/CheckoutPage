export function convertTimestamp(timestamp) {
  // Convert timestamp to Date object
  const date = new Date(timestamp);

  // Define months array
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, year, and time components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Format the date string
  const formattedDate = `${day}, ${month} ${year}-${hours}:${minutes} ${ampm}`;

  return formattedDate;
}
