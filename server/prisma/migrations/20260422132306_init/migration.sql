-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Farmer', 'SeasonalWorker');

-- CreateEnum
CREATE TYPE "JobListingStatus" AS ENUM ('Draft', 'Active', 'Closed');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'UnderReview', 'Accepted', 'Rejected');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('Harvesting', 'Planting', 'Viticulture', 'Livestock', 'MachineOperation', 'Milking', 'Arboriculture', 'MarketGardening');

-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('Cereals', 'Fruits', 'Vegetables', 'Vineyard', 'OliveTrees', 'Horticulture', 'Livestock', 'MarketGardening', 'FieldCrops');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('Hourly', 'Weekly', 'Monthly');

-- CreateEnum
CREATE TYPE "WorkSchedule" AS ENUM ('FullTime', 'PartTime', 'Day', 'Night', 'Weekend', 'Flexible');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "city" TEXT,
    "postalCode" TEXT,
    "departement" TEXT,
    "proPhoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonalWorker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "city" TEXT,
    "postalCode" TEXT,
    "departement" TEXT,
    "skills" "Skill"[],
    "availabilityStart" TIMESTAMP(3),
    "availabilityEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeasonalWorker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobListing" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "JobListingStatus" NOT NULL DEFAULT 'Draft',
    "numberOfPositions" INTEGER NOT NULL,
    "skills" "Skill"[],
    "cropType" "CropType" NOT NULL,
    "workSchedule" "WorkSchedule" NOT NULL,
    "payAmount" DECIMAL(65,30) NOT NULL,
    "paymentType" "PaymentType" NOT NULL DEFAULT 'Hourly',
    "housingProvided" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT,
    "departement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobListingId" TEXT NOT NULL,
    "seasonalWorkerId" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_userId_key" ON "Farmer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_siret_key" ON "Farm"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonalWorker_userId_key" ON "SeasonalWorker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobListingId_seasonalWorkerId_key" ON "Application"("jobListingId", "seasonalWorkerId");

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonalWorker" ADD CONSTRAINT "SeasonalWorker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobListing" ADD CONSTRAINT "JobListing_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_seasonalWorkerId_fkey" FOREIGN KEY ("seasonalWorkerId") REFERENCES "SeasonalWorker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
