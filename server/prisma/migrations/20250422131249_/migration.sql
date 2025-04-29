/*
  Warnings:

  - You are about to drop the column `university_id` on the `Direction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sample_path]` on the table `University` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report_id` to the `Practice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `student_id` on the `Practice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supervisor_id` on the `Practice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `direction_id` on the `Practice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sample_path` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_university_id_fkey";

-- DropIndex
DROP INDEX "Direction_university_id_key";

-- DropIndex
DROP INDEX "Student_id_key";

-- DropIndex
DROP INDEX "Supervisor_id_key";

-- AlterTable
ALTER TABLE "Direction" DROP COLUMN "university_id";

-- AlterTable
ALTER TABLE "Practice" ADD COLUMN     "report_id" INTEGER NOT NULL,
DROP COLUMN "student_id",
ADD COLUMN     "student_id" INTEGER NOT NULL,
DROP COLUMN "supervisor_id",
ADD COLUMN     "supervisor_id" INTEGER NOT NULL,
DROP COLUMN "direction_id",
ADD COLUMN     "direction_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "class" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "sample_path" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "university_id" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DirectionToUniversity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DirectionToUniversity_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DirectionToUniversity_B_index" ON "_DirectionToUniversity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "University_sample_path_key" ON "University"("sample_path");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectionToUniversity" ADD CONSTRAINT "_DirectionToUniversity_A_fkey" FOREIGN KEY ("A") REFERENCES "Direction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectionToUniversity" ADD CONSTRAINT "_DirectionToUniversity_B_fkey" FOREIGN KEY ("B") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
