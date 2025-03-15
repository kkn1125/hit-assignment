import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  createDummyMenus,
  createDummyRestaurant,
  createDummyUser,
} from './createDummyData';

export class Migration1741439368275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `reservation_menu`');
    await queryRunner.query('DELETE FROM `menu`');
    await queryRunner.query('DELETE FROM `reservation`');
    await queryRunner.query('DELETE FROM `restaurant`');
    await queryRunner.query('DELETE FROM `user`');

    await queryRunner.query('ALTER TABLE `user` AUTO_INCREMENT = 1');
    await queryRunner.query('ALTER TABLE `restaurant` AUTO_INCREMENT = 1');
    await queryRunner.query('ALTER TABLE `menu` AUTO_INCREMENT = 1');
    await queryRunner.query('ALTER TABLE `reservation` AUTO_INCREMENT = 1');
    await queryRunner.query(
      'ALTER TABLE `reservation_menu` AUTO_INCREMENT = 1',
    );

    const users = createDummyUser();
    const restaurants = createDummyRestaurant();
    const menus = createDummyMenus();

    await queryRunner.query(
      `INSERT INTO user (\`user_id\`, \`phone\`, \`email\`, \`username\`, \`password\`, \`role\`) VALUES ${users
        .map(
          (user) =>
            `(${Object.values(user)
              .map((value) =>
                typeof value === 'number' ? value : `"${value}"`,
              )
              .join(', ')})`,
        )
        .join(', ')}`,
    );

    await queryRunner.query(
      `INSERT INTO \`restaurant\` (\`user_id\`, \`category\`, \`name\`, \`location\`) VALUES ${restaurants
        .map(
          (restaurant) =>
            `(${Object.values(restaurant)
              .map((value) =>
                typeof value === 'number' ? value : `"${value}"`,
              )
              .join(', ')})`,
        )
        .join(', ')}`,
    );

    await queryRunner.query(
      `INSERT INTO \`menu\` (\`restaurant_id\`, \`category\`, \`name\`, \`price\`, \`description\`) VALUES ${menus
        .map(
          (restaurant) =>
            `(${Object.values(restaurant)
              .map((value) =>
                typeof value === 'number' ? value : `"${value}"`,
              )
              .join(', ')})`,
        )
        .join(', ')}`,
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
