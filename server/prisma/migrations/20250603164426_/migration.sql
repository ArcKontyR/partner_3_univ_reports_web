-- CreateTable
CREATE TABLE "Key" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "university_id" UUID NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_university_id_key" ON "Key"("university_id");

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
