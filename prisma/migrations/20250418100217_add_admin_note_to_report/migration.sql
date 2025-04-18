/*
  Warnings:

  - You are about to drop the `notification_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification_settings" DROP CONSTRAINT "notification_settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropIndex
DROP INDEX "users_latitude_longitude_idx";

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "admin_note" TEXT;

-- DropTable
DROP TABLE "notification_settings";

-- DropTable
DROP TABLE "profiles";
