import { makeVar, useReactiveVar } from "@apollo/client";
import { ReadListInputForm } from "../components/Dialog/ReadListDialog";
import { ReadList } from "../types/generated-types";
import { dateFormatter } from "../utils/helper";

const selectedVar = makeVar<string[]>([]);

export function useSelectData() {
  return {
    selected: useReactiveVar(selectedVar),
    setSelected: (ids: string[]) => selectedVar(ids)
  };
}
interface EditData extends ReadListInputForm {
  id?: string;
}
const defaultEditData = {
  link: "",
  title: "",
  isRead: true,
  readAt: dateFormatter(new Date()),
  comment: ""
};
const editDataVar = makeVar<EditData>(defaultEditData);

export function useEditData() {
  const setEditData = (data: ReadList) => {
    const { id, link, title, readAt, comment } = data;
    editDataVar({
      id,
      link,
      title,
      isRead: readAt !== null,
      readAt: readAt ? dateFormatter(readAt) : defaultEditData.readAt,
      comment: comment ?? ""
    });
  };

  return {
    editData: useReactiveVar(editDataVar),
    setEditData,
    clearEditData: () => editDataVar(defaultEditData)
  };
}
