/*
  Warnings:

  - Changed the type of `phone_number_category` on the `contacts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `social_media_name` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "phone_number_category",
ADD COLUMN     "phone_number_category" TEXT NOT NULL,
DROP COLUMN "social_media_name",
ADD COLUMN     "social_media_name" TEXT NOT NULL;
