-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_seen_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "users_last_seen_at_idx" ON "users"("last_seen_at");
