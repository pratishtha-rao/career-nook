-- DropForeignKey
ALTER TABLE "FolderJob" DROP CONSTRAINT "FolderJob_folderId_fkey";

-- DropForeignKey
ALTER TABLE "FolderJob" DROP CONSTRAINT "FolderJob_jobId_fkey";

-- DropIndex
DROP INDEX "FolderJob_jobId_idx";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "FolderJob" ADD CONSTRAINT "FolderJob_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderJob" ADD CONSTRAINT "FolderJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
