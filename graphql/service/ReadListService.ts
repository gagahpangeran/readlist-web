import { getConnection } from "../config/db";
import ReadList from "../model/ReadList";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

export async function getAllReadList() {
  return await (await getRepo()).find();
}

export async function addReadList(readList: ReadList) {
  return await (await getRepo()).save(readList);
}

export async function deleteReadLists(ids: string[]) {
  await (await getRepo()).delete(ids);
  return await getAllReadList();
}
