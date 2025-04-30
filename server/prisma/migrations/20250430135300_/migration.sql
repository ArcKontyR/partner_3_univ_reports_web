/*
  Warnings:

  - Added the required column `TIN` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_number` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" ADD COLUMN     "TIN" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contact_number" TEXT NOT NULL;
