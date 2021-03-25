import { Mutation, Query, Resolver, Arg } from "type-graphql";
import ReadList from "./ReadList";

const readLists = [new ReadList("http://test.com", "Test", true)];

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
}
