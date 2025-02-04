/*
  Warnings:

  - Made the column `permissions` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "permissions" SET NOT NULL;

-- DropEnum
DROP TYPE "TripStatus";
