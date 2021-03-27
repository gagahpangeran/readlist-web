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
    @Arg("readAt", { nullable: true }) readAt?: Date,
    @Arg("comment", { nullable: true }) comment?: string
  ) {
    return addReadList(new ReadList(link, title, readAt, comment));
  }

  @Mutation(_returns => [ReadList])
  deleteReadLists(@Arg("ids", _type => [String]) ids: string[]) {
    return deleteReadLists(ids);
  }
}
