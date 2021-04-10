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

export function getSelected(selected: string[], id: string) {
  const selectedIndex = selected.indexOf(id);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
}
