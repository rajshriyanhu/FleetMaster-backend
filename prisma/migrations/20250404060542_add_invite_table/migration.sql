/*
  Warnings:

  - You are about to drop the column `resend_email_id` on the `Invite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `resend_email_id`;
