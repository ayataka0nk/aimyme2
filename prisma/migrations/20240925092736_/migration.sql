-- CreateTable
CREATE TABLE "estimates" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "labor_hours" INTEGER NOT NULL,

    CONSTRAINT "estimates_pkey" PRIMARY KEY ("id")
);
