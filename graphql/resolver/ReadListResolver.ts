import { Arg, Mutation, Query, Resolver } from "type-graphql";
import ReadList from "../model/ReadList";
import {
  addReadList,
  deleteReadLists,
  getAllReadList
} from "../service/ReadListService";

@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  async allReadLists() {
    return await getAllReadList();
  }

  @Mutation(_returns => ReadList)
  addReadList(
    @Arg("link") link: string,
    @Arg("title") title: string,
    @Arg("isRead") isRead: boolean
  ) {
    return addReadList(new ReadList(link, title, isRead));
  }

  @Mutation(_returns => [ReadList])
  deleteReadLists(@Arg("ids", _type => [String]) ids: string[]) {
    return deleteReadLists(ids);
  }
}
