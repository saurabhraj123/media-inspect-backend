/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `is_email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_gmail_login` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `verification_token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
