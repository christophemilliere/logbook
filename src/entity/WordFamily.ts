import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ListsFamily } from "./ListsFamily";
@Entity()
export class WordFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: true,
    length: 255,
  })
  name: string;

  @ManyToOne((type) => ListsFamily, (listFamily) => listFamily.wordFamily)
  listsFamily: ListsFamily;
}
