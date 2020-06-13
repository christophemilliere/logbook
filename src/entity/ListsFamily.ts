import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WordFamily } from "./WordFamily";
import { User } from "./User";
@Entity()
export class ListsFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: true,
    length: 255,
  })
  title: string;
  @ManyToOne((type) => User, (user) => user.categories)
  user: User;

  @OneToMany((type) => WordFamily, (wordFamily) => wordFamily.listsFamily)
  wordFamily: WordFamily[];
}
