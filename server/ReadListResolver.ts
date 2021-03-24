import { Mutation, Query, Resolver, Arg } from "type-graphql";
import ReadList from "./ReadList";

const readLists = [new ReadList("http://test.com", "Test", true)];

@Resolver(of => ReadList)
export default class ReadListResolver {
  @Query(returns => [ReadList])
  readLists() {
    return readLists;
  }

  @Mutation(returns => [ReadList])
  addReadList(
    @Arg("link") link: string,
    @Arg("title") title: string,
    @Arg("isRead") isRead: boolean
  ) {
    readLists.push(new ReadList(link, title, isRead));
    return readLists;
  }
}
