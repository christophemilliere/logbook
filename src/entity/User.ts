import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
// import { Contact } from "./ImportContact";
import { Category } from "./Category";
import { Video } from "./Video";
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		nullable: true,
		length: 255
	})
	pseudo: string;



	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(type => Category, category => category.user)
	categories: Category[];

	@OneToMany(type => Video, video => video.user)
	videos: Video[];

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}
