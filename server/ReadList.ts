import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
export default class ReadList {
  @Field(_type => ID)
  id: string;

  @Field()
  link: string;

  @Field()
  title: string;

  @Field()
  isRead: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(link: string, title: string, isRead: boolean) {
    const now = new Date();
    this.id = uuidv4();
    this.link = link;
    this.title = title;
    this.isRead = isRead;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
