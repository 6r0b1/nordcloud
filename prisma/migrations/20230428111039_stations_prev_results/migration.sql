/*
  Warnings:

  - You are about to drop the `station` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "station";

-- CreateTable
CREATE TABLE "previous_results" (
    "id" SERIAL NOT NULL,
    "pos_x" INTEGER NOT NULL,
    "pos_y" INTEGER NOT NULL,
    "best_station" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "previous_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "pos_x" INTEGER NOT NULL,
    "pos_y" INTEGER NOT NULL,
    "reach" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);
