import {MigrationInterface, QueryRunner} from "typeorm";

export class addListFamily1590954979582 implements MigrationInterface {
    name = 'addListFamily1590954979582'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `word_family` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `listsFamilyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `lists_family` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `word_family` ADD CONSTRAINT `FK_e1e6d647073ee53a1bb6cd369c1` FOREIGN KEY (`listsFamilyId`) REFERENCES `lists_family`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `lists_family` ADD CONSTRAINT `FK_58999819193a8b5110770e2ea33` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `lists_family` DROP FOREIGN KEY `FK_58999819193a8b5110770e2ea33`", undefined);
        await queryRunner.query("ALTER TABLE `word_family` DROP FOREIGN KEY `FK_e1e6d647073ee53a1bb6cd369c1`", undefined);
        await queryRunner.query("DROP TABLE `lists_family`", undefined);
        await queryRunner.query("DROP TABLE `word_family`", undefined);
    }

}
