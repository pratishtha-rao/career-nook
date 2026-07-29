/*
  Warnings:

  - The `dueDate` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dateApplied` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OfficeType" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- DropIndex
DROP INDEX "Job_userId_id_idx";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "folderId" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "officeType" "OfficeType",
ADD COLUMN     "referredBy" TEXT,
ADD COLUMN     "salary" DECIMAL(10,2),
ADD COLUMN     "salaryNotes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dateApplied",
ADD COLUMN     "dateApplied" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "version" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobContact" (
    "jobId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "JobContact_pkey" PRIMARY KEY ("jobId","contactId")
);

-- CreateTable
CREATE TABLE "JobTask" (
    "jobId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "JobTask_pkey" PRIMARY KEY ("jobId","taskId")
);

-- CreateTable
CREATE TABLE "JobMaterial" (
    "jobId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "JobMaterial_pkey" PRIMARY KEY ("jobId","materialId")
);

-- CreateIndex
CREATE INDEX "Folder_userId_idx" ON "Folder"("userId");

-- CreateIndex
CREATE INDEX "JobContact_contactId_idx" ON "JobContact"("contactId");

-- CreateIndex
CREATE INDEX "JobTask_taskId_idx" ON "JobTask"("taskId");

-- CreateIndex
CREATE INDEX "JobMaterial_materialId_idx" ON "JobMaterial"("materialId");

-- CreateIndex
CREATE INDEX "AIUsage_userId_idx" ON "AIUsage"("userId");

-- CreateIndex
CREATE INDEX "Job_userId_archived_idx" ON "Job"("userId", "archived");

-- CreateIndex
CREATE INDEX "Job_userId_status_idx" ON "Job"("userId", "status");

-- CreateIndex
CREATE INDEX "Job_folderId_idx" ON "Job"("folderId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobContact" ADD CONSTRAINT "JobContact_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobContact" ADD CONSTRAINT "JobContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMaterial" ADD CONSTRAINT "JobMaterial_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMaterial" ADD CONSTRAINT "JobMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
