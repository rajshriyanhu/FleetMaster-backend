/*
  Warnings:

  - Added the required column `tenant_id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `tenant_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Tenant` (
    `id` VARCHAR(191) NOT NULL,
    `admin_name` VARCHAR(191) NOT NULL,
    `admin_email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
