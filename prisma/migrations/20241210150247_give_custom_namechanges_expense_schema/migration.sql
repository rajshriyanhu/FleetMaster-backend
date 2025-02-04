/*
  Warnings:

  - You are about to drop the column `completed_date` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `capacity` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "completed_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "capacity",
ADD COLUMN     "capacity" INTEGER NOT NULL;
