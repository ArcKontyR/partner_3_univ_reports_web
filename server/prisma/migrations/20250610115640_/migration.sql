/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Supervisor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `Supervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_login_key" ON "Supervisor"("login");
