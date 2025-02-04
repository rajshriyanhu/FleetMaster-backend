/*
  Warnings:

  - You are about to drop the column `company_name` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `cost_per_km` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `rc_validity` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `city` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gps_renewal_due` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_date` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Made the column `last_battery_change` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `insurance_url` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `puc_url` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rc_url` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fitness_url` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_service` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "company_name",
DROP COLUMN "cost_per_km",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "rc_validity",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "gps_renewal_due" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "registration_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "last_battery_change" SET NOT NULL,
ALTER COLUMN "insurance_url" SET NOT NULL,
ALTER COLUMN "puc_url" SET NOT NULL,
ALTER COLUMN "rc_url" SET NOT NULL,
ALTER COLUMN "fitness_url" SET NOT NULL,
ALTER COLUMN "last_service" SET NOT NULL;
