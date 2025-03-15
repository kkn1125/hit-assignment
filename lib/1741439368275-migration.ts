import { MigrationInterface, QueryRunner } from 'typeorm';
import { createDummyUser } from './createDummyUser';

export class Migration1741439368275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `user`');
    await queryRunner.query('DELETE FROM `restaurant`');
    await queryRunner.query('DELETE FROM `reservation`');

    await queryRunner.query('ALTER TABLE `user` AUTO_INCREMENT = 1');
    await queryRunner.query('ALTER TABLE `restaurant` AUTO_INCREMENT = 1');
    await queryRunner.query('ALTER TABLE `reservation` AUTO_INCREMENT = 1');

    const users = createDummyUser();

    await queryRunner.query('INSERT INTO user');
  }

  public async down(_: QueryRunner): Promise<void> {}
}
