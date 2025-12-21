-- CreateEnum
CREATE TYPE "VerifiedGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "ip_address" TEXT,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "verified_gender" "VerifiedGender",
    "location_iso" CHAR(2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_is_premium_idx" ON "users"("is_premium");

-- CreateIndex
CREATE INDEX "users_verified_gender_idx" ON "users"("verified_gender");

-- CreateIndex
CREATE INDEX "users_location_iso_idx" ON "users"("location_iso");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");
