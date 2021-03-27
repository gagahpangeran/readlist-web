import { getConnection } from "../config/db";
import ReadList from "../model/ReadList";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

interface Data {
  link: string;
  title: string;
  readAt?: Date;
  comment?: string;
}

export async function getAllReadList() {
  return await (await getRepo()).find();
}

export async function addReadList({ link, title, readAt, comment }: Data) {
  return await (await getRepo()).save(
    new ReadList(link, title, readAt, comment)
  );
}

export async function deleteReadLists(ids: string[]) {
  await (await getRepo()).softDelete(ids);
  return await getAllReadList();
}
