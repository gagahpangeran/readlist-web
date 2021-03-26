import { Arg, Mutation, Query, Resolver } from "type-graphql";
import ReadList from "../model/ReadList";

let readLists = [new ReadList("http://test.com", "Test", true)];

@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  readLists() {
    return readLists;
  }

  @Mutation(_returns => [ReadList])
  addReadList(
    @Arg("link") link: string,
    @Arg("title") title: string,
    @Arg("isRead") isRead: boolean
  ) {
    readLists.push(new ReadList(link, title, isRead));
    return readLists;
  }

  @Mutation(_returns => [ReadList])
  deleteReadLists(@Arg("ids", _type => [String]) ids: string[]) {
    const newReadLists = readLists.filter(({ id }) => !ids.includes(id));
    readLists = newReadLists;
    return readLists;
  }
}
