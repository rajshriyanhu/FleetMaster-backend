/*
  Warnings:

  - Added the required column `document_url` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "document_url" TEXT NOT NULL;
