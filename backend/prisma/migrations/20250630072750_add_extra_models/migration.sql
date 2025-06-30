/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Company" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uen" TEXT NOT NULL,
    "companyId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BunkerTanker" (
    "id" BIGSERIAL NOT NULL,
    "imo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "sbNo" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "BunkerTanker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivingVessel" (
    "id" BIGSERIAL NOT NULL,
    "imo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "sbNo" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "ReceivingVessel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SealsChecklist" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    "xlsxData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bunkerTankerId" BIGINT NOT NULL,

    CONSTRAINT "SealsChecklist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BunkerTanker" ADD CONSTRAINT "BunkerTanker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BunkerTanker" ADD CONSTRAINT "BunkerTanker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingVessel" ADD CONSTRAINT "ReceivingVessel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingVessel" ADD CONSTRAINT "ReceivingVessel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SealsChecklist" ADD CONSTRAINT "SealsChecklist_bunkerTankerId_fkey" FOREIGN KEY ("bunkerTankerId") REFERENCES "BunkerTanker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
