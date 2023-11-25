/*
  Warnings:

  - You are about to drop the column `is_email_verified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_email_verified`,
    ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT false;
