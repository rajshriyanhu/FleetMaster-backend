/*
  Warnings:

  - You are about to drop the column `name` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `customer_number` on the `Trip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_url` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "name",
ADD COLUMN     "file_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "customer_name",
DROP COLUMN "customer_number",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
