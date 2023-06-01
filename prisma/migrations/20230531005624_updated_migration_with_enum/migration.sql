/*
  Warnings:

  - The `social_media_name` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `phone_number_category` on the `contacts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PhoneNumberCategory" AS ENUM ('Home', 'Commercial', 'Principal', 'Others', 'Personal');

-- CreateEnum
CREATE TYPE "SocialMediaName" AS ENUM ('Facebook', 'Twitter', 'Instagram', 'Youtube', 'LinkedIn');

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "phone_number_category",
ADD COLUMN     "phone_number_category" "PhoneNumberCategory" NOT NULL,
DROP COLUMN "social_media_name",
ADD COLUMN     "social_media_name" "SocialMediaName";
