import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import ReadList from "../model/ReadList";
import {
  addReadList,
  deleteReadLists,
  getAllReadList
} from "../service/ReadListService";

@InputType()
class AddReadListInput implements Partial<ReadList> {
  @Field()
  link!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  comment?: string;
}
@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  async allReadLists() {
    return await getAllReadList();
  }

  @Mutation(_returns => ReadList)
  addReadList(@Arg("data") newReadListData: AddReadListInput) {
    const { link, title, readAt, comment } = newReadListData;
    return addReadList(new ReadList(link, title, readAt, comment));
  }

  @Mutation(_returns => [ReadList])
  deleteReadLists(@Arg("ids", _type => [String]) ids: string[]) {
    return deleteReadLists(ids);
  }
}
