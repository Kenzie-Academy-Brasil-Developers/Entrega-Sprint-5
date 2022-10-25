import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1666701681453 implements MigrationInterface {
    name = 'createTable1666701681453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL, "district" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule_users_properties" ("id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "hour" character varying NOT NULL, "propertyId" uuid, "userId" uuid, CONSTRAINT "PK_faa0c537e16649c3bf77873b1c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" integer NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "categoryId" uuid, CONSTRAINT "REL_276968c3960cc79910f8ef3cf4" UNIQUE ("addressId"), CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_d8e3114988fcedd2076b1edf0f2" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_70998988b2213e2a0570b245c29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b" FOREIGN KEY ("addressId") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_6f1540725212f0c728e9aea0b23" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_6f1540725212f0c728e9aea0b23"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_70998988b2213e2a0570b245c29"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_d8e3114988fcedd2076b1edf0f2"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "schedule_users_properties"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
