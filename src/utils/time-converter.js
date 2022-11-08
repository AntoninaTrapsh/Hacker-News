function timeConverter(UNIX_timestamp) {
  const milliseconds = new Date(UNIX_timestamp * 1000);
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
  const year = milliseconds.getFullYear();
  const month = months[milliseconds.getMonth()];
  const day = ("0" + milliseconds.getDate()).slice(-2);
  const hour = ("0" + milliseconds.getHours()).slice(-2);
  const min = ("0" + milliseconds.getMinutes()).slice(-2);
  const sec = ("0" + milliseconds.getSeconds()).slice(-2);
  return day + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
}

export default timeConverter;
