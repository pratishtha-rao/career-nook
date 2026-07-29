-- DropIndex
DROP INDEX "Contact_userId_id_idx";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastContact" TIMESTAMP(3),
ADD COLUMN     "nextFollowUp" TIMESTAMP(3),
ADD COLUMN     "referredBy" TEXT,
ADD COLUMN     "relationship" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE INDEX "Contact_userId_order_idx" ON "Contact"("userId", "order");

-- CreateIndex
CREATE INDEX "Contact_userId_favorite_idx" ON "Contact"("userId", "favorite");
