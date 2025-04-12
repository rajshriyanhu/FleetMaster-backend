/*
  Warnings:

  - A unique constraint covering the columns `[admin_email]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Invite` MODIFY `role` ENUM('ADMIN', 'VIEWER', 'EDITOR', 'CREATOR') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'VIEWER', 'EDITOR', 'CREATOR') NOT NULL DEFAULT 'VIEWER';

-- CreateIndex
CREATE UNIQUE INDEX `Tenant_admin_email_key` ON `Tenant`(`admin_email`);
