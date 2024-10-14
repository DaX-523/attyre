-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Music_id_seq";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Store_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Variant_id_seq";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Video_id_seq";
