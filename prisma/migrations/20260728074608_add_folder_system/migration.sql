/*
  Warnings:

  - You are about to drop the column `folderId` on the `Job` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_folderId_fkey";

-- DropIndex
DROP INDEX "Job_folderId_idx";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "collapsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "folderId";

-- CreateTable
CREATE TABLE "FolderJob" (
    "folderId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "FolderJob_pkey" PRIMARY KEY ("folderId","jobId")
);

-- CreateTable
CREATE TABLE "FolderContact" (
    "folderId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "FolderContact_pkey" PRIMARY KEY ("folderId","contactId")
);

-- CreateTable
CREATE TABLE "FolderTask" (
    "folderId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "FolderTask_pkey" PRIMARY KEY ("folderId","taskId")
);

-- CreateTable
CREATE TABLE "FolderMaterial" (
    "folderId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "FolderMaterial_pkey" PRIMARY KEY ("folderId","materialId")
);

-- CreateIndex
CREATE INDEX "FolderJob_jobId_idx" ON "FolderJob"("jobId");

-- CreateIndex
CREATE INDEX "FolderContact_contactId_idx" ON "FolderContact"("contactId");

-- CreateIndex
CREATE INDEX "FolderTask_taskId_idx" ON "FolderTask"("taskId");

-- CreateIndex
CREATE INDEX "FolderMaterial_materialId_idx" ON "FolderMaterial"("materialId");

-- CreateIndex
CREATE INDEX "Folder_userId_order_idx" ON "Folder"("userId", "order");

-- CreateIndex
CREATE INDEX "Folder_userId_favorite_idx" ON "Folder"("userId", "favorite");

-- AddForeignKey
ALTER TABLE "FolderJob" ADD CONSTRAINT "FolderJob_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderJob" ADD CONSTRAINT "FolderJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderContact" ADD CONSTRAINT "FolderContact_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderContact" ADD CONSTRAINT "FolderContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderTask" ADD CONSTRAINT "FolderTask_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderTask" ADD CONSTRAINT "FolderTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderMaterial" ADD CONSTRAINT "FolderMaterial_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderMaterial" ADD CONSTRAINT "FolderMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
