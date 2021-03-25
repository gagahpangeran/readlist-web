function pad(num: number) {
  return `${num}`.padStart(2, "0");
}

export function dateFormatter(dateString: string | null) {
  if (dateString === null) {
    return "N/A";
  }

  const datetime = new Date(dateString);

  const year = datetime.getFullYear();
  const month = pad(datetime.getMonth() + 1);
  const date = pad(datetime.getDate());

  const hour = pad(datetime.getHours());
  const minute = pad(datetime.getMinutes());
  const second = pad(datetime.getSeconds());

  const fullDate = `${year}-${month}-${date}`;
  const fullTime = `${hour}:${minute}:${second}`;

  return `${fullDate}, ${fullTime}`;
}
