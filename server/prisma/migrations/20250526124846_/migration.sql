-- DropForeignKey
ALTER TABLE "Practice" DROP CONSTRAINT "Practice_report_id_fkey";

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
