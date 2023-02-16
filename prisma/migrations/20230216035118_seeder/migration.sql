/*
  Warnings:

  - You are about to drop the column `clientId` on the `account` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `interest` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tax` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_clientId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `clientId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `interest` INTEGER NOT NULL DEFAULT 0,
    MODIFY `tax` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
