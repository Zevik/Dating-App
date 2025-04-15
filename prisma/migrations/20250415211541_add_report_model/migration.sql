/*
  Warnings:

  - You are about to drop the column `admin_notes` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `call_segment_uuid` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `match_id` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `reported_id` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `reports` table. All the data in the column will be lost.
  - Added the required column `reported_user_id` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Made the column `reporter_id` on table `reports` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_reported_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_reporter_id_fkey";

-- DropIndex
DROP INDEX "reports_reported_id_idx";

-- DropIndex
DROP INDEX "reports_status_idx";

-- DropIndex
DROP INDEX "reports_timestamp_idx";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "admin_notes",
DROP COLUMN "call_segment_uuid",
DROP COLUMN "details",
DROP COLUMN "match_id",
DROP COLUMN "reported_id",
DROP COLUMN "status",
DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reported_user_id" INTEGER NOT NULL,
ALTER COLUMN "reporter_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "reports_reported_user_id_idx" ON "reports"("reported_user_id");

-- CreateIndex
CREATE INDEX "reports_reporter_id_idx" ON "reports"("reporter_id");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reported_user_id_fkey" FOREIGN KEY ("reported_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
