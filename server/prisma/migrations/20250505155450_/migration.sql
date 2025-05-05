-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_direction_id_fkey" FOREIGN KEY ("direction_id") REFERENCES "Direction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
