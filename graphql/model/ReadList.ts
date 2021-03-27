import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "./BaseModel";

@ObjectType()
@Entity()
export default class ReadList extends BaseModel {
  @Field(_type => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  link: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  comment?: string;

  constructor(link: string, title: string, readAt?: Date, comment?: string) {
    super();
    this.id = uuidv4();
    this.link = link;
    this.title = title;
    this.readAt = readAt;
    this.comment = comment;
  }
}
