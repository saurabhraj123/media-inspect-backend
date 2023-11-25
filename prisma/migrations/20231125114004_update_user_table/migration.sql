/*
  Warnings:

  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_gmail_login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `first_name`,
    DROP COLUMN `is_gmail_login`,
    DROP COLUMN `last_name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT '';
