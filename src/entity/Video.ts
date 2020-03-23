import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from "typeorm";
import { User } from "./User";
@Entity()
export class Video {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	title: string;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	url: string;

	@Column({ type: 'boolean', default: false })
	youtube: boolean;

	@Column({ type: 'boolean', default: false })
	vimeo: boolean;

	@ManyToOne(type => User, user => user.categories)
	user: User;
}
