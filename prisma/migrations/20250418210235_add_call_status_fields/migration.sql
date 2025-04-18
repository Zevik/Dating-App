-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "call_accepted_at" TIMESTAMPTZ(3),
ADD COLUMN     "call_rejected_at" TIMESTAMPTZ(3);
