import { ReadListInput } from "../types/generated-types";

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

export interface InputData {
  link: string;
  title: string;
  isRead: boolean;
  readAt: string;
  comment: string;
}

export function getSubmitData({
  isRead,
  readAt,
  comment,
  ...data
}: InputData): ReadListInput {
  comment = comment.trim();
  return {
    ...data,
    readAt: isRead ? new Date(readAt).toISOString() : null,
    comment: comment.length > 0 ? comment : null
  };
}
