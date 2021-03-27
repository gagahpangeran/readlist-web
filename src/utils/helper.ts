function pad(num: number) {
  return `${num}`.padStart(2, "0");
}

export function dateFormatter(datetime: string | Date | null) {
  if (datetime === null) {
    return "-";
  }

  datetime = new Date(datetime);

  const year = datetime.getFullYear();
  const month = pad(datetime.getMonth() + 1);
  const date = pad(datetime.getDate());

  const fullDate = `${year}-${month}-${date}`;

  return fullDate;
}
