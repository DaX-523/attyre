/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followersCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `colorOptions` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `sizeOptions` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `commentsCount` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `isBookmarked` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `isLiked` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `musicId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `sharesCount` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Video` table. All the data in the column will be lost.
  - The primary key for the `VideoProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `VideoProduct` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `VideoProduct` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `VideoProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `VideoProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_musicId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoProduct" DROP CONSTRAINT "VideoProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "VideoProduct" DROP CONSTRAINT "VideoProduct_videoId_fkey";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "coverUrl",
ADD COLUMN     "cover_url" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
DROP COLUMN "discount",
DROP COLUMN "imageUrl",
DROP COLUMN "inStock",
DROP COLUMN "originalPrice",
DROP COLUMN "storeId",
ADD COLUMN     "discount_percentage" INTEGER,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "in_stock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "original_price" DOUBLE PRECISION,
ADD COLUMN     "store_id" INTEGER;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "logoUrl",
ADD COLUMN     "logo_url" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "displayName",
DROP COLUMN "followersCount",
DROP COLUMN "profilePicture",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_name" TEXT NOT NULL DEFAULT 'Anonymous',
ADD COLUMN     "followers_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "colorOptions",
DROP COLUMN "productId",
DROP COLUMN "sizeOptions",
ADD COLUMN     "color_options" "Color"[],
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "size_options" "Size"[];

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "commentsCount",
DROP COLUMN "createdAt",
DROP COLUMN "isBookmarked",
DROP COLUMN "isLiked",
DROP COLUMN "likesCount",
DROP COLUMN "musicId",
DROP COLUMN "sharesCount",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "userId",
DROP COLUMN "videoUrl",
DROP COLUMN "viewCount",
ADD COLUMN     "comments_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_bookmarked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_liked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "music_id" INTEGER,
ADD COLUMN     "shares_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbnail_url" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL,
ADD COLUMN     "view_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VideoProduct" DROP CONSTRAINT "VideoProduct_pkey",
DROP COLUMN "productId",
DROP COLUMN "videoId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "video_id" INTEGER NOT NULL,
ADD CONSTRAINT "VideoProduct_pkey" PRIMARY KEY ("video_id", "product_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "Music"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProduct" ADD CONSTRAINT "VideoProduct_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProduct" ADD CONSTRAINT "VideoProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
