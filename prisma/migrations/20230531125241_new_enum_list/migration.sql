/*
  Warnings:

  - The values [Home,Commercial,Principal,Others,Personal] on the enum `PhoneNumberCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [Facebook,Twitter,Instagram,Youtube,LinkedIn] on the enum `SocialMediaName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PhoneNumberCategory_new" AS ENUM ('HOME', 'COMMERCIAL', 'PRINCIPAL', 'OTHERS', 'PERSONAL');
ALTER TABLE "contacts" ALTER COLUMN "phone_number_category" TYPE "PhoneNumberCategory_new" USING ("phone_number_category"::text::"PhoneNumberCategory_new");
ALTER TYPE "PhoneNumberCategory" RENAME TO "PhoneNumberCategory_old";
ALTER TYPE "PhoneNumberCategory_new" RENAME TO "PhoneNumberCategory";
DROP TYPE "PhoneNumberCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SocialMediaName_new" AS ENUM ('FACEBOOK', 'TWITTER', 'INSTAGRAM', 'YOUTUBE', 'LINKEDIN');
ALTER TABLE "contacts" ALTER COLUMN "social_media_name" TYPE "SocialMediaName_new" USING ("social_media_name"::text::"SocialMediaName_new");
ALTER TYPE "SocialMediaName" RENAME TO "SocialMediaName_old";
ALTER TYPE "SocialMediaName_new" RENAME TO "SocialMediaName";
DROP TYPE "SocialMediaName_old";
COMMIT;
