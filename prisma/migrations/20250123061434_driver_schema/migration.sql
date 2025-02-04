/*
  Warnings:

  - Changed the type of `postal_code` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postal_code",
ADD COLUMN     "postal_code" INTEGER NOT NULL;
