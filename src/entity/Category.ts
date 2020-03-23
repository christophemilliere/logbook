import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
	OneToMany
} from "typeorm";
import { ListWord } from "./ListWord";
import { User } from "./User";
@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	name: string;
	@ManyToOne(type => User, user => user.categories)
	user: User;

	@OneToMany(type => ListWord, list => list.category)
	listWords: ListWord[];
}
