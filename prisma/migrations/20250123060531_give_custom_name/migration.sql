/*
  Warnings:

  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - Added the required column `alt_phone_number` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emg_name` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emg_phone_number` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emg_relation` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_status` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insurance_valid_upto` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joining_date` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working_city` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working_region` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `working_state` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phone_number` on the `Driver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "alt_phone_number" INTEGER NOT NULL,
ADD COLUMN     "emg_name" TEXT NOT NULL,
ADD COLUMN     "emg_phone_number" INTEGER NOT NULL,
ADD COLUMN     "emg_relation" TEXT NOT NULL,
ADD COLUMN     "employment_status" TEXT NOT NULL,
ADD COLUMN     "exit_date" TIMESTAMP(3),
ADD COLUMN     "insurance_valid_upto" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "joining_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "working_city" TEXT NOT NULL,
ADD COLUMN     "working_region" TEXT NOT NULL,
ADD COLUMN     "working_state" TEXT NOT NULL,
DROP COLUMN "phone_number",
ADD COLUMN     "phone_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "last_battery_change" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phone_number_key" ON "Driver"("phone_number");
