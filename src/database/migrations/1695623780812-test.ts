import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1695623780812 implements MigrationInterface {
  name = 'CreateUserTable1695623780812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW(),
        \`deleted_at\` datetime(0) NULL,
        \`username\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
