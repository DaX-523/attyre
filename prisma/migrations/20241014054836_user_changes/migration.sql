-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_picture_url" TEXT,
ALTER COLUMN "display_name" DROP DEFAULT;
