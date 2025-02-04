/*
  Warnings:

  - Changed the type of `asset_no` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "asset_no",
ADD COLUMN     "asset_no" INTEGER NOT NULL;
