/*
  Warnings:

  - You are about to drop the column `capacity` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `average_fuel_cost` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_number` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `days` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_km` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_location` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_visited` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintainance` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permit` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_km` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_tax` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toll_tax` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fuel_cost` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_km` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_type` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_average` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km_run` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_customer_id_fkey";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "capacity",
DROP COLUMN "customer_id",
DROP COLUMN "destination",
DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "average_fuel_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_number" TEXT NOT NULL,
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "end_km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "end_location" TEXT NOT NULL,
ADD COLUMN     "location_visited" TEXT NOT NULL,
ADD COLUMN     "maintainance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "permit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "start_km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "state_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "toll_tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fuel_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_km" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trip_type" TEXT NOT NULL,
ADD COLUMN     "vehicle_average" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vehicle_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "km_run" DOUBLE PRECISION NOT NULL;
