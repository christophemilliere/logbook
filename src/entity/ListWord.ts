import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm";
import { Category } from "./Category";
@Entity()
export class ListWord {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	word_one: string;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	word_two: string;

	@ManyToOne(type => Category, category => category.listWords)
	category: Category;
}
