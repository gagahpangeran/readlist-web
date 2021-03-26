import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
@Entity()
export default class ReadList {
  @Field(_type => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  link: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  submittedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readAt: Date | null;

  constructor(link: string, title: string, isRead: boolean) {
    const now = new Date();
    this.id = uuidv4();
    this.link = link;
    this.title = title;
    this.submittedAt = now;
    this.readAt = isRead ? now : null;
  }
}
